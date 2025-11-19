import notificacaoVenda from './controllers/webhooks/notificacaoVendaController';
import {
  ContaPagarIncluirRequest,
  ContaPagarIncluirResponse,
  ContaPagarPesquisarRequest,
  ContaPagarPesquisarResponse,
  ContaReceberIncluirRequest,
  ContaReceberIncluirResponse,
  ContaReceberPesquisarRequest,
  ContaReceberPesquisarResponse,
  ContatoAlterarRequest,
  ContatoAlterarResponse,
  ContatoIncluirRequest,
  ContatoIncluirResponse,
  ContatoObterRequest,
  ContatoObterResponse,
  ContatoPesquisarRequest,
  ContatoPesquisarResponse,
  CRMAlterarEstagioAssuntoRequest,
  CRMAlterarEstagioAssuntoResponse,
  CRMIncluirAssuntoRequest,
  CRMIncluirAssuntoResponse,
  CRMListaEstagiosResponse,
  CRMObterAssuntoRequest,
  CRMObterAssuntoResponse,
  CRMPesquisarRequest,
  CRMPesquisarResponse,
  InfoObterResponse,
  NotaFiscalEmitirRequest,
  NotaFiscalEmitirResponse,
  NotaFiscalIncluirRequest,
  NotaFiscalIncluirResponse,
  NotaFiscalObterRequest,
  NotaFiscalObterResponse,
  NotaFiscalPesquisarRequest,
  NotaFiscalPesquisarResponse,
  PedidoAlterarRequest,
  PedidoAlterarResponse,
  PedidoAlterarSituacaoRequest,
  PedidoAlterarSituacaoResponse,
  PedidoCadastrarCodigoRastreamentoRequest,
  PedidoCadastrarCodigoRastreamentoResponse,
  PedidoEstornarContasRequest,
  PedidoEstornarContasResponse,
  PedidoEstornarEstoqueRequest,
  PedidoEstornarEstoqueResponse,
  PedidoGerarNotaFiscalRequest,
  PedidoGerarNotaFiscalResponse,
  PedidoGerarOrdemProducaoRequest,
  PedidoGerarOrdemProducaoResponse,
  PedidoLancarContasRequest,
  PedidoLancarContasResponse,
  PedidoLancarEstoqueRequest,
  PedidoLancarEstoqueResponse,
  PedidoMarcadoresIncluirRequest,
  PedidoMarcadoresIncluirResponse,
  PedidoMarcadoresRemoverRequest,
  PedidoMarcadoresRemoverResponse,
  ProdutoAlterarRequest,
  ProdutoAlterarResponse,
  ProdutoEstoqueRequest,
  ProdutoEstoqueResponse,
  ProdutoIncluirRequest,
  ProdutoIncluirResponse,
  ProdutoObterRequest,
  ProdutoObterResponse,
  ProdutoPesquisarRequest,
  ProdutoPesquisarResponse,
  VendedorPesquisarRequest,
  VendedorPesquisarResponse,
} from './types';

export * from './controllers';
export * from './types';

/**
 * TinyERP API Integration Service
 *
 * This service provides methods to interact with TinyERP API v2
 * All endpoints are organized by modules matching the API documentation
 */
