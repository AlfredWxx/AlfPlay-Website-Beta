import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

interface ContactForm {
  organization?: string;
  fullName: string;
  phone: string;
  email: string;
  address?: string;
  message: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  // 只验证是否包含数字
  return /\d/.test(phone);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // 添加 CORS 头部
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://alfplay.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    console.log('Received data:', req.body);  // 添加调试日志
    const data = req.body as ContactForm;

    // 验证必填字段
    if (!data.fullName?.trim()) {
      return res.status(400).json({ message: 'Full name is required' });
    }
    if (!data.email?.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }
    if (!data.phone?.trim()) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    if (!data.message?.trim()) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // 验证邮箱格式
    if (!validateEmail(data.email)) {
      console.log('Invalid email:', data.email);  // 添加调试日志
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // 验证电话格式 - 移除验证
    // if (!validatePhone(data.phone)) {
    //   return res.status(400).json({ message: 'Invalid phone number format' });
    // }

    console.log('Validation passed, sending email...');  // 添加调试日志

    // 创建邮件发送器
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,  // 使用TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // 发送邮件
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'AlfPlay.Main@outlook.com',
      subject: `New Contact Form Message - From ${data.fullName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Organization:</strong> ${data.organization || 'Not provided'}</p>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Address:</strong> ${data.address || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      message: 'Failed to send message',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 