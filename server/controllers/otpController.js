const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const OTP = require('../models/OTP');
const { sendOTPEmail } = require('../services/emailService');

const generateOTP = () =>
  crypto.randomInt(100000, 1000000).toString();

const hashOTP = (otp) =>
  crypto.createHash('sha256').update(otp).digest('hex');

const sendNewOTP = async ({
  email,
  purpose,
  pendingName,
  pendingPasswordHash
}) => {
  const now = new Date();

  const existingOTP = await OTP.findOne({ email, purpose });

  if (existingOTP && existingOTP.resendAvailableAt > now) {
    const seconds = Math.ceil(
      (existingOTP.resendAvailableAt - now) / 1000
    );

    return {
      limited: true,
      seconds
    };
  }

  const otp = generateOTP();

  await OTP.findOneAndUpdate(
    { email, purpose },
    {
      email,
      purpose,
      otpHash: hashOTP(otp),
      pendingName,
      pendingPasswordHash,
      expiresAt: new Date(now.getTime() + 5 * 60 * 1000),
      resendAvailableAt: new Date(now.getTime() + 60 * 1000),
      attempts: 0
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  try {
    await sendOTPEmail(email, otp, purpose === 'reset' ? 'reset' : 'verification');
  } catch (error) {
    await OTP.deleteOne({ email, purpose });
    throw error;
  }

  return { limited: false };
};


// SIGNUP: Send OTP
exports.requestSignupOTP = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required.'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must contain at least 8 characters.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (await User.findOne({ email: normalizedEmail })) {
      return res.status(409).json({
        success: false,
        message: 'Email is already registered.'
      });
    }

    const pendingPasswordHash = await bcrypt.hash(password, 12);

    const result = await sendNewOTP({
      email: normalizedEmail,
      purpose: 'signup',
      pendingName: name.trim(),
      pendingPasswordHash
    });

    if (result.limited) {
      return res.status(429).json({
        success: false,
        message: `Please wait ${result.seconds} seconds before requesting another OTP.`
      });
    }

    return res.json({
      success: true,
      message: 'Verification OTP sent to your email.'
    });

  } catch (error) {
    console.error('Signup OTP Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to send OTP. Please try again.'
    });
  }
};


// SIGNUP: Verify OTP and create account
exports.verifySignupOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const record = await OTP.findOne({
      email: normalizedEmail,
      purpose: 'signup'
    });

    if (!record || record.expiresAt <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'OTP is invalid or expired. Request a new OTP.'
      });
    }

    if (record.attempts >= 5) {
      await OTP.deleteOne({ _id: record._id });
      return res.status(429).json({
        success: false,
        message: 'Too many incorrect attempts. Request a new OTP.'
      });
    }

    if (hashOTP(String(otp)) !== record.otpHash) {
      record.attempts += 1;
      await record.save();

      return res.status(400).json({
        success: false,
        message: 'Incorrect OTP.'
      });
    }

    if (await User.findOne({ email: normalizedEmail })) {
      await OTP.deleteOne({ _id: record._id });
      return res.status(409).json({
        success: false,
        message: 'Email is already registered.'
      });
    }

    const user = await User.create({
      name: record.pendingName,
      email: normalizedEmail,
      passwordHash: record.pendingPasswordHash
    });

    await OTP.deleteOne({ _id: record._id });

    return res.status(201).json({
      success: true,
      message: 'Email verified and account created.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Signup OTP Verification Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'OTP verification failed. Please try again.'
    });
  }
};


// FORGOT PASSWORD: Send OTP
exports.requestResetOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email is required.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    // Do not reveal whether an account exists.
    if (!user) {
      return res.json({
        success: true,
        message: 'If the account exists, an OTP will be sent.'
      });
    }

    const result = await sendNewOTP({
      email: normalizedEmail,
      purpose: 'reset'
    });

    if (result.limited) {
      return res.status(429).json({
        success: false,
        message: `Please wait ${result.seconds} seconds before requesting another OTP.`
      });
    }

    return res.json({
      success: true,
      message: 'If the account exists, an OTP will be sent.'
    });

  } catch (error) {
    console.error('Reset OTP Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to process request. Please try again.'
    });
  }
};


// FORGOT PASSWORD: Verify OTP and update password
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP and new password are required.'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must contain at least 8 characters.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const record = await OTP.findOne({
      email: normalizedEmail,
      purpose: 'reset'
    });

    if (!record || record.expiresAt <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'OTP is invalid or expired. Request a new OTP.'
      });
    }

    if (record.attempts >= 5) {
      await OTP.deleteOne({ _id: record._id });
      return res.status(429).json({
        success: false,
        message: 'Too many incorrect attempts. Request a new OTP.'
      });
    }

    if (hashOTP(String(otp)) !== record.otpHash) {
      record.attempts += 1;
      await record.save();

      return res.status(400).json({
        success: false,
        message: 'Incorrect OTP.'
      });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      await OTP.deleteOne({ _id: record._id });
      return res.status(400).json({
        success: false,
        message: 'Unable to reset password.'
      });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 12);
    await user.save();

    await OTP.deleteOne({ _id: record._id });

    return res.json({
      success: true,
      message: 'Password reset successful. Please sign in.'
    });

  } catch (error) {
    console.error('Password Reset Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Password reset failed. Please try again.'
    });
  }
};