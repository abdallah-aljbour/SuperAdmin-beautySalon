require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const salonOwnerRoutes = require('./routes/salonOwnerRoutes');
const salonRoutes = require('./routes/salonRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

// Allow all origins in development
app.use(cors());

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Routes
app.use('/api', userRoutes);
app.use('/api', salonOwnerRoutes);
app.use('/api', salonRoutes);
app.use('/api', messageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});
