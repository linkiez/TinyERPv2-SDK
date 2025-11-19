import { TinyBaseRequest } from '../BaseRequest';
import { TinyIdResponse } from '../BaseResponse';

/**
 * Product data for inclusion
 */
export interface ProdutoIncluirDados {
  sequencia?: number;
  codigo?: string;
  nome: string;
  unidade: string;
  preco: number;
  preco_promocional?: number;
  preco_custo?: number;
  ncm?: string;
  origem?: string;
  gtin?: string;
  gtin_embalagem?: string;
  localizacao?: string;
  peso_liquido?: number;
  peso_bruto?: number;
  estoque_minimo?: number;
  estoque_maximo?: number;
  id_fornecedor?: number;
  codigo_fornecedor?: string;
  codigo_pelo_fornecedor?: string;
  unidade_por_caixa?: string;
  tipo?: 'P' | 'E' | 'S';
  classe_ipi?: string;
  valor_ipi_fixo?: number;
  cod_lista_servicos?: string;
  descricao_complementar?: string;
  garantia?: string;
  cest?: string;
  obs?: string;
  situacao?: 'A' | 'I';
  categoria?: string;
  anexos?: Array<{
    anexo: string; // base64 encoded file
  }>;
  imagens_externas?: Array<{
    url: string;
  }>;
  tags?: Array<{
    tag: string;
  }>;
}

/**
 * Request to include product
 */
export interface ProdutoIncluirRequest extends TinyBaseRequest {
  produto: {
    produtos: Array<{
      produto: ProdutoIncluirDados;
    }>;
  };
}

/**
 * Response from include product endpoint
 */
export interface ProdutoIncluirResponse extends TinyIdResponse {
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
