(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = '3a315188765f2f49d1ba3d9783c9b7c2';

},{}],2:[function(require,module,exports){
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

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../js/weather.js":2}]},{},[3]);
