class EligibilityEngine {
  constructor() {
    this.schemesRegistry = [
      {
        id: 'SCHEME_MAHA_RAJARSHI_CHHATRAPATI',
        name: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna',
        adminAuthority: 'Higher & Technical Education Department, Govt. of Maharashtra',
        portalUrl: 'https://mahadbt.maharashtra.gov.in',
        isEligible: true,
        status: 'ELIGIBLE',
        passedRules: ['Annual income ₹1,50,000 is within ceiling of ₹8,00,000', 'Social category OBC qualifies']
      },
      {
        id: 'SCHEME_PRAGATI_WOMEN_SCHOLARSHIP',
        name: 'AICTE Pragati Scholarship Scheme for Girl Students',
        adminAuthority: 'AICTE, Central Government',
        portalUrl: 'https://scholarships.gov.in',
        isEligible: true,
        status: 'ELIGIBLE',
        passedRules: ['Target gender Female eligible', 'Enrolled in PVPPCOE Technical Education']
      }
    ];
  }
  evaluateProfile() { return this.schemesRegistry; }
}
module.exports = new EligibilityEngine();
