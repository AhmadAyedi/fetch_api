const apiKey = "731c0427729c3d80e82400ebaa14fde8"; // Your API key

function getWeather() {
    let city = document.getElementById("country").value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                let temp = data.main.temp;
                document.getElementById("result").innerHTML = `🌡️ Temperature in ${city}: <strong>${temp}°C</strong>`;
            } else {
                document.getElementById("result").innerHTML = `❌ Error: ${data.message}`;
            }
        })
        .catch(error => {
            document.getElementById("result").innerHTML = `❌ Error fetching data`;
            console.error(error);
        });
}
