export const SEED_SCHEMES = [
  {
    id: 'pragati-scholarship',
    name: 'AICTE Pragati Scholarship for Girls',
    govLevel: 'Central',
    state: 'All India',
    category: 'Education & Skills',
    shortDesc: 'Financial grant of ₹50,000 per year towards technical degree/diploma education for female scholars.',
    minAge: 16,
    maxAge: 25,
    maxIncome: 800000,
    targetOccupations: ['Student'],
    targetEducations: ['12th Pass', 'Diploma', 'Graduate'],
    benefits: [
      '₹50,000 per annum paid directly via Direct Benefit Transfer (DBT).',
      'Renewable across all academic years of the registered technical degree.',
      'Contingency allowance covers tuition fees, technical books, and laptops.'
    ],
    docs: [
      { name: 'Identity Proof (Passport, Voter ID, or Student ID)', mandatory: true },
      { name: 'Official State Domicile Certificate', mandatory: true },
      { name: 'Family Income Certificate (< ₹8 LPA)', mandatory: true },
      { name: '10th and 12th Official Examination Marksheets', mandatory: true },
      { name: 'College Admission Slip & Fee Payment Receipt', mandatory: true }
    ],
    portalUrl: 'https://scholarships.gov.in',
    lastVerified: 'August 2026'
  },
  {
    id: 'mudra-mahila',
    name: 'Pradhan Mantri Mudra Yojana — Women Enterprise',
    govLevel: 'Central',
    state: 'All India',
    category: 'Entrepreneurship',
    shortDesc: 'Collateral-free micro-credit loans up to ₹10 Lakhs designed to support women-owned small businesses.',
    minAge: 18,
    maxAge: 65,
    maxIncome: null,
    targetOccupations: ['Self-Employed', 'Homemaker', 'Daily Wage / Informal'],
    targetEducations: ['Below 10th', '10th Pass', '12th Pass', 'Diploma', 'Graduate'],
    benefits: [
      'Zero collateral or third-party guarantee required.',
      'Discounted interest rate subsidies for women micro-entrepreneurs.',
      'Flexible repayment terms between 3 to 5 years.'
    ],
    docs: [
      { name: 'Proof of Identity (Passport, Driving License, or Voter ID)', mandatory: true },
      { name: 'Proof of Residence (Utility bill or Rent Agreement)', mandatory: true },
      { name: 'Business Enterprise Proposal & Quotations', mandatory: true },
      { name: 'Bank Account Statements (Past 6 Months)', mandatory: true }
    ],
    portalUrl: 'https://www.jansamarth.in',
    lastVerified: 'July 2026'
  },
  {
    id: 'majhi-kanya-bhagyashree',
    name: 'Majhi Kanya Bhagyashree Scheme',
    govLevel: 'State',
    state: 'Maharashtra',
    category: 'Social Welfare',
    shortDesc: 'Maharashtra state initiative supporting the nutrition, education, and financial security of the girl child.',
    minAge: 0,
    maxAge: 25,
    maxIncome: 750000,
    targetOccupations: ['Student', 'Homemaker', 'Unemployed'],
    targetEducations: ['Below 10th', '10th Pass', '12th Pass', 'Graduate'],
    benefits: [
      '₹50,000 fixed deposit made in the child’s name.',
      'Periodic interest payouts to finance high school and university studies.'
    ],
    docs: [
      { name: 'Maharashtra Domicile Certificate (15+ Years)', mandatory: true },
      { name: 'Birth Certificate of Applicant / Child', mandatory: true },
      { name: 'Tahsildar Household Income Certificate', mandatory: true },
      { name: 'Bank Passbook Linked to Savings Account', mandatory: true }
    ],
    portalUrl: 'https://aaplesarkar.mahaonline.gov.in',
    lastVerified: 'August 2026'
  }
];
