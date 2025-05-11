const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router(); // ✅ Use express.Router() properly

// Authentication Routes
router.post('/user-register', authController.user_register);
router.post('/user-login', authController.user_login);

module.exports = router;
