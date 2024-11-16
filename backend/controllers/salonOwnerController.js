const SalonOwner = require('../models/SalonOwner');

const salonOwnerController = {
  getAllSalonOwners: async (req, res) => {
    try {
      const salonOwners = await SalonOwner.find({}).select('-password');
      console.log("Found salon owners:", salonOwners);

      if (salonOwners.length === 0) {
        const testSalonOwners = [
          {
            username: "salonowner1",
            email: "owner1@example.com",
            password: "password123",
            salonName: "Beauty Salon 1",
          },
          {
            username: "salonowner2",
            email: "owner2@example.com",
            password: "password123",
            salonName: "Glamour Studio",
          },
          {
            username: "salonowner3",
            email: "owner3@example.com",
            password: "password123",
            salonName: "Style Hub",
          }
        ];

        await SalonOwner.insertMany(testSalonOwners);
        const newSalonOwners = await SalonOwner.find({}).select('-password');
        return res.status(200).json(newSalonOwners);
      }

      res.status(200).json(salonOwners);
    } catch (error) {
      console.error("Error in getAllSalonOwners:", error);
      res.status(500).json({ message: "Error fetching salon owners", error: error.message });
    }
  }
};

module.exports = salonOwnerController; 