const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // For accessing .env file
const weatherRoutes = require('./routes/weatherRoutes'); // Import weather routes

const app = express();
const port = 5000;

// Enable CORS (Cross-Origin Resource Sharing) to allow the frontend to access the backend
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// MongoDB connection URI from .env file
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Use weather routes
app.use('/api/weather', weatherRoutes);

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
