const express = require('express');
const router = express.Router();
const salonController = require('../controllers/salonController');

router.get('/salons', salonController.getAllSalons);
router.delete('/salons', salonController.deleteAllSalons);

module.exports = router; 