const userService = require('../service/userService');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  try {
    const user = userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = (req, res) => {
  try {
    const user = userService.loginUser(req.body);
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET, // ALTERADO
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsers = (req, res) => {
  res.json(userService.getUsers());
};
