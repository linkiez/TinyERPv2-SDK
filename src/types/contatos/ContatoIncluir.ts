import { TinyBaseRequest } from '../BaseRequest';
import { TinyIdResponse } from '../BaseResponse';

/**
 * Contact data for inclusion
 */
export interface ContatoIncluirDados {
  sequencia?: number;
  codigo?: string;
  nome: string;
  fantasia?: string;
  tipo_pessoa: 'F' | 'J';
  cpf_cnpj: string;
  ie?: string;
  rg?: string;
  im?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  uf?: string;
  pais?: string;
  fone?: string;
  celular?: string;
  fax?: string;
  email?: string;
  site?: string;
  id_vendedor?: number;
  id_lista_preco?: number;
  situacao?: 'A' | 'I';
  contribuinte?: '1' | '2' | '9';
  clientePossuiIE?: 'S' | 'N';
  tipo_negocio?: string;
  obs?: string;
  emails_adicionais?: Array<{
    email: string;
  }>;
  tags?: Array<{
    tag: string;
  }>;
  contatos_adicionais?: Array<{
    nome: string;
    email?: string;
    fone?: string;
  }>;
  enderecos_adicionais?: Array<{
    tipo: string;
    endereco: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cep?: string;
    cidade?: string;
    uf?: string;
    pais?: string;
  }>;
  ids_categorias_produtos?: Array<{
    id: number;
  }>;
}

/**
 * Request to include contact
 */
export interface ContatoIncluirRequest extends TinyBaseRequest {
  contato: {
    contatos: Array<{
      contato: ContatoIncluirDados;
    }>;
  };
}

/**
 * Response from include contact endpoint
 */
export interface ContatoIncluirResponse extends TinyIdResponse {
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
