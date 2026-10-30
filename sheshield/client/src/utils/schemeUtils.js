export const analyzeRequiredDocsForScheme = (title = '', desc = '') => {
  const content = (title + ' ' + desc).toLowerCase();
  const identityDoc = { id: 'aadhaar', name: 'Aadhaar Card' };
  const passbookDoc = { id: 'passbook', name: 'Bank Passbook (Aadhaar Seeded DBT)' };
  const incomeDoc = { id: 'income_cert', name: 'Income Certificate (Tehsildar)' };

  if (content.match(/scholarship|student|college|education|matric|merit|fee|admission|dhe|dte/)) {
    return [identityDoc, incomeDoc, { id: 'bonafide', name: 'College Admission Bonafide / Marksheet' }, passbookDoc];
  }
  return [identityDoc, { id: 'ration_card', name: 'Ration Card / Domicile Certificate' }, passbookDoc];
};

export const handleLanguageSwitch = (langCode) => {
  document.cookie = 'googtrans=/en/' + langCode + '; path=/;';
  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    combo.value = langCode;
    combo.dispatchEvent(new Event('change'));
  }
};
