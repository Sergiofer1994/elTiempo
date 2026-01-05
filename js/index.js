
console.log("JavaScript funcionando");
const LAT = 43.1900;
const LON = -8.7600;
const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&hourly=relative_humidity_2m`;
let temperatureZone = document.getElementById("temperatureZone");
let detailZone = document.getElementById("detailsZone");
document.addEventListener("load", getWeather());
function mostrarTiempoActual(current) {
    let temperatureElement = `${current.temperature_2m} °C`;
    let vientoElement = `${current.wind_speed_10m} km/h`;
    let humedadElement = `${current.relative_humidity_2m} %`;
    temperatureZone.innerHTML += "<h2>Temperatura Actual</h2>" + temperatureElement;
    detailZone.innerHTML += "<h2>Detalles</h2>" + vientoElement + "<br>" + humedadElement;
}
function getWeather() {
    fetch(API_URL)
        .then(response => response.json())
        .then (data => mostrarTiempo(data))
        .catch(error => console.error("Error fetching weather data:", error));
}
function mostrarTiempo(data) {
    temperatureZone.innerHTML += "<h2>Temperatura:</h2>" + data.current_weather.temperature + " °C";
    detailZone.innerHTML += "<h2>Detalles:</h2>" + "Viento: " + data.current_weather.windspeed + " km/h" + "<br>" + "Humedad: " + data.hourly.relative_humidity_2m[0] + " %";
}

