import { TinyBaseRequest } from '../BaseRequest';
import { TinyBaseResponse } from '../BaseResponse';

/**
 * Request to emit fiscal note
 */
export interface NotaFiscalEmitirRequest extends TinyBaseRequest {
  id: number;
}

/**
 * Response from emit fiscal note endpoint
 */
export interface NotaFiscalEmitirResponse extends TinyBaseResponse {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    registros?: {
      registro: {
        id: number;
        numero: number;
        serie: string;
        chave_acesso: string;
        protocolo_autorizacao: string;
        data_autorizacao: string;
        situacao: string;
      };
    };
  };
}
