// KELVIN measurement
const KELVIN = 273;

// HTML elements
const notificationElement = document.querySelector('.notification');
const iconElement = document.querySelector('.weather-icon');
const temperatureElement = document.querySelector('.temperature-value p');
const descriptionElement = document.querySelector('.temperature-description p');
const locationElementElement = document.querySelector('.location p');
const searchBarElement = document.querySelector('.search-bar');
const searchBoxElement = new google.maps.places.SearchBox(searchBarElement);

// weather object
var weather = {
    temperature: {
        unit: 'celsius',
    },
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

function capitalizeEachWord(str) {
    const words = [];

    for (let word of str.split(' ')) {
        words.push(word[0].toUpperCase() + word.slice(1));
    }

    return words.join(' ');
}

function displayWeather() {
    iconElement.innerHTML = `<img src= "icons/${weather.iconID}.img">`;
    temperatureElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    descriptionElement.innerHTML = weather.description;
    locationElementElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// getting user location
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
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = capitalizeEachWord(
                data.weather[0].description
            );
            weather.iconID = data.weather[0].icon;
        })
        .then(() => {
            displayWeather();
        });
}, errorMessage);

// retrieve location from google places APi
searchBoxElement.addListener('places_changed', () => {
    const location = searchBoxElement.getPlaces()[0];

    if (location == null) return;

    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            latitude: location.geometry.location.lat(),
            longitude: location.geometry.location.lng(),
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = capitalizeEachWord(
                data.weather[0].description
            );
            weather.iconID = data.weather[0].icon;
        })
        .then(() => {
            displayWeather();
        });
});
