import { CodigoErro } from './CodigoErro';
import { StatusProcessamento } from './StatusProcessamento';

/**
 * Base response structure for Tiny ERP API
 */
export interface TinyBaseResponse<T = unknown> {
  retorno: {
    status_processamento: StatusProcessamento;
    status: 'OK' | 'Erro';
    codigo_erro?: CodigoErro;
    erros?: Array<{
      erro: string;
    }>;
  } & T;
}

/**
 * Response structure for list/search endpoints with pagination
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface TinyListResponse<T> extends TinyBaseResponse {
  retorno: {
    status_processamento: StatusProcessamento;
    status: 'OK' | 'Erro';
    codigo_erro?: CodigoErro;
    erros?: Array<{
      erro: string;
    }>;
    numero_paginas?: number;
    pagina?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

/**
 * Response structure for single record endpoints
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface TinySingleResponse<T> extends TinyBaseResponse {
  retorno: {
    status_processamento: StatusProcessamento;
    status: 'OK' | 'Erro';
    codigo_erro?: CodigoErro;
    erros?: Array<{
      erro: string;
    }>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

/**
 * Response structure for operations that return IDs
 */
export interface TinyIdResponse extends TinyBaseResponse {
  retorno: {
    status_processamento: StatusProcessamento;
    status: 'OK' | 'Erro';
    codigo_erro?: CodigoErro;
    erros?: Array<{
      erro: string;
    }>;
    registros?: {
      registro: {
        sequencia?: number;
        id: number;
      };
    };
  };
}
