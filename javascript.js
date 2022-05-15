let apiKey = "de5507af058a16c4d9e7966c8f37f3fd";
let unit = "imperial";
let windSpeedUnit = "mph";
let cityName;

function formatDate(current) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[current.getDay()];
  let hour = current.getHours();
  let ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12;
  hour = hour ? hour : 12;
  let minutes = String(current.getMinutes()).padStart(2, "0");
  let currentDate = `${day}, ${hour}:${minutes} ${ampm.toUpperCase()}`;
  return currentDate;
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showResponse);
}
function search(event) {
  event.preventDefault();
  cityName = document.querySelector("#search").value;
  document.querySelector("#search").value = null;
  getLocation();
}
function getLocation() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showResponse);
}
function showResponse(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let icon = response.data.weather[0].icon;
  let weatherDesciption = response.data.weather[0].description;
  let windSpeed = Math.round(response.data.wind.speed);
  cityName = response.data.name;
  updateTemp(currentTemp);
  updateWeatherIcon(icon);
  updateWeatherDescription(weatherDesciption);
  updateWindSpeed(windSpeed);
  changeLocation();
  getForecast(response.data.coord);
}

function getForecast(position) {
  let latitude = position.lat;
  let longitude = position.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = response.data.daily;
  days.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
          <div id="day">${formatForecastDay(day.dt)}</div>
          <img id="forecastIcon" src="http://openweathermap.org/img/wn/${
            day.weather[0].icon
          }.png"/>
          <div id="forecastTemp">
            <span id="minimum">${Math.round(
              day.temp.min
            )}</span>&nbsp;&nbsp;&nbsp;<span id="maximum">${Math.round(
          day.temp.max
        )}</span>
          </div>
         
        </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function updateTemp(temp) {
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${temp}`;
}
function updateWeatherIcon(icon) {
  let weatherIconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", weatherIconUrl);
}
function updateWeatherDescription(description) {
  let currentWeatherDescription = document.querySelector("#weatherDescription");
  currentWeatherDescription.innerHTML = `${description}`;
}
function updateWindSpeed(speed) {
  let currentWindSpeed = document.querySelector("#windSpeed");
  currentWindSpeed.innerHTML = `${speed} ${windSpeedUnit}`;
}
function changeLocation() {
  let currentLocation = document.querySelector("#location");
  currentLocation.innerHTML = `${cityName}`;
}
function getCurrentLocation(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(getPosition);
}
function displayCelsius(event) {
  event.preventDefault;
  unit = "metric";
  windSpeedUnit = "m/s";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showResponse);
  let currentUnit = document.querySelector("#currentUnit");
  currentUnit.innerHTML = "C";
}
function displayFahrenheit(event) {
  event.preventDefault;
  unit = "imperial";
  windSpeedUnit = "mph";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showResponse);
  let currentUnit = document.querySelector("#currentUnit");
  currentUnit.innerHTML = "F";
}

let date = document.querySelector("#date");
date.innerHTML = formatDate(new Date());

let form = document.querySelector("form");
form.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#currentLocationEmoji");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);

navigator.geolocation.getCurrentPosition(getPosition);
