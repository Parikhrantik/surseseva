const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const ejs = require('ejs');
const path = require('path');

dotenv.config(); // Load environment variables from .env file

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  pool: true, // Enable connection pooling

});
const sendVerificationEmail = async (to, token) => {
  console.log('Sending verification email to:', to); // Log for debugging

  const templatePath = path.join(__dirname, '../views/emailtemplate.ejs');

  // Correct URL structure: Only pass the JWT token here
  const url = `${token}`;
  console.log('Verification URL:', url); // Log URL for debugging

  try {
    const emailHTML = await ejs.renderFile(templatePath, { url });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'Email Verification',
      html: emailHTML,
    });
    console.log('Email sent:', info.messageId);
    return info
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendResetPasswordEmail = async (to, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender's email
      to, // Recipient's email
      subject: 'Password Reset Request',
      html: `
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>This link will expire in 1 hour.</p>
        `,
    });

    console.log('Password reset email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

const sendParticipantEmail = async (to, subject, voterFeedback, participantName) => {
  try {
    const templatePath = path.join(__dirname, '../views/voteNotification.ejs');

    // Render the EJS template with dynamic data
    const emailHTML = await ejs.renderFile(templatePath, { 
      voterFeedback, 
      participantName 
    });

    // Send the email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: emailHTML,
    });

    console.log('Vote notification email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};




module.exports = { sendVerificationEmail, sendResetPasswordEmail,sendParticipantEmail };