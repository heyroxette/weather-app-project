//display current time
function formatDate(date) {
  let currentDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[currentDay];

  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${day}, ${currentHours}:${currentMinutes}`;
}

let currentDateAndTime = document.querySelector("#date");
let now = new Date();

currentDateAndTime.innerHTML = formatDate(now);

//display current weather forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.getElementById("forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="" width="50" />
      <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-max">${Math.round(
        forecastDay.temp.max
      )}°</span>
      <span class="weather-forecast-temperature-min">${Math.round(
        forecastDay.temp.min
      )}°</span>
    </div>
      </div>
  
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function enterCity(city) {
  let apiKey = "e0346efbac786e6f2f5f0a80627da715";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

function getForecast(coordinates) {
  let apiKey = "e0346efbac786e6f2f5f0a80627da715";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  let temperatureElement = document.getElementById("temperature");
  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
  temperatureElement.innerHTML = `${temperature}`;

  let city = document.getElementById("city");
  city.innerHTML = response.data.name;

  let description = document.getElementById("description");
  description.innerHTML = response.data.weather[0].description;

  let highTempElement = document.getElementById("highest");
  let highTemp = Math.round(response.data.main.temp_max);
  highTempElement.innerHTML = `H: ${highTemp}°`;

  let lowTempElement = document.getElementById("lowest");
  let lowTemp = Math.round(response.data.main.temp_min);
  lowTempElement.innerHTML = `L: ${lowTemp}°`;

  let iconElement = document.getElementById("icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let windSpeedElement = document.getElementById("windspeed");
  let windSpeed = Math.round(response.data.wind.speed);
  windSpeedElement.innerHTML = `Windspeed: ${windSpeed}`;

  getForecast(response.data.coord);
}

function displayWeather(event) {
  event.preventDefault();
  let city = document.getElementById("city");
  let cityInput = document.getElementById("city-input");
  city.innerHTML = cityInput.value;

  enterCity(cityInput.value);
}

let form = document.getElementById("search-form");
form.addEventListener("submit", displayWeather);

//current location geo tag
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e0346efbac786e6f2f5f0a80627da715";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}

function searchGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let geoLocationButton = document.getElementById("geo-tag-button");
geoLocationButton.addEventListener("click", searchGeoLocation);

//convert to fahrenheit

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.getElementById("temperature");
  let degreeElement = document.getElementById("degrees");
  let degreeButton = document.getElementById("degree-button");

  if (event.target.value === "°F") {
    degreeElement.innerHTML = "°F";
    degreeButton.value = "°C";
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  } else if (event.target.value === "°C") {
    degreeElement.innerHTML = "°C";
    degreeButton.value = "°F";
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
}

let fahrenheitButton = document.getElementById("degree-button");
fahrenheitButton.addEventListener("click", convertToFahrenheit);

let celsiusTemperature = null;

enterCity("Toronto");
