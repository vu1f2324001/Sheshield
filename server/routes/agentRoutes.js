const express = require('express');
const router = express.Router();
const engine = require('../services/eligibilityEngine');

router.post('/schemes/evaluate', (req, res) => {
  res.json({ success: true, evaluations: engine.evaluateProfile() });
});

router.post('/applications/autofill', (req, res) => {
  const scheme = req.body.scheme || {};
  res.json({
    success: true,
    workflow: {
      _id: 'wf_' + Date.now(),
      schemeName: scheme.schemeName || 'Rajarshi Chhatrapati Shahu Maharaj Yojna',
      status: 'HUMAN_ACTION_REQUIRED',
      requiredHumanAction: {
        actionType: 'OTP_VERIFICATION',
        promptMessage: 'MahaDBT Gateway triggered an Aadhaar OTP verification to link DBT scholarship credit to your bank account.'
      }
    }
  });
});

router.post('/applications/:id/resolve-human-action', (req, res) => {
  res.json({
    success: true,
    workflow: {
      _id: req.params.id,
      schemeName: 'Rajarshi Chhatrapati Shahu Maharaj Yojna',
      status: 'READY_FOR_REVIEW',
      formData: {
        applicant_name: 'Akshada Valkunde',
        annual_income: '₹1,50,000',
        caste_category: 'OBC',
        institution: "Padmabhushan Vasantdada Patil Pratishthan's COE"
      }
    }
  });
});

router.post('/applications/:id/submit', (req, res) => {
  res.json({
    success: true,
    workflow: {
      _id: req.params.id,
      schemeName: 'Rajarshi Chhatrapati Shahu Maharaj Yojna',
      status: 'SUBMITTED',
      submissionDetails: {
        applicationRefNumber: 'MH-DBT-2026-894120',
        submissionDate: new Date(),
        officialTrackingUrl: 'https://mahadbt.maharashtra.gov.in/disbursement/track'
      }
    }
  });
});

module.exports = router;
