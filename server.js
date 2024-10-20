require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const helmet = require('helmet');

const app = express();

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Make sure this is placed before any routes
app.options('*', cors()); // Enable pre-flight for all routes

// Logging middleware
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.path);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  next();
});

const PORT = process.env.PORT || 5000;

console.log('NODE_ENV:', process.env.NODE_ENV);

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    console.error('MONGODB_URI:', process.env.MONGODB_URI);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({
  dest: path.join(__dirname, 'temp_uploads'),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    fields: 20, // Increase the number of fields allowed
    files: 5 // Allow up to 5 files
  }
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Routes
const quizRoutes = require('./routes/quiz');
const commissionRoutes = require('./routes/commission');

app.use('/api/quiz', quizRoutes);
app.use('/api/commission', commissionRoutes);

// Catch-all handler for any request that doesn't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Set' : 'Not set');
});