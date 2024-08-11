document.addEventListener("DOMContentLoaded", function () {
    const cityInput = document.getElementById("cityInput");
    const searchButton = document.getElementById("searchButton");
    const resultContainer = document.getElementById("resultContainer");
    const errorMessage = document.getElementById("errorMessage");

    searchButton.addEventListener("click", async function () {
        const city = cityInput.value.trim();
        if (!city) return;

        const apiKey = 'TFGRXQFFYYBVQ7KK4BC9ELPLK'; // Replace with your actual API key
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.currentConditions) {
                const weather = data.currentConditions;
                resultContainer.innerHTML = `
                    <h2 class="text-2xl font-semibold">${city}</h2>
                    <p class="text-lg">Weather: ${weather.conditions}</p>
                    <p class="text-lg">Temperature: ${weather.temp}°C</p>
                    <p class="text-lg">Humidity: ${weather.humidity}%</p>
                `;
                errorMessage.textContent = '';
            } else {
                resultContainer.innerHTML = '';
                errorMessage.textContent = 'No data found for this city.';
            }
        } catch (err) {
            resultContainer.innerHTML = '';
            errorMessage.textContent = 'Failed to fetch weather data.';
        }
    });
});
