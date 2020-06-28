// KELVIN measurement
const KELVIN = 273;

// HTML elements
const notificationElement = document.querySelector('.notification');
const iconElement = document.querySelector('.weather-icon');
const temperatureElement = document.querySelector('.temperature-value p');
const descriptionElement = document.querySelector('.temperature-description p');
const locationElementElement = document.querySelector('.location p');

// weather object
var weather = {};

weather.temperature = {
    unit: 'celsius',
};

//convert fahrenheit to celsius
function fahrenheitToCelcius(temperature) {
    return (temperature - 32) * (5 / 9);
}

// convert celsius to fahrenhiet
function celsiusToFahrenheit(temperature) {
    return temperature * (9 / 5) + 32;
}

temperatureElement.addEventListener('click', () => {
    if (weather.temperature.unit === undefined) {
        return;
    }
    // weather unit converts from celcius to fahrenhiet when clicked
    if (weather.temperature.unit === 'celsius') {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        temperatureElement.innerHTML = `${fahrenheit}° <span>F</span>`;
        weather.temperature.unit = 'fahrenheit';
    } else {
        // weather unit remains celsius
        temperatureElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
        weather.temperature.unit = 'celsius';
    }
});

function errorMessage(error) {
    notification.style.display = 'block';
    notification.innerHTML = `<p> ${error.message} </p>`;
}

navigator.geolocation.getCurrentPosition((position) => {
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            setWeatherData(data, place.formatted_address);
        });
}, errorMessage);
