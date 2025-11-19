import { TinyERPv2 } from './index.js';

describe('TinyERPv2', () => {
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
});
