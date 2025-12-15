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


## Testes de Performance com k6

Os testes de performance estão na pasta `test/k6/` e utilizam o [k6](https://k6.io/). Abaixo, cada conceito do k6 usado no projeto é explicado com exemplos reais do código:

---

### Thresholds
- Arquivo: `test/k6/testes-trabalho-final.js`
- Trecho: objeto `options` com a chave `thresholds`.
- O que faz: Define limites de desempenho (ex: 90% das requisições devem responder em até 3500ms).

```js
export const options = {
   thresholds: {
      http_req_duration: ['p(90)<=3500', 'p(95)<=4300'],
      http_req_failed: ['rate<0.01']
   },
   stages: [ /* ... */ ],
};
```

### Checks
- Arquivo: `test/k6/testes-trabalho-final.js`
- Trecho: chamadas a `check(...)` após requisições.
- O que faz: Valida se a resposta está correta (ex: status 201).

```js
let res = http.post(`${baseUrl}/register`, ...);
check(res, { 'Registro deve ser igual 201': (r) => r.status === 201 });
```

### Helpers
- Arquivo: `test/k6/helpers/login.js`, `test/k6/helpers/name.js`, `test/k6/helpers/getBaseUrl.js`
- O que faz: Centralizam funções reutilizáveis, como login, geração de nomes e definição da base URL.

```js
// test/k6/helpers/login.js
export function login(username, password, baseUrl) {
   const url = `${baseUrl}/login`;
   const payload = JSON.stringify({ username, password });
   const params = { headers: { 'Content-Type': 'application/json' } };
   const res = http.post(url, payload, params);
   return res.json().token;
}
```

### Groups
- Arquivo: `test/k6/testes-trabalho-final.js`
- O que faz: Organiza o teste em blocos lógicos (ex: registro, login, transferência).

```js
group('Registrando usuários', () => { /* ... */ });
group('Logando usuários', () => { /* ... */ });
group('Realizando transferências', () => { /* ... */ });
```

### Stages
- Arquivo: `test/k6/testes-trabalho-final.js`
- O que faz: Simula diferentes cargas de usuários ao longo do tempo.

```js
export const options = {
   stages: [
      { duration: '3s', target: 10 },
      { duration: '5s', target: 15 },
      { duration: '5s', target: 0 },
   ],
};
```

### Variáveis de Ambiente
- Arquivo: `test/k6/helpers/getBaseUrl.js`
- O que faz: Permite customizar a URL da API sem alterar o código.

```js
export function getBaseUrl() {
   return __ENV.BASE_URL || 'http://localhost:3000';
}
```

### Reaproveitamento de Resposta
- Arquivo: `test/k6/testes-trabalho-final.js`
- O que faz: Usa o token obtido no login em outras requisições.

```js
token = login(username, password, baseUrl);
// ...
const transferParams = {
   headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   }
};
```

### Uso de Token de Autenticação
- Arquivo: `test/k6/testes-trabalho-final.js`
- O que faz: Passa o token JWT no header Authorization para endpoints protegidos.

```js
const transferParams = {
   headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   }
};
```

### Data-Driven Testing
- Possível criar testes que leem dados de arquivos ou listas para simular diferentes cenários (exemplo adaptável, não incluso por padrão).

### Trends e Faker
- Não utilizados diretamente neste projeto, mas podem ser facilmente integrados para métricas customizadas e geração de dados realistas.

### Executando os Testes e Gerando Relatório HTML

Você pode executar os testes de duas formas, dependendo do tipo de relatório que deseja:

- **Modo tradicional (resumo no terminal):**
   ```bash
   k6 run ./test/k6/testes-trabalho-final.js
   ```
   Exibe o resumo detalhado dos resultados (THRESHOLDS, TOTAL RESULTS, etc.) diretamente no terminal ao final do teste.

- **Modo dashboard web (relatório HTML):**
   ```bash
   K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html=report.html K6_WEB_DASHBOARD_PERIOD=2s k6 run test/k6/testes-trabalho-final.js
   ```
   Gera o arquivo `report.html` com um dashboard interativo ao final do teste, mas **não exibe o resumo tradicional no terminal**.

> Se quiser ambos, execute os dois comandos separadamente.

----

Veja o arquivo `test/k6/testes-trabalho-final.js` e os helpers em `test/k6/helpers/` para mais exemplos práticos.

## Documentação Swagger

Acesse `/api-docs` para visualizar e testar os endpoints da API.
