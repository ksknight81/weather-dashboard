// variables
const cityFormEl = document.querySelector("#city-form");
const cityInputEl = document.querySelector("#cityname");
const cityContainerEl = document.querySelector("#city-container");
const citySearchTerm = document.querySelector("#city-search-term");
const currentIcon = document.getElementById("currenticon")
const currentTempEl = document.getElementById("temperature");
const currentFeelTempEl = document.getElementById("feelslike");
const currentHumidityEl = document.getElementById("humidity");
const currentWindEl = document.getElementById("wind-speed");
const currentUVEl = document.getElementById("UV-index");
const historyEl = document.getElementById("history");
var fiveDayEl = document.getElementById("5-day-forecast");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
const APIKey = "874894e8821d60d8579f2e5276f4e9c8"; 
var pastSearches = document.getElementById("past-search-city");

// Local Storage variable to hold values
var citySearches = [];

var loadPreviousCity = function() {
  citySearches = JSON.parse(localStorage.getItem(pastSearches));
  if (!citySearches) {
    citySearches = [];
  }
  for (i = 0; i < citySearches.length; i++) {

    var search_results = document.querySelector("#search_history_results");
    var pastSearches = document.createElement("li");

    pastSearches.classList = "past-searches";
    pastSearches.setAttribute("id", citySearches[i]);

    pastSearches.innerHTML = citySearches[i];
    search_results.appendChild(pastSearches);
  }
}

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

    //Save city in local Storage
    saveCity(cityname);

  } else {
    alert("Please enter a City Name");
  }
};



//function to pull current weather data from weather app site
var getCityName = function (cityname) {
  //format the weather api url
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&units=metric" +
    "&appid=" +
    APIKey;
  // make a request to the url
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayCurrent(data, cityname);
      });
    } else {
      alert("Error: City is not found");
    }
  });

  // cityname in this case shows the results from the fetch, searchterm is the city entered in the search
  var displayCurrent = function (weatherData, cityname) {
    // clear old content
    //cityContainerEl.textContent = "";
    citySearchTerm.textContent =
      "Today's forecast for " +
      cityname +
      ", on " +
      Month +
      " " +
      cDay +
      ", " +
      cYear +
      ":";
    // console.log(cityname);

    var uvCurrent = weatherData.main.uvi;

    currentIcon.src = "https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
    currentTempEl.textContent = "Temperature: " + weatherData.main.temp + "°C";
    currentHumidityEl.textContent = "Humidity: " + weatherData.main.humidity + "%";
    currentWindEl.textContent = "Wind-Speed: " + weatherData.wind.speed + " m/s";
    currentUVEl.textContent = "UV Index: " + uvCurrent;
     console.log(weatherData);
     console.log(cityname);
    
     var lat = weatherData.coord.lat
     var lon = weatherData.coord.lon
     getForecast(lat, lon);
  };
};


//function to pull forecast weather data from weather app site
var getForecast = function (lat, lon) {
  //format the weather api url
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" + 
    lon +
    "&units=metric" +
    "&appid=" +
    APIKey;
  // make a request to the url
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        currentUVEl.textContent = "UV Index: " + data.current.uvi
        displayForecast(data.daily);
      });
    } else {
      alert("Error: City is not found");
    }
  });
};


//function to display 5 day forecast
  var displayForecast = function(data) {
    console.log(data);
    for (var i = 0; i < 5; i++) {
      // puts details for each day using 'day' +1 as a for loop
      var dayEl = document.getElementById("day"+i);
      // clears the info on the screen
      dayEl.innerHTML = ""
      // creates the 'date' on the top of the long range forecast
      dayEl.append(document.createElement("p").textContent = (cMonth+1) + "/" + (cDay+(i+1)) + "/" + cYear);
      // get weather icon
      var newImage = document.createElement("img");
      newImage.src = ("http://openweathermap.org/img/w/" + data[i].weather[0].icon + ".png");
      console.log(data[i].weather[0].icon);
     // var weatherImg = document.createElement<img>(("http://openweathermap.org/img/wn/" + data[i].weather[0].icon + ".png"));
      // get temperature data
      var temperature = document.createElement("p");
      temperature.textContent = "Temperature: " + data[i].temp.day + "°C";
      var feeltemp = document.createElement("p");
      feeltemp.textContent = "Feels Like: " + data[i].feels_like.day + "°C";
           
      var humidity = document.createElement("p");
      humidity.textContent = "Humidity: " + data[i].humidity + " %";
      var wind = document.createElement("p");
      wind.textContent = "Wind Speed: " + data[i].wind_speed + "m/s";
      var uvi = document.createElement("p");
      uvi.textContent = "UV Index: " + data[i].uvi;
      var img = document.createElement("img");
      img.image = data[i].icon
      
      dayEl.append(newImage);
      dayEl.append(temperature);
      dayEl.append(feeltemp);
      dayEl.append(humidity);
      dayEl.append(wind);
      dayEl.append(uvi);

    }

  };



// add event listeners to form and button container
cityFormEl.addEventListener("submit", formSubmitHandler);
