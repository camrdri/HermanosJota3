const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Leer el token del header (Formato: "Bearer <token>")
  const tokenHeader = req.header('Authorization');
  
  if (!tokenHeader) {
    return res.status(401).json({ msg: 'Acceso denegado: No hay token' });
  }

  try {

    const token = tokenHeader.split(' ')[1];
    
    const cifrado = jwt.verify(token, process.env.JWT_SECRET);
    
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};