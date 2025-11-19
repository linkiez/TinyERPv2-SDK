import { TinyBaseRequest } from '../BaseRequest';
import { TinySingleResponse } from '../BaseResponse';

/**
 * Request to get product stock
 */
export interface ProdutoEstoqueRequest extends TinyBaseRequest {
  id: number;
}

/**
 * Product stock by deposit data
 */
export interface ProdutoEstoqueDeposito {
  deposito: string;
  saldo: number;
}

/**
 * Product stock data
 */
export interface ProdutoEstoqueData {
  produto: {
    id: number;
    codigo: string;
    nome: string;
    saldo: number;
    depositos?: Array<{
      deposito: ProdutoEstoqueDeposito;
    }>;
  };
}

/**
 * Response from get product stock endpoint
 */
export interface ProdutoEstoqueResponse extends TinySingleResponse<ProdutoEstoqueData> {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    produto: ProdutoEstoqueData['produto'];
  };
}
