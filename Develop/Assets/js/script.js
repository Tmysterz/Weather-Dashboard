// var currentCityDisplay = $("#selectedCity");
// var currentDateDisplay = document.querySelectorAll("#currentDate");

// function displayCurrentDate () {
//     var currentDate = dayjs().format('M,D,YYYY');

//     currentDateDisplay.text(currentDate);
// }

// displayCurrentDate();

// var weatherAPI = ('http://api.openweathermap.org/geo/1.0/direct?q={Dallas},{TX},{+1}&limit={limit}&appid={01a44a475a8c136ae41db9d0428f671a}')

// fetch(weatherAPI)
// .then (function(response) {
//     return response.json()
// }).then (function(data){
//     console.log(data);
// });


var apiKey = '01a44a475a8c136ae41db9d0428f671a'


function searchWeather () {
    var cityInput = document.getElementById('cityInput');
    var cityName = cityInput.value;
    
    if(!cityName) {
        alert("Please enter a city name");
        return;
    }

    var weatherApiURL = 'api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}'

}

