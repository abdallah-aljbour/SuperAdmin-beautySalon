const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true }
});

const workingHoursSchema = new mongoose.Schema({
  open: { type: String, required: true },
  close: { type: String, required: true }
});

const salonProfileSchema = new mongoose.Schema({
  salonName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  services: [serviceSchema],
  workingHours: {
    monday: workingHoursSchema,
    tuesday: workingHoursSchema,
    wednesday: workingHoursSchema,
    thursday: workingHoursSchema,
    friday: workingHoursSchema,
    saturday: workingHoursSchema,
    sunday: workingHoursSchema
  },
  createdAt: { type: Date, default: Date.now }
});

const SalonProfile = mongoose.model("SalonProfile", salonProfileSchema);

module.exports = SalonProfile;

