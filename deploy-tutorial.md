# Deploy de uma API Express + Knex + PostgreSQL no Render

Este guia mostra como colocar no ar uma API Node.js (Express) que usa Knex e PostgreSQL, de forma **gratuita**, usando a plataforma **Render**.

---

## Pré-requisitos

- Conta gratuita no [Render](https://render.com)
- Projeto pronto com:
    - `Express` configurado
    - `Knex` configurado
    - `package.json` com scripts (`start`, `migrate` etc)
    - Banco de dados PostgreSQL já criado no Render

---

## Passo 1 — Criar ou clonar o projeto

Se você ainda não fez o projeto, siga o tutorial do Medium (ou clone o repositório).  
Depois, entre na pasta do projeto:

```bash
https://github.com/arturbomtempo-dev/jwt-authentication-tutorial.git
cd jwt-authentication-tutorial
```

---

## Passo 2 — Criar o banco PostgreSQL no Render

1. Acesse o **Render** → clique em **New** → **PostgreSQL**.
2. Dê um nome ao banco.
3. Escolha o plano gratuito.
4. Quando o banco for criado, copie as **URLs de conexão**:

- **Internal Database URL** → use na API (mais rápido e seguro).
- **External Database URL** → use no seu computador, caso queira conectar com DBeaver/pgAdmin.

---

## Passo 3 — Configurar variáveis de ambiente no Render

No seu projeto do Render (Web Service):

1. Vá em **Settings → Environment Variables**.
2. Crie a variável:

```
DATABASE_URL = (cole aqui a Internal Database URL)
```

3. Se precisar, adicione também:

```
JWT_SECRET = chave_secreta_para_hashing
NODE_ENV = production
PORT = 10000
```

---

## Passo 4 — Configurar o Knex

No seu `knexfile.js`, ajuste assim:

```js
require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: { directory: './src/db/migrations' },
        seeds: { directory: './src/db/seeds' },
    },
    production: {
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        },
        migrations: { directory: './src/db/migrations' },
        seeds: { directory: './src/db/seeds' },
    },
};
```

> Importante: Render exige `ssl: { rejectUnauthorized: false }` em produção.

---

## Passo 5 — Criar o serviço Web (sua API)

1. Clique em **New → Web Service**.
2. Conecte seu GitHub e escolha o repositório.
3. Configure:

- **Environment**: Node
- **Build Command**: `npm install && npm run migrate`
- **Start Command**: `npm start`

4. Deploy será iniciado automaticamente.

---

## Passo 6 — Rodar as migrations

No Render, abra o terminal do serviço e rode:

```bash
npx knex migrate:latest
```

Isso cria as tabelas no banco.

---

## Passo 7 — Testar a API

Depois do deploy, o Render vai gerar uma URL do tipo:

```
https://sua-api.onrender.com
```

Teste no navegador ou com Postman/Insomnia.

Se sua API tem rota `/users`, por exemplo:

```
https://sua-api.onrender.com/users
```

---

## Conclusão

Pronto!  
Você tem uma API Express + Knex + PostgreSQL rodando no Render (100% grátis).

Agora qualquer pessoa pode acessar de qualquer lugar pelo link.
