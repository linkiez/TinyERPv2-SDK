import { TinyListResponse } from '../BaseResponse';

/**
 * Request to search contacts
 */
export interface ContatoPesquisarRequest{
  /** Chave gerada para identificar sua empresa */
  token: string;
  /** Nome ou código (ou parte) do contato que deseja consultar */
  pesquisa: string;
  /** Formato do retorno (json) - obrigatório */
  formato: string;
  /** CPF ou CNPJ do contato que deseja consultar */
  cpf_cnpj?: string;
  /** Número de identificação do vendedor na Olist. Caso o vendedor não seja localizado na Olist a consulta não retornará registros. */
  idVendedor?: number;
  /** Nome do vendedor na Olist. Caso o vendedor não seja localizado na Olist a consulta não retornará registros. Este valor será desconsiderado caso seja informado valor para o parâmetro idVendedor. */
  nomeVendedor?: string;
  /** Situação do contato (Ativo ou Excluido). Caso não seja enviado valor neste parâmetro todas as situações serão consideradas. */
  situacao?: string;
  /** Número da página de contatos que deseja obter (por padrão são listados 100 registros por página), caso não seja informado o valor padrão é 1. */
  pagina?: number;
  /** Data de criação do contato. Formato dd/mm/aaaa hh:mm:ss */
  dataCriacao?: string;
  /** Data mínima de atualização do contato. Formato dd/mm/aaaa hh:mm:ss */
  dataMinimaAtualizacao?: string;
}

/**
 * Contact summary data from search
 */
export interface ContatoResumo {
  id: number;
  codigo: string;
  nome: string;
  tipo_pessoa: 'F' | 'J';
  cpf_cnpj: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
  fone: string;
  email: string;
}

/**
 * Response from search contacts endpoint
 */
export interface ContatoPesquisarResponse extends TinyListResponse<ContatoResumo> {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    numero_paginas: number;
    pagina: number;
    contatos: Array<{
      contato: ContatoResumo;
    }>;
  };
}
