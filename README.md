# API PGTAS

API Rest para login, registro, consulta de usuários e transferência de valores, com regras básicas de negócio e documentação Swagger.

## Instalação

1. Instale as dependências:
   ```bash
   npm install express swagger-ui-express
   ```
2. Inicie o servidor:
   ```bash
   node server.js
   ```

## Endpoints

- `POST /register`: Registra um novo usuário. Campos obrigatórios: `username`, `password`. Opcional: `favorecido` (boolean).
- `POST /login`: Realiza login. Campos obrigatórios: `username`, `password`.
- `GET /users`: Lista todos os usuários registrados.
- `POST /transfer`: Realiza transferência. Campos obrigatórios: `from`, `to`, `value`.
- `GET /transfers`: Lista todas as transferências realizadas.
- `GET /api-docs`: Documentação Swagger interativa.

## Regras de Negócio

- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha válidos.
- Transferências acima de R$ 5.000,00 só podem ser feitas para usuários favorecidos.

## Testes

Para testar a API com Supertest, importe o `app.js` em seus testes sem executar o método `listen()`.

## Documentação Swagger

Acesse `/api-docs` para visualizar e testar os endpoints da API.
