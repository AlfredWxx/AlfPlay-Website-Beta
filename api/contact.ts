import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '只允许 POST 请求' });
  }

  try {
    const { organization, fullName, phone, email, address, message } = req.body;

    // 创建邮件发送器
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,  // 使用TLS
      auth: {
        user: process.env.EMAIL_USER,     // alfredwuxx@gmail.com
        pass: process.env.EMAIL_PASSWORD,  // Gmail应用专用密码
      },
    });

    // 发送邮件
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'AlfPlay.Main@outlook.com',  // 接收邮件的地址保持不变
      subject: `New Contact Form Message - From ${fullName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Organization:</strong> ${organization || 'Not provided'}</p>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
} 