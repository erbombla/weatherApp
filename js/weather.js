var apiKey = require('./../.env').apiKey;

Weather = function(){
  this.temp = 0;
}

Weather.prototype.getWeather = function(city, displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
    displayFunction(city, response.main.temp);
  }).fail(function(error) {
    $('.showWeather').text(error.responseJSON.message);
  });
}

Weather.prototype.toCelsius = function (temp) {
  return Math.round(temp - 273.15);
};

Weather.prototype.toFarenheit = function (temp) {
  return Math.round(this.toCelsius(temp) * 1.8 + 32)
};

exports.weatherModule = Weather;
