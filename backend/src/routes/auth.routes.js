const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Initialize router
const router = Router();

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
router.post('/register', authController.registerUser);

/**
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 */
router.post('/login', authController.loginUser);

/**
 * @desc Get current user
 * @route GET /api/auth/get-me
 * @access Public (Self-verifying)
 */
router.get('/get-me', authController.getMe);

/**
 * @desc Logout a user
 * @route POST /api/auth/logout
 * @access Private
 */
router.get('/logout', authController.logoutUser);

module.exports = router;
