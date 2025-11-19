# Tiny ERP API Types

Tipos TypeScript completos para a API v2 do Tiny ERP.

## 📁 Estrutura

```
types/
├── BaseRequest.ts           # Tipos base de requisição
├── BaseResponse.ts          # Tipos base de resposta
├── CodigoErro.ts           # Enum de códigos de erro
├── StatusProcessamento.ts   # Enum de status de processamento
├── info/                   # Informações da conta
├── contatos/               # Clientes e Fornecedores
├── produtos/               # Produtos e estoque
├── vendedores/             # Vendedores
├── crm/                    # CRM (assuntos e ações)
├── pedidos/                # Pedidos de venda
├── notas-fiscais/          # Notas fiscais de produto
├── contas-receber/         # Contas a receber
├── contas-pagar/           # Contas a pagar
└── webhooks/               # Webhooks e notificações
```

## 🚀 Uso

### Importação

```typescript
// Importar tudo
import * as TinyTypes from '@integrations/tiny_erp/types';

// Importar específico
import {
  ContatoPesquisarRequest,
  ContatoPesquisarResponse,
  ProdutoIncluirRequest,
  ProdutoIncluirResponse,
} from '@integrations/tiny_erp/types';

// Importar de módulo específico
import { ContatoObterRequest } from '@integrations/tiny_erp/types/contatos';
```

### Exemplo de Uso

```typescript
import axios from 'axios';
import {
  ContatoPesquisarRequest,
  ContatoPesquisarResponse,
  ProdutoIncluirRequest,
  ProdutoIncluirResponse,
} from '@integrations/tiny_erp/types';

// Pesquisar contatos
async function searchContacts(token: string, search: string) {
  const request: ContatoPesquisarRequest = {
    token,
    formato: 'json',
    pesquisa: search,
    pagina: 1,
  };

  const response = await axios.post<ContatoPesquisarResponse>(
    'https://api.tiny.com.br/api2/contatos.pesquisa.php',
    request,
  );

  return response.data;
}

// Incluir produto
async function createProduct(token: string) {
  const request: ProdutoIncluirRequest = {
    token,
    formato: 'json',
    produto: {
      produtos: [
        {
          produto: {
            nome: 'Produto Teste',
            unidade: 'UN',
            preco: 100.0,
            tipo: 'P',
            situacao: 'A',
          },
        },
      ],
    },
  };

  const response = await axios.post<ProdutoIncluirResponse>(
    'https://api.tiny.com.br/api2/produto.incluir.php',
    request,
  );

  return response.data;
}
```

## 📚 Módulos Disponíveis

### 1. Info (Dados da Conta)

- `InfoObterRequest` / `InfoObterResponse` - Obter informações da conta

### 2. Contatos (Clientes e Fornecedores)

- `ContatoPesquisarRequest` / `ContatoPesquisarResponse` - Pesquisar contatos
- `ContatoObterRequest` / `ContatoObterResponse` - Obter contato por ID
- `ContatoIncluirRequest` / `ContatoIncluirResponse` - Incluir novo contato
- `ContatoAlterarRequest` / `ContatoAlterarResponse` - Alterar contato existente

### 3. Produtos

- `ProdutoPesquisarRequest` / `ProdutoPesquisarResponse` - Pesquisar produtos
- `ProdutoObterRequest` / `ProdutoObterResponse` - Obter produto por ID
- `ProdutoIncluirRequest` / `ProdutoIncluirResponse` - Incluir novo produto
- `ProdutoAlterarRequest` / `ProdutoAlterarResponse` - Alterar produto existente
- `ProdutoEstoqueRequest` / `ProdutoEstoqueResponse` - Obter estoque do produto

### 4. Vendedores

- `VendedorPesquisarRequest` / `VendedorPesquisarResponse` - Pesquisar vendedores

### 5. CRM

- `CRMPesquisarRequest` / `CRMPesquisarResponse` - Pesquisar assuntos do CRM
- `CRMObterAssuntoRequest` / `CRMObterAssuntoResponse` - Obter assunto do CRM
- `CRMIncluirAssuntoRequest` / `CRMIncluirAssuntoResponse` - Incluir assunto no CRM
- `CRMAlterarEstagioAssuntoRequest` / `CRMAlterarEstagioAssuntoResponse` - Alterar estágio do assunto
- `CRMListaEstagiosRequest` / `CRMListaEstagiosResponse` - Listar estágios do CRM

### 6. Pedidos

- `PedidoIncluirRetorno` - Incluir pedido
- `PedidoAlterarRequest` / `PedidoAlterarResponse` - Alterar pedido
- `PedidoGerarOrdemProducaoRequest` / `PedidoGerarOrdemProducaoResponse` - Gerar ordem de produção
- `PedidoGerarNotaFiscalRequest` / `PedidoGerarNotaFiscalResponse` - Gerar nota fiscal
- `PedidoAlterarSituacaoRequest` / `PedidoAlterarSituacaoResponse` - Alterar situação do pedido
- `PedidoMarcadoresIncluirRequest` / `PedidoMarcadoresIncluirResponse` - Incluir marcadores
- `PedidoMarcadoresRemoverRequest` / `PedidoMarcadoresRemoverResponse` - Remover marcadores
- `PedidoLancarEstoqueRequest` / `PedidoLancarEstoqueResponse` - Lançar estoque
- `PedidoEstornarEstoqueRequest` / `PedidoEstornarEstoqueResponse` - Estornar estoque
- `PedidoLancarContasRequest` / `PedidoLancarContasResponse` - Lançar contas
- `PedidoEstornarContasRequest` / `PedidoEstornarContasResponse` - Estornar contas
- `PedidoCadastrarCodigoRastreamentoRequest` / `PedidoCadastrarCodigoRastreamentoResponse` - Cadastrar código de rastreamento

