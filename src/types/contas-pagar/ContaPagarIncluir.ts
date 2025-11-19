import { TinyBaseRequest } from '../BaseRequest';
import { TinyIdResponse } from '../BaseResponse';

/**
 * Account payable data for inclusion
 */
export interface ContaPagarIncluirDados {
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
  id_fornecedor?: number;
  categoria?: string;
  tags?: Array<{
    tag: string;
  }>;
}

/**
 * Request to include account payable
 */
export interface ContaPagarIncluirRequest extends TinyBaseRequest {
  conta: {
    contas: Array<{
      conta: ContaPagarIncluirDados;
    }>;
  };
}

/**
 * Response from include account payable endpoint
 */
export interface ContaPagarIncluirResponse extends TinyIdResponse {
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
