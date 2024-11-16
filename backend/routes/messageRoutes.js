const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/messages', messageController.getAllMessages);
router.patch('/messages/:id/status', messageController.updateMessageStatus);

module.exports = router; 