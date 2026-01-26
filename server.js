import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
// IMPORTANT: Replace the password with your actual Gmail app password
const EMAIL_CONFIG = {
  service: 'gmail',
  user: 'dranrebwen2505@gmail.com',
  pass: 'nxxtbldlgknkykzc' // App password without spaces
};

// Create email transporter
const transporter = nodemailer.createTransport({
  service: EMAIL_CONFIG.service,
  auth: {
    user: EMAIL_CONFIG.user,
    pass: EMAIL_CONFIG.pass
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  // Log the contact form submission
  console.log('\n📧 New Contact Form Submission:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Email content
  const mailOptions = {
    from: EMAIL_CONFIG.user,
    to: EMAIL_CONFIG.user, // Send to yourself
    replyTo: email, // Set reply-to as the sender's email
    subject: `Portfolio Contact: Message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p style="background-color: white; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="color: #666; font-size: 12px;">This message was sent from your portfolio contact form.</p>
      </div>
    `
  };
  
  try {
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!\n');
    
    res.status(200).json({ 
      success: true, 
      message: 'Message received successfully!' 
    });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
});

// Get portfolio projects (example endpoint)
app.get('/api/projects', (req, res) => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution',
      tech: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task manager',
      tech: ['React', 'Express', 'Socket.io']
    }
  ];
  
  res.status(200).json({ projects });
});

app.listen(PORT, () => {
  console.log('\n🚀 Backend Server Started');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Server running on: http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Projects API: http://localhost:${PORT}/api/projects`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});
