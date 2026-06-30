# Drzyy Dashboard

## Documentação Técnica

### Desafio Técnico Frontend

---

# Visão Geral

O projeto consiste em uma **Single Page Application (SPA)** desenvolvida em **React + TypeScript** para simular a operação administrativa de uma casa de shows de alta rotatividade.

A aplicação possui um fluxo de dados em tempo real, simulando a chegada constante de clientes, além de disponibilizar ferramentas para:

- Monitoramento de ocupação
- Controle de clientes VIP
- Gerenciamento de comandas

---

# Tecnologias Utilizadas

- React
- TypeScript
- Vite
- React Hooks
  - `useState`
  - `useEffect`
  - `useMemo`
- CSS

---

# Funcionalidades Implementadas

## Dashboard em Tempo Real

Atualização automática de:

- Clientes
- Clientes VIP
- Ocupação

---

## Gestão de Fila

Possui:

- Busca por nome
- Filtro de clientes VIP
- Tabela reativa

---

## Gestão de Comandas

Funcionalidades:

- Abertura de drawer lateral
- Adição de itens
- Remoção de itens
- Cálculo dinâmico do total

---

# Arquitetura de Estado

## Estados Principais

```ts
customers
orders
selectedCustomer
```

### customers

Armazena todos os clientes ativos.

### orders

Armazena as comandas agrupadas por cliente.

### selectedCustomer

Controla qual cliente está atualmente selecionado no Drawer.

---

# Simulação em Tempo Real (Live Feed)

O Live Feed é implementado utilizando **timers assíncronos**.

A cada intervalo aleatório entre **2 e 6 segundos** são adicionados entre **1 e 5 clientes**, respeitando o limite máximo de **500 pessoas**.

---

# Prevenção de Memory Leaks

Na desmontagem do componente é executado:

```ts
clearTimeout(timeoutId);
```

Isso garante o encerramento correto das tarefas assíncronas e evita vazamentos de memória.

---

# Cálculo da Ocupação

Fórmula utilizada:

```ts
(customers.length / 500) * 100
```

## Exemplos

| Clientes | Ocupação |
|----------:|---------:|
| 250 | 50% |
| 500 | 100% |

---

# Requisitos Atendidos

- ✅ React
- ✅ TypeScript
- ✅ SPA
- ✅ Dashboard em Tempo Real
- ✅ Busca por Nome
- ✅ Filtro VIP
- ✅ Tabela Reativa
- ✅ Drawer de Comanda
- ✅ Adição de Itens
- ✅ Remoção de Itens
- ✅ Total Dinâmico
- ✅ Formatação Monetária
- ✅ Cleanup Assíncrono
- ✅ Limite de 500 Pessoas

---

# Como Executar

## Instalação

```bash
npm install
```

## Ambiente de Desenvolvimento

```bash
npm run dev
```

Acesse:

```
http://localhost:5173
```

## Build de Produção

```bash
npm run build
```

---

# Possíveis Evoluções

- Integração com Socket.IO
- Backend em Node.js
- Persistência em banco de dados
- Login administrativo
- Dashboard analítico
- Exportação de relatórios
- Controle de saída de clientes
- Controle de lotação por setores
- Histórico de comandas

---

# Decisões Técnicas

Foi adotada uma arquitetura simples baseada em **React Hooks** para priorizar:

- Clareza do código
- Facilidade de manutenção
- Baixo acoplamento
- Boa performance em atualizações frequentes

A implementação garante que o painel de consumo permaneça funcional mesmo durante as atualizações contínuas do **Live Feed**.
