const express = require('express');
const ContactUs = require('../models/ContactUs'); // Adjust path based on your structure
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const imagePath = path.join(__dirname, '../../images/logo.png');  // Adjust if needed
const image = fs.readFileSync(imagePath, { encoding: 'base64' });
// POST: Submit support request
 const contactUs = async (req, res) => {
  const { name, email, category, description } = req.body;

  try {
    // Create a new ContactUs entry in MongoDB
    const newContact = new ContactUs({
      name,
      email,
      category,
      description,
      ticketNumber: `TICKET-${Date.now()}`
    });
    await newContact.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

  
      const mailOptions = {
        from: 'support@surseseva.com',
        to: email,
        subject: `Support Ticket Confirmation - ${newContact.ticketNumber}`,
        html: `
          <html>
            <head>
              <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
            </head>
            <body style="margin: 0; padding: 0; background-color: #f9f9f9; color: #000000;">
              <table style="width: 100%; background-color: #f9f9f9;">
                <tr>
                  <td style="padding: 20px;">
                    <table style="width: 600px; background-color: #ffffff; margin: 0 auto; border-radius: 8px; border: 1px solid #dddddd;">
                      <tr>
                        <td style="text-align: center; padding: 20px; background-color: #003399; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                          <img src=${image} alt="sur se seva" style="max-width: 150px; height: auto;">
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px; font-family: 'Cabin', sans-serif;">
                          <h2 style="font-size: 22px; color: #003399;">Support Ticket Confirmation</h2>
                          <p>Hi ${name},</p>
                          <p>Thank you for contacting support. Your ticket number is <strong>${newContact.ticketNumber}</strong>. We will get back to you soon.</p>
                          <p><strong>Description:</strong><br> ${description}</p>
                          <p>If you need further assistance, please do not hesitate to reach out to us.</p>
                          <p>Best Regards,<br>Support Team</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `
      };
  
      await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Ticket submitted successfully!', ticketNumber: newContact.ticketNumber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit the ticket.' });
  }
}

module.exports =  {contactUs} ;
