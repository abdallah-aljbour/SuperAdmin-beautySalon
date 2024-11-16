const SalonProfile = require('../models/SalonProfile');

const salonController = {
  getAllSalons: async (req, res) => {
    try {
      console.log("Attempting to fetch salons...");
      
      const salons = await SalonProfile.find({});
      console.log("Raw salons data:", salons);

      if (!salons || salons.length === 0) {
        console.log("No salons found in database");
        return res.status(200).json({ message: "No salons found in the database" });
      }

      console.log(`Found ${salons.length} salons`);
      res.status(200).json(salons);
      
    } catch (error) {
      console.error("Error in getAllSalons:", error);
      res.status(500).json({ 
        message: "Error fetching salons", 
        error: error.message,
        stack: error.stack
      });
    }
  },

  checkConnection: async (req, res) => {
    try {
      await SalonProfile.db.collection('salonprofiles').stats();
      res.status(200).json({ message: "Database connection successful" });
    } catch (error) {
      console.error("Database connection error:", error);
      res.status(500).json({ 
        message: "Database connection error", 
        error: error.message 
      });
    }
  }
};

module.exports = salonController; 