document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        fetchCoordinates(city);
    }
});

function fetchCoordinates(city) {
    const apiKey = ''; 
    const geocodeUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;

    fetch(geocodeUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Directly use the data for current weather
            showWeather(data);
        })
        .catch(error => {
            console.error("Error fetching coordinates:", error);
            document.getElementById('weather-info').innerHTML = `<p>Error fetching weather data. Please check the city name.</p>`;
        });
}
function fetchWeatherData(lat, lon) {
    const apiKey = ''; 
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            showWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById('weather-info').innerHTML = `<p>Error fetching weather data.</p>`;
        });
}

function showWeather(data) {
    const { name, sys, weather, main, wind, clouds } = data; 

    const html = `
        <h2>${name}, ${sys.country}</h2>
        <p><strong>${weather[0].main}</strong> - ${weather[0].description}</p>
        <p>🌡️ Temp: ${(main.temp - 273.15).toFixed(2)}°C</p> <!-- Convert from Kelvin to Celsius -->
        <p>💧 Humidity: ${main.humidity}%</p>
        <p>🌬️ Wind: ${wind.speed} m/s, Direction: ${wind.deg}°</p>
        <p>☁️ Cloud Cover: ${clouds.all}%</p>
        <p>Pressure: ${main.pressure} hPa</p>
    `;

    document.getElementById('weather-info').innerHTML = html;
}