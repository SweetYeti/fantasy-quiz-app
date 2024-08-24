const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs').promises;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });

router.post('/submit', async (req, res) => {
  console.log('Received form data:', req.body);
  console.log('Received files:', req.files);

  try {
    const { 
      name = 'Not provided', 
      email = 'Not provided', 
      phone = 'Not provided', 
      commissionType = 'Not specified', 
      additionalDetails = 'None', 
      dataSharingPreference = 'custom', 
      magicalProfile,
      quizAnswers
    } = req.body;

    console.log('Parsed magicalProfile:', JSON.parse(magicalProfile || '{}'));
    console.log('Parsed quizAnswers:', JSON.parse(quizAnswers || '[]'));

    let emailContent = `
Dear Hanna,

A new commission request has been submitted. Here are the details:

1. Commission Overview
------------------------
Commission Type: ${commissionType}
Data Sharing Preference: ${dataSharingPreference}

2. Client Details
------------------------
Name: ${name}
Email: ${email}
Phone: ${phone}

3. Commission Specifics
------------------------
Additional Details: ${additionalDetails}

`;

if (dataSharingPreference === 'full' && magicalProfile && quizAnswers) {
  const parsedProfile = JSON.parse(magicalProfile || '{}');
  const parsedAnswers = JSON.parse(quizAnswers || '[]');
  
  emailContent += `
4. Magical Profile
------------------------
${Object.entries(parsedProfile).map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`).join('\n')}

5. Quiz Answers
------------------------
${parsedAnswers.map(answer => `Q: ${answer.question}\nA: ${answer.answer}`).join('\n\n')}
`;
} else if (dataSharingPreference === 'reading' && magicalProfile) {
  const parsedProfile = JSON.parse(magicalProfile || '{}');
  emailContent += `
4. Magical Profile (Introduction Only)
------------------------
${parsedProfile.introduction || 'Not available'}
`;
} else {
  emailContent += `
4. Magical Profile
------------------------
No magical profile data shared as per user preference.
`;
}

// Compress images
const compressedFiles = [];
if (req.files && req.files.length > 0) {
  for (const file of req.files) {
    const compressedFilePath = file.path.replace(/\.\w+$/, '_compressed.jpg');
    console.log('Original file:', file.path);
    console.log('Compressed file:', compressedFilePath);
    await sharp(file.path)
      .resize(1000) // Resize to max width of 1000px
      .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
      .toFile(compressedFilePath);
    console.log('Compression complete');
    
    compressedFiles.push({
      filename: file.originalname.replace(/\.\w+$/, '.jpg'),
      path: compressedFilePath
    });

    // Delete the original file
    await fs.unlink(file.path);
  }
}

emailContent += `
Thank you for your artistry and dedication to bringing these magical portraits to life!

Best regards,
Your Magical Portrait Commission System
`;

    // Create a transporter using SMTP
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Prepare email content
    console.log('Compressed files for email:', compressedFiles);
    let mailOptions = {
      from: '"Your App Name" <your-email@example.com>',
      to: process.env.EMAIL_USER,
      subject: "New Commission Request",
      text: emailContent,
      html: `<pre>${emailContent}</pre>`,
      attachments: compressedFiles
    };
    console.log('Mail options:', mailOptions);

    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    // Delete compressed files after sending
    for (const file of compressedFiles) {
      await fs.unlink(file.path);
    }

    res.status(200).json({ message: 'Commission request submitted successfully' });
  } catch (error) {
    console.error('Error in commission submission:', error);
    res.status(500).json({ error: 'An error occurred while submitting the commission request.' });
  }
});

module.exports = router;