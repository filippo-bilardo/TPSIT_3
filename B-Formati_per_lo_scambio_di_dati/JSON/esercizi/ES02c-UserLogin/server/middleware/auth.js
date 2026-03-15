const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt.config');

// Middleware: verifica JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token mancante - autenticazione richiesta' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token scaduto', code: 'TOKEN_EXPIRED' });
      }
      return res.status(403).json({ error: 'Token non valido' });
    }
    
    // Aggiungi dati utente alla richiesta
    req.user = decoded;
    next();
  });
}

// Middleware opzionale: estrae token se presente
function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (!err) {
        req.user = decoded;
      }
    });
  }
  
  next();
}

module.exports = {
  authenticateToken,
  optionalAuth
};
