const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' }); // Alterado para 401, que é mais apropriado

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Formato de token inválido' });

  try {
    // ALTERADO: Use o mesmo segredo do login
    const decoded = jwt.verify(token, 'meu_segredo_super_secreto_123');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token inválido' });
  }
}

module.exports = authMiddleware;