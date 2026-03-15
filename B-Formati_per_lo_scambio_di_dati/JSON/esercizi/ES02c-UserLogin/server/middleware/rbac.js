// Role-Based Access Control Middleware

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Autenticazione richiesta' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Accesso negato - privilegi insufficienti',
        required: allowedRoles,
        current: req.user.role
      });
    }

    next();
  };
}

// Shortcut per admin-only
function requireAdmin(req, res, next) {
  return requireRole('admin')(req, res, next);
}

module.exports = {
  requireRole,
  requireAdmin
};
