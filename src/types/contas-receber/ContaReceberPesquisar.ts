import { TinySearchRequest } from '../BaseRequest';
import { TinyListResponse } from '../BaseResponse';

/**
 * Request to search accounts receivable
 */
export interface ContaReceberPesquisarRequest extends TinySearchRequest {
  dataInicial?: string; // dd/mm/YYYY
  dataFinal?: string; // dd/mm/YYYY
  dataInicialVencimento?: string; // dd/mm/YYYY
  dataFinalVencimento?: string; // dd/mm/YYYY
  situacao?: 'aberto' | 'pago' | 'todos';
  idContato?: number;
  categoria?: string;
}

/**
 * Account receivable summary data from search
 */
export interface ContaReceberResumo {
  id: number;
  id_contato: number;
  nome_contato: string;
  numero_documento: string;
  historico: string;
  competencia: string; // dd/mm/YYYY
  vencimento: string; // dd/mm/YYYY
  valor: number;
  saldo: number;
  situacao: 'aberto' | 'pago';
  forma_pagamento: string;
  categoria: string;
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
    contas_receber: Array<{
      conta_receber: ContaReceberResumo;
    }>;
  };
}
