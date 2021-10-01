function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

function myLocation(position) {
  //console.log(position);
  //console.log(position.coords.latitude);
  //console.log(position.coords.longitude);

  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "7633347349ec94a368e4a15d93744b30";
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(myTemp);
}

function myTemp(response) {
  //console.log(response.data);
  let tempLow = Math.round(response.data.main.temp_min);
  let tempHigh = Math.round(response.data.main.temp_max);
  //console.log(tempLow);
  //console.log(tempHigh);
  let todayTempHigh = document.querySelector("#todayTempHigh");
  //console.log(todayTempHigh);
  todayTempHigh.innerHTML = `${tempHigh}`;
  let todayTempLow = document.querySelector("#todayTempLow");
  //console.log(todayTempLow);
  todayTempLow.innerHTML = `${tempLow}`;

  myCity(response);
}
function myCity(response) {
  let city = document.querySelector(".city");
  //console.log(city);
  //console.log(response.data.name);
  let myCity = response.data.name;
  city.innerHTML = `${myCity}`;
  myCountry(response);
}
//user country
function myCountry(response) {
  let country = document.querySelector("#country");
  //console.log(country);
  //console.log(response.data.sys.country);
  let myCountry = response.data.sys.country;
  country.innerHTML = `${myCountry}`;
}
//user country
let myLocationBtn = document.querySelector("#myLocation");
myLocationBtn.addEventListener("click", getLocation);

//search engine
//update city
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchInput");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;
  findCity(searchInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
//update city
//find city
function findCity(city) {
  console.log("I'm working!");
  let apiKey = "7633347349ec94a368e4a15d93744b30";
  let units = "metric";
  let cityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  //How do I console.log the response here, so I can access the data and weather?
  axios.get(cityApiUrl).then(cityTemp);
}
//find city
//update temp
//search engine

// city temp
function cityTemp(temperature) {
  let todayTempHigh = document.querySelector("#todayTempHigh");
  let todayTempLow = document.querySelector("#todayTempLow");
  console.log(todayTempHigh);
  console.log(todayTempLow);
}
// city temp

//In progress above...
//
//
//
//
//
//
//
// current date
//date preset
let now = new Date();
//console.log(now);
//date preset

//Today (of Week)
//console.log(now.getDay());
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
//Today (of Week)

//month
let todayMonth = now.getMonth();
let currentMonth = todayMonth + 1;
let monthDate = document.querySelector("#todayMonth");
monthDate.innerHTML = `${currentMonth}`;
//month

//day(of month)
let todayDate = now.getDate();
let dayDate = document.querySelector("#todayDay");
dayDate.innerHTML = `${todayDate}`;
//day(of month)

//hour
let hours = now.getHours();
let todayHour = document.querySelector("#hours");
if (hours < 10) {
  hours = `0${hours}`;
}
todayHour.innerHTML = `${hours}`;
//hour

//minute
let minutes = now.getMinutes();
let todayMinutes = document.querySelector("#minutes");
if (minutes < 10) {
  minutes = `0${minutes}`;
}
todayMinutes.innerHTML = `${minutes}`;
//minute
// current date

//temperature/unit measure
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
  let tempDegrees = document.querySelectorAll(".tempDegrees");
  tempDegrees.forEach(function (tmepF) {
    tmepF.innerHTML = "66";
  });
}
let imperialMeasureButton = document.querySelector("#imperialButton");
imperialMeasureButton.addEventListener("click", changeUnitImperial);
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
  let tempDegrees = document.querySelectorAll(".tempDegrees");
  tempDegrees.forEach(function (tempC) {
    tempC.innerHTML = "16";
  });
}
let metricMeasureButton = document.querySelector("#metricButton");
metricMeasureButton.addEventListener("click", changeUnitMetric);
//temperature/unit measure
