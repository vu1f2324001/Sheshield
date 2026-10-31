const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  governmentLevel: { type: String, enum: ['Central', 'State'], required: true },
  state: { type: String, default: 'All India' },
  shortDescription: { type: String, required: true },
  detailedBenefits: [{ type: String }],
  eligibilityRules: {
    minAge: { type: Number, default: 0 },
    maxAge: { type: Number, default: 100 },
    maxIncomeLimit: { type: Number, default: null },
    allowedOccupations: [{ type: String }]
  },
  requiredDocuments: [{
    name: { type: String, required: true },
    isMandatory: { type: Boolean, default: true }
  }],
  officialPortalUrl: { type: String, required: true },
  lastVerifiedDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Scheme', schemeSchema);
