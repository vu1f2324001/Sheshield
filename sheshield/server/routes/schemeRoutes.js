const express = require('express');
const router = express.Router();
const schemeController = require('../controllers/schemeController');

router.post('/match', schemeController.matchSchemes);

module.exports = router;
