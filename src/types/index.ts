export * from './BaseRequest';
export * from './BaseResponse';
export * from './CodigoErro';
export * from './StatusProcessamento';
export * from './contas-pagar';
export * from './contas-receber';
export * from './contatos';
export * from './crm';
export * from './info';
export * from './notas-fiscais';
export * from './pedidos';
export * from './produtos';
export * from './vendedores';
export * from './webhooks';

// Base types
export * from './BaseRequest';
export * from './BaseResponse';
export * from './CodigoErro';
export * from './StatusProcessamento';

// Info (Account data)
export * from './info/InfoObter';

// Contacts
export * from './contatos/ContatoPesquisar';
export * from './contatos/ContatoObter';
export * from './contatos/ContatoIncluir';
export * from './contatos/ContatoAlterar';

// Products
export * from './produtos/ProdutoPesquisar';
export * from './produtos/ProdutoObter';
export * from './produtos/ProdutoIncluir';
export * from './produtos/ProdutoAlterar';
export * from './produtos/ProdutoEstoque';

// Sellers
export * from './vendedores/VendedorPesquisar';

// CRM
export * from './crm/CRMPesquisar';
export * from './crm/CRMObterAssunto';
export * from './crm/CRMIncluirAssunto';
export * from './crm/CRMAlterarEstagioAssunto';
export * from './crm/CRMListaEstagios';

// Orders
export * from './pedidos/PedidoIncluirRetorno';
export * from './pedidos/PedidoAlterar';
export * from './pedidos/PedidoGerarOrdemProducao';
export * from './pedidos/PedidoGerarNotaFiscal';
export * from './pedidos/PedidoAlterarSituacao';
export * from './pedidos/PedidoMarcadores';
export * from './pedidos/PedidoEstoque';
export * from './pedidos/PedidoContas';
export * from './pedidos/PedidoCadastrarCodigoRastreamento';

// Fiscal Notes
export * from './notas-fiscais/NotaFiscalPesquisar';
export * from './notas-fiscais/NotaFiscalObter';
export * from './notas-fiscais/NotaFiscalIncluir';
export * from './notas-fiscais/NotaFiscalEmitir';

// Accounts Receivable
export * from './contas-receber/ContaReceberIncluir';
export * from './contas-receber/ContaReceberPesquisar';

// Accounts Payable
export * from './contas-pagar/ContaPagarIncluir';
export * from './contas-pagar/ContaPagarPesquisar';

// Webhooks
export * from './webhooks/iNotificacaoVenda';