### 7. Notas Fiscais

- `NotaFiscalPesquisarRequest` / `NotaFiscalPesquisarResponse` - Pesquisar notas fiscais
- `NotaFiscalObterRequest` / `NotaFiscalObterResponse` - Obter nota fiscal por ID
- `NotaFiscalIncluirRequest` / `NotaFiscalIncluirResponse` - Incluir nota fiscal
- `NotaFiscalEmitirRequest` / `NotaFiscalEmitirResponse` - Emitir nota fiscal

### 8. Contas a Receber

- `ContaReceberIncluirRequest` / `ContaReceberIncluirResponse` - Incluir conta a receber
- `ContaReceberPesquisarRequest` / `ContaReceberPesquisarResponse` - Pesquisar contas a receber

### 9. Contas a Pagar

- `ContaPagarIncluirRequest` / `ContaPagarIncluirResponse` - Incluir conta a pagar
- `ContaPagarPesquisarRequest` / `ContaPagarPesquisarResponse` - Pesquisar contas a pagar

### 10. Webhooks

- `INotificacaoVenda` - Notificações de vendas (inclusão/atualização de pedidos)

## 🔧 Tipos Base

### BaseRequest

```typescript
interface TinyBaseRequest {
  token: string;
  formato?: 'json' | 'xml';
}

interface TinyPaginatedRequest extends TinyBaseRequest {
  pagina?: number;
}

interface TinySearchRequest extends TinyPaginatedRequest {
  pesquisa?: string;
  dataInicial?: string; // dd/mm/YYYY
  dataFinal?: string; // dd/mm/YYYY
}
```

### BaseResponse

```typescript
interface TinyBaseResponse<T = unknown> {
  retorno: {
    status_processamento: StatusProcessamento;
    status: 'OK' | 'Erro';
    codigo_erro?: CodigoErro;
    erros?: Array<{ erro: string }>;
  };
}
```

### Enums

```typescript
enum StatusProcessamento {
  SOLICITACAO_NAO_PROCESSADA = 1,
  SOLICITACAO_PROCESSADA_COM_ERROS = 2,
  SOLICITACAO_PROCESSADA_CORRETAMENTE = 3,
  SOLICITACAO_PARCIALMENTE_PROCESSADA = 4,
}

enum CodigoErro {
  TOKEN_NAO_INFORMADO = 1,
  TOKEN_INVALIDO_OU_NAO_ENCONTRADO = 2,
  XML_MAL_FORMADO_OU_COM_ERROS = 3,
  // ... outros códigos
}
```

## 📝 Formatos de Data

A API do Tiny ERP utiliza os seguintes formatos:

- **Data**: `dd/mm/YYYY` (ex: `25/12/2024`)
- **Data/Hora**: `dd/mm/YYYY HH:mm:ss` (ex: `25/12/2024 14:30:00`)
- **Hora**: `HH:mm:ss` (ex: `14:30:00`)

## ⚠️ Observações Importantes

1. **Token obrigatório**: Todas as requisições precisam do token de autenticação
2. **Formato JSON**: Recomendado usar `formato: 'json'` em todas as requisições
3. **Paginação**: Resultados de pesquisa são paginados, use `numero_paginas` para iterar
4. **Erros**: Sempre verifique `retorno.status` e `retorno.codigo_erro`
5. **Sequência**: Use `sequencia` para identificar registros em lotes
6. **Limites de API**: Respeite os limites de requisições por minuto

## 🔗 Referências

- [Documentação Oficial Tiny ERP API v2](https://tiny.com.br/api-docs/api)
- [Limites da API](https://tiny.com.br/api-docs/api2-limites-api)
- [Gerar Token API](https://tiny.com.br/api-docs/api2-gerar-token-api)

## 📌 TODO

Tipos ainda não implementados (referência futura):

- [ ] Notas Fiscais de Serviço
- [ ] Expedições
- [ ] Contratos
- [ ] Separação
- [ ] Tabelas Auxiliares
- [ ] PDV
- [ ] Tags e Grupos de Tags
- [ ] Listas de Preços
- [ ] Webhooks adicionais (estoque, rastreio, preços)
- [ ] Cotação de Fretes

## 🤝 Contribuindo

Ao adicionar novos tipos:

1. Criar arquivos separados para Request e Response
2. Adicionar JSDoc com descrição clara
3. Seguir padrão de nomenclatura: `[Módulo][Ação]Request/Response`
4. Exportar no `index.ts` do módulo
5. Atualizar `index.ts` principal
6. Atualizar este README
