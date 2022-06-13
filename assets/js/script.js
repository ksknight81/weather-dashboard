// variables
const cityFormEl = document.querySelector("#city-form");
const cityInputEl = document.querySelector("#cityname");
const cityContainerEl = document.querySelector("#city-container");
const citySearchTerm = document.querySelector("#city-search-term");
const currentTempEl = document.getElementById("temperature");
const currentHumidityEl = document.getElementById("humidity");
const currentWindEl = document.getElementById("wind-speed");
const currentUVEl = document.getElementById("UV-index");
const historyEl = document.getElementById("history");
var fiveDayEl = document.getElementById("5-day-forecast");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
const APIKey = "874894e8821d60d8579f2e5276f4e9c8";

// create date object
const currentDate = new Date();
const cDay = currentDate.getDate();
const cMonth = currentDate.getMonth();
const cYear = currentDate.getFullYear();
// set month array
const monthNameList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// change month format from Numeric value to words
let Month = monthNameList[cMonth];

//function for hitting search
var formSubmitHandler = function (event) {
  // prevent from refreshing
  event.preventDefault();

  // get value from input element
  var cityname = cityInputEl.value.trim();

  if (cityname) {
    getCityName(cityname);
    // clear old content
    cityInputEl.value = "";
  } else {
    alert("Please enter a City Name");
  }
};

//function to pull data from weather app site
var getCityName = function (cityname) {
  //format the weather api url
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&appid=" +
    APIKey;
  // make a request to the url
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayCurrent(data, cityname);
        displayForecast(data, cityname);
       // console.log(data);
      });
    } else {
      alert("Error: City is not found");
    }
  });

  // cityname in this case shows the results from the fetch, searchterm is the city entered in the search
  var displayCurrent = function (cityname, searchTerm) {
    // clear old content
    cityContainerEl.textContent = "";
    citySearchTerm.textContent =
      "Today's forecast for " +
      searchTerm +
      ", on " +
      Month +
      " " +
      cDay +
      ", " +
      cYear +
      ":";
    // console.log(cityname);
     console.log(searchTerm);
     console.log(cityname);

    // console.log(response.city);

    for (var i = 0; i < cityContainerEl.length; i++) {
      // format city name
      var cityEl = document.createElement("div");
      cityEl.classList = "list-item flex-row justify-space-between align-left";
      currentTempEl.div.innerHTML = "Temperature: " + data[i].temperature;
      currentWindEl.div.innerHTML = "Wind Speed: " + data[i].current.wind_speed;
      currentHumidityEl.div.innerHTML = "Humidity: " + data[i].current.humidity;
      currentUVEl.div.innerHTML = "UV Index: " + data[i].current.uvi;

      // //create a span element to hold the city name
      var titleEl = document.createElement("span");
      titleEl.textContent = cityname;

      // // append to container
      cityEl.appendChild(titleEl);

      // //Append container to the dom
      cityContainerEl.appendChild(cityEl);
    }
  };
  //     // clear old content
};

//function to display citys current information

//function to display 5 day forecast
// 5 Day Forecast: 
 // var fiveDayForecast = function(){
  var displayForecast = function(cityname, searchTerm) {
    //clear old contents
    //fiveDayEl.textcontent = "Five Day Forecast: "; 
  }

var displayLongRange = function (cityname, searchTerm) {
  //clear old content
};


// add event listeners to form and button container
cityFormEl.addEventListener("submit", formSubmitHandler);
