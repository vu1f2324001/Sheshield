export async function parseUnstructuredText(text) {
  const lower = text.toLowerCase();
  const ageMatch = text.match(/\b(\d{2})\b/);
  const age = ageMatch ? ageMatch[1] : '21';

  let state = 'Maharashtra';
  if (lower.includes('delhi')) state = 'Delhi';
  if (lower.includes('karnataka')) state = 'Karnataka';
  if (lower.includes('gujarat')) state = 'Gujarat';

  let occupation = 'Student';
  if (lower.includes('business') || lower.includes('shop') || lower.includes('enterprise')) {
    occupation = 'Self-Employed';
  }

  return {
    age,
    state,
    occupation,
    education: 'Graduate',
    income: '240000',
    category: 'General'
  };
}
