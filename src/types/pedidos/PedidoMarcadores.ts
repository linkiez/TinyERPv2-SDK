import { TinyBaseRequest } from '../BaseRequest';
import { TinyBaseResponse } from '../BaseResponse';

/**
 * Request to add markers to order
 */
export interface PedidoMarcadoresIncluirRequest extends TinyBaseRequest {
  id: number;
  marcadores: Array<{
    marcador: string;
  }>;
}

/**
 * Response from add markers to order endpoint
 */
export interface PedidoMarcadoresIncluirResponse extends TinyBaseResponse {
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
 * Request to remove markers from order
 */
export interface PedidoMarcadoresRemoverRequest extends TinyBaseRequest {
  id: number;
  marcadores: Array<{
    marcador: string;
  }>;
}

/**
 * Response from remove markers from order endpoint
 */
export interface PedidoMarcadoresRemoverResponse extends TinyBaseResponse {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
  };
}
