import { jest } from '@jest/globals';
import { TinyERPHttpError, TinyERPv2 } from './index.js';

describe('TinyERPv2', () => {
  const originalFetch = global.fetch;

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
});
