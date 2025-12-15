const bcrypt = require('bcryptjs'); // IMPORTANTE: Adicione o bcrypt
const { users } = require('../model/userModel');

function registerUser({ username, password, favorecido }) {
  if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    throw new Error('Usuário já existe');
  }
  // Criptografe a senha no registro!
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = { username: username.toLowerCase(), password: hashedPassword, favorecido: !!favorecido };
  users.push(user);
  return user;
}

function loginUser({ username, password }) {
  // 1. Encontre o usuário APENAS pelo username
  const user = users.find(
    u => u.username.toLowerCase() === username.toLowerCase()
  );

  // 2. Se encontrou o usuário, compare a senha com bcrypt
  //    A função compareSync retorna true ou false
  if (user && bcrypt.compareSync(password, user.password)) {
    // Se a senha for válida, retorne o usuário
    return user;
  }

  // 3. Se o usuário não existir OU a senha for inválida, lance o erro
  throw new Error('Login ou senha inválidos');
}

function getUsers() {
  return users;
}

module.exports = { registerUser, loginUser, getUsers };