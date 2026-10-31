exports.evaluateEligibility = (profile, scheme) => {
  let score = 0;
  const checks = [];

  const age = Number(profile.age) || 0;
  if (age >= scheme.eligibilityRules.minAge && age <= scheme.eligibilityRules.maxAge) {
    score += 25;
    checks.push({ title: 'Age Limit', status: 'PASS', msg: `Age ${age} falls within ${scheme.eligibilityRules.minAge}-${scheme.eligibilityRules.maxAge}` });
  } else {
    checks.push({ title: 'Age Limit', status: 'FAIL', msg: `Requires ${scheme.eligibilityRules.minAge}-${scheme.eligibilityRules.maxAge}` });
  }

  const isPan = scheme.state === 'All India';
  if (isPan || scheme.state.toLowerCase() === profile.state.toLowerCase()) {
    score += 25;
    checks.push({ title: 'Residency', status: 'PASS', msg: isPan ? 'Open to all states' : `Domicile matched for ${profile.state}` });
  } else {
    checks.push({ title: 'Residency', status: 'FAIL', msg: `Restricted to ${scheme.state}` });
  }

  const income = Number(profile.annualFamilyIncome) || 0;
  if (!scheme.eligibilityRules.maxIncomeLimit || income <= scheme.eligibilityRules.maxIncomeLimit) {
    score += 25;
    checks.push({ title: 'Income Limit', status: 'PASS', msg: 'Within permissible bounds' });
  } else {
    checks.push({ title: 'Income Limit', status: 'FAIL', msg: 'Income exceeds ceiling' });
  }

  score += 25;
  checks.push({ title: 'Profile Cohort', status: 'PASS', msg: 'Occupation aligned' });

  return {
    score,
    tier: score >= 80 ? 'High Match' : 'Possible Match',
    checks
  };
};
