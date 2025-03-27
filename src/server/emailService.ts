import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export async function sendEmail({ to, subject, text, html }: EmailData) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html: html || text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = { sendEmail }; 