import { TinyBaseRequest } from '../BaseRequest';
import { TinyIdResponse } from '../BaseResponse';

/**
 * Account receivable data for inclusion
 */
export interface ContaReceberIncluirDados {
  sequencia?: number;
  id_conta_origem?: number;
  id_contato: number;
  historico: string;
  numero_documento?: string;
  competencia: string; // dd/mm/YYYY
  vencimento: string; // dd/mm/YYYY
  valor: number;
  forma_pagamento?: string;
  meio_pagamento?: string;
  id_vendedor?: number;
  id_cliente_fornecedor?: number;
  categoria?: string;
  tags?: Array<{
    tag: string;
  }>;
}

/**
 * Request to include account receivable
 */
export interface ContaReceberIncluirRequest extends TinyBaseRequest {
  conta: {
    contas: Array<{
      conta: ContaReceberIncluirDados;
    }>;
  };
}

/**
 * Response from include account receivable endpoint
 */
export interface ContaReceberIncluirResponse extends TinyIdResponse {
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
