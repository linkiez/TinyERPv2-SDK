import { TinyPaginatedRequest } from '../BaseRequest';
import { TinyListResponse } from '../BaseResponse';

/**
 * Request to search accounts payable
 */
export interface ContaPagarPesquisarRequest extends TinyPaginatedRequest {
  data_ini_emissao?: string; // dd/mm/YYYY
  data_fim_emissao?: string; // dd/mm/YYYY
  data_ini_vencimento?: string; // dd/mm/YYYY
  data_fim_vencimento?: string; // dd/mm/YYYY
  situacao?: 'aberto' | 'pago' | 'cancelada' | 'parcial';
  nome_cliente?: string;
  numero_doc?: string;
}

/**
 * Account payable summary data from search
 */
export interface ContaPagarResumo {
  id: number;
  nome_cliente: string;
  historico: string;
  numero_doc: string;
  data_vencimento: string; // dd/mm/YYYY
  data_emissao: string; // dd/mm/YYYY
  valor: number;
  saldo: number;
  situacao: 'aberto' | 'pago' | 'cancelado' | 'parcial';
}

/**
 * Response from search accounts payable endpoint
 */
export interface ContaPagarPesquisarResponse extends TinyListResponse<ContaPagarResumo> {
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
      conta: ContaPagarResumo;
    }>;
  };
}
