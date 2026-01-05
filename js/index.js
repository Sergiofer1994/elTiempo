console.log("JavaScript funcionando");

const LAT = 43.1900;
const LON = -8.7600;
const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&hourly=temperature_2m,relative_humidity_2m`;

let temperatureZone = document.getElementById("temperatureZone");
let detailZone = document.getElementById("detailsZone");
let futureZone = document.getElementById("futureZone");

window.addEventListener("load", getWeather);

function getWeather() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            mostrarTiempo(data);
            showFutureWeather(data);
        })
        .catch(error => console.error("Error fetching weather data:", error));
}

function mostrarTiempo(data) {
    temperatureZone.innerHTML += "<h2>Temperatura:</h2>" +
        data.current_weather.temperature + " °C";

    detailZone.innerHTML += "<h2>Detalles:</h2>" +
        "Viento: " + data.current_weather.windspeed + " km/h<br>" +
        "Humedad: " + data.hourly.relative_humidity_2m[0] + " %";
}

function showFutureWeather(data) {
    futureZone.innerHTML += "<h2>Próximas horas:</h2>";

    for (let i = 1; i <= 5; i++) {
        futureZone.innerHTML +=
            data.hourly.time[i] + "<br>" +
            "Temperatura: " + data.hourly.temperature_2m[i] + " °C<br>" +
            "Humedad: " + data.hourly.relative_humidity_2m[i] + " %<br><br>";
    }
}