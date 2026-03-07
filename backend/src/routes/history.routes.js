const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware.authUser, historyController.addToHistory);
router.get('/', authMiddleware.authUser, historyController.getHistory);

module.exports = router;
