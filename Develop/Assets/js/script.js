// var currentCityDisplay = $("#selectedCity");
// var currentDateDisplay = document.querySelectorAll("#currentDate");

// function displayCurrentDate () {
//     var currentDate = dayjs().format('M,D,YYYY');

//     currentDateDisplay.text(currentDate);
// }

// displayCurrentDate();

var apiKey = '01a44a475a8c136ae41db9d0428f671a'


function searchWeather () {
    var cityInput = document.getElementById('cityInput');
    var cityName = cityInput.value;
    
    if(!cityName) {
        alert("Please enter a city name");
        return;
    }

    var weatherApiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`

    fetch(weatherApiURL)
        .then(function (response){
            return response.json();
        }).then(function(data){
            console.log(data)
            var {lat,lon} = data[0]
            console.log(lat,lon);
            getForecast(lat,lon);
        })

    // var weatherApiURL = `api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`

}

function getForecast(lat,lon){
    var forecastApiURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

    fetch(forecastApiURL)
    .then(function(response){
        return response.json();
    }).then (function(data){
        console.log(data)
        renderCurrentData(data);
    })
}

function renderCurrentData (data) {
    document.querySelector("#currentDay").textContent = data.city.name;
    document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png` )
    document.querySelector("#temp").textContent = data.list[0].main.temp;
    document.querySelector("#wind").textContent = data.list[0].wind.speed;
    document.querySelector("#humidity").textContent = data.list[0].main.humidity;

}

function renderForecastData () {
    
}

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}