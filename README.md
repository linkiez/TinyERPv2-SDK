# TinyERP V2 SDK

[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![GitHub release](https://img.shields.io/github/release/linkiez/TinyERPv2-SDK.svg)](https://github.com/linkiez/TinyERPv2-SDK/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SDK TypeScript para integração com a API V2 do TinyERP.

## 📋 Índice

- [TinyERP V2 SDK](#tinyerp-v2-sdk)
  - [📋 Índice](#-índice)
  - [🚀 Instalação](#-instalação)
  - [⚙️ Configuração](#️-configuração)
    - [Obtendo o Token de Acesso](#obtendo-o-token-de-acesso)
    - [Limites de Requisições](#limites-de-requisições)
  - [📖 Uso Básico](#-uso-básico)
  - [🔌 Módulos Disponíveis](#-módulos-disponíveis)
    - [Info](#info)
    - [Contatos](#contatos)
    - [Produtos](#produtos)
    - [Vendedores](#vendedores)
    - [CRM](#crm)
    - [Pedidos](#pedidos)
    - [Notas Fiscais](#notas-fiscais)
    - [Contas](#contas)
  - [💡 Exemplos de Uso](#-exemplos-de-uso)
    - [Pesquisar e Atualizar Produto](#pesquisar-e-atualizar-produto)
    - [Gerenciar Pedido](#gerenciar-pedido)
  - [⚠️ Tratamento de Erros](#️-tratamento-de-erros)
  - [🛠️ Desenvolvimento](#️-desenvolvimento)
    - [Scripts Disponíveis](#scripts-disponíveis)
    - [Estrutura do Projeto](#estrutura-do-projeto)
  - [⚖️ Aviso Legal](#️-aviso-legal)
  - [📝 Licença](#-licença)
  - [🔗 Links Úteis](#-links-úteis)
  - [👤 Autor](#-autor)

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

### Limites de Requisições

As requisições podem ser limitadas se forem feitas muitas chamadas em um curto período de tempo. Consulte a documentação oficial do TinyERP para mais informações sobre os limites específicos do seu plano.

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

Este SDK implementa os principais serviços da API V2 do TinyERP.

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

```plaintext
src/
├── index.ts                    # Exportação principal e objeto TinyERPv2
├── index.test.ts               # Testes unitários
├── controllers/                # Controladores e lógica de negócio
│   ├── index.ts
│   └── webhooks/               # Controladores de webhooks
│       ├── index.ts
│       └── notificacaoVendaController.ts
└── types/                      # Definições de tipos TypeScript
    ├── BaseRequest.ts          # Tipo base para requisições
    ├── BaseResponse.ts         # Tipo base para respostas
    ├── CodigoErro.ts           # Códigos de erro da API
    ├── StatusProcessamento.ts  # Status de processamento
    ├── index.ts                # Exportação de todos os tipos
    ├── contas-pagar/           # Tipos para contas a pagar
    ├── contas-receber/         # Tipos para contas a receber
    ├── contatos/               # Tipos para contatos
    ├── crm/                    # Tipos para CRM
    ├── info/                   # Tipos para informações
    ├── notas-fiscais/          # Tipos para notas fiscais
    ├── pedidos/                # Tipos para pedidos
    ├── produtos/               # Tipos para produtos
    ├── vendedores/             # Tipos para vendedores
    └── webhooks/               # Tipos para webhooks
```

## ⚖️ Aviso Legal

Este projeto **não possui nenhuma associação, afiliação ou endosso oficial** da Olist ou TinyERP. É um projeto independente desenvolvido por [@linkiez](https://github.com/linkiez) para facilitar a integração com a API V2 do TinyERP.

As marcas TinyERP e Olist são propriedades de seus respectivos donos.

## 📝 Licença

MIT © [@linkiez](https://github.com/linkiez)

## 🔗 Links Úteis

- [GitHub Repository](https://github.com/linkiez/TinyERPv2-SDK)
- [Reportar Issues](https://github.com/linkiez/TinyERPv2-SDK/issues)

## 👤 Autor

**[@linkiez](https://github.com/linkiez)** - Desenvolvedor e mantenedor do projeto
