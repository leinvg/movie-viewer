# movie-viewer

Proyecto personal.

Es un recomendador de plataformas de streaming para series y películas. El usuario marca una lista de favoritos y la app sugiere en qué plataformas verlos usando la TMDB API y JustWatch.

**Principales características**

- Recomendaciones basadas en favoritos del usuario
- Búsqueda y expansión de resultados (películas, series, personas)
- Integración con TMDB para datos e imágenes

**Requisitos**

- Node.js 18+ y npm
- Una cuenta en TMDB y su Access Token Auth (Bearer)

**Instalación rápida**

```bash
# instalar dependencias
npm install

# crear archivo local de entorno
printf "TMDB_TOKEN=tu_token_aqui\n" > .env.local

# correr en desarrollo
npm run dev
```
