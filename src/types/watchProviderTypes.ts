// src/types/watchProviderTypes.ts

/** Estructura de datos para un proveedor de streaming. */
export interface WatchProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

/** Estructura para agrupar los proveedores por tipo de servicio (suscripción, compra y renta). */
export interface ProviderService {
  flatrate?: WatchProvider[];
  buy?: WatchProvider[];
  rent?: WatchProvider[];
}

/** Estructura de la respuesta de la API de Watch Providers, agrupada por código de país (Ej: PE). */
export interface WatchProvidersResponse {
  id: number;
  results: {
    [regionCode: string]: ProviderService;
  };
}
