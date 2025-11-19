import { TinyBaseRequest } from '../BaseRequest';

/**
 * Request to generate production order from sales order
 */
export interface PedidoGerarOrdemProducaoRequest extends TinyBaseRequest {
  id: number;
}

/**
 * Response from generate production order endpoint
 */
export interface PedidoGerarOrdemProducaoResponse {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    registros?: {
      registro: {
        id_ordem_producao: number;
      };
    };
  };
}
