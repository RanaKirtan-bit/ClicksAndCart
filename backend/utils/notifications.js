import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
});

export const notifyAdmin = async (message) => {
  try {
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: 'Low Stock Alert',
      text: message,
    });
    console.log('Admin notified successfully');
  } catch (error) {
    console.error('Failed to notify admin:', error);
  }
};