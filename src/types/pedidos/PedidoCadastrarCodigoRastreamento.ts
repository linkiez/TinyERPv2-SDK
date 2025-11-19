import { TinyBaseRequest } from '../BaseRequest';
import { TinyBaseResponse } from '../BaseResponse';

/**
 * Request to update order shipping information
 */
export interface PedidoCadastrarCodigoRastreamentoRequest extends TinyBaseRequest {
  id: number;
  codigo_rastreamento: string;
  data_envio?: string; // dd/mm/YYYY
  url_rastreamento?: string;
}

/**
 * Response from update order shipping information endpoint
 */
export interface PedidoCadastrarCodigoRastreamentoResponse extends TinyBaseResponse {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
  };
}
