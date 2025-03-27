import 'dotenv/config';
import { sendEmail } from './emailService';

async function testEmail() {
  console.log('Sending test email...');
  try {
    await sendEmail({
      to: 'alfredwuxx@gmail.com',
      subject: 'Test Email',
      text: 'This is a test email from AlfPlay.',
      html: '<h1>Test Email</h1><p>This is a test email from AlfPlay.</p>'
    });
    console.log('Test email sent successfully!');
  } catch (error) {
    console.error('Failed to send test email:', error);
  }
}

// 运行测试
testEmail(); 