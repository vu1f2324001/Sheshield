const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/parse', aiController.parseProfile);

module.exports = router;
