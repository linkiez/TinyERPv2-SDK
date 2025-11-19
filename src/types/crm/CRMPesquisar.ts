import { TinySearchRequest } from '../BaseRequest';
import { TinyListResponse } from '../BaseResponse';

/**
 * Request to search CRM subjects
 */
export interface CRMPesquisarRequest extends TinySearchRequest {
  pesquisa?: string;
  id_estagio?: number;
  id_vendedor?: number;
}

/**
 * CRM subject summary data from search
 */
export interface CRMAssuntoResumo {
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
}

/**
 * Response from search CRM subjects endpoint
 */
export interface CRMPesquisarResponse extends TinyListResponse<CRMAssuntoResumo> {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    numero_paginas: number;
    pagina: number;
    assuntos: Array<{
      assunto: CRMAssuntoResumo;
    }>;
  };
}
