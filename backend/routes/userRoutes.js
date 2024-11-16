const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users route
router.get('/users', userController.getAllUsers);

// Add a single test user
router.post('/users', userController.addTestUser);

// Delete all users (be careful with this in production!)
router.delete('/users', userController.deleteAllUsers);

module.exports = router; 