document .addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityNameDisplay = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const descriptionDisplay = document.getElementById('description');
    const errorMessage = document.getElementById('error-message')

    

    
    getWeatherBtn.addEventListener('click', async() => {
        const city = cityInput.value.trim();
        if (!city) {
            errorMessage.textContent = 'Please enter a city name.';
            return;
        }
        try{
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
            
        }
        catch(error){
            showError(error.message);
        }

});
    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        console.log(typeof response);
        console.log("Response:", response);
        if (!response.ok) {
            throw new Error('City not found. Please check the city name and try again.');
        }
        const data = await response.json();
        return data;
    }
    function displayWeatherData(data) {
        console.log("Weather Data:", data);
        const{ name, main, weather } = data;
        cityNameDisplay.textContent = `City: ${name}`;
        temperatureDisplay.textContent = `Temperature: ${main.temp} °C`;
        descriptionDisplay.textContent = `Description: ${weather[0].description}`;
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
    }
});