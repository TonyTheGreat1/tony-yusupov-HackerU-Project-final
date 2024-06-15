const container = document.querySelector(".container ");
const inpuCity = document.querySelector(".inpuCity");
const Weather = document.querySelector(".Weather");
const apiKey = "e4d1d16b01ea8b28eed340e1db29644c";




container.addEventListener("submit", async event => {



    event.preventDefault();

    const city = inpuCity.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }

        catch (error) {
            console.error(error);
            displayError(error);
        }
    }

    else {
        displayError("Please enter a city");
    }

});


async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}



function displayWeatherInfo(data) {
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;

    Weather.textContent = "";
    Weather.style.display = "flex";



    const display = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descriptionDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");



    display.textContent = city;

    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;

    humidityDisplay.textContent = `Humidity: ${humidity}%`;

    descriptionDisplay.textContent = description;

    weatherEmoji.textContent = getWeatherEmoji(id);

    display.classList.add("cityDisplay");

    tempDisplay.classList.add("tempDisplay");

    humidityDisplay.classList.add("humidityDisplay");

    descriptionDisplay.classList.add("descDisplay");

    weatherEmoji.classList.add("weatherEmoji");

    Weather.appendChild(display);
    Weather.appendChild(tempDisplay);
    Weather.appendChild(humidityDisplay);
    Weather.appendChild(descriptionDisplay);
    Weather.appendChild(weatherEmoji);

}



function getWeatherEmoji(weatherId) {

    switch (true) {
        case (weatherId >= 200 && weatherId < 300):

            return '⚡';

        case (weatherId >= 300 && weatherId < 400):

            return "💧";

        case (weatherId >= 500 && weatherId < 600):

            return "💧";

        case (weatherId >= 600 && weatherId < 700):

            return "⛄";

        case (weatherId >= 700 && weatherId < 800):

            return "💨";

        case (weatherId === 800):

            return "🌞"


        case (weatherId >= 801 && weatherId < 810):

            return "🌞"

    }

}



function displayError(message) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");


    Weather.textContent = "";
    Weather.style.display = "flex";
    Weather.appendChild(errorDisplay);

}