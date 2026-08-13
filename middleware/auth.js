const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-changez-moi';

function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Authentification requise.' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { id, email, role, trade, name }
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Session invalide ou expirée.' });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Accès refusé pour ce rôle." });
    }
    next();
  };
}

function requireOwnTradeOrOwner(getTaskTrade) {
  return (req, res, next) => {
    if (req.user.role === 'owner') return next();
    const taskTrade = getTaskTrade(req);
    if (req.user.role === 'artisan' && req.user.trade === taskTrade) return next();
    return res.status(403).json({ error: "Cette tâche n'appartient pas à votre corps de métier." });
  };
}

module.exports = { authenticate, requireRole, requireOwnTradeOrOwner, JWT_SECRET };
