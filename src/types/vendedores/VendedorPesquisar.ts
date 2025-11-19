import { TinySearchRequest } from '../BaseRequest';
import { TinyListResponse } from '../BaseResponse';

/**
 * Request to search sellers
 */
export interface VendedorPesquisarRequest extends TinySearchRequest {
  pesquisa?: string;
}

/**
 * Seller summary data from search
 */
export interface VendedorResumo {
  id: number;
  codigo: string;
  nome: string;
  cpf_cnpj: string;
  email: string;
  fone: string;
  situacao: 'A' | 'I'; // A=Ativo, I=Inativo
  usuarioSistema: 'S' | 'N'; // S=Sim, N=Não
}

/**
 * Response from search sellers endpoint
 */
export interface VendedorPesquisarResponse extends TinyListResponse<VendedorResumo> {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    numero_paginas: number;
    pagina: number;
    vendedores: Array<{
      vendedor: VendedorResumo;
    }>;
  };
}
