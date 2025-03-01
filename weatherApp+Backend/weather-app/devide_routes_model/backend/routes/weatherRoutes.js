const express = require('express');
const axios = require('axios');
const Weather = require('../models/weather');
const router = express.Router();

// Get OpenWeather API key from environment variables
const apiKey = process.env.OPENWEATHER_API_KEY;

// Weather data route
router.get('/:city', async (req, res) => {
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

module.exports = router;
