var apiKey = '01a44a475a8c136ae41db9d0428f671a'

function searchWeather (cityName) {
    if(!cityName) {
        alert("Please enter a city name");
        return;
    }

    var weatherApiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`

    fetch(weatherApiURL)
        .then(function (response){
            return response.json();
        }).then(function(data){
            // weather api
            console.log(data)

            var {lat,lon} = data[0]

            // lat and lon of city searched
            console.log(lat,lon)
            getForecast(lat,lon);
        });

    saveSearchValue()

    displayDate();
}

function renderForecastData (data) {
    document.querySelector("#futureForecastContainer").innerHTML = "";

    for(var index=2; index < data.list.length; index += 8 ) {

        var forecastBox = document.createElement("div");
        var dateEl = document.createElement("p");
        var iconEl = document.createElement("img");
        var tempEl = document.createElement("p");
        var windEl = document.createElement("p");
        var humidityEl = document.createElement("p");


        dateEl.textContent = dayjs.unix(data.list[index].dt).format("MM/DD/YYYY");
        iconEl.setAttribute("src", `https://openweathermap.org/img/w/${data.list[index].weather[0].icon}.png` )
        tempEl.textContent = "Temp: " + data.list[index].main.temp;
        windEl.textContent = "Wind: " + data.list[index].wind.speed;
        humidityEl.textContent = "Humidity: " + data.list[index].main.humidity;

        forecastBox.append(dateEl,iconEl,tempEl,windEl,humidityEl)

        document.querySelector("#futureForecastContainer").append(forecastBox)

    } 
}

function getForecast(lat,lon){
    var forecastApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

    fetch(forecastApiURL)
    .then(function(response){
        return response.json();
    }).then (function(data){
        console.log(data)
        renderCurrentData(data);
        renderForecastData(data);
    })
}

function renderCurrentData (data) {
    document.querySelector("#currentDay").textContent = data.city.name;
    document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png` )
    document.querySelector("#temp").textContent = data.list[0].main.temp;
    document.querySelector("#wind").textContent = data.list[0].wind.speed;
    document.querySelector("#humidity").textContent = data.list[0].main.humidity;
}

function saveSearchValue() {
    const inputValue = document.getElementById('cityInput').value;
    if (inputValue) {
      if (typeof Storage !== 'undefined') {
        let recentSearches = JSON.parse(localStorage.getItem('recentWeatherSearches')) || [];
        recentSearches.push(inputValue);
        localStorage.setItem('recentWeatherSearches', JSON.stringify(recentSearches));
        displayRecentSearches();
      } else {
        alert('Local storage is not available in your browser.');
      }
    }
}

function displayRecentSearches() {
    const recentSearches = JSON.parse(localStorage.getItem('recentWeatherSearches')) || [];
    const recentSearchList = document.getElementById('recent-search-list');
  
    recentSearchList.innerHTML = '';
  
    for (const searchValue of recentSearches) {
      const listItem = document.createElement('button');
      listItem.style.width = "400px";
      
      listItem.textContent = searchValue;
      listItem.addEventListener('click', function () {
  
      });
      recentSearchList.appendChild(listItem);
    }
}

function recentSearchClick (event) {
    searchWeather(event.target.textContent)

}

displayRecentSearches();


var dateDisplayEl = document.getElementById("date")

function displayDate() {
    var currentDate = dayjs().format('MM/DD/YYYY')
    dateDisplayEl.textContent = currentDate;
}

document.querySelector("#searchButton").addEventListener('click',function () {
    var cityInput = document.getElementById('cityInput');
    var cityName = cityInput.value;
    searchWeather(cityName)
})

document.querySelector("#recent-search-list").addEventListener('click', recentSearchClick)