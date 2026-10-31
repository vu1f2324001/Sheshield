const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  profile: {
    age: { type: Number, min: 0, max: 120 },
    state: { type: String, index: true },
    district: { type: String },
    education: { 
      type: String, 
      enum: ['Below 10th', '10th Pass', '12th Pass', 'Diploma', 'Graduate', 'Post-Graduate', 'Doctorate', 'Other'] 
    },
    occupation: { 
      type: String, 
      enum: ['Student', 'Self-Employed', 'Salaried', 'Unemployed', 'Homemaker', 'Daily Wage / Informal'] 
    },
    annualFamilyIncome: { type: Number, min: 0 },
    socialCategory: { 
      type: String, 
      enum: ['General', 'OBC', 'SC', 'ST', 'EWS', 'Minority', 'Prefer Not to Say'] 
    },
    isDifferentlyAbled: { type: Boolean, default: false },
    isSingleMotherOrWidow: { type: Boolean, default: false }
  },
  savedSchemes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scheme' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
