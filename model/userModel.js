const bcrypt = require('bcryptjs')


// In-memory database for users
const users = [
  {
    username: "Leandro",
    password: bcrypt.hashSync('123456', 8),
    favorecido: true
  }
];

module.exports = {
  users,
};
