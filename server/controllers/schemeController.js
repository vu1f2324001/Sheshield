const Scheme = require('../models/Scheme');
const { evaluateEligibility } = require('../services/reasoningEngine');

exports.matchSchemes = async (req, res, next) => {
  try {
    const profile = req.body.profile || {};
    const schemes = await Scheme.find({});
    const matches = schemes.map(s => ({
      scheme: s,
      evaluation: evaluateEligibility(profile, s)
    }));
    res.json({ success: true, count: matches.length, data: matches });
  } catch (err) {
    next(err);
  }
};
