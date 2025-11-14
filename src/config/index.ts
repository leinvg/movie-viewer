// Configuración centralizada de la aplicación

export const APP_CONFIG = {
  // Configuración de streaming y búsqueda
  streaming: {
    /** Región por defecto para buscar proveedores (PE = Perú) */
    DEFAULT_REGION: "PE",
    /** Límite por defecto de resultados en búsqueda */
    DEFAULT_SEARCH_LIMIT: 12,
    /** Máximo de páginas a escanear en búsqueda paginada */
    MAX_PAGES_SCAN: 6,
  },

  // Configuración de créditos (cast/crew)
  credits: {
    /** Jobs principales a mostrar en el modal */
    PRIORITY_JOBS: ["Director", "Producer", "Screenplay", "Cinematography"],
    /** Número máximo de miembros a mostrar */
    DISPLAY_LIMIT: 15,
  },

  // Configuración de filtros de búsqueda
  search: {
    FILTERS: {
      /** Requiere que el media tenga poster */
      requirePoster: true,
      /** Requiere que el media tenga backdrop */
      requireBackdrop: true,
      /** Requiere que el media tenga géneros */
      requireGenres: true,
      /** Requiere que el media tenga descripción */
      requireOverview: true,
    },
  },

  // Configuración de caché
  cache: {
    /** TTL en segundos para providers en sessionStorage */
    PROVIDER_TTL_SECONDS: 3600, // 1 hora
  },

  // Configuración de paginación en "Ver más"
  pagination: {
    /** Items por página en búsqueda infinita */
    ITEMS_PER_PAGE: 12,
  },
} as const;
