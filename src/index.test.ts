import { jest } from '@jest/globals';
import { TinyERPHttpError, TinyERPv2 } from './index.js';

describe('TinyERPv2', () => {
  const originalFetch = global.fetch;

  function mockJsonResponse(body: unknown): Response {
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }) as Response;
  }

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('exports TinyERPv2 object', () => {
    expect(TinyERPv2).toBeDefined();
  });

  it('has postData method', () => {
    expect(TinyERPv2.postData).toBeDefined();
    expect(typeof TinyERPv2.postData).toBe('function');
  });

  it('has all required methods', () => {
    expect(TinyERPv2.infoObter).toBeDefined();
    expect(TinyERPv2.contatosPesquisar).toBeDefined();
    expect(TinyERPv2.produtosPesquisar).toBeDefined();
  });

  it('preserves original Tiny error payload on HTTP failure', async () => {
    const responseBody = {
      retorno: {
        erros: [{ erro: 'Serviço do Tiny temporariamente indisponível' }],
      },
    };

    global.fetch = jest.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify(responseBody), {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
        },
      }) as Response,
    );

    await expect(
      TinyERPv2.postData('https://api.tiny.com.br/test', 'a=1'),
    ).rejects.toMatchObject({
      name: 'TinyERPHttpError',
      message: 'Serviço do Tiny temporariamente indisponível',
      status: 503,
      responseBody,
    } satisfies Partial<TinyERPHttpError>);
  });

  it('serializa contas a pagar com parâmetros oficiais do Tiny V2', async () => {
    const fetchMock = jest.fn<typeof fetch>().mockResolvedValue(
      mockJsonResponse({
        retorno: {
          status: 'OK',
          pagina: 1,
          numero_paginas: 1,
          contas: [],
        },
      }),
    );

    global.fetch = fetchMock;

    await TinyERPv2.contasPagarPesquisar(
      {
        token: 'legacy-token',
        data_ini_emissao: '2026-04-01',
        data_fim_emissao: '2026-04-30',
        data_ini_vencimento: '2026-04-05',
        data_fim_vencimento: '2026-04-25',
        numero_doc: 'DOC-123',
        nome_cliente: 'Fornecedor XPTO',
        situacao: 'aberto',
        pagina: 2,
      },
      'token-oficial',
    );

    const requestInit = fetchMock.mock.calls[0]?.[1];
    const params = new URLSearchParams(String(requestInit?.body ?? ''));

    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      'https://api.tiny.com.br/api2/contas.pagar.pesquisa.php?token=token-oficial&formato=JSON',
    );
    expect(params.get('data_ini_emissao')).toBe('01/04/2026');
    expect(params.get('data_fim_emissao')).toBe('30/04/2026');
    expect(params.get('data_ini_vencimento')).toBe('05/04/2026');
    expect(params.get('data_fim_vencimento')).toBe('25/04/2026');
    expect(params.get('numero_doc')).toBe('DOC-123');
    expect(params.get('nome_cliente')).toBe('Fornecedor XPTO');
    expect(params.get('situacao')).toBe('aberto');
    expect(params.get('pagina')).toBe('2');
  });

  it('serializa contas a receber com os parâmetros oficiais do Tiny V2', async () => {
    const fetchMock = jest.fn<typeof fetch>().mockResolvedValue(
      mockJsonResponse({
        retorno: {
          status: 'OK',
          pagina: 1,
          numero_paginas: 1,
          contas: [],
        },
      }),
    );

    global.fetch = fetchMock;

    await TinyERPv2.contasReceberPesquisar(
      {
        token: 'legacy-token',
        data_ini_emissao: '01/05/2026',
        data_fim_emissao: '31/05/2026',
        data_ini_vencimento: '10/05/2026',
        data_fim_vencimento: '25/05/2026',
        numero_banco: 'NB-445',
        id_origem: 'PED-900',
        situacao: 'parcial',
        pagina: 1,
      },
      'token-oficial',
    );

    const requestInit = fetchMock.mock.calls[0]?.[1];
    const params = new URLSearchParams(String(requestInit?.body ?? ''));

    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      'https://api.tiny.com.br/api2/contas.receber.pesquisa.php?token=token-oficial&formato=JSON',
    );
    expect(params.get('data_ini_emissao')).toBe('01/05/2026');
    expect(params.get('data_fim_emissao')).toBe('31/05/2026');
    expect(params.get('data_ini_vencimento')).toBe('10/05/2026');
    expect(params.get('data_fim_vencimento')).toBe('25/05/2026');
    expect(params.get('numero_banco')).toBe('NB-445');
    expect(params.get('id_origem')).toBe('PED-900');
    expect(params.get('situacao')).toBe('parcial');
  });

  it('serializa produtos.pesquisa com os parâmetros oficiais suportados', async () => {
    const fetchMock = jest.fn<typeof fetch>().mockResolvedValue(
      mockJsonResponse({
        retorno: {
          status: 'OK',
          pagina: 1,
          numero_paginas: 1,
          produtos: [],
        },
      }),
    );

    global.fetch = fetchMock;

    await TinyERPv2.produtosPesquisar(
      {
        pesquisa: 'camiseta',
        idTag: 9,
        idListaPreco: 4,
        gtin: '7891234567890',
        situacao: 'A',
        dataCriacao: '21/04/2026 10:00:00',
        pagina: 3,
        token: 'legacy-token',
      },
      'token-oficial',
    );

    const requestInit = fetchMock.mock.calls[0]?.[1];
    const params = new URLSearchParams(String(requestInit?.body ?? ''));

    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      'https://api.tiny.com.br/api2/produtos.pesquisa.php?token=token-oficial&formato=JSON',
    );
    expect(params.get('pesquisa')).toBe('camiseta');
    expect(params.get('idTag')).toBe('9');
    expect(params.get('idListaPreco')).toBe('4');
    expect(params.get('gtin')).toBe('7891234567890');
    expect(params.get('situacao')).toBe('A');
    expect(params.get('dataCriacao')).toBe('21/04/2026 10:00:00');
    expect(params.get('pagina')).toBe('3');
  });

  it('serializa notas.fiscais.pesquisa com parâmetros oficiais da doc', async () => {
    const fetchMock = jest.fn<typeof fetch>().mockResolvedValue(
      mockJsonResponse({
        retorno: {
          status: 'OK',
          pagina: 1,
          numero_paginas: 1,
          notas_fiscais: [],
        },
      }),
    );

    global.fetch = fetchMock;

    await TinyERPv2.notasFiscaisPesquisar(
      {
        token: 'legacy-token',
        dataInicial: '2026-04-01',
        dataFinal: '2026-04-30',
        tipoNota: 'S',
        numero: '1001',
        cliente: 'Cliente XPTO',
        cpf_cnpj: '12345678000199',
        situacao: '2',
        numeroEcommerce: 'PED-123',
        idVendedor: 7,
        idFormaEnvio: 5,
        nomeVendedor: 'Operador Tiny',
        pagina: 2,
      },
      'token-oficial',
    );

    const requestInit = fetchMock.mock.calls[0]?.[1];
    const params = new URLSearchParams(String(requestInit?.body ?? ''));

    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      'https://api.tiny.com.br/api2/notas.fiscais.pesquisa.php?token=token-oficial&formato=JSON',
    );
    expect(params.get('dataInicial')).toBe('01/04/2026');
    expect(params.get('dataFinal')).toBe('30/04/2026');
    expect(params.get('tipoNota')).toBe('S');
    expect(params.get('numero')).toBe('1001');
    expect(params.get('cliente')).toBe('Cliente XPTO');
    expect(params.get('cpf_cnpj')).toBe('12345678000199');
    expect(params.get('situacao')).toBe('2');
    expect(params.get('numeroEcommerce')).toBe('PED-123');
    expect(params.get('idVendedor')).toBe('7');
    expect(params.get('idFormaEnvio')).toBe('5');
    expect(params.get('nomeVendedor')).toBe('Operador Tiny');
    expect(params.get('pagina')).toBe('2');
  });
});
