# Movie Viewer - AI Coding Agent Instructions

## Project Overview
**movie-viewer** es un recomendador personal de plataformas de streaming basado en favoritos del usuario.
Usa **Next.js 15** (TypeScript) con **Tailwind CSS 4**, integración con **TMDB API** para datos de películas/series, y **Embla Carousel** para visualización.

## Architecture & Data Flow

### Core Stack
- **Framework**: Next.js 15 (App Router, Server Components)
- **Styling**: Tailwind CSS 4 + PostCSS (dark mode support)
- **State Management**: **Zustand** (lightweight, persistent store)
- **Carousel**: Embla Carousel React (responsive, client-side)
- **External API**: TMDB v3 (Bearer token auth)
- **Types**: TypeScript strict mode

### Global State Store (`src/store/appStore.ts`)
**Zustand store** con persistencia automática en localStorage (`app-store`):

```typescript
interface AppState {
  // Tema
  theme: 'light' | 'dark'
  setTheme(theme) | toggleTheme()
  
  // Región/Idioma
  language: 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt'
  setLanguage(language)
  
  // Favoritos
  favorites: TMDBMedia[]
  addFavorite(media) | removeFavorite(media) | isFavorite(media) | clearFavorites()
}
```

**Key patterns**:
- Acceso global: `const { theme, language, favorites } = useAppStore()`
- Cambios: `useAppStore.setState()` o funciones específicas
- Favoritos identificados por `${media_type}_${id}`
- Tema sincronizado con clase `dark` del documento

### Service Layer Structure (`src/services/`)
```
tmdb/
  ├── client.ts      → fetchFromTMDB<T>(endpoint) - HTTP abstraction + rate-limit handling
  ├── config.ts      → TMDB_BASE_URL, TMDB_LANGUAGE, TmdbImageSize enum
  ├── helpers.ts     → getImagePath(path, size) - Image URL builder
  ├── trending.ts    → getTrendingAll(pages) - Tendencias del día
  ├── movies.ts      → getUpcomingMovies(limit) - Próximos estrenos
  ├── tv.ts          → (reserved, not exported)
  ├── search.ts      → searchMedia(query, page, limit) - Multi search + person expansion
  ├── providers.ts   → (reserved, placeholder)
  └── index.ts       → Barrel export (all public APIs)

local/
  └── favorites.ts   → (reserved for local storage)
```

### Data Models
- **TMDBMedia** = `TMDBMovie | TMDBTv` (discriminated union via `media_type` field)
- **TMDBMultiMedia** = `TMDBMedia | TMDBPerson` (search results can include persons)
- **TMDBListResponse<T>** = paginated TMDB response template

**Key pattern**: Discriminated unions use `media_type` ("movie", "tv", "person") as type guard.

### Component Tree
- **Layout** (`src/app/layout.tsx`) → Wraps `ThemeProvider` para sincronizar tema
- **Header** (`src/components/Header.tsx`) → Client, integra `ThemeToggle` + `LanguageSelector`
- **Home** (`src/app/page.tsx`) → Server component, fetches 4 data streams in parallel
- **MediaCard** (`src/components/MediaCard.tsx`) → Displays poster + metadata, usa `useAppStore` para favoritos
- **FavoritesList** (`src/components/FavoritesList.tsx`) → Cliente, lista favoritos desde store

## Developer Workflows

### Setup & Running
```bash
npm install
printf "TMDB_TOKEN=your_token_here\n" > .env.local
npm run dev        # Turbopack dev server (localhost:3000)
npm run build      # Optimize for production
npm run lint       # ESLint check
```

**IMPORTANT**: `TMDB_TOKEN` is environment-only; never commit to git. Add to GitHub Secrets for CI.

### Git Workflow
- **Commit format**: `<type>: <brief message>` (feat, fix, refactor, docs, chore)
- **Author**: Leonardo Alain <alain.vg.96@gmail.com> (pre-configured globally)
- **Remote**: origin/main is the single source of truth
- **Example**: `feat: add watchlist persistence` or `fix: carousel slide calculation on resize`

