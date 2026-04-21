import { TinySearchRequest } from '../BaseRequest';
import { TinyListResponse } from '../BaseResponse';

/**
 * Request to search fiscal notes
 */
export interface NotaFiscalPesquisarRequest extends TinySearchRequest {
  dataInicial?: string; // dd/mm/YYYY
  dataFinal?: string; // dd/mm/YYYY
  cliente?: string;
  cpf_cnpj?: string;
  numero?: string;
  situacao?: string;
  tipoNota?: 'E' | 'S'; // E=Entrada, S=Saída
  numeroEcommerce?: string;
  idVendedor?: number;
  idFormaEnvio?: number;
  nomeVendedor?: string;
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
  tipo?: 'E' | 'S';
  tipo_nota?: 'E' | 'S';
  nome?: string;
  cliente?: {
    nome: string;
    tipo_pessoa?: string;
    cpf_cnpj?: string;
    ie?: string;
    endereco?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cep?: string;
    cidade?: string;
    uf?: string;
    fone?: string;
    email?: string;
  };
  valor?: number;
  chave_acesso: string;
  numero_pedido?: number;
  id_pedido?: number;
  numero_ecommerce?: string;
  id_vendedor?: number;
  nome_vendedor?: string;
  descricao_situacao?: string;
  id_forma_envio?: string;
  codigo_rastreamento?: string;
  url_rastreamento?: string;
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
