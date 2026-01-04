# elTiempo 🌤️

**elTiempo** es una aplicación web sencilla para mostrar información meteorológica (temperatura, estado del cielo, humedad y localización). Está pensada como proyecto didáctico para practicar HTML, CSS y JavaScript y consumir APIs públicas del tiempo.

## Demo

- Añade aquí el enlace a la demo o a GitHub Pages (ej.: `https://tu-usuario.github.io/elTiempo`).

## Características ✅

- Interfaz responsiva
- Búsqueda por ciudad
- Visualización de temperatura, humedad y estado del cielo
- Consumo de una API externa (ej.: OpenWeatherMap)

## Tecnologías 🔧

- HTML, CSS, JavaScript
- (Opcional) Librerías: Fetch API, y cualquier librería de UI si se desea

## Instalación y uso local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/elTiempo.git
   ```
2. Entra al directorio del proyecto:
   ```bash
   cd elTiempo
   ```
3. Abre `index.html` en el navegador o sirve la carpeta localmente:
   - Con Live Server (VS Code)
   - O con `npx http-server . -p 8080` y visita `http://localhost:8080`

## Configuración de la API 🔐

Si utilizas una API que requiere clave (por ejemplo OpenWeatherMap):

- Crea un archivo `.env` (o `config.js`) y añade tu clave (no subir al repositorio):

  ```env
  WEATHER_API_KEY=tu_api_key_aqui
  ```

- Documenta en `js/index.js` dónde cargar la clave o usa variables de entorno en el entorno de desarrollo.

## Estructura del proyecto 📁

- `index.html` — página principal
- `css/` — estilos (`index.css`)
- `js/` — lógica (`index.js`)
- `README.md` — documentación

## Contribuciones 🤝

- Abre issues para sugerencias o reportes de bugs.
- Haz fork, crea una rama (`feature/nombre`), haz tus cambios y abre un Pull Request.

## Licencia

Especifica una licencia (por ejemplo **MIT**) o indica "All rights reserved" si no deseas compartir derechos.

## Contacto

- Tu nombre — `tu.email@example.com`
- Perfil de GitHub: `https://github.com/tu-usuario`

---

*Si quieres, puedo añadir capturas, un enlace a la demo o adaptar el tono (formal/técnico/informal).*
