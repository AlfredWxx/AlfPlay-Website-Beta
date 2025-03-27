import express, { Request, Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// 添加环境变量检查
console.log('Environment variables check:');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '已设置' : '未设置');
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '已设置' : '未设置');

const app = express();
app.use(cors());
app.use(express.json());

interface ContactFormData {
  organization?: string;
  fullName: string;
  phone: string;
  email: string;
  address?: string;
  message: string;
}

// 创建邮件发送器
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// 验证邮件发送器配置
transporter.verify((error) => {
  if (error) {
    console.error('邮件发送器配置错误:', error);
  } else {
    console.log('邮件服务器连接成功，准备发送邮件');
  }
});

app.post('/api/contact', async (req: Request<{}, any, ContactFormData>, res: Response): Promise<void> => {
  try {
    console.log('Received contact form data:', req.body);
    const { organization, fullName, phone, email, address, message } = req.body;

    // 基本验证
    if (!fullName || !email || !phone || !message) {
      console.log('Missing required fields:', { fullName, email, phone, message });
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    console.log('Attempting to send email...');
    // 发送邮件
    await transporter.sendMail({
      from: `"AlfPlay Contact Form" <${process.env.EMAIL_USER}>`,
      to: ['AlfPlay.Main@outlook.com', process.env.EMAIL_USER as string],
      replyTo: email || process.env.EMAIL_USER as string,
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

    console.log('Email sent successfully');
    res.json({ message: 'Message sent successfully' });
    return;
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      message: 'Failed to send message',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return;
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 