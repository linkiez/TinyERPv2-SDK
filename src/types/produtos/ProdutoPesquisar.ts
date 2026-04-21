import { TinySearchRequest } from '../BaseRequest';
import { TinyListResponse } from '../BaseResponse';

/**
 * Request to search products
 */
export interface ProdutoPesquisarRequest extends TinySearchRequest {
  pesquisa?: string;
  idTag?: number;
  idListaPreco?: number;
  gtin?: string;
  situacao?: 'A' | 'I' | 'E';
  dataCriacao?: string;
}

/**
 * Product summary data from search
 */
export interface ProdutoResumo {
  id: number;
  codigo: string;
  nome: string;
  preco: number;
  preco_promocional: number;
  unidade: string;
  tipo: 'P' | 'E' | 'S'; // P=Produto, E=Produto sob Encomenda, S=Serviço
  situacao: 'A' | 'I'; // A=Ativo, I=Inativo
  classe_ipi: string;
  saldo: number;
  url_image: string;
  kit?: string;
  categoria?: string;
}

/**
 * Response from search products endpoint
 */
export interface ProdutoPesquisarResponse extends TinyListResponse<ProdutoResumo> {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    numero_paginas: number;
    pagina: number;
    produtos: Array<{
      produto: ProdutoResumo;
    }>;
  };
}
