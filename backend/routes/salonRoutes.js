const express = require('express');
const router = express.Router();
const salonController = require('../controllers/salonController');

router.get('/salons', salonController.getAllSalons);
router.get('/check-db', salonController.checkConnection);

module.exports = router; 