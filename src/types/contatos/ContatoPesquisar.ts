import { TinySearchRequest } from '../BaseRequest';
import { TinyListResponse } from '../BaseResponse';

/**
 * Request to search contacts
 */
export interface ContatoPesquisarRequest extends TinySearchRequest {
  pesquisa?: string;
  tipo?: 'F' | 'J'; // F = Pessoa Física, J = Pessoa Jurídica
  tags?: string; // Comma separated tags
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
