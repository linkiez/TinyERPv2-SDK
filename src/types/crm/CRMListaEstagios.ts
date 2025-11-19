import { TinyBaseRequest } from '../BaseRequest';
import { TinyListResponse } from '../BaseResponse';

/**
 * CRM stage data
 */
export interface CRMEstagio {
  id: number;
  nome: string;
  ordem: number;
}

/**
 * Request to list CRM stages
 */
export type CRMListaEstagiosRequest = TinyBaseRequest;

/**
 * Response from list CRM stages endpoint
 */
export interface CRMListaEstagiosResponse extends TinyListResponse<CRMEstagio> {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    estagios: Array<{
      estagio: CRMEstagio;
    }>;
  };
}
