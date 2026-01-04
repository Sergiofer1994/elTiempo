
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

cc By

## Contacto

- Tu nombre — `tu.email@example.com`
- Perfil de GitHub: `https://github.com/tu-usuario`
