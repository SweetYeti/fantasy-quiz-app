require('dotenv').config({ override: true });

console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Set' : 'Not set');
console.log('All environment variables:', Object.keys(process.env));
console.log('Full OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use(express.json());

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

const PORT = process.env.PORT || 3000;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connection established successfully'))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
const quizRoutes = require('./routes/quiz');
const commissionRoutes = require('./routes/commission');

app.use('/api/quiz', quizRoutes);
app.use('/api/commission', commissionRoutes);

// Catch-all handler for any request that doesn't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Set' : 'Not set');
  console.log('Environment variables:', Object.keys(process.env));
  console.log('Full OPENAI_API_KEY:', process.env.OPENAI_API_KEY);
  console.log('All environment variables:', process.env);
});