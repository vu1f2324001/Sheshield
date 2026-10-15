const mongoose = require('mongoose');

const ApplicationWorkflowSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  schemeId: { type: String, required: true },
  schemeName: { type: String, required: true },
  status: {
    type: String,
    enum: [
      'DOCUMENTS_UPLOADED',
      'DOCUMENTS_PROCESSING',
      'PROFILE_REVIEW_REQUIRED',
      'PROFILE_VERIFIED',
      'SCHEMES_EVALUATED',
      'APPLICATION_DRAFT_CREATED',
      'FORM_FILLING_IN_PROGRESS',
      'HUMAN_ACTION_REQUIRED',
      'READY_FOR_REVIEW',
      'SUBMISSION_IN_PROGRESS',
      'SUBMITTED',
      'SUBMISSION_FAILED',
      'APPLICATION_TRACKING'
    ],
    default: 'APPLICATION_DRAFT_CREATED'
  },
  formData: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
  requiredHumanAction: {
    actionType: { type: String, enum: ['OTP_VERIFICATION', 'CAPTCHA_ENTRY', 'BIOMETRIC_CONSENT', 'SIGNATURE_REQUIRED', null], default: null },
    promptMessage: { type: String, default: null },
    targetField: { type: String, default: null }
  },
  submissionDetails: {
    applicationRefNumber: { type: String, default: null },
    submissionDate: { type: Date, default: null },
    officialTrackingUrl: { type: String, default: null },
    receiptDocumentUrl: { type: String, default: null }
  },
  auditLog: [{
    timestamp: { type: Date, default: Date.now },
    fromState: String,
    toState: String,
    actor: { type: String, enum: ['AI_AGENT', 'USER', 'SYSTEM'] },
    notes: String
  }]
}, { timestamps: true });

module.exports = mongoose.models.ApplicationWorkflow || mongoose.model('ApplicationWorkflow', ApplicationWorkflowSchema);
