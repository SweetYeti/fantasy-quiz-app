const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs').promises;

const upload = multer({
  dest: 'temp_uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    fields: 20, // Increase the number of fields allowed
    files: 5 // Allow up to 5 files
  }
});

router.post('/submit', upload.array('referencePhotos', 5), async (req, res) => {
  try {
    console.log('Received form data:', req.body);
    console.log('Received files:', req.files);
    console.log('File paths:', req.files.map(file => file.path));

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

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let attachments = [];
    if (req.files && req.files.length > 0) {
      console.log('Creating attachments for email');
      attachments = req.files.map(file => {
        console.log('Attaching file:', file.originalname, 'Path:', file.path);
        return {
          filename: file.originalname,
          path: file.path
        };
      });
      console.log('Final attachments array:', attachments);
    }

    let mailOptions = {
      from: '"Your App Name" <your-email@example.com>',
      to: process.env.EMAIL_USER,
      subject: "New Commission Request",
      text: emailContent,
      html: `<pre>${emailContent}</pre>`,
      attachments: attachments
    };

    console.log('Mail options:', JSON.stringify(mailOptions, null, 2));

    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    // Clean up temporary files
    for (const file of req.files) {
      await fs.unlink(file.path);
    }

    res.status(200).json({ message: 'Commission request submitted successfully' });
  } catch (error) {
    console.error('Detailed error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'An error occurred while submitting the commission request.', 
      details: error.message,
      stack: error.stack
    });
  }
});

module.exports = router;