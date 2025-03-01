const apiKey = "731c0427729c3d80e82400ebaa14fde8"; // Your API key

function getWeather() {
    const city = document.getElementById("country").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Show loading spinner while fetching data
    document.getElementById("loading").style.display = "block";
    document.getElementById("result").style.display = "none"; // Hide previous results

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("loading").style.display = "none"; // Hide loading spinner
            const resultDiv = document.getElementById("result");

            if (data.cod === 200) {
                const temp = data.main.temp;
                const weatherDescription = data.weather[0].description;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

                resultDiv.style.display = "block";
                resultDiv.innerHTML = `
                    <img src="${icon}" alt="${weatherDescription}" />
                    <p><span>Temperature:</span> ${temp}°C</p>
                    <p><span>Weather:</span> ${weatherDescription}</p>
                    <p><span>Humidity:</span> ${humidity}%</p>
                    <p><span>Wind Speed:</span> ${windSpeed} m/s</p>
                `;
            } else {
                resultDiv.style.display = "block";
                resultDiv.innerHTML = `<p>❌ Error: ${data.message}</p>`;
            }
        })
        .catch(error => {
            document.getElementById("loading").style.display = "none";
            const resultDiv = document.getElementById("result");
            resultDiv.style.display = "block";
            resultDiv.innerHTML = `<p>❌ Error fetching data</p>`;
            console.error(error);
        });
}
