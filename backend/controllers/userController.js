const User = require("../models/User");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}).select("-password");
      console.log("Found users:", users);

      if (users.length === 0) {
        const testUsers = [
          {
            username: "customer1",
            email: "customer1@example.com",
            password: "password123",
            role: "customer",
          },
          {
            username: "salonowner1",
            email: "owner1@example.com",
            password: "password123",
            role: "salon_owner",
            salonName: "Beauty Salon 1"
          },
          {
            username: "salonowner2",
            email: "owner2@example.com",
            password: "password123",
            role: "salon_owner",
            salonName: "Glamour Studio"
          },
          {
            username: "admin1",
            email: "admin1@example.com",
            password: "password123",
            role: "admin",
          },
        ];

        await User.insertMany(testUsers);
        const newUsers = await User.find({}).select("-password");
        return res.status(200).json(newUsers);
      }

      res.status(200).json(users);
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      res
        .status(500)
        .json({ message: "Error fetching users", error: error.message });
    }
  },

  addTestUser: async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = new User({
        username: req.body.username || "testuser",
        email: req.body.email || "test@example.com",
        password: req.body.password || "password123",
        role: req.body.role || "customer",
        salonName: req.body.salonName
      });

      await user.save();
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ message: "Error creating user", error: error.message });
    }
  },

  deleteAllUsers: async (req, res) => {
    try {
      await User.deleteMany({});
      res.status(200).json({ message: "All users deleted successfully" });
    } catch (error) {
      console.error("Error deleting users:", error);
      res
        .status(500)
        .json({ message: "Error deleting users", error: error.message });
    }
  },
};

module.exports = userController;
