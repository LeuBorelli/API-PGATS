import http from 'k6/http'
import { sleep, check, group } from 'k6'
import { generateRandomName } from './helpers/name.js'
import { getBaseUrl } from './helpers/getBaseUrl.js'
import { login } from './helpers/login.js'

export const options = {
  thresholds: {
    http_req_duration: ['p(90)<=3500', 'p(95)<=4300'],
    http_req_failed: ['rate<0.01']
  },
  stages: [
    { duration: '3s', target: 10 },
    { duration: '15s', target: 20 },
    { duration: '2s', target: 110 },
    { duration: '3s', target: 110 },
    { duration: '5s', target: 15 },
    { duration: '5s', target: 0 },
  ],
};

export default function() {
  const baseUrl = getBaseUrl()
  let username, password, token

  group('Registrando usuários', () => {
    username = generateRandomName()
    password = 'senha123'

    const payload = JSON.stringify({
      username: username,
      password: password,
      favorecido: true
    })
    
    const params = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = http.post(`${baseUrl}/register`, payload, params)

    check(res, {
      'Registro deve ser igual 201': (r) => r.status === 201,
    })
  })

  group('Logando usuários', () => {
    token = login(username, password, baseUrl)

    check(token, {
      'Token existe': (t) => !!t
    })
  })

  group('Realizando transferências', () => {
    const destinatario = generateRandomName();
    const payloadDest = JSON.stringify({
      username: destinatario,
      password: 'senha123',
      favorecido: true
    });
    const paramsDest = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const resDest = http.post(`${baseUrl}/register`, payloadDest, paramsDest);
    check(resDest, {
      'Destinatário registrado com sucesso': (r) => r.status === 201
    });

    const transferPayload = JSON.stringify({
      from: username,
      to: destinatario,
      value: 10.00
    });
    const transferParams = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    const transferRes = http.post(`${baseUrl}/transfer`, transferPayload, transferParams)

    check(transferRes, {
      'Transferência deve ser igual 201': (r) => r.status === 201
    });
  })

  group('Simulando ações do usuário', () => {
      sleep(1);
  })
}
