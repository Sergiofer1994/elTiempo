console.log("JavaScript funcionando");

const LAT = 43.1900;
const LON = -8.7600;

const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&hourly=temperature_2m,weathercode,relative_humidity_2m,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max,precipitation_sum&forecast_days=5&timezone=auto`;
const API_URL_5_DIAS = "https://api.open-meteo.com/v1/forecast?latitude=43.1900&longitude=-8.7600&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_mean&timezone=auto&forecast_days=5";
let weatherData = null;

function weatherCodeToIcon(code) {
    const map = {
        0: '☀️',
        1: '🌤️',
        2: '⛅',
        3: '☁️',
        45: '🌫️',
        48: '🌫️',
        51: '🌦️',
        53: '🌦️',
        55: '🌧️',
        61: '🌧️',
        63: '🌧️',
        65: '🌧️',
        71: '🌨️',
        73: '🌨️',
        75: '🌨️',
        80: '⛈️',
        81: '⛈️',
        82: '⛈️',
        95: '⛈️',
        96: '⛈️',
        99: '⛈️'
    };
    return map[code] || '❓';
}

const temperatureZone = document.getElementById("temperatureZone");
const detailZone = document.getElementById("detailsZone");
const futureZone = document.getElementById("futureZone");
const weatherZone = document.getElementById("weatherZone");
window.addEventListener("load", getWeather);
window.addEventListener("load", mostrarProximasHoras);
function getWeather() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            weatherData = data;
            mostrarTiempoActual();
            mostrarProximasHoras();
            mostrarTiempoProximosDias();
        })
        .catch(error => console.error("Error obteniendo el tiempo:", error));
}

function mostrarTiempoActual() {
    if (!weatherData) return;
    temperatureZone.innerHTML = `
        <h2>Temperatura actual</h2>
        <p>${weatherData.current_weather.temperature} °C</p>
    `;

    detailZone.innerHTML = `
        <h2>Detalles</h2>
        <p>💨 Viento: ${weatherData.current_weather.windspeed} km/h</p>
        <p>💧 Humedad: ${weatherData.hourly.relative_humidity_2m[0]} %</p>
    `;
} 

function mostrarProximasHoras() {
    if (!weatherData) return;
    futureZone.innerHTML = "<h2>Próximas 5 horas</h2>";

    const times = (weatherData.hourly && weatherData.hourly.time) || [];
    const temps = (weatherData.hourly && weatherData.hourly.temperature_2m) || [];
    const hum = (weatherData.hourly && weatherData.hourly.relative_humidity_2m) || [];
    const wcode = (weatherData.hourly && weatherData.hourly.weathercode) || [];

    for (let i = 1; i <= 5; i++) {
        if (!times[i]) break;
        const hour = times[i].includes('T') ? times[i].split('T')[1].slice(0,5) : times[i];
        const icon = weatherCodeToIcon(wcode[i]);
        futureZone.innerHTML += `
            <p>
                ⏰ ${hour}<br>
                ${icon} 🌡️ ${temps[i] !== undefined ? temps[i] : '—'} °C<br>
                💧 ${hum[i] !== undefined ? hum[i] : '—'} %
            </p>
        `;
    }
}

function mostrarTiempoProximosDias() {
    if (!weatherData) return;
    weatherZonegit.innerHTML += "<h2>Próximos 5 días</h2>";

    const dates = (weatherData.daily && weatherData.daily.time) || [];
    const max = (weatherData.daily && weatherData.daily.temperature_2m_max) || [];
    const min = (weatherData.daily && weatherData.daily.temperature_2m_min) || [];
    const wcode = (weatherData.daily && weatherData.daily.weathercode) || [];

    for (let i = 0; i < Math.min(5, dates.length); i++) {
        const d = new Date(dates[i]);
        const weekday = d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
        const icon = weatherCodeToIcon(wcode[i]);
        weatherZone.innerHTML += `
            <p>
                📅 ${weekday}<br>
                ${icon} ${max[i] !== undefined ? max[i] : '—'} °C / ${min[i] !== undefined ? min[i] : '—'} °C
            </p>
        `;
    }
}