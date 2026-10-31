const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

const sendOTPEmail = async (email, otp, purpose = 'verification') => {
  const subject =
    purpose === 'reset'
      ? 'Sheshield - Password Reset OTP'
      : 'Sheshield - Email Verification OTP';

  const message =
    purpose === 'reset'
      ? 'Use this OTP to reset your Sheshield password.'
      : 'Use this OTP to verify your Sheshield email address.';

  await transporter.sendMail({
    from: `"Sheshield" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    text: `${message}\n\nYour OTP is: ${otp}\n\nThis OTP expires in 5 minutes. Do not share it with anyone.`,
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Sheshield Verification</h2>
        <p>${message}</p>
        <h1 style="letter-spacing: 8px;">${otp}</h1>
        <p>This OTP expires in <b>5 minutes</b>.</p>
        <p>Do not share this OTP with anyone.</p>
      </div>
    `
  });
};

module.exports = { sendOTPEmail };