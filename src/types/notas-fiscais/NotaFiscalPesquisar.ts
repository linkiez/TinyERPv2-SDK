import { TinySearchRequest } from '../BaseRequest';
import { TinyListResponse } from '../BaseResponse';

/**
 * Request to search fiscal notes
 */
export interface NotaFiscalPesquisarRequest extends TinySearchRequest {
  dataInicial?: string; // dd/mm/YYYY
  dataFinal?: string; // dd/mm/YYYY
  dataEmissaoInicial?: string; // dd/mm/YYYY
  dataEmissaoFinal?: string; // dd/mm/YYYY
  numero?: string;
  serie?: string;
  idContato?: number;
  situacao?: string;
  tipoNota?: 'E' | 'S'; // E=Entrada, S=Saída
}

/**
 * Fiscal note summary data from search
 */
export interface NotaFiscalResumo {
  id: number;
  numero: number;
  serie: string;
  data_emissao: string;
  data_saida: string;
  situacao: string;
  tipo_nota: 'E' | 'S';
  id_contato: number;
  nome_contato: string;
  valor: number;
  chave_acesso: string;
  numero_pedido: number;
  id_pedido: number;
}

/**
 * Response from search fiscal notes endpoint
 */
export interface NotaFiscalPesquisarResponse extends TinyListResponse<NotaFiscalResumo> {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    numero_paginas: number;
    pagina: number;
    notas_fiscais: Array<{
      nota_fiscal: NotaFiscalResumo;
    }>;
  };
}
