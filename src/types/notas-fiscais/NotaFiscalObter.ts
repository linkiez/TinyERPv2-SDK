import { TinyBaseRequest } from '../BaseRequest';
import { TinySingleResponse } from '../BaseResponse';

/**
 * Request to get fiscal note details
 */
export interface NotaFiscalObterRequest extends TinyBaseRequest {
  id: number;
}

/**
 * Fiscal note item data
 */
export interface NotaFiscalItem {
  item: {
    codigo: string;
    descricao: string;
    unidade: string;
    quantidade: number;
    valor_unitario: number;
    valor_desconto: number;
    tipo: 'P' | 'S'; // P=Produto, S=Serviço
    ncm: string;
    origem: string;
    gtin: string;
    gtin_embalagem: string;
    id_produto: number;
  };
}

/**
 * Fiscal note parcel data
 */
export interface NotaFiscalParcela {
  parcela: {
    dias: number;
    data: string; // dd/mm/YYYY
    valor: number;
    forma_pagamento: string;
    meio_pagamento: string;
  };
}

/**
 * Fiscal note detailed data
 */
export interface NotaFiscalDetalhada {
  id: number;
  numero: number;
  serie: string;
  data_emissao: string; // dd/mm/YYYY
  data_saida: string; // dd/mm/YYYY
  hora_saida: string; // HH:MM:SS
  situacao: string;
  tipo_nota: 'E' | 'S';
  id_natureza_operacao: number;
  natureza_operacao: string;
  id_vendedor: number;
  nome_vendedor: string;
  id_contato: number;
  nome_contato: string;
  tipo_pessoa: 'F' | 'J';
  cpf_cnpj: string;
  ie: string;
  endereco: string;
  numero_endereco: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  fone: string;
  valor_nota: number;
  valor_desconto: number;
  valor_frete: number;
  valor_despesas: number;
  valor_total: number;
  chave_acesso: string;
  id_pedido: number;
  numero_pedido: number;
  itens: NotaFiscalItem[];
  parcelas?: NotaFiscalParcela[];
  transporte?: {
    transportador: string;
    quantidade_volumes: number;
    peso_bruto: number;
    peso_liquido: number;
  };
  obs: string;
}

/**
 * Response from get fiscal note endpoint
 */
export interface NotaFiscalObterResponse extends TinySingleResponse<NotaFiscalDetalhada> {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    nota_fiscal: NotaFiscalDetalhada;
  };
}
