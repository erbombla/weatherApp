var Weather = require('./../js/weather.js').weatherModule;
var kelvin = 0;
function displayTemp(city, temperatureData) {
  kelvin = temperatureData;
  $('.showWeather').text("The temperature in " + city + " is " + temperatureData + " degrees");
}

$(document).ready(function() {
  var currentWeatherObject = new Weather();
  $('form').submit(function(event) {
    event.preventDefault();
    var city = $('#location').val();
    $('#location').val("");
    currentWeatherObject.getWeather(city, displayTemp);
    $('#conversions').show();
    $('#toCelsius').on('click', function () {
      $('.showWeather').button("The temperature in " + city + " is " + currentWeatherObject.toCelsius(kelvin) + " degrees celsius")
    });
    $('#toFarenheit').click(function() {
      $('.showWeather').text("The temperature in " + city + " is " + currentWeatherObject.toFarenheit(kelvin) + " degrees")
    });
    $('#toKelvin').click(function() {
      $('.showWeather').text("The temperature in " + city + " is " + kelvin + " degrees")
    });
  });
});