## Code Patterns & Conventions

### State Management (Zustand)
```typescript
// Importar store
import useAppStore from '@/store/appStore';

// En componente client
'use client';
const { theme, language, favorites, addFavorite, removeFavorite } = useAppStore();

// Cambiar estado
toggleTheme(); // Alterna entre light/dark
setLanguage('en'); // Cambia idioma
addFavorite(media); // Añade a favoritos
```

**Características**:
- ✅ Persistencia automática en localStorage (`app-store`)
- ✅ Sincronización instantánea entre componentes
- ✅ Sin boilerplate (acciones inline)
- ⚠️ Solo en Client Components

### API Integration (TMDB)
1. Define endpoint + query params in service function (e.g., `trending.ts`)
2. Call `fetchFromTMDB<ResponseType>(endpoint)` with language + token auto-handled
3. Handle **rate-limit errors** (`error.type === "RATE_LIMIT"`) separately if needed
4. Return normalized `TMDBListResponse<T>` or custom result type

**Example** (`search.ts`):
- Loop to gather results until `limit` reached or `total_pages` exhausted
- Deduplicate by `${media_type}_${id}` key
- Expand `person.known_for` inline, filtering by media_type

### Component Patterns
- **Server Components** (app/page.tsx): Use `async`, fetch data, pass to children
- **Client Components** ("use client" at top): Use `useAppStore` para favoritos, tema, idioma
- **Props typing**: Explicit interfaces (`CarouselProps`, `MediaCardProps`)
- **Responsive**: Use Tailwind breakpoints; dynamic JS calculations if needed (e.g., Embla slides)
- **Dark mode**: Clases `dark:` en Tailwind; tema aplicado por `ThemeProvider`

### File Organization
- Types colocated in `src/types/mediaTypes.ts` (not scattered)
- Service exports via barrel export (`src/services/tmdb/index.ts`)
- Styles inline with Tailwind classes; no separate CSS files (except `globals.css`)
- Comments document **why**, not obvious logic

## Critical Integration Points
- **TMDB API**: Requires valid bearer token; rate-limited (fetch caching recommended for production)
- **Embla Carousel**: Responsive config tied to window width; resize listener managed in effect
- **Image CDN**: TMDB images require size param (w300, w500, w780, original); null-safe path handling

## Common Tasks

### Adding a New Feature
1. Create service function in `src/services/tmdb/{feature}.ts` (export from `index.ts`)
2. Define TypeScript types in `src/types/mediaTypes.ts` (extend `TMDBMediaBase` or `TMDBListResponse`)
3. Use in Server Component (`page.tsx`) or pass to Client Component
4. Test locally: `npm run dev`
5. Commit with `feat:` prefix

### Modifying API Calls
- All HTTP logic centralized in `fetchFromTMDB()` — **do not bypass**
- Add query params via `url.searchParams.set()` (already done for language)
- Error handling: Check `res.ok` + HTTP 429 rate-limit in `client.ts`

### Updating UI
- Components in `src/components/` — keep simple and reusable
- Tailwind classes only (no inline styles except data attributes)
- Client-side interactivity: use React hooks (`useState`, `useEffect`, `useCallback`)

## Important Notes
- **Global State**: Zustand store (`app-store`) manage favoritos, tema e idioma
- **Reserved modules**: `tv.ts`, `providers.ts`, `favorites.ts` — stub placeholders for future work
- **Dark mode**: Tailwind dark mode enabled; apply class `dark` to `<html>` (managed by `ThemeProvider`)
- **Tema persistido**: Se guarda en localStorage automáticamente
- **Environment variables**: Only `TMDB_TOKEN` required; must be in `.env.local` (not committed)

## Useful References
- TMDB API: https://www.themoviedb.org/settings/api (Read Access Token v4)
- Next.js 15 Docs: https://nextjs.org/docs
- Tailwind CSS 4: https://tailwindcss.com/docs
- Embla Carousel: https://www.embla-carousel.com/
