import { sendEmail } from '../emailService';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { organization, fullName, phone, email, address, message } = req.body;
    
    if (!fullName || !phone || !email || !message) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        details: {
          fullName: !fullName ? 'Full name is required' : undefined,
          phone: !phone ? 'Phone is required' : undefined,
          email: !email ? 'Email is required' : undefined,
          message: !message ? 'Message is required' : undefined
        }
      });
    }

    const emailContent = `
      New Contact Form Submission
      
      Name: ${fullName}
      Organization: ${organization || 'Not provided'}
      Phone: ${phone}
      Email: ${email}
      Address: ${address || 'Not provided'}
      
      Message:
      ${message}
    `;

    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Organization:</strong> ${organization || 'Not provided'}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Address:</strong> ${address || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    await sendEmail({
      to: process.env.EMAIL_USER || '',
      subject: `New Contact Form Submission from ${fullName}`,
      text: emailContent,
      html: htmlContent
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error in contact API:', error);
    res.status(500).json({ 
      message: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 