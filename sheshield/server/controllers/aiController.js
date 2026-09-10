const llmProvider = require('../services/llmProvider');

exports.parseProfile = async (req, res, next) => {
  try {
    const { text } = req.body;
    const extracted = await llmProvider.extractProfile(text || '');
    res.json({ success: true, profile: extracted });
  } catch (err) {
    next(err);
  }
};
