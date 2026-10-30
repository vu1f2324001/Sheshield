// Dynamically determine required documents for a scheme
export const analyzeRequiredDocsForScheme = (title = '', desc = '') => {
  const content = (title + ' ' + desc).toLowerCase();
  const identityDoc = { id: 'aadhaar', name: 'Aadhaar Card' };
  const passbookDoc = { id: 'passbook', name: 'Bank Passbook (Aadhaar Seeded DBT)' };
  const incomeDoc = { id: 'income_cert', name: 'Income Certificate (Tehsildar)' };

  // 1. Student / College / Scholarship
  if (content.match(/scholarship|student|college|education|matric|merit|fee|admission|dhe|dte/)) {
    return [
      identityDoc,
      incomeDoc,
      { id: 'bonafide', name: 'College Admission Bonafide / Marksheet' },
      passbookDoc
    ];
  }

  // 2. Widow / Destitute / Niradhar
  if (content.match(/widow|viddava|vidhwa|niradhar|destitute|pension/)) {
    return [
      identityDoc,
      { id: 'death_cert', name: 'Husband Death Certificate (पतीचा मृत्यू दाखला)' },
      incomeDoc,
      passbookDoc
    ];
  }

  // 3. Farmer / Agriculture / Solar Pump
  if (content.match(/farmer|sheti|krishi|solar|pump|land|agriculture|saur/)) {
    return [
      identityDoc,
      { id: 'land_extract', name: '7/12 & 8A Land Extract (सातबारा व ८अ उतारा)' },
      passbookDoc
    ];
  }

  // 4. Business / Loan / Microfinance
  if (content.match(/loan|business|mudra|samridhi|microfinance|startup/)) {
    return [
      identityDoc,
      { id: 'business_proof', name: 'Business Proposal / Udyam Registration' },
      incomeDoc,
      passbookDoc
    ];
  }

  // 5. Default Public Welfare
  return [
    identityDoc,
    { id: 'ration_card', name: 'Ration Card (Orange / Yellow) / Domicile Certificate' },
    passbookDoc
  ];
};

export const handleLanguageSwitch = (langCode) => {
  const domain = window.location.hostname;
  const isLocal = domain === 'localhost' || domain === '127.0.0.1';

  if (langCode === 'en') {
    document.cookie = 'googtrans=/en/en; path=/;' + (isLocal ? '' : ' domain=' + domain + ';');
    document.cookie = 'googtrans=/en/en; path=/;';
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = 'en';
      combo.dispatchEvent(new Event('change'));
    }
    setTimeout(() => {
      window.location.href = window.location.origin + window.location.pathname;
    }, 100);
    return;
  }

  document.cookie = 'googtrans=/en/' + langCode + '; path=/;' + (isLocal ? '' : ' domain=' + domain + ';');
  document.cookie = 'googtrans=/en/' + langCode + '; path=/;';
  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    combo.value = langCode;
    combo.dispatchEvent(new Event('change'));
  }
  setTimeout(() => { window.location.reload(); }, 150);
};
