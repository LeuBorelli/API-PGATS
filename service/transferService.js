const { users, transfers } = require('../model/userModel');

function transfer({ from, to, value }) {
  const remetente = users.find(u => u.username.toLowerCase() === from.toLowerCase());
  const destinatario = users.find(u => u.username.toLowerCase() === to.toLowerCase());

  if (!remetente || !destinatario) {
    throw new Error('Usuário remetente ou destinatário não encontrado');
  }

  const transferencia = { from, to, value, date: new Date() };
  transfers.push(transferencia);
  return transferencia;
}

function getTransfers() {
  return transfers;
}

module.exports = { transfer, getTransfers };
