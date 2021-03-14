//Display the current date and time
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${now.getHours()}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${now.getMinutes()}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

let dateTime = document.querySelector("#date-and-time");
dateTime.innerHTML = `${day}, ${month} ${date}, ${year} at ${hour}:${minutes} GMT+1`;

//Display the submitted city
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
let apiKey = "e0f9cf2497fe0ed03d06e212d42c8fba";

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-weather");
  let city = document.querySelector("#city");
  if (cityInput.value) {
    city.innerHTML = `${cityInput.value}`;
    axios
      .get(`${apiUrl}q=${cityInput.value}&appid=${apiKey}&units=metric`)
      .then(showCelsius);
  } else {
    city.innerHTML = null;
    alert(`Please enter a city to get its weather`);
  }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

//Display temperature in Celsius and Fahrenheit

//function showCelsius(event){
// event.preventDefault();
//let temperature=temperature.innerHTML;
//temperature=Number(temperature);
//temperature.innerHTML=Math.round((fahrenheitTemp-32)*5/9);}
//function showFahrenheit(event){
// event.preventDefault();
//let temperature=temperature.innerHTML
//temperature=Number(temperature);
//temperature.innerHTML=Math.round((temperature*9)/5+32);}

//let celsiusLink=document.querySelector("#celsius");
//celsiusLink.addEventListener=("click",showCelsius);

//let fahrenheitLink=document.querySelector("#fahrenheit");
//fahrenheitLink.addEventListener=("click",showFahrenheit);

//celsiusTemp.innerHTML=Math.round((fahrenheitTemp-32)*5/9)
//celsiusTemp.innerHTML= number(Math.round(celsiusTemp*9/5)+32);

function showCelsius(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrieveCurrentCity);
}
function retrieveCurrentCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  axios
    .get(
      `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    )
    .then(showCurrentTemperature);
}

function showCurrentTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
}

let currentLocation = document.querySelector("#current-location-weather");
currentLocation.addEventListener("click", getCurrentPosition);
