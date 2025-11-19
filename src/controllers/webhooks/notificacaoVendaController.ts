import INotificacaoVenda from '../../types/webhooks/iNotificacaoVenda';

/**
 * Handler for webhook notification
 * This is a sample implementation that needs to be adapted based on your framework
 *
 * Example usage with Express:
 * ```typescript
 * app.post('/webhook/tinyerp', async (req, res) => {
 *   try {
 *     await notificacaoVenda(req.body);
 *     res.sendStatus(200);
 *   } catch (error) {
 *     console.error(error);
 *     res.sendStatus(500);
 *   }
 * });
 * ```
 */
export default async function notificacaoVenda(notificacao: INotificacaoVenda): Promise<void> {
  if (!notificacao) {
    throw new Error('Corpo da notificação esta vazia.');
  }

  if (notificacao.tipo !== 'atualizacao_pedido') {
    return;
  }

  const { dados } = notificacao;

  // Your business logic here
  switch (dados.codigoSituacao) {
    case 'aberto':
      // Handle open order
      break;
    case 'aprovado':
      // Handle approved order
      break;
    case 'preparando_envio':
      // Handle preparing shipment
      break;
    case 'faturado':
      // Handle invoiced
      break;
    case 'pronto_envio':
      // Handle ready to ship
      break;
    case 'enviado':
      // Handle shipped
      break;
    case 'entregue':
      // Handle delivered
      break;
    case 'nao_entregue':
      // Handle not delivered
      break;
    case 'cancelado':
      // Handle cancelled
      break;
  }
}
