// today weather visual
function todayWeatherVisual(response) {
  let todayWeatherVisual = document.querySelector("#todayWeatherVisual");
  todayWeatherVisual.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
// today weather visual

// user location START
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}
function myLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "7633347349ec94a368e4a15d93744b30";
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(cityTemp);
}
//user location END

// additional weather data START
function additionalWeatherData(response) {
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}`;
  let feel = document.querySelector("#feel");
  feel.innerHTML = `${Math.round(response.data.main.feels_like)}`;
  let weatherDescription = document.querySelector(".weatherDescription");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;
}
// additional weather data END

// user city START
function myCity(response) {
  let city = document.querySelector(".city");
  let myCity = response.data.name;
  city.innerHTML = `${myCity}`;
  myCountry(response);
}
// user city END

//user country START
function myCountry(response) {
  let country = document.querySelector("#country");
  let myCountry = response.data.sys.country;
  country.innerHTML = `${myCountry}`;
}
//user country END
let myLocationBtn = document.querySelector("#myLocation");
myLocationBtn.addEventListener("click", getLocation);

//search engine
//update city START
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchInput");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;
  findCity(searchInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
//update city END
//find city START
function findCity(city) {
  let apiKey = "7633347349ec94a368e4a15d93744b30";
  let units = "metric";
  let cityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(cityApiUrl).then(cityTemp);
}
//find city END
//search engine

// city temp START
function cityTemp(response) {
  myCountry(response);
  additionalWeatherData(response);
  todayWeatherVisual(response);
  myCity(response);

  let tempLow = Math.round(response.data.main.temp_min);
  let tempHigh = Math.round(response.data.main.temp_max);
  let todayTempHigh = document.querySelector("#todayTempHigh");
  let todayTempLow = document.querySelector("#todayTempLow");
  todayTempHigh.innerHTML = `${tempHigh}`;
  todayTempLow.innerHTML = `${tempLow}`;
  celsiusTemperatureHigh = response.data.main.temp_max;
  celsiusTemperatureLow = response.data.main.temp_min;
}
// city temp END

// current date START
//date preset START
let now = new Date();
//date preset END

//Today (of Week) START
function formatToday(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let updateToday = days[date.getDay()];
  let today = document.querySelector("#today");
  today.innerHTML = `${updateToday}`;
}
formatToday(now);
//Today (of Week) END

//month START
let todayMonth = now.getMonth();
let currentMonth = todayMonth + 1;
let monthDate = document.querySelector("#todayMonth");
monthDate.innerHTML = `${currentMonth}`;
//month END

//day(of month) START
let todayDate = now.getDate();
let dayDate = document.querySelector("#todayDay");
dayDate.innerHTML = `${todayDate}`;
//day(of month) END

//hour START
let hours = now.getHours();
let todayHour = document.querySelector("#hours");
if (hours < 10) {
  hours = `0${hours}`;
}
todayHour.innerHTML = `${hours}`;
//hour END

//minute START
let minutes = now.getMinutes();
let todayMinutes = document.querySelector("#minutes");
if (minutes < 10) {
  minutes = `0${minutes}`;
}
todayMinutes.innerHTML = `${minutes}`;
//minute END
// current date END

//temperature/unit measure
// imperial
function changeUnitImperial(event) {
  event.preventDefault();
  let units = document.querySelectorAll(".unit");
  units.forEach(function (unit) {
    unit.innerHTML = "F";
  });
  let unitsPerHour = document.querySelectorAll(".unitsPerHour");
  unitsPerHour.forEach(function (uph) {
    uph.innerHTML = "mph";
  });
  //in progress
  let todayTempLow = document.querySelector(".todayTempLow");
  let tempFLow = (celsiusTemperatureLow * 9) / 5 + 32;
  todayTempLow.innerHTML = Math.round(tempFLow);

  let todayTempHigh = document.querySelector(".todayTempHigh");
  let tempFHigh = (celsiusTemperatureHigh * 9) / 5 + 32;
  todayTempHigh.innerHTML = Math.round(tempFHigh);

  //in progress
}
let imperialMeasureButton = document.querySelector("#imperialButton");
imperialMeasureButton.addEventListener("click", changeUnitImperial);
// imperial

// metric
function changeUnitMetric(event) {
  event.preventDefault();
  let units = document.querySelectorAll(".unit");
  units.forEach(function (unit) {
    unit.innerHTML = "C";
  });
  let unitsPerHour = document.querySelectorAll(".unitsPerHour");
  unitsPerHour.forEach(function (uph) {
    uph.innerHTML = "kph";
  });
  // in progress

  let todayTempLow = document.querySelector(".todayTempLow");
  todayTempLow.innerHTML = Math.round(celsiusTemperatureLow);

  let todayTempHigh = document.querySelector(".todayTempHigh");
  todayTempHigh.innerHTML = Math.round(celsiusTemperatureHigh);

  // in progress
}
let metricMeasureButton = document.querySelector("#metricButton");
metricMeasureButton.addEventListener("click", changeUnitMetric);
// metric
let celsiusTemperatureHigh = null;
let celsiusTemperatureLow = null;

//temperature/unit measure
findCity("chamonix");
