import { TinyBaseRequest } from '../BaseRequest';

/**
 * Request to generate fiscal note from sales order
 */
export interface PedidoGerarNotaFiscalRequest extends TinyBaseRequest {
  id: number;
}

/**
 * Response from generate fiscal note endpoint
 */
export interface PedidoGerarNotaFiscalResponse {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    registros?: {
      registro: {
        id_nota_fiscal: number;
      };
    };
  };
}
