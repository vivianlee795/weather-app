let apiKey = "de5507af058a16c4d9e7966c8f37f3fd";

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

function getTempUnit() {
  let currentUnit = document.querySelector("#currentUnit");
  if (currentUnit.innerHTML === "F") {
    return "imperial";
  } else {
    return "metric";
  }
}
function getPosition(position) {
  let units = getTempUnit();
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showResponse);
}
function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search").value;
  getLocation(input);
}
function getLocation(cityName) {
  let units = getTempUnit();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showResponse);
}
function showResponse(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentLocation = response.data.name;
  changeTemp(currentTemp);
  changeLocation(currentLocation);
}
function changeTemp(temp) {
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${temp}`;
}
function changeLocation(location) {
  let currentLocation = document.querySelector("#location");
  currentLocation.innerHTML = `${location}`;
}
function getCurrentLocation(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(getPosition);
}

let date = document.querySelector("#date");
date.innerHTML = formatDate(new Date());
let form = document.querySelector("form");
form.addEventListener("submit", search);
let currentLocationButton = document.querySelector("#currentLocationEmoji");
currentLocationButton.addEventListener("click", getCurrentLocation);

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
// let celsius = document.querySelector("#celsius");
// celsius.addEventListener("click", convertFromFToC);
// let fahrenheit = document.querySelector("#fahrenheit");
// fahrenheit.addEventListener("click", convertFromCToF);
