import { TinyBaseRequest } from '../BaseRequest';
import { TinyIdResponse } from '../BaseResponse';

/**
 * CRM subject data for inclusion
 */
export interface CRMAssuntoIncluirDados {
  sequencia?: number;
  titulo: string;
  descricao?: string;
  id_contato: number;
  id_vendedor: number;
  id_estagio: number;
  valor?: number;
  data_inicio?: string; // dd/mm/YYYY
  data_prevista?: string; // dd/mm/YYYY
}

/**
 * Request to include CRM subject
 */
export interface CRMIncluirAssuntoRequest extends TinyBaseRequest {
  assunto: {
    assuntos: Array<{
      assunto: CRMAssuntoIncluirDados;
    }>;
  };
}

/**
 * Response from include CRM subject endpoint
 */
export interface CRMIncluirAssuntoResponse extends TinyIdResponse {
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
        id: number;
      };
    };
  };
}
