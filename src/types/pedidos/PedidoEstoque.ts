import { TinyBaseRequest } from '../BaseRequest';
import { TinyBaseResponse } from '../BaseResponse';

/**
 * Request to post order stock
 */
export interface PedidoLancarEstoqueRequest extends TinyBaseRequest {
  id: number;
  estoque?: string; // deposit name (optional)
}

/**
 * Response from post order stock endpoint
 */
export interface PedidoLancarEstoqueResponse extends TinyBaseResponse {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
  };
}

/**
 * Request to reverse order stock
 */
export interface PedidoEstornarEstoqueRequest extends TinyBaseRequest {
  id: number;
}

/**
 * Response from reverse order stock endpoint
 */
export interface PedidoEstornarEstoqueResponse extends TinyBaseResponse {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
  };
}
