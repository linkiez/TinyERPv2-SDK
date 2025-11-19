import { TinyBaseRequest } from '../BaseRequest';
import { TinyBaseResponse } from '../BaseResponse';

/**
 * Request to update CRM subject stage
 */
export interface CRMAlterarEstagioAssuntoRequest extends TinyBaseRequest {
  id: number;
  id_estagio: number;
}

/**
 * Response from update CRM subject stage endpoint
 */
export interface CRMAlterarEstagioAssuntoResponse extends TinyBaseResponse {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
  };
}
