function getWeather() {
    const city = document.getElementById("country").value;
    const url = `http://localhost:5000/api/weather/${city}`; // API request to the backend

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.city) {
                document.getElementById("result").innerHTML = `
                    🌡️ Temperature in ${data.city}: <strong>${data.temperature}°C</strong><br>
                    Weather: ${data.description}<br>
                    Humidity: ${data.humidity}%<br>
                    Wind Speed: ${data.windSpeed} m/s
                `;
            } else {
                document.getElementById("result").innerHTML = `❌ Error: ${data.message}`;
            }
        })
        .catch(error => {
            document.getElementById("result").innerHTML = `❌ Error fetching data`;
            console.error(error);
        });
}
