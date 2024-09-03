document.getElementById('get-weather').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    const apiKey = '02ad84e25bf2bd2a6d6dfcc14d7381f7'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q={hyderabad}&appid=&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weather = `
                    <h2>${data.name}</h2>
                    <p>${data.weather[0].description}</p>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                `;
                document.getElementById('weather-info').innerHTML = weather;
            } else {
                document.getElementById('weather-info').innerHTML = `<p>City not found. Please try again.</p>`;
            }
        })
        .catch(error => {
            document.getElementById('weather-info').innerHTML = `<p>There was an error fetching the weather data.</p>`;
        });
});
