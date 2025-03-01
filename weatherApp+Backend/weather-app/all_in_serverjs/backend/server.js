const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // For accessing .env file

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

// Weather schema (defines how weather data will be stored in MongoDB)
const weatherSchema = new mongoose.Schema({
    city: String,
    temperature: Number,
    description: String,
    humidity: Number,
    windSpeed: Number,
    icon: String,
    fetchedAt: { type: Date, default: Date.now },
});

// Weather model (this will create a collection in MongoDB)
const Weather = mongoose.model('Weather', weatherSchema);

// Get OpenWeather API key from environment variables
const apiKey = process.env.OPENWEATHER_API_KEY;

// Weather data route
app.get('/api/weather/:city', async (req, res) => {
    const city = req.params.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        // Fetch weather data from OpenWeatherMap API
        const response = await axios.get(url);
        const data = response.data;

        if (data.cod === 200) {
            // Create a new weather document and save it to MongoDB
            const weatherData = new Weather({
                city: city,
                temperature: data.main.temp,
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
            });

            await weatherData.save(); // Save weather data in MongoDB

            // Send the weather data back in the response
            res.json(weatherData);
        } else {
            res.status(400).json({ message: data.message });
        }
    } catch (error) {
        // If there's an error fetching the data, return a 500 status code
        res.status(500).json({ message: 'Error fetching weather data from OpenWeatherMap API' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
