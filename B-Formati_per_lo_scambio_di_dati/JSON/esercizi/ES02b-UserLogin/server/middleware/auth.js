// Middleware di autenticazione

function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ 
      error: 'Non autenticato. Effettua il login.' 
    });
  }
  next();
}

function optionalAuth(req, res, next) {
  // Continua anche senza autenticazione
  // Utile per route che cambiano comportamento in base allo stato
  next();
}

module.exports = {
  requireAuth,
  optionalAuth
};
