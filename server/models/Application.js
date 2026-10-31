const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schemeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scheme', required: true },
  status: { 
    type: String, 
    enum: ['Not Started', 'Documents Pending', 'Ready to Apply', 'Submitted', 'Completed'], 
    default: 'Not Started' 
  },
  completedStepIndexes: [{ type: Number }],
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
