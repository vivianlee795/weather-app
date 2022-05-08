let apiKey = "de5507af058a16c4d9e7966c8f37f3fd";
let unit = "imperial";
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

// function getTempUnit() {
//   let currentUnit = document.querySelector("#currentUnit");
//   if (currentUnit.innerHTML === "F") {
//     return "imperial";
//   } else {
//     return "metric";
//   }
// }
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
  cityName = response.data.name;
  updateTemp(currentTemp);
  changeLocation();
}
function updateTemp(temp) {
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${temp}`;
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showResponse);
  let currentUnit = document.querySelector("#currentUnit");
  currentUnit.innerHTML = "C";
}
function displayFahrenheit(event) {
  event.preventDefault;
  unit = "imperial";
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
// function convertFromCToF(event) {
//   event.preventDefault();
//   let currentUnit = document.querySelector("#currentUnit");
//   if (currentUnit.innerHTML === "C") {
//     currentUnit.innerHTML = "F";
//     currentTemp.innerHTML = Math.round((currentTemp.innerHTML * 9) / 5 + 32);
//   }
// }
// function convertFromFToC(event) {
//   event.preventDefault();
//   let currentUnit = document.querySelector("#currentUnit");
//   let currentTemp = document.querySelector("#currentTemp");
//   if (currentUnit.innerHTML === "F") {
//     currentUnit.innerHTML = "C";
//     currentTemp.innerHTML = Math.round(((currentTemp.innerHTML - 32) * 5) / 9);
//   }
// }
