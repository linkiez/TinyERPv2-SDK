import { TinyBaseRequest } from '../BaseRequest';
import { TinySingleResponse } from '../BaseResponse';

/**
 * Request to get contact details
 */
export interface ContatoObterRequest extends TinyBaseRequest {
  id: number;
}

/**
 * Contact detailed data
 */
export interface ContatoDetalhado {
  id: number;
  codigo: string;
  nome: string;
  fantasia: string;
  tipo_pessoa: 'F' | 'J';
  cpf_cnpj: string;
  ie: string;
  rg: string;
  im: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
  pais: string;
  fone: string;
  celular: string;
  fax: string;
  email: string;
  site: string;
  contato: string;
  obs: string;
  id_lista_preco: number;
  id_vendedor: number;
  nome_vendedor: string;
  situacao: 'A' | 'I'; // A = Ativo, I = Inativo
  clientePossuiIE: 'S' | 'N';
  contribuinte: '1' | '2' | '9'; // 1=Contribuinte ICMS, 2=Contribuinte isento, 9=Não Contribuinte
  tipo_negocio: string;
  emails_adicionais: Array<{
    email: string;
  }>;
  tags: Array<{
    tag: string;
  }>;
  ids_categorias_produtos: Array<{
    id: number;
  }>;
  contatos_adicionais: Array<{
    nome: string;
    email: string;
    fone: string;
  }>;
  enderecos_adicionais: Array<{
    tipo: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    uf: string;
    pais: string;
  }>;
}

/**
 * Response from get contact endpoint
 */
export interface ContatoObterResponse extends TinySingleResponse<ContatoDetalhado> {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    contato: ContatoDetalhado;
  };
}
