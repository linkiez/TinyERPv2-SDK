import { TinyBaseRequest } from '../BaseRequest';
import { TinyBaseResponse } from '../BaseResponse';
import { ProdutoIncluirDados } from './ProdutoIncluir';

/**
 * Product data for update (extends inclusion data with required ID)
 */
export interface ProdutoAlterarDados extends ProdutoIncluirDados {
  id: number;
}

/**
 * Request to update product
 */
export interface ProdutoAlterarRequest extends TinyBaseRequest {
  produto: {
    produtos: Array<{
      produto: ProdutoAlterarDados;
    }>;
  };
}

/**
 * Response from update product endpoint
 */
export interface ProdutoAlterarResponse extends TinyBaseResponse {
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
      };
    };
  };
}
