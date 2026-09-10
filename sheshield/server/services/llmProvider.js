class LLMProvider {
  async extractProfile(text) {
    const lower = text.toLowerCase();
    const ageMatch = text.match(/\b(\d{2})\b/);
    return {
      age: ageMatch ? parseInt(ageMatch[1], 10) : 21,
      state: lower.includes('delhi') ? 'Delhi' : 'Maharashtra',
      occupation: lower.includes('business') ? 'Self-Employed' : 'Student'
    };
  }
}

module.exports = new LLMProvider();
