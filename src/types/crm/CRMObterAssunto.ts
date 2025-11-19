import { TinyBaseRequest } from '../BaseRequest';
import { TinySingleResponse } from '../BaseResponse';

/**
 * Request to get CRM subject details
 */
export interface CRMObterAssuntoRequest extends TinyBaseRequest {
  id: number;
}

/**
 * CRM action data
 */
export interface CRMAcao {
  id: number;
  descricao: string;
  data_prevista: string; // dd/mm/YYYY
  data_conclusao?: string; // dd/mm/YYYY
  situacao: 'A' | 'C'; // A=Aberta, C=Concluída
  id_vendedor: number;
  nome_vendedor: string;
}

/**
 * CRM subject detailed data
 */
export interface CRMAssuntoDetalhado {
  id: number;
  titulo: string;
  descricao: string;
  id_contato: number;
  nome_contato: string;
  id_vendedor: number;
  nome_vendedor: string;
  id_estagio: number;
  nome_estagio: string;
  valor: number;
  data_inicio: string; // dd/mm/YYYY
  data_prevista: string; // dd/mm/YYYY
  situacao: 'A' | 'F' | 'P'; // A=Aberto, F=Fechado, P=Perdido
  acoes?: Array<{
    acao: CRMAcao;
  }>;
}

/**
 * Response from get CRM subject endpoint
 */
export interface CRMObterAssuntoResponse extends TinySingleResponse<CRMAssuntoDetalhado> {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    assunto: CRMAssuntoDetalhado;
  };
}
