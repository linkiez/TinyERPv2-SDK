import { TinyBaseRequest } from '../BaseRequest';
import { TinySingleResponse } from '../BaseResponse';

/**
 * Request to get product details
 */
export interface ProdutoObterRequest extends TinyBaseRequest {
  id: number;
}

/**
 * Product image data
 */
export interface ProdutoImagem {
  url: string;
}

/**
 * Product variation data
 */
export interface ProdutoVariacao {
  id: number;
  codigo: string;
  grade?: {
    Cor?: string;
    Tamanho?: string;
    [key: string]: string | undefined;
  };
  preco: number;
  estoque: number;
}

/**
 * Product detailed data
 */
export interface ProdutoDetalhado {
  id: number;
  codigo: string;
  nome: string;
  unidade: string;
  preco: number;
  preco_promocional: number;
  preco_custo: number;
  preco_custo_medio: number;
  ncm: string;
  origem: string;
  gtin: string;
  gtin_embalagem: string;
  localizacao: string;
  peso_liquido: number;
  peso_bruto: number;
  estoque_minimo: number;
  estoque_maximo: number;
  id_fornecedor: number;
  nome_fornecedor: string;
  codigo_fornecedor: string;
  codigo_pelo_fornecedor: string;
  unidade_por_caixa: string;
  tipo: 'P' | 'E' | 'S';
  situacao: 'A' | 'I';
  classe_ipi: string;
  valor_ipi_fixo: number;
  cod_lista_servicos: string;
  descricao_complementar: string;
  garantia: string;
  cest: string;
  obs: string;
  tipoVariacao?: 'V' | 'E'; // V=Variação, E=Produto com Grade
  variacoes?: Array<{
    variacao: ProdutoVariacao;
  }>;
  grade?: {
    [key: string]: string[];
  };
  anexos?: Array<{
    anexo: string;
  }>;
  imagens_externas?: Array<{
    imagem_externa: ProdutoImagem;
  }>;
  categoria?: string;
  tags?: Array<{
    tag: string;
  }>;
  id_categoria: number;
}

/**
 * Response from get product endpoint
 */
export interface ProdutoObterResponse extends TinySingleResponse<ProdutoDetalhado> {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    produto: ProdutoDetalhado;
  };
}
