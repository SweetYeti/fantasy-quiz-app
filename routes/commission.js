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
    console.log('File paths:', req.files ? req.files.map(file => file.path) : 'No files');
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
    
    let parsedProfile, parsedAnswers;
    try {
      parsedProfile = JSON.parse(magicalProfile || '{}');
      parsedAnswers = JSON.parse(quizAnswers || '[]');
    } catch (error) {
      console.error('Error parsing magicalProfile or quizAnswers:', error);
      parsedProfile = {};
      parsedAnswers = [];
    }
    
    console.log('Parsed profile:', parsedProfile);
    console.log('Parsed quizAnswers:', parsedAnswers);

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

    if (dataSharingPreference === 'full') {
      emailContent += `
4. Magical Profile
------------------------
${JSON.stringify(parsedProfile, null, 2)}

5. Quiz Answers
------------------------
${Array.isArray(parsedAnswers) ? parsedAnswers.map((answer, index) => `Q${index + 1}: ${answer.question}\nA: ${answer.answer}`).join('\n\n') : 'No quiz answers provided'}
`;
    } else if (dataSharingPreference === 'reading') {
      emailContent += `
4. Magical Profile (Introduction Only)
------------------------
${parsedProfile.introduction || 'No introduction available'}
`;
    } else {
      emailContent += `
4. Magical Profile
------------------------
No magical profile data shared as per user preference.
`;
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // This should be the App Password
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
      html: `<pre style="white-space: pre-wrap; word-wrap: break-word;">${emailContent}</pre>`,
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
    console.error('Error processing commission request:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'An error occurred while submitting the commission request.', 
      details: error.message,
      stack: error.stack
    });
  }
});

router.post('/send-reading', async (req, res) => {
  try {
    const { email, profile } = req.body;

    // Create email content
    const emailContent = `
      Your Magical Reading

      ${Object.entries(profile).map(([key, value]) => `${key}: ${value}`).join('\n\n')}
    `;

    // Set up email options
    let mailOptions = {
      from: '"Your App Name" <your-email@example.com>',
      to: email,
      subject: "Your Magical Reading",
      text: emailContent,
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    res.status(200).json({ message: 'Reading sent successfully' });
  } catch (error) {
    console.error('Error sending reading:', error);
    res.status(500).json({ error: 'Failed to send reading' });
  }
});

module.exports = router;