export const TinyERPv2 = {
  /**
   * Base method for making POST requests to Tiny ERP API
   *
   * @param url - Full API endpoint URL
   * @param dados - URL-encoded form data
   * @returns Promise with API response
   */
  postData: async function <T = unknown>(url = '', dados?: string): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: dados,
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return (await response.json()) as T;
  },

  // ==================== INFO MODULE ====================

  /**
   * Get account information
   * Endpoint: /info.obter.php
   *
   * @param token - TinyERP API token
   * @returns Account information
   */
  infoObter: async function (token: string): Promise<InfoObterResponse> {
    return this.postData<InfoObterResponse>(
      `https://api.tiny.com.br/api2/info.obter.php?token=${token}&formato=JSON`,
    );
  },

  // ==================== CONTATOS MODULE ====================

  /**
   * Search contacts
   * Endpoint: /contatos.pesquisa.php
   *
   * @param request - Search parameters
   * @param token - TinyERP API token
   * @returns List of contacts
   */
  contatosPesquisar: async function (
    request: ContatoPesquisarRequest,
    token: string,
  ): Promise<ContatoPesquisarResponse> {
    const params = new URLSearchParams();
    if (request.pesquisa) params.append('pesquisa', request.pesquisa);
    if (request.pagina) params.append('pagina', request.pagina.toString());

    return this.postData<ContatoPesquisarResponse>(
      `https://api.tiny.com.br/api2/contatos.pesquisa.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * Get contact details by ID
   * Endpoint: /contato.obter.php
   *
   * @param request - Contact ID
   * @param token - TinyERP API token
   * @returns Contact details
   */
  contatoObter: async function (
    request: ContatoObterRequest,
    token: string,
  ): Promise<ContatoObterResponse> {
    return this.postData<ContatoObterResponse>(
      `https://api.tiny.com.br/api2/contato.obter.php?token=${token}&formato=JSON&id=${request.id}`,
    );
  },

  /**
   * Include new contact
   * Endpoint: /contato.incluir.php
   *
   * @param request - Contact data
   * @param token - TinyERP API token
   * @returns Operation result with contact ID
   */
  contatoIncluir: async function (
    request: ContatoIncluirRequest,
    token: string,
  ): Promise<ContatoIncluirResponse> {
    const params = new URLSearchParams();
    params.append('contato', JSON.stringify(request));

    return this.postData<ContatoIncluirResponse>(
      `https://api.tiny.com.br/api2/contato.incluir.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * Update existing contact
   * Endpoint: /contato.alterar.php
   *
   * @param request - Contact data with ID
   * @param token - TinyERP API token
   * @returns Operation result
   */
  contatoAlterar: async function (
    request: ContatoAlterarRequest,
    token: string,
  ): Promise<ContatoAlterarResponse> {
    const params = new URLSearchParams();
    params.append('contato', JSON.stringify(request));

    return this.postData<ContatoAlterarResponse>(
      `https://api.tiny.com.br/api2/contato.alterar.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  // ==================== PRODUTOS MODULE ====================

  /**
   * Search products
   * Endpoint: /produtos.pesquisa.php
   *
   * @param request - Search parameters
   * @param token - TinyERP API token
   * @returns List of products
   */
  produtosPesquisar: async function (
    request: ProdutoPesquisarRequest,
    token: string,
  ): Promise<ProdutoPesquisarResponse> {
    const params = new URLSearchParams();
    if (request.pesquisa) params.append('pesquisa', request.pesquisa);
    if (request.pagina) params.append('pagina', request.pagina.toString());

    return this.postData<ProdutoPesquisarResponse>(
      `https://api.tiny.com.br/api2/produtos.pesquisa.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * Get product details by ID
   * Endpoint: /produto.obter.php
   *
   * @param request - Product ID
   * @param token - TinyERP API token
   * @returns Product details
   */
  produtoObter: async function (
    request: ProdutoObterRequest,
    token: string,
  ): Promise<ProdutoObterResponse> {
    return this.postData<ProdutoObterResponse>(
      `https://api.tiny.com.br/api2/produto.obter.php?token=${token}&formato=JSON&id=${request.id}`,
    );
  },

  /**
   * Include new product
   * Endpoint: /produto.incluir.php
   *
   * @param request - Product data
   * @param token - TinyERP API token
   * @returns Operation result with product ID
   */
  produtoIncluir: async function (
    request: ProdutoIncluirRequest,
    token: string,
  ): Promise<ProdutoIncluirResponse> {
    const params = new URLSearchParams();
    params.append('produto', JSON.stringify(request));

    return this.postData<ProdutoIncluirResponse>(
      `https://api.tiny.com.br/api2/produto.incluir.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * Update existing product
   * Endpoint: /produto.alterar.php
   *
   * @param request - Product data with ID
   * @param token - TinyERP API token
   * @returns Operation result
   */
  produtoAlterar: async function (
    request: ProdutoAlterarRequest,
    token: string,
  ): Promise<ProdutoAlterarResponse> {
    const params = new URLSearchParams();
    params.append('produto', JSON.stringify(request));

    return this.postData<ProdutoAlterarResponse>(
      `https://api.tiny.com.br/api2/produto.alterar.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * Update product stock
   * Endpoint: /produto.atualizar.estoque.php
   *
   * @param request - Product ID and stock data
   * @param token - TinyERP API token
   * @returns Operation result
   */
  produtoAtualizarEstoque: async function (
    request: ProdutoEstoqueRequest,
    token: string,
  ): Promise<ProdutoEstoqueResponse> {
    const params = new URLSearchParams();
    params.append('id', request.id.toString());

    return this.postData<ProdutoEstoqueResponse>(
      `https://api.tiny.com.br/api2/produto.atualizar.estoque.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  // ==================== VENDEDORES MODULE ====================

  /**
   * Search sellers
   * Endpoint: /vendedores.pesquisa.php
   *
   * @param request - Search parameters
   * @param token - TinyERP API token
   * @returns List of sellers
   */
  vendedoresPesquisar: async function (
    request: VendedorPesquisarRequest,
    token: string,
  ): Promise<VendedorPesquisarResponse> {
    const params = new URLSearchParams();
    if (request.pesquisa) params.append('pesquisa', request.pesquisa);
    if (request.pagina) params.append('pagina', request.pagina.toString());

    return this.postData<VendedorPesquisarResponse>(
      `https://api.tiny.com.br/api2/vendedores.pesquisa.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  // ==================== CRM MODULE ====================

  /**
   * Search CRM subjects
   * Endpoint: /crm.pesquisa.php
   *
   * @param request - Search parameters
   * @param token - TinyERP API token
   * @returns List of CRM subjects
   */
  crmPesquisar: async function (
    request: CRMPesquisarRequest,
    token: string,
  ): Promise<CRMPesquisarResponse> {
    const params = new URLSearchParams();
    if (request.pesquisa) params.append('pesquisa', request.pesquisa);
    if (request.id_estagio) params.append('id_estagio', request.id_estagio.toString());
    if (request.id_vendedor) params.append('id_vendedor', request.id_vendedor.toString());
    if (request.pagina) params.append('pagina', request.pagina.toString());

    return this.postData<CRMPesquisarResponse>(
      `https://api.tiny.com.br/api2/crm.pesquisa.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * Get CRM subject details
   * Endpoint: /crm.assunto.obter.php
   *
   * @param request - Subject ID
   * @param token - TinyERP API token
   * @returns Subject details with actions
   */
  crmObterAssunto: async function (
    request: CRMObterAssuntoRequest,
    token: string,
  ): Promise<CRMObterAssuntoResponse> {
    return this.postData<CRMObterAssuntoResponse>(
      `https://api.tiny.com.br/api2/crm.assunto.obter.php?token=${token}&formato=JSON&id=${request.id}`,
    );
  },

  /**
   * Include new CRM subject
   * Endpoint: /crm.assunto.incluir.php
   *
   * @param request - Subject data
   * @param token - TinyERP API token
   * @returns Operation result with subject ID
   */
  crmIncluirAssunto: async function (
    request: CRMIncluirAssuntoRequest,
    token: string,
  ): Promise<CRMIncluirAssuntoResponse> {
    const params = new URLSearchParams();
    params.append('assunto', JSON.stringify(request));

    return this.postData<CRMIncluirAssuntoResponse>(
      `https://api.tiny.com.br/api2/crm.assunto.incluir.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * Update CRM subject stage
   * Endpoint: /crm.assunto.alterar.estagio.php
   *
   * @param request - Subject ID and new stage
   * @param token - TinyERP API token
   * @returns Operation result
   */
  crmAlterarEstagioAssunto: async function (
    request: CRMAlterarEstagioAssuntoRequest,
    token: string,
  ): Promise<CRMAlterarEstagioAssuntoResponse> {
    const params = new URLSearchParams();
    params.append('id', request.id.toString());
    params.append('id_estagio', request.id_estagio.toString());

    return this.postData<CRMAlterarEstagioAssuntoResponse>(
      `https://api.tiny.com.br/api2/crm.assunto.alterar.estagio.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * List all CRM stages
   * Endpoint: /crm.estagios.php
   *
   * @param token - TinyERP API token
   * @returns List of CRM stages
   */
  crmListaEstagios: async function (token: string): Promise<CRMListaEstagiosResponse> {
    return this.postData<CRMListaEstagiosResponse>(
      `https://api.tiny.com.br/api2/crm.estagios.php?token=${token}&formato=JSON`,
    );
  },

  // ==================== PEDIDOS MODULE ====================

  /**
   * Update existing order
   * Endpoint: /pedido.alterar.php
   *
   * @param request - Order data with ID
   * @param token - TinyERP API token
   * @returns Operation result
   */
  pedidoAlterar: async function (
    request: PedidoAlterarRequest,
    token: string,
  ): Promise<PedidoAlterarResponse> {
    const params = new URLSearchParams();
    params.append('pedido', JSON.stringify(request));

    return this.postData<PedidoAlterarResponse>(
      `https://api.tiny.com.br/api2/pedido.alterar.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * Generate production order from sales order
   * Endpoint: /gerar.ordem.producao.php
   *
   * @param request - Order ID
   * @param token - TinyERP API token
   * @returns Operation result with production order ID
   */
  pedidoGerarOrdemProducao: async function (
    request: PedidoGerarOrdemProducaoRequest,
    token: string,
  ): Promise<PedidoGerarOrdemProducaoResponse> {
    return this.postData<PedidoGerarOrdemProducaoResponse>(
      `https://api.tiny.com.br/api2/gerar.ordem.producao.php?token=${token}&formato=JSON&id=${request.id}`,
    );
  },

  /**
   * Generate fiscal note from sales order
   * Endpoint: /gerar.notafiscal.php
   *
   * @param request - Order ID
   * @param token - TinyERP API token
   * @returns Operation result with fiscal note ID
   */
  pedidoGerarNotaFiscal: async function (
    request: PedidoGerarNotaFiscalRequest,
    token: string,
  ): Promise<PedidoGerarNotaFiscalResponse> {
    return this.postData<PedidoGerarNotaFiscalResponse>(
      `https://api.tiny.com.br/api2/gerar.notafiscal.php?token=${token}&formato=JSON&id=${request.id}`,
    );
  },

  /**
   * Update order status
   * Endpoint: /pedido.alterar.situacao
   *
   * @param request - Order ID and new status
   * @param token - TinyERP API token
   * @returns Operation result
   */
  pedidoAlterarSituacao: async function (
    request: PedidoAlterarSituacaoRequest,
    token: string,
  ): Promise<PedidoAlterarSituacaoResponse> {
    const params = new URLSearchParams();
    params.append('id', request.id.toString());
    params.append('situacao', request.situacao);

    return this.postData<PedidoAlterarSituacaoResponse>(
      `https://api.tiny.com.br/api2/pedido.alterar.situacao?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * Add markers to order
   * Endpoint: /pedido.marcadores.adicionar.php
   *
   * @param request - Order ID and markers
   * @param token - TinyERP API token
   * @returns Operation result
   */
  pedidoMarcadoresAdicionar: async function (
    request: PedidoMarcadoresIncluirRequest,
    token: string,
  ): Promise<PedidoMarcadoresIncluirResponse> {
    const params = new URLSearchParams();
    params.append('id', request.id.toString());
    params.append('marcadores', JSON.stringify(request.marcadores));

    return this.postData<PedidoMarcadoresIncluirResponse>(
      `https://api.tiny.com.br/api2/pedido.marcadores.adicionar.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * Remove markers from order
   * Endpoint: /pedido.marcadores.remover.php
   *
   * @param request - Order ID and markers
   * @param token - TinyERP API token
   * @returns Operation result
   */
  pedidoMarcadoresRemover: async function (
    request: PedidoMarcadoresRemoverRequest,
    token: string,
  ): Promise<PedidoMarcadoresRemoverResponse> {
    const params = new URLSearchParams();
    params.append('id', request.id.toString());
    params.append('marcadores', JSON.stringify(request.marcadores));

    return this.postData<PedidoMarcadoresRemoverResponse>(
      `https://api.tiny.com.br/api2/pedido.marcadores.remover.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * Post order stock
   * Endpoint: /pedido.lancar.estoque.php
   *
   * @param request - Order ID and optional deposit
   * @param token - TinyERP API token
   * @returns Operation result
   */
  pedidoLancarEstoque: async function (
    request: PedidoLancarEstoqueRequest,
    token: string,
  ): Promise<PedidoLancarEstoqueResponse> {
    const params = new URLSearchParams();
    params.append('id', request.id.toString());
    if (request.estoque) params.append('estoque', request.estoque);

    return this.postData<PedidoLancarEstoqueResponse>(
      `https://api.tiny.com.br/api2/pedido.lancar.estoque.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * Reverse order stock
   * Endpoint: /pedido.estornar.estoque.php
   *
   * @param request - Order ID
   * @param token - TinyERP API token
   * @returns Operation result
   */
  pedidoEstornarEstoque: async function (
    request: PedidoEstornarEstoqueRequest,
    token: string,
  ): Promise<PedidoEstornarEstoqueResponse> {
    return this.postData<PedidoEstornarEstoqueResponse>(
      `https://api.tiny.com.br/api2/pedido.estornar.estoque.php?token=${token}&formato=JSON&id=${request.id}`,
    );
  },

  /**
   * Post order accounts
   * Endpoint: /pedido.lancar.contas.php
   *
   * @param request - Order ID
   * @param token - TinyERP API token
   * @returns Operation result
   */
  pedidoLancarContas: async function (
    request: PedidoLancarContasRequest,
    token: string,
  ): Promise<PedidoLancarContasResponse> {
    return this.postData<PedidoLancarContasResponse>(
      `https://api.tiny.com.br/api2/pedido.lancar.contas.php?token=${token}&formato=JSON&id=${request.id}`,
    );
  },

  /**
   * Reverse order accounts
   * Endpoint: /pedido.estornar.contas.php
   *
   * @param request - Order ID
   * @param token - TinyERP API token
   * @returns Operation result
   */
  pedidoEstornarContas: async function (
    request: PedidoEstornarContasRequest,
    token: string,
  ): Promise<PedidoEstornarContasResponse> {
    return this.postData<PedidoEstornarContasResponse>(
      `https://api.tiny.com.br/api2/pedido.estornar.contas.php?token=${token}&formato=JSON&id=${request.id}`,
    );
  },

  /**
   * Register tracking code for order
   * Endpoint: /pedido.cadastrar.codigo.rastreamento.php
   *
   * @param request - Order ID and tracking data
   * @param token - TinyERP API token
   * @returns Operation result
   */
  pedidoCadastrarCodigoRastreamento: async function (
    request: PedidoCadastrarCodigoRastreamentoRequest,
    token: string,
  ): Promise<PedidoCadastrarCodigoRastreamentoResponse> {
    const params = new URLSearchParams();
    params.append('id', request.id.toString());
    params.append('codigo_rastreamento', request.codigo_rastreamento);
    if (request.url_rastreamento) params.append('url_rastreamento', request.url_rastreamento);

    return this.postData<PedidoCadastrarCodigoRastreamentoResponse>(
      `https://api.tiny.com.br/api2/pedido.cadastrar.codigo.rastreamento.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  // ==================== NOTAS FISCAIS MODULE ====================

  /**
   * Search fiscal notes
   * Endpoint: /notas.fiscais.pesquisa.php
   *
   * @param request - Search parameters
   * @param token - TinyERP API token
   * @returns List of fiscal notes
   */
  notasFiscaisPesquisar: async function (
    request: NotaFiscalPesquisarRequest,
    token: string,
  ): Promise<NotaFiscalPesquisarResponse> {
    const params = new URLSearchParams();
    if (request.dataInicial) params.append('dataInicial', request.dataInicial);
    if (request.dataFinal) params.append('dataFinal', request.dataFinal);
    if (request.situacao) params.append('situacao', request.situacao);
    if (request.pagina) params.append('pagina', request.pagina.toString());

    return this.postData<NotaFiscalPesquisarResponse>(
      `https://api.tiny.com.br/api2/notas.fiscais.pesquisa.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * Get fiscal note details by ID
   * Endpoint: /nota.fiscal.obter.php
   *
   * @param request - Fiscal note ID
   * @param token - TinyERP API token
   * @returns Fiscal note details
   */
  notaFiscalObter: async function (
    request: NotaFiscalObterRequest,
    token: string,
  ): Promise<NotaFiscalObterResponse> {
    return this.postData<NotaFiscalObterResponse>(
      `https://api.tiny.com.br/api2/nota.fiscal.obter.php?token=${token}&formato=JSON&id=${request.id}`,
    );
  },

  /**
   * Include new fiscal note
   * Endpoint: /nota.fiscal.incluir.php
   *
   * @param request - Fiscal note data
   * @param token - TinyERP API token
   * @returns Operation result with fiscal note ID
   */
  notaFiscalIncluir: async function (
    request: NotaFiscalIncluirRequest,
    token: string,
  ): Promise<NotaFiscalIncluirResponse> {
    const params = new URLSearchParams();
    params.append('nota', JSON.stringify(request));

    return this.postData<NotaFiscalIncluirResponse>(
      `https://api.tiny.com.br/api2/nota.fiscal.incluir.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * Emit fiscal note (send to SEFAZ)
   * Endpoint: /nota.fiscal.emitir.php
   *
   * @param request - Fiscal note ID
   * @param token - TinyERP API token
   * @returns Operation result with emission data
   */
  notaFiscalEmitir: async function (
    request: NotaFiscalEmitirRequest,
    token: string,
  ): Promise<NotaFiscalEmitirResponse> {
    return this.postData<NotaFiscalEmitirResponse>(
      `https://api.tiny.com.br/api2/nota.fiscal.emitir.php?token=${token}&formato=JSON&id=${request.id}`,
    );
  },

  // ==================== CONTAS A RECEBER MODULE ====================

  /**
   * Include new account receivable
   * Endpoint: /conta.receber.incluir.php
   *
   * @param request - Account receivable data
   * @param token - TinyERP API token
   * @returns Operation result with account ID
   */
  contaReceberIncluir: async function (
    request: ContaReceberIncluirRequest,
    token: string,
  ): Promise<ContaReceberIncluirResponse> {
    const params = new URLSearchParams();
    params.append('conta', JSON.stringify(request));

    return this.postData<ContaReceberIncluirResponse>(
      `https://api.tiny.com.br/api2/conta.receber.incluir.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * Search accounts receivable
   * Endpoint: /contas.receber.pesquisa.php
   *
   * @param request - Search parameters
   * @param token - TinyERP API token
   * @returns List of accounts receivable
   */
  contasReceberPesquisar: async function (
    request: ContaReceberPesquisarRequest,
    token: string,
  ): Promise<ContaReceberPesquisarResponse> {
    const params = new URLSearchParams();
    if (request.dataInicial) params.append('dataInicial', request.dataInicial);
    if (request.dataFinal) params.append('dataFinal', request.dataFinal);
    if (request.situacao) params.append('situacao', request.situacao);
    if (request.pagina) params.append('pagina', request.pagina.toString());

    return this.postData<ContaReceberPesquisarResponse>(
      `https://api.tiny.com.br/api2/contas.receber.pesquisa.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  // ==================== CONTAS A PAGAR MODULE ====================

  /**
   * Include new account payable
   * Endpoint: /conta.pagar.incluir.php
   *
   * @param request - Account payable data
   * @param token - TinyERP API token
   * @returns Operation result with account ID
   */
  contaPagarIncluir: async function (
    request: ContaPagarIncluirRequest,
    token: string,
  ): Promise<ContaPagarIncluirResponse> {
    const params = new URLSearchParams();
    params.append('conta', JSON.stringify(request));

    return this.postData<ContaPagarIncluirResponse>(
      `https://api.tiny.com.br/api2/conta.pagar.incluir.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  /**
   * Search accounts payable
   * Endpoint: /contas.pagar.pesquisa.php
   *
   * @param request - Search parameters
   * @param token - TinyERP API token
   * @returns List of accounts payable
   */
  contasPagarPesquisar: async function (
    request: ContaPagarPesquisarRequest,
    token: string,
  ): Promise<ContaPagarPesquisarResponse> {
    const params = new URLSearchParams();
    if (request.dataInicial) params.append('dataInicial', request.dataInicial);
    if (request.dataFinal) params.append('dataFinal', request.dataFinal);
    if (request.situacao) params.append('situacao', request.situacao);
    if (request.pagina) params.append('pagina', request.pagina.toString());

    return this.postData<ContaPagarPesquisarResponse>(
      `https://api.tiny.com.br/api2/contas.pagar.pesquisa.php?token=${token}&formato=JSON`,
      params.toString(),
    );
  },

  // ==================== WEBHOOKS ====================

  webhooks: {
    notificacaoVenda: notificacaoVenda,
  },
};
