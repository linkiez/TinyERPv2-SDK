import { TinyBaseRequest } from '../BaseRequest';
import { TinyBaseResponse } from '../BaseResponse';
import { ContatoIncluirDados } from './ContatoIncluir';

/**
 * Contact data for update (extends inclusion data with required ID)
 */
export interface ContatoAlterarDados extends ContatoIncluirDados {
  id: number;
}

/**
 * Request to update contact
 */
export interface ContatoAlterarRequest extends TinyBaseRequest {
  contato: {
    contatos: Array<{
      contato: ContatoAlterarDados;
    }>;
  };
}

/**
 * Response from update contact endpoint
 */
export interface ContatoAlterarResponse extends TinyBaseResponse {
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
