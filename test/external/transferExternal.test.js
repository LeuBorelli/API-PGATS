// Bibliotecas
const request   = require('supertest');
const { expect } = require('chai');

// Testes

describe('Transfer', () => {
    describe('POST /transfer external', () => {
        it.only('Quando informo usuários inexistentes (sem mock), recebo 400', async () => {
            // 1) capturar o Token
            const respostaLogin = await request ('http://localhost:3000')
            .post('/login')
            .send({
                username: 'Leandro',
                password: '123456'
            })

            const token = respostaLogin.body.token;
            
            const resposta = await request('http://localhost:3000')
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({  
                    "from": "Leandro",
                    "to": "Jessica",
                    "value": 1000
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error','Usuário remetente ou destinatário não encontrado')
        });
    });
});