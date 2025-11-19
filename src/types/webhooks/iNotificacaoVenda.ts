/*
Notificações de vendas
Informa ao integrador quando um Pedido de Venda é criado ou alterado.

Configurações
1
Acesse Menu → Configurações → Aba Geral → Outras configurações → Webhooks.

2
Ative a opção Receber notificações de vendas.

3
Informe a URL em que deseja receber as notificações no campo URL da notificação de pedidos.
*/
export default interface INotificacaoVenda {
  versao: string; // Versão do Webhook
  cnpj: string; // CNPJ/CPF da conta Tiny que está enviando o payload
  tipo: 'inclusao_pedido' | 'atualizacao_pedido'; // Identificador do tipo de atualização: "inclusao_pedido" ou "atualizacao_pedido"
  dados: {
    // Elemento utilizado para representar os dados enviados pelo webhook
    id: number; // Identificador do pedido de venda no Tiny
    numero: number; // Número do pedido de venda no Tiny
    data: string; // Data do pedido de venda no formato dd/mm/YYYY
    idPedidoEcommerce?: string; // Identificador do pedido no integrador
    codigoSituacao: // Código da situação do pedido
    | 'aberto'
      | 'aprovado'
      | 'preparando_envio'
      | 'faturado'
      | 'pronto_envio'
      | 'enviado'
      | 'entregue'
      | 'nao_entregue'
      | 'cancelado';
    descricaoSituacao: // Descrição da situação do pedido
    | 'Em aberto'
      | 'Aprovado'
      | 'Preparando envio'
      | 'Faturado (atendido)'
      | 'Pronto para envio'
      | 'Enviado'
      | 'Entregue'
      | 'Não entregue'
      | 'Cancelado';
    idContato: number; // Identificador do cliente do pedido.
    idNotaFiscal?: number; // Identificador da nota fiscal vinculada ao pedido.
    nomeEcommerce?: string; // Nome do integrador vinculado ao pedido
    formaEnvio?: {
      // Elemento utilizado para representar a forma de envio.
      id?: string; // Identificador da forma de envio
      descricao?: string; // Descrição da forma de envio
    };
    cliente: {
      //Elemento utilizado para representar o cliente
      nome: string; // Nome do cliente
      cpfCnpj: string; // CPF/CNPJ do cliente
    };
  };
}
/*
Confirmação de recebimento
Para confirmar o recebimento da notificação na URL configurada, o webhook deverá retornar o status HTTP 200. Caso o sistema integrado não retorne o status de recebimento, o payload será enviado novamente.

O Tiny enviará o payload ao integrador até, no máximo, 10 vezes, com delay progressivo, aumentando em 5 minutos a cada tentativa.
*/
