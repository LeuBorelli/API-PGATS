// Bibliotecas
const request   = require('supertest');
const { expect } = require('chai');

// Testes

describe('Transfer', () => {
    describe('POST /transfers external', () => {
        it('Quando informo usuários inexistentes (sem mock), recebo 400', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/transfer')
                .send({  
                    "from": "Farofa",
                    "to": "Banana",
                    "value": 1000
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error','Usuário remetente ou destinatário não encontrado')
        });
    });
});