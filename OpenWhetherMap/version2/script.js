const apiKey = "731c0427729c3d80e82400ebaa14fde8"; // Your API key

function getWeather() {
    let city = document.getElementById("country").value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let resultDiv = document.getElementById("result");
            if (data.cod === 200) {
                let temp = data.main.temp;
                let weatherDescription = data.weather[0].description;
                let humidity = data.main.humidity;
                let windSpeed = data.wind.speed;
                let icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

                resultDiv.style.display = "block";
                resultDiv.innerHTML = `
                    <div class="weather-info">
                        <img src="${icon}" alt="${weatherDescription}" />
                        <p><strong>Temperature:</strong> ${temp}°C</p>
                        <p><strong>Weather:</strong> ${weatherDescription}</p>
                        <p><strong>Humidity:</strong> ${humidity}%</p>
                        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                    </div>
                `;
            } else {
                resultDiv.style.display = "block";
                resultDiv.innerHTML = `<p id="error">❌ Error: ${data.message}</p>`;
            }
        })
        .catch(error => {
            document.getElementById("result").style.display = "block";
            document.getElementById("result").innerHTML = `<p id="error">❌ Error fetching data</p>`;
            console.error(error);
        });
}
