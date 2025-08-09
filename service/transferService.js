const { transfers } = require('../model/transferModel');
const { users } = require('../model/userModel');

function transfer({ from, to, value }) {
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) throw new Error('Usuário remetente ou destinatário não encontrado');
  if (recipient.favorecido !== true && value >= 5000) {
    throw new Error('Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos');
  }
  const transferObj = { from, to, value, date: new Date() };
  transfers.push(transferObj);
  return transferObj;
}

function getTransfers() {
  return transfers;
}

module.exports = { transfer, getTransfers };
