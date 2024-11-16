const Contact = require('../models/Contact');

const messageController = {
  getAllMessages: async (req, res) => {
    try {
      const messages = await Contact.find({}).sort({ createdAt: -1 });
      console.log("Found messages:", messages);

      if (messages.length === 0) {
        const testMessages = [
          {
            name: "John Smith",
            email: "john@example.com",
            subject: "Booking Inquiry",
            message: "I would like to book an appointment for next week.",
            status: "unread"
          },
          {
            name: "Sarah Johnson",
            email: "sarah@example.com",
            subject: "Service Question",
            message: "Do you offer hair coloring services?",
            status: "read"
          },
          {
            name: "Mike Wilson",
            email: "mike@example.com",
            subject: "Price Inquiry",
            message: "What are your prices for a basic haircut?",
            status: "unread"
          }
        ];

        await Contact.insertMany(testMessages);
        const newMessages = await Contact.find({}).sort({ createdAt: -1 });
        console.log("Created test messages:", newMessages);
        return res.status(200).json(newMessages);
      }

      res.status(200).json(messages);
    } catch (error) {
      console.error("Error in getAllMessages:", error);
      res.status(500).json({ message: "Error fetching messages", error: error.message });
    }
  },

  updateMessageStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const message = await Contact.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }

      res.status(200).json(message);
    } catch (error) {
      console.error("Error updating message status:", error);
      res.status(500).json({ message: "Error updating message status", error: error.message });
    }
  }
};

module.exports = messageController; 