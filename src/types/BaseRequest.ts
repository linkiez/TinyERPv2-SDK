/**
 * Base request parameters for Tiny ERP API
 */
export interface TinyBaseRequest {
  token: string;
  formato?: 'json' | 'xml';
}

/**
 * Base request with pagination
 */
export interface TinyPaginatedRequest extends TinyBaseRequest {
  pagina?: number;
}

/**
 * Base request for search operations
 */
export interface TinySearchRequest extends TinyPaginatedRequest {
  pesquisa?: string;
  dataInicial?: string; // dd/mm/YYYY
  dataFinal?: string; // dd/mm/YYYY
}
