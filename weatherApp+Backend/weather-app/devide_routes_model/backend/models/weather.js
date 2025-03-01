const mongoose = require('mongoose');

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

module.exports = Weather;
