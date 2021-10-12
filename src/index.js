//time
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

//week5

function displayWeather(event) {
  event.preventDefault();
  let city = document.getElementById("city");
  let cityInput = document.getElementById("city-input");
  city.innerHTML = cityInput.value;

  enterCity(cityInput.value);
}

function enterCity(city) {
  let apiKey = "e0346efbac786e6f2f5f0a80627da715";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

function showTemp(response) {
  let temperatureElement = document.getElementById("temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature}`;

  let city = document.getElementById("city");
  city.innerHTML = response.data.name;

  let description = document.getElementById("forecast");
  description.innerHTML = response.data.weather[0].main;

  let highTempElement = document.getElementById("highest");
  let highTemp = Math.round(response.data.main.temp_max);
  highTempElement.innerHTML = `H: ${highTemp}°`;

  let lowTempElement = document.getElementById("lowest");
  let lowTemp = Math.round(response.data.main.temp_min);
  lowTempElement.innerHTML = `L: ${lowTemp}°`;
}

function showPosition(position) {
  console.log(position);
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

let form = document.getElementById("search-form");
form.addEventListener("submit", displayWeather);

let geoLocationButton = document.getElementById("geo-tag-button");
geoLocationButton.addEventListener("click", searchGeoLocation);

enterCity("Toronto");
