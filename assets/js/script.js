// variables
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");

//function for hitting search
var formSubmitHandler = function (event) {
  // prevent from refreshing
  event.preventDefault();

  // get value from input element
  var cityname = cityInputEl.value.trim();

  if (cityname) {
    getCityWeather(cityname);

    // clear old content
  } else {
    alert("Please enter a City Name");
  }
};
console.log(cityname);
//function to pull data from weather app site

//function to display citys current information

//function to display 5 day forecast

//function to display previous cities info from local storage

// add event listeners to form and button container
cityInputEl.addEventListener("submit", formSubmitHandler);

var getCityName = function (city) {
    //format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=874894e8821d60d8579f2e5276f4e9c8";

    // make a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data) {
            console.log(data);
        })
    })

//   console.log("function was called");
//   fetch(
//     "https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=874894e8821d60d8579f2e5276f4e9c8"
//   ).then(function (response) {
//     response.json().then(function (data) {
//       console.log(data);
//       console.log("inside", response);
//     });
//     console.log("outside");
//   });
};

getCityName("Winnipeg");
