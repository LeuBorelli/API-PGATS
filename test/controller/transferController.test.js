// Bibliorecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai')

// Aplicação
const app = require('../../app');

// Testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {      
        it('Quando informo usuários inexistentes, recebo 400', async () => {
            const resposta = await request(app)
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