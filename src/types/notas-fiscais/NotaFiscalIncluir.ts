import { TinyBaseRequest } from '../BaseRequest';
import { TinyIdResponse } from '../BaseResponse';

/**
 * Fiscal note item data for inclusion
 */
export interface NotaFiscalItemIncluir {
  codigo?: string;
  descricao: string;
  unidade: string;
  quantidade: number;
  valor_unitario: number;
  tipo: 'P' | 'S'; // P=Produto, S=Serviço
  ncm?: string;
  origem?: string;
  gtin?: string;
  id_produto?: number;
}

/**
 * Fiscal note parcel data for inclusion
 */
export interface NotaFiscalParcelaIncluir {
  dias?: number;
  data: string; // dd/mm/YYYY
  valor: number;
  forma_pagamento?: string;
  meio_pagamento?: string;
}

/**
 * Fiscal note data for inclusion
 */
export interface NotaFiscalIncluirDados {
  sequencia?: number;
  tipo_nota: 'E' | 'S'; // E=Entrada, S=Saída
  natureza_operacao: string;
  data_emissao?: string; // dd/mm/YYYY
  data_saida?: string; // dd/mm/YYYY
  hora_saida?: string; // HH:MM:SS
  id_vendedor?: number;
  nome_vendedor?: string;
  id_contato?: number;
  nome?: string;
  tipo_pessoa?: 'F' | 'J';
  cpf_cnpj?: string;
  ie?: string;
  endereco?: string;
  numero_endereco?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  fone?: string;
  email?: string;
  itens: Array<{
    item: NotaFiscalItemIncluir;
  }>;
  parcelas?: Array<{
    parcela: NotaFiscalParcelaIncluir;
  }>;
  transporte?: {
    transportador?: string;
    frete_por_conta?: '0' | '1' | '2' | '9'; // 0=Sem frete, 1=Por conta do emitente, 2=Por conta do destinatário, 9=Sem transporte
    quantidade_volumes?: number;
    peso_bruto?: number;
    peso_liquido?: number;
  };
  valor_frete?: number;
  valor_desconto?: number;
  valor_despesas?: number;
  obs?: string;
  obs_contribuinte?: string;
  id_pedido?: number;
}

/**
 * Request to include fiscal note
 */
export interface NotaFiscalIncluirRequest extends TinyBaseRequest {
  nota: {
    notas: Array<{
      nota: NotaFiscalIncluirDados;
    }>;
  };
}

/**
 * Response from include fiscal note endpoint
 */
export interface NotaFiscalIncluirResponse extends TinyIdResponse {
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
