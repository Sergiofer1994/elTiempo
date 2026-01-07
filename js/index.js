console.log("JavaScript funcionando");

const LAT = 43.1900;
const LON = -8.7600;
const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&hourly=temperature_2m,weathercode,relative_humidity_2m,windspeed_10m&forecast_days=3&timezone=auto`; 
document.addEventListener("load", getWeather());
function mostrarTiempoActual(current) {
    let temperatureElement = `${current.temperature_2m} °C`;
    let vientoElement = `${current.wind_speed_10m} km/h`;
    let humedadElement = `${current.relative_humidity_2m} %`;
    temperatureZone.innerHTML += "<h2>Temperatura Actual</h2>" + temperatureElement;
    detailZone.innerHTML += "<h2>Detalles</h2>" + vientoElement + "<br>" + humedadElement;
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
        .then (data => showWeather(data))
        .catch(error => console.error("Error fetching weather data:", error));
}
function weatherCodeToIcon(code) {
    const map = {
        0: {icon:'☀️', text:'Despejado'},
        1: {icon:'🌤️', text:'Principalmente claro'},
        2: {icon:'⛅', text:'Parcialmente nublado'},
        3: {icon:'☁️', text:'Nublado'},
        45: {icon:'🌫️', text:'Niebla'},
        48: {icon:'🌫️', text:'Niebla con escarcha'},
        51: {icon:'🌦️', text:'Llovizna ligera'},
        53: {icon:'🌦️', text:'Llovizna moderada'},
        55: {icon:'🌧️', text:'Llovizna intensa'},
        61: {icon:'🌧️', text:'Lluvia ligera'},
        63: {icon:'🌧️', text:'Lluvia moderada'},
        65: {icon:'🌧️', text:'Lluvia fuerte'},
        71: {icon:'🌨️', text:'Nieve ligera'},
        73: {icon:'🌨️', text:'Nieve moderada'},
        75: {icon:'🌨️', text:'Nieve intensa'},
        80: {icon:'⛈️', text:'Chubascos ligeros'},
        81: {icon:'⛈️', text:'Chubascos moderados'},
        82: {icon:'⛈️', text:'Tormenta de chubascos'},
        95: {icon:'⛈️', text:'Tormenta'},
        96: {icon:'⛈️', text:'Tormenta con granizo'},
        99: {icon:'⛈️', text:'Tormenta con granizo intenso'},
    };
    return map[code] || {icon:'❓', text:'Desconocido'};
}

function showWeather(data) {
    // Limpiar zonas
    temperatureZone.innerHTML = "";
    detailZone.innerHTML = "";
    weatherZone.innerHTML = "";

    const current = data.current_weather;
    const times = data.hourly.time || [];
    const humidityArr = data.hourly.relative_humidity_2m || [];
    const tempArr = data.hourly.temperature_2m || [];
    const wcodeArr = data.hourly.weathercode || [];
    const windsArr = data.hourly.windspeed_10m || [];

    // Índice de la hora actual en arrays horarios
    let idx = times.indexOf(current.time);
    if (idx === -1) idx = 0;

    const humidity = humidityArr[idx] !== undefined ? humidityArr[idx] : '—';
    const wind = current.windspeed || (windsArr[idx] !== undefined ? windsArr[idx] : '—');
    const wc = weatherCodeToIcon(current.weathercode);

    temperatureZone.innerHTML = `<h2>Clima en Coristanco</h2>
        <div class="current">
            <span class="icon" style="font-size:2rem">${wc.icon}</span>
            <strong style="font-size:1.5rem">${current.temperature} °C</strong>
            <div>${wc.text}</div>
        </div>`;

    detailZone.innerHTML = `<h2>Detalles</h2>
        <div>Viento: ${wind} km/h</div>
        <div>Humedad: ${humidity} %</div>`;

    // Próximas horas (6)
    let forecastHtml = '<h3>Próximas horas</h3><div class="forecast" style="display:flex;gap:10px">'; 
    for (let i = idx; i < Math.min(idx + 6, times.length); i++) {
        const time = times[i];
        const hour = time.includes('T') ? time.split('T')[1].slice(0,5) : time;
        const icon = weatherCodeToIcon(wcodeArr[i]);
        const temp = tempArr[i] !== undefined ? tempArr[i] : '—';
        forecastHtml += `<div style="text-align:center;padding:6px;border-radius:6px;background:#f3f3f3">
            <div style="font-weight:600">${hour}</div>
            <div style="font-size:1.2rem">${icon.icon}</div>
            <div>${temp} °C</div>
        </div>`;
    }
    forecastHtml += '</div>';
    weatherZone.innerHTML = forecastHtml;
} 
