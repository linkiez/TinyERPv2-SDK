import { TinyBaseRequest } from '../BaseRequest';
import { TinySingleResponse } from '../BaseResponse';

/**
 * Request to get account information
 */
export type InfoObterRequest = TinyBaseRequest;

/**
 * Account information data
 */
export interface InfoData {
  id: number;
  nome: string;
  cpf_cnpj: string;
  ie: string;
  im: string;
  rg: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
  fone: string;
  email: string;
  inscricao: string;
  regime_tributario: string;
  tipo: string;
  situacao: string;
  certificado_digital: string;
  certificado_validade: string;
}

/**
 * Response from get account information endpoint
 */
export interface InfoObterResponse extends TinySingleResponse<InfoData> {
  retorno: {
    status_processamento: number;
    status: 'OK' | 'Erro';
    codigo_erro?: number;
    erros?: Array<{
      erro: string;
    }>;
    conta: InfoData;
  };
}
