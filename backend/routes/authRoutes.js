const express = require('express');
const router = express.Router();
const { register, login, getProfile, changePassword } = require('../controllers/authController');
const { registerValidator, loginValidator, changePasswordValidator } = require('../validators/authValidator');
const validate = require('../middleware/validateMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, registerValidator, validate, register);
router.post('/login', authLimiter, loginValidator, validate, login);
router.get('/profile', protect, getProfile);
router.put('/change-password', protect, changePasswordValidator, validate, changePassword);

module.exports = router;
