# TinyERP V2 SDK

[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![GitHub release](https://img.shields.io/github/release/linkiez/TinyERPv2-SDK.svg)](https://github.com/linkiez/TinyERPv2-SDK/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SDK TypeScript para integração com a API V2 do TinyERP.

## 📋 Índice

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso Básico](#uso-básico)
- [Módulos Disponíveis](#módulos-disponíveis)
- [Exemplos de Uso](#exemplos-de-uso)
- [Tratamento de Erros](#tratamento-de-erros)
- [Desenvolvimento](#desenvolvimento)

## 🚀 Instalação

```bash
npm install @linkiez/tinyerpv2-sdk
# or
yarn add @linkiez/tinyerpv2-sdk
```

## ⚙️ Configuração

### Obtendo o Token de Acesso

1. Acesse **Menu > Configurações > Aba Geral > Aplicativos**
2. Clique em **+ novo aplicativo**
3. Preencha o **Nome do aplicativo**
4. Após salvar, copie as chaves de acesso

⚠️ **Atenção**: As chaves são sensíveis e dão acesso total aos dados da conta.

## 📖 Uso Básico

```typescript
import { TinyERPv2 } from '@linkiez/tinyerpv2-sdk';

// Obter informações da conta
const info = await TinyERPv2.infoObter('seu_token_aqui');

// Pesquisar contatos
const contatos = await TinyERPv2.contatoPesquisar('seu_token_aqui', {
  nome: 'João',
});

// Incluir produto
const produto = await TinyERPv2.produtoIncluir('seu_token_aqui', {
  nome: 'Produto Teste',
  preco: 100.0,
});
```

## 🔌 Módulos Disponíveis

### Info

- `infoObter` - Obter informações da conta

### Contatos

- `contatoPesquisar` - Pesquisar contatos
- `contatoObter` - Obter contato específico
- `contatoIncluir` - Incluir novo contato
- `contatoAlterar` - Alterar contato existente

### Produtos

- `produtoPesquisar` - Pesquisar produtos
- `produtoObter` - Obter produto específico
- `produtoIncluir` - Incluir novo produto
- `produtoAlterar` - Alterar produto existente
- `produtoEstoque` - Consultar estoque

### Vendedores

- `vendedorPesquisar` - Pesquisar vendedores

### CRM

- `crmPesquisar` - Pesquisar assuntos CRM
- `crmObterAssunto` - Obter assunto específico
- `crmIncluirAssunto` - Incluir novo assunto
- `crmAlterarEstagioAssunto` - Alterar estágio do assunto
- `crmListaEstagios` - Listar estágios disponíveis

### Pedidos

- `pedidoAlterar` - Alterar pedido
- `pedidoGerarOrdemProducao` - Gerar ordem de produção
- `pedidoGerarNotaFiscal` - Gerar nota fiscal
- `pedidoAlterarSituacao` - Alterar situação do pedido
- `pedidoMarcadoresIncluir` - Incluir marcadores
- `pedidoMarcadoresRemover` - Remover marcadores
- `pedidoLancarEstoque` - Lançar estoque
- `pedidoEstornarEstoque` - Estornar estoque
- `pedidoLancarContas` - Lançar contas
- `pedidoEstornarContas` - Estornar contas
- `pedidoCadastrarCodigoRastreamento` - Cadastrar código de rastreamento

### Notas Fiscais

- `notaFiscalPesquisar` - Pesquisar notas fiscais
- `notaFiscalObter` - Obter nota fiscal específica
- `notaFiscalIncluir` - Incluir nova nota fiscal
- `notaFiscalEmitir` - Emitir nota fiscal

### Contas

- `contaReceberIncluir` - Incluir conta a receber
- `contaReceberPesquisar` - Pesquisar contas a receber
- `contaPagarIncluir` - Incluir conta a pagar
- `contaPagarPesquisar` - Pesquisar contas a pagar

## 💡 Exemplos de Uso

### Pesquisar e Atualizar Produto

```typescript
// Pesquisar produto
const produtos = await TinyERPv2.produtoPesquisar(token, {
  nome: 'Teclado',
});

// Obter produto específico
const produto = await TinyERPv2.produtoObter(token, { id: produtos[0].id });

// Alterar produto
await TinyERPv2.produtoAlterar(token, {
  id: produto.id,
  preco: 150.0,
});
```

### Gerenciar Pedido

```typescript
// Alterar pedido
await TinyERPv2.pedidoAlterar(token, {
  id: 12345,
  situacao: 'aprovado',
});

// Gerar nota fiscal
const nf = await TinyERPv2.pedidoGerarNotaFiscal(token, {
  id: 12345,
});

// Lançar estoque
await TinyERPv2.pedidoLancarEstoque(token, {
  id: 12345,
});
```

## ⚠️ Tratamento de Erros

```typescript
try {
  const result = await TinyERPv2.contatoObter(token, { id: 999 });
} catch (error) {
  if (error.message.includes('HTTP error')) {
    console.error('Erro de conexão com API');
  } else {
    console.error('Erro:', error);
  }
}
```

## 🛠️ Desenvolvimento

### Scripts Disponíveis

```bash
# Build
yarn build

# Testes
yarn test
yarn test:watch
yarn test:coverage

# Formatação
yarn prettier
yarn prettier:check

# Limpeza
yarn clean
```

### Estrutura do Projeto

```
src/
├── index.ts           # Exportação principal e objeto TinyERPv2
├── types/             # Tipos TypeScript
│   └── index.ts
├── controllers/       # Controladores por módulo
│   ├── index.ts
│   └── webhooks/
└── index.test.ts      # Testes
```

## 📝 Licença

MIT © linkiez

## 🔗 Links Úteis

- [Documentação Oficial TinyERP API v2](https://tiny.com.br/ajuda/api)
- [GitHub Repository](https://github.com/linkiez/TinyERPv2-SDK)
- [Reportar Issues](https://github.com/linkiez/TinyERPv2-SDK/issues)

## Instalação

```bash
yarn install
```

## Desenvolvimento

```bash
# Executar em modo dev
yarn dev

# Build
yarn build

# Testes
yarn test
yarn test:watch
yarn test:coverage
```

## Estrutura

```
src/
├── index.ts          # Entry point
└── index.test.ts     # Tests
```
