const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },

  purpose: {
    type: String,
    enum: ['signup', 'reset'],
    required: true
  },

  otpHash: {
    type: String,
    required: true
  },

  pendingName: {
    type: String
  },

  pendingPasswordHash: {
    type: String
  },

  expiresAt: {
    type: Date,
    required: true,
    expires: 0
  },

  resendAvailableAt: {
    type: Date,
    required: true
  },

  attempts: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// One active OTP per email and purpose
otpSchema.index(
  { email: 1, purpose: 1 },
  { unique: true }
);

module.exports = mongoose.model('OTP', otpSchema);