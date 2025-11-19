import { CodigoErro } from '../CodigoErro';
import { StatusProcessamento } from '../StatusProcessamento';

export interface PedidoIncluirRetorno {
  retorno: {
    // Elemento raiz do retorno
    status_processamento: //Conforme tabela "Status de Processamento"
    StatusProcessamento;
    status: //Contém o status do retorno "OK" ou "Erro". Para o caso de conter erros estes serão descritos abaixo
    'OK' | 'Erro';
    codigo_erro: CodigoErro; //Conforme tabela "Códigos de erro"
    erros: [
      //Contém a lista dos erros encontrados.
      {
        erro: string; //Descrição do erro encontrado
      },
    ];
    registros: PedidoIncluirRetornoRegistro | PedidoIncluirRetornoRegistro[];
  };
}

export interface PedidoIncluirRetornoRegistro {
  registro: {
    sequencia: number;
    status: //Contém o status do retorno “OK” ou “Erro”. Para o caso de conter erros estes serão descritos abaixo
    'OK' | 'Erro';
    codigo_erro: CodigoErro; //Conforme tabela "Códigos de erro"
    erros: [
      //Contém a lista dos erros encontrados.
      {
        erro: string; //Descrição do erro encontrado
      },
    ];
    id: number; //Número de identificação do Pedido no Tiny
    numero: number; //Número do Pedido
  };
}
