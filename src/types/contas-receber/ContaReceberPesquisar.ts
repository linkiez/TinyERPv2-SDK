import { TinyPaginatedRequest } from '../BaseRequest';
import { TinyListResponse } from '../BaseResponse';

/**
 * Request to search accounts receivable
 */
export interface ContaReceberPesquisarRequest extends TinyPaginatedRequest {
  data_ini_emissao?: string; // dd/mm/YYYY
  data_fim_emissao?: string; // dd/mm/YYYY
  data_ini_vencimento?: string; // dd/mm/YYYY
  data_fim_vencimento?: string; // dd/mm/YYYY
  situacao?: 'aberto' | 'pago' | 'cancelada' | 'parcial';
  nome_cliente?: string;
  numero_doc?: string;
  numero_banco?: string;
  id_origem?: string;
}

/**
 * Account receivable summary data from search
 */
export interface ContaReceberResumo {
  id: number;
  nome_cliente: string;
  historico: string;
  numero_banco: string;
  numero_doc: string;
  serie_doc?: number;
  data_vencimento: string; // dd/mm/YYYY
  data_emissao: string; // dd/mm/YYYY
  valor: number;
  saldo: number;
  situacao: 'aberto' | 'pago' | 'cancelado' | 'parcial';
}

/**
 * Response from search accounts receivable endpoint
 */
export interface ContaReceberPesquisarResponse extends TinyListResponse<ContaReceberResumo> {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    numero_paginas: number;
    pagina: number;
    contas: Array<{
      conta: ContaReceberResumo;
    }>;
  };
}
