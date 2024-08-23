const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/submit', async (req, res) => {
  console.log('Received commission submission request');
  console.log('Request body:', req.body);
  try {
    const { magicalProfile, ...commissionDetails } = req.body;
    console.log('Commission details:', commissionDetails);
    console.log('Magical profile:', magicalProfile);

    // Create a transporter using SMTP
    console.log('Full EMAIL_USER:', process.env.EMAIL_USER);
    console.log('Full EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set (length: ' + process.env.EMAIL_PASS.length + ')' : 'Not set');
    console.log('All environment variables:', Object.keys(process.env));

    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use TLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      console.log('Transporter created successfully');
    } catch (error) {
      console.error('Error creating transporter:', error);
    }

    // Prepare email content
    let mailOptions = {
      from: '"Your App Name" <your-email@example.com>',
      to: process.env.EMAIL_USER, // Send to your own email for testing
      subject: "New Commission Request",
      text: `
        New commission request received!

        Commission Details:
        ${Object.entries(commissionDetails).map(([key, value]) => `${key}: ${value}`).join('\n')}

        Magical Profile:
        ${JSON.stringify(magicalProfile, null, 2)}
      `,
      html: `
        <h1>New Commission Request</h1>
        <h2>Commission Details:</h2>
        <ul>
          ${Object.entries(commissionDetails).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
        </ul>
        <h2>Magical Profile:</h2>
        <pre>${JSON.stringify(magicalProfile, null, 2)}</pre>
      `
    };

    console.log('Mail options prepared');

    // Send email
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: "Commission submitted successfully", messageId: info.messageId });
  } catch (error) {
    console.error('Error in commission submission:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'An error occurred while submitting the commission.', 
      details: error.message,
      stack: error.stack
    });
  }
});

module.exports = router;