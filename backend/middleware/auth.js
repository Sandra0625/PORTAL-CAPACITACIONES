const jwt = require('jsonwebtoken');
const SECRET = 'clave_secreta'; // usa process.env.JWT_SECRET en producción

function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token inválido' });
  }
}

module.exports = verificarToken;
