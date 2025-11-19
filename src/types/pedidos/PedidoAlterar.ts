import { TinyBaseRequest } from '../BaseRequest';
import { TinyBaseResponse } from '../BaseResponse';

/**
 * Order data for inclusion (extracted from PedidoIncluir to avoid circular dependency)
 */
export interface PedidoIncluirDados {
  numero?: string;
  data_pedido?: string;
  data_prevista?: string;
  cliente?: any;
  itens?: any[];
  [key: string]: any;
}

/**
 * Order data for update (extends inclusion data with required ID)
 */
export interface PedidoAlterarDados extends Partial<PedidoIncluirDados> {
  id: number;
}

/**
 * Request to update order
 */
export interface PedidoAlterarRequest extends TinyBaseRequest {
  pedido: {
    pedidos: Array<{
      pedido: PedidoAlterarDados;
    }>;
  };
}

/**
 * Response from update order endpoint
 */
export interface PedidoAlterarResponse extends TinyBaseResponse {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    registros: {
      registro: {
        sequencia: number;
        status: 'OK' | 'Erro';
        codigo_erro?: number;
        erros?: Array<{
          erro: string;
        }>;
      };
    };
  };
}
