import { TinyBaseRequest } from '../BaseRequest';
import { TinyBaseResponse } from '../BaseResponse';

/**
 * Request to update order status
 */
export interface PedidoAlterarSituacaoRequest extends TinyBaseRequest {
  id: number;
  situacao:
    | 'aberto'
    | 'aprovado'
    | 'preparando_envio'
    | 'faturado'
    | 'pronto_envio'
    | 'enviado'
    | 'entregue'
    | 'nao_entregue'
    | 'cancelado';
}

/**
 * Response from update order status endpoint
 */
export interface PedidoAlterarSituacaoResponse extends TinyBaseResponse {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
  };
}
