const SalonProfile = require('../models/SalonProfile');

const salonController = {
  getAllSalons: async (req, res) => {
    try {
      // First, delete all existing salons for testing
      await SalonProfile.deleteMany({});
      
      // Create test salons
      const testSalons = [
        {
          salonName: "Beauty Salon 1",
          ownerName: "John Doe",
          email: "salon1@example.com",
          phone: "123-456-7890",
          address: "123 Main St, City",
          description: "Luxury beauty salon offering premium services",
          services: [
            {
              serviceName: "Haircut",
              price: 50,
              duration: "45 min"
            },
            {
              serviceName: "Manicure",
              price: 30,
              duration: "30 min"
            },
            {
              serviceName: "Pedicure",
              price: 35,
              duration: "45 min"
            }
          ],
          workingHours: {
            monday: { open: "09:00", close: "18:00" },
            tuesday: { open: "09:00", close: "18:00" },
            wednesday: { open: "09:00", close: "18:00" },
            thursday: { open: "09:00", close: "18:00" },
            friday: { open: "09:00", close: "18:00" },
            saturday: { open: "10:00", close: "16:00" },
            sunday: { open: "Closed", close: "Closed" }
          }
        },
        {
          salonName: "Glamour Studio",
          ownerName: "Jane Smith",
          email: "salon2@example.com",
          phone: "987-654-3210",
          address: "456 Oak St, Town",
          description: "Modern salon specializing in hair and nail care",
          services: [
            {
              serviceName: "Hair Coloring",
              price: 80,
              duration: "90 min"
            },
            {
              serviceName: "Hair Styling",
              price: 45,
              duration: "45 min"
            },
            {
              serviceName: "Facial",
              price: 60,
              duration: "60 min"
            }
          ],
          workingHours: {
            monday: { open: "10:00", close: "19:00" },
            tuesday: { open: "10:00", close: "19:00" },
            wednesday: { open: "10:00", close: "19:00" },
            thursday: { open: "10:00", close: "19:00" },
            friday: { open: "10:00", close: "19:00" },
            saturday: { open: "09:00", close: "17:00" },
            sunday: { open: "Closed", close: "Closed" }
          }
        }
      ];

      // Insert test salons
      await SalonProfile.insertMany(testSalons);
      
      // Fetch all salons
      const salons = await SalonProfile.find({});
      console.log("Sending salons:", salons);
      res.status(200).json(salons);
    } catch (error) {
      console.error("Error in getAllSalons:", error);
      res.status(500).json({ 
        message: "Error fetching salons", 
        error: error.message 
      });
    }
  },

  deleteAllSalons: async (req, res) => {
    try {
      await SalonProfile.deleteMany({});
      res.status(200).json({ message: "All salons deleted successfully" });
    } catch (error) {
      console.error("Error deleting salons:", error);
      res.status(500).json({ 
        message: "Error deleting salons", 
        error: error.message 
      });
    }
  }
};

module.exports = salonController; 