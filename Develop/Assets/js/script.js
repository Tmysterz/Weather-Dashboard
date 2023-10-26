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
            // weather api
            console.log(data)

            var {lat,lon} = data[0]

            // lat and lon of city searched
            console.log(lat,lon)
            getForecast(lat,lon);
        });

    // creates boxes after the user searches
    for (var index = 0; index < 5; index++) {
        createForecastBox();
    }

    saveSearchValue()

    displayDate();
}

// api cycles through 5 days every 3 hours creating a 40 item array.
// need to find out how to specifically pick only the next 5 days 
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

// need to add IDs to each line so that i can link it to live api 
function createForecastBox () {
    var newBox = document.createElement("div");

    newBox.style.width = "175px";
    newBox.style.height = "300px";
    newBox.style.backgroundColor = "lightblue";
    newBox.style.border = "1px solid blue";
    newBox.style.display = "inline-block";
    newBox.style.marginLeft = "25px";
    newBox.style.float = "right";
    newBox.style.position = "relative";
    newBox.style.right = "150px";
    newBox.style.top = "175px";

    var line1 = document.createTextNode("future date");
    var line2 = document.createTextNode("icon");
    var line3 = document.createTextNode("Temp: ");
    var line4 = document.createTextNode("Wind: ");
    var line5 = document.createTextNode("Humidity: ");

    newBox.appendChild(line1);
    newBox.appendChild(document.createElement("br"));
    newBox.appendChild(line2);
    newBox.appendChild(document.createElement("br"));
    newBox.appendChild(line3);
    newBox.appendChild(document.createElement("br"));
    newBox.appendChild(line4);
    newBox.appendChild(document.createElement("br"));
    newBox.appendChild(line5);

    document.body.appendChild(newBox);
}
function saveSearchValue() {
    const inputValue = document.getElementById('cityInput').value;
    if (inputValue) {
      if (typeof Storage !== 'undefined') {
        let recentSearches = JSON.parse(localStorage.getItem('recentWeatherSearches')) || [];
        recentSearches.push(inputValue);
        localStorage.setItem('recentWeatherSearches', JSON.stringify(recentSearches));
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

displayRecentSearches();


var dateDisplayEl = document.getElementById("date")

function displayDate() {
    var currentDate = dayjs().format('MM/DD/YYYY')
    dateDisplayEl.textContent = currentDate;
}