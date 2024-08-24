const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/submit', async (req, res) => {
  try {
    const { magicalProfile, ...commissionDetails } = req.body;

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
    let mailOptions = {
      from: '"Your App Name" <your-email@example.com>',
      to: process.env.EMAIL_USER,
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

    // Send email
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: "Commission submitted successfully", messageId: info.messageId });
  } catch (error) {
    console.error('Error in commission submission:', error);
    res.status(500).json({ error: 'An error occurred while submitting the commission.' });
  }
});

module.exports = router;