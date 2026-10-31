const express = require('express');
const router = express.Router();

const otpController = require('../controllers/otpController');

// Signup OTP
router.post('/signup/send', otpController.requestSignupOTP);
router.post('/signup/verify', otpController.verifySignupOTP);

// Forgot Password OTP
router.post('/reset/send', otpController.requestResetOTP);
router.post('/reset/verify', otpController.resetPassword);

module.exports = router;