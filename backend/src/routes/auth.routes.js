const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/get-me', authController.getMe);
router.get('/logout', authController.logoutUser);
router.patch('/update-me', authMiddleware.authUser, authController.updateUser);

module.exports = router;
