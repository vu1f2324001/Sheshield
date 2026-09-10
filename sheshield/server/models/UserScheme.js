const mongoose = require('mongoose');

const userSchemeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schemeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scheme', required: true },
  matchScore: { type: Number, default: 0 },
  confidence: { type: String, default: 'Possible Match' },
  saved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('UserScheme', userSchemeSchema);
