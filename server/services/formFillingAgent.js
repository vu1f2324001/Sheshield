const ApplicationWorkflow = require('../models/ApplicationWorkflow');

class MockPortalAdapter {
  async autoFill(profileData) {
    const filledFields = {
      applicant_name: profileData.fullName || 'Akshada Valkunde',
      family_annual_income: profileData.annualIncome || 150000,
      social_category: profileData.category || 'OBC',
      enrolled_institution: profileData.institution || "Padmabhushan Vasantdada Patil Pratishthan's COE",
      domicile_state: 'Maharashtra',
      aadhaar_holder_consent: true
    };

    return {
      success: true,
      filledFields,
      unfilledFields: [],
      requiresHumanIntervention: true,
      humanAction: {
        actionType: 'OTP_VERIFICATION',
        promptMessage: 'MahaDBT Gateway triggered an Aadhaar OTP verification to link DBT scholarship credit to your bank account.',
        targetField: 'aadhaar_auth_otp'
      }
    };
  }

  async submit(formData) {
    const refPrefix = 'MH-DBT-2026';
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    return {
      applicationRefNumber: `${refPrefix}-${randomSuffix}`,
      submissionDate: new Date(),
      officialTrackingUrl: 'https://mahadbt.maharashtra.gov.in/disbursement/track',
      receiptDocumentUrl: `https://sheshield.s3.ap-south-1.amazonaws.com/receipts/${refPrefix}-${randomSuffix}.pdf`
    };
  }
}

class FormFillingAgentOrchestrator {
  constructor() {
    this.adapters = {
      'SCHEME_MAHA_RAJARSHI_CHHATRAPATI': new MockPortalAdapter(),
      'SCHEME_PRAGATI_WOMEN_SCHOLARSHIP': new MockPortalAdapter()
    };
  }

  async startApplicationDraft(userId, scheme) {
    let workflow;
    try {
      workflow = new ApplicationWorkflow({
        userId,
        schemeId: scheme.schemeId,
        schemeName: scheme.schemeName,
        status: 'APPLICATION_DRAFT_CREATED'
      });
      await workflow.save();
    } catch (e) {
      workflow = {
        _id: 'draft_' + Date.now(),
        userId,
        schemeId: scheme.schemeId,
        schemeName: scheme.schemeName,
        status: 'APPLICATION_DRAFT_CREATED',
        auditLog: []
      };
    }
    return workflow;
  }

  async executeAutoFill(workflowId, verifiedProfile) {
    let workflow;
    try {
      workflow = await ApplicationWorkflow.findById(workflowId);
    } catch (e) {}

    if (!workflow) {
      workflow = {
        _id: workflowId,
        status: 'FORM_FILLING_IN_PROGRESS',
        formData: new Map(),
        auditLog: []
      };
    }

    const adapter = new MockPortalAdapter();
    const fillResult = await adapter.autoFill(verifiedProfile);
    workflow.formData = fillResult.filledFields;

    if (fillResult.requiresHumanIntervention) {
      workflow.status = 'HUMAN_ACTION_REQUIRED';
      workflow.requiredHumanAction = fillResult.humanAction;
    } else {
      workflow.status = 'READY_FOR_REVIEW';
    }

    if (workflow.save) await workflow.save();
    return workflow;
  }

  async resumeAfterHumanAction(workflowId, actionPayload) {
    let workflow;
    try {
      workflow = await ApplicationWorkflow.findById(workflowId);
    } catch (e) {}

    if (!workflow) {
      workflow = {
        _id: workflowId,
        status: 'HUMAN_ACTION_REQUIRED',
        formData: { applicant_name: 'Akshada Valkunde', family_annual_income: 150000, social_category: 'OBC' }
      };
    }

    workflow.requiredHumanAction = { actionType: null, promptMessage: null, targetField: null };
    workflow.status = 'READY_FOR_REVIEW';
    if (workflow.save) await workflow.save();
    return workflow;
  }

  async submitApplication(workflowId, explicitUserConsent) {
    if (!explicitUserConsent) throw new Error('User consent required prior to submission');
    let workflow;
    try {
      workflow = await ApplicationWorkflow.findById(workflowId);
    } catch (e) {}

    if (!workflow) {
      workflow = { _id: workflowId };
    }

    const adapter = new MockPortalAdapter();
    const result = await adapter.submit(workflow.formData);
    workflow.status = 'SUBMITTED';
    workflow.submissionDetails = result;
    if (workflow.save) await workflow.save();
    return workflow;
  }
}

module.exports = new FormFillingAgentOrchestrator();
