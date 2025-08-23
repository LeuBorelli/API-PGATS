// Bibliorecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai')

// Aplicação
const app = require('../../app');

// Mock
const transferService = require('../../service/transferService');

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

        it('Usando Mocks: Quando informo usuários inexistentes, recebo 400', async () => {
            // Mocar apenas a função transfer
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.throws(new Error ('Usuário remetente ou destinatário não encontrado'));

            const resposta = await request(app)
                .post('/transfer')
                .send({  
                    "from": "Farofa",
                    "to": "Banana",
                    "value": 1000
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error','Usuário remetente ou destinatário não encontrado')

            //Resete o Mock
            sinon.restore();
        });

        it('Usando Mocks: Quando informo valores válidos o trem funciona', async () => {
            // Mocar apenas a função transfer
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.returns({
                from: "Farofa", 
                to: "Banana", 
                value: 1000, 
            })

            const resposta = await request(app)
                .post('/transfer')
                .send({  
                    "from": "Farofa",
                    "to": "Banana",
                    "value": 1000
                });

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('from', 'Farofa');
            expect(resposta.body).to.have.property('to', 'Banana');
            expect(resposta.body).to.have.property('value', 1000);

            //Resete o Mock
            sinon.restore();
        });
    });
});