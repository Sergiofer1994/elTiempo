console.log("JavaScript funcionando");

const LAT = 43.1900;
const LON = -8.7600;
const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&hourly=temperature_2m,weathercode,relative_humidity_2m,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=7&timezone=auto`;

let weatherData = null;

// Elementos del DOM
const temperatureZone = document.getElementById("temperatureZone");
const detailZone = document.getElementById("detailsZone");
const futureZone = document.getElementById("futureZone");
const weatherZone = document.getElementById("weatherZone");

// Cargar el clima cuando la página esté lista
window.addEventListener("load", getWeather);

function getWeather() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => showWeather(data))
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
    // Guardar los datos
    weatherData = data;
    
    // Limpiar zonas
    temperatureZone.innerHTML = "";
    detailZone.innerHTML = "";
    weatherZone.innerHTML = "";
    futureZone.innerHTML = "";

    const current = data.current_weather;
    const times = data.hourly.time || [];
    const humidityArr = data.hourly.relative_humidity_2m || [];
    const tempArr = data.hourly.temperature_2m || [];
    const wcodeArr = data.hourly.weathercode || [];
    const windsArr = data.hourly.windspeed_10m || [];

    // Índice de la hora actual
    let idx = times.indexOf(current.time);
    if (idx === -1) idx = 0;

    const humidity = humidityArr[idx] !== undefined ? humidityArr[idx] : '—';
    const wind = current.windspeed || (windsArr[idx] !== undefined ? windsArr[idx] : '—');
    const wc = weatherCodeToIcon(current.weathercode);

    // Mostrar clima actual
    temperatureZone.innerHTML = `
        <h2>Clima en Coristanco</h2>
        <div class="current">
            <span class="icon" style="font-size:2rem">${wc.icon}</span>
            <strong style="font-size:1.5rem">${current.temperature} °C</strong>
            <div>${wc.text}</div>
        </div>`;

    // Calcular datos adicionales
    const maxTemp = Math.max(...tempArr.slice(idx, idx + 24).filter(t => t !== undefined));
    const minTemp = Math.min(...tempArr.slice(idx, idx + 24).filter(t => t !== undefined));
    const avgWind = (windsArr.slice(idx, idx + 24).reduce((a, b) => a + (b || 0), 0) / 24).toFixed(1);
    
    // Determinar dirección del viento (simplificado)
    const windDirection = wind < 5 ? 'Calma' : wind < 15 ? 'Moderado' : wind < 25 ? 'Fuerte' : 'Muy fuerte';
    
    // Sensación térmica aproximada (simplificada)
    const feelsLike = (current.temperature - (wind * 0.2)).toFixed(1);
    
    // Punto de rocío aproximado
    const dewPoint = (current.temperature - ((100 - humidity) / 5)).toFixed(1);
    
    // Visibilidad (basado en humedad y código de clima)
    let visibility = '10+ km';
    if (current.weathercode >= 45 && current.weathercode <= 48) visibility = '< 1 km';
    else if (humidity > 90) visibility = '5-8 km';
    else if (humidity > 80) visibility = '8-10 km';
    
    // Presión atmosférica (valor aproximado para la zona)
    const pressure = '1013 hPa';
    
    // Índice UV (aproximado según hora del día)
    const currentHour = new Date(current.time).getHours();
    let uvIndex = 0;
    if (currentHour >= 10 && currentHour <= 16) uvIndex = Math.min(8, Math.floor((100 - humidity) / 15));
    
    detailZone.innerHTML = `
        <h2>Detalles del Clima</h2>
        <div class="details-grid">
            <div class="detail-item">
                <span class="detail-icon">💨</span>
                <div class="detail-content">
                    <div class="detail-label">Viento</div>
                    <div class="detail-value">${wind} km/h</div>
                    <div class="detail-extra">${windDirection}</div>
                </div>
            </div>
            
            <div class="detail-item">
                <span class="detail-icon">💧</span>
                <div class="detail-content">
                    <div class="detail-label">Humedad</div>
                    <div class="detail-value">${humidity}%</div>
                    <div class="detail-extra">Punto rocío: ${dewPoint}°C</div>
                </div>
            </div>
            
            <div class="detail-item">
                <span class="detail-icon">🌡️</span>
                <div class="detail-content">
                    <div class="detail-label">Sensación térmica</div>
                    <div class="detail-value">${feelsLike}°C</div>
                    <div class="detail-extra">Real: ${current.temperature}°C</div>
                </div>
            </div>
            
            <div class="detail-item">
                <span class="detail-icon">📊</span>
                <div class="detail-content">
                    <div class="detail-label">Temp. hoy</div>
                    <div class="detail-value">${Math.round(maxTemp)}° / ${Math.round(minTemp)}°</div>
                    <div class="detail-extra">Máx / Mín</div>
                </div>
            </div>
            
            <div class="detail-item">
                <span class="detail-icon">👁️</span>
                <div class="detail-content">
                    <div class="detail-label">Visibilidad</div>
                    <div class="detail-value">${visibility}</div>
                    <div class="detail-extra">${humidity > 85 ? 'Reducida' : 'Buena'}</div>
                </div>
            </div>
            
            <div class="detail-item">
                <span class="detail-icon">🔆</span>
                <div class="detail-content">
                    <div class="detail-label">Índice UV</div>
                    <div class="detail-value">${uvIndex}/10</div>
                    <div class="detail-extra">${uvIndex < 3 ? 'Bajo' : uvIndex < 6 ? 'Moderado' : 'Alto'}</div>
                </div>
            </div>
            
            <div class="detail-item">
                <span class="detail-icon">🌪️</span>
                <div class="detail-content">
                    <div class="detail-label">Presión</div>
                    <div class="detail-value">${pressure}</div>
                    <div class="detail-extra">Estable</div>
                </div>
            </div>
            
            <div class="detail-item">
                <span class="detail-icon">🌬️</span>
                <div class="detail-content">
                    <div class="detail-label">Viento promedio</div>
                    <div class="detail-value">${avgWind} km/h</div>
                    <div class="detail-extra">Últimas 24h</div>
                </div>
            </div>
        </div>`;

    // Llamar solo a próximos días
    mostrarProximosDias();
}

function mostrarProximosDias() {
    if (!weatherData) return;
    
    // Limpiar la zona de futureZone (no se usa)
    futureZone.innerHTML = '';
    
    // Mostrar los próximos días
    const dates = (weatherData.daily && weatherData.daily.time) || [];
    const max = (weatherData.daily && weatherData.daily.temperature_2m_max) || [];
    const min = (weatherData.daily && weatherData.daily.temperature_2m_min) || [];
    const wcodeDaily = (weatherData.daily && weatherData.daily.weathercode) || [];
    
    let forecastDaysHtml = '<h3>Próximos 7 Días</h3><div class="forecast-days">';
    
    for (let i = 0; i < Math.min(7, dates.length); i++) {
        const d = new Date(dates[i]);
        const weekday = d.toLocaleDateString('es-ES', { weekday: 'long' });
        const dayMonth = d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
        const icon = weatherCodeToIcon(wcodeDaily[i]);
        const isToday = i === 0;
        
        forecastDaysHtml += `
            <div class="day-card ${isToday ? 'today' : ''}">
                <div class="day-name">${isToday ? 'Hoy' : weekday}</div>
                <div class="day-date">${dayMonth}</div>
                <div class="day-icon">${icon.icon}</div>
                <div class="day-description">${icon.text}</div>
                <div class="day-temps">
                    <span class="temp-max">${max[i] !== undefined ? Math.round(max[i]) : '—'}°</span>
                    <span class="temp-separator">/</span>
                    <span class="temp-min">${min[i] !== undefined ? Math.round(min[i]) : '—'}°</span>
                </div>
            </div>`;
    }
    
    forecastDaysHtml += '</div>';
    weatherZone.innerHTML = forecastDaysHtml;
}