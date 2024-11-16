const express = require('express');
const router = express.Router();
const salonOwnerController = require('../controllers/salonOwnerController');

router.get('/salon-owners', salonOwnerController.getAllSalonOwners);

module.exports = router; 