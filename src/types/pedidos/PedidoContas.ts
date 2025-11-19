import { TinyBaseRequest } from '../BaseRequest';
import { TinyBaseResponse } from '../BaseResponse';

/**
 * Request to post order accounts
 */
export interface PedidoLancarContasRequest extends TinyBaseRequest {
  id: number;
}

/**
 * Response from post order accounts endpoint
 */
export interface PedidoLancarContasResponse extends TinyBaseResponse {
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
 * Request to reverse order accounts
 */
export interface PedidoEstornarContasRequest extends TinyBaseRequest {
  id: number;
}

/**
 * Response from reverse order accounts endpoint
 */
export interface PedidoEstornarContasResponse extends TinyBaseResponse {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
  };
}
