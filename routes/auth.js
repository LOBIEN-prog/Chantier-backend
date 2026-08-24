const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { authenticate, requireRole, JWT_SECRET } = require('../middleware/auth');

const router = express.Router();
const TRADES = ['macon', 'ferrailleur', 'electricien', 'plombier', 'menuisier'];

function publicUser(u) {
  return { id: u.id, email: u.email, name: u.name, role: u.role, trade: u.trade };
}

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis.' });

    const user = await db.users.findByEmail(String(email).toLowerCase().trim());
    if (!user) return res.status(401).json({ error: 'Identifiants incorrects.' });

    const ok = bcrypt.compareSync(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Identifiants incorrects.' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, trade: user.trade, name: user.name },
      JWT_SECRET,
      { expiresIn: '12h' }
    );
    res.json({ token, user: publicUser(user) });
  } catch (err) { res.status(500).json({ error: 'Erreur serveur.' }); }
});

router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await db.users.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' });
    res.json({ user: publicUser(user) });
  } catch (err) { res.status(500).json({ error: 'Erreur serveur.' }); }
});

router.get('/users', authenticate, requireRole('owner'), async (req, res) => {
  try {
    const users = (await db.users.all()).sort((a, b) => (a.role === b.role ? 0 : a.role === 'owner' ? -1 : 1));
    res.json({ users: users.map(publicUser) });
  } catch (err) { res.status(500).json({ error: 'Erreur serveur.' }); }
});

router.post('/users', authenticate, requireRole('owner'), async (req, res) => {
  try {
    const { email, password, name, role, trade } = req.body || {};
    if (!email || !password || !name || !role) return res.status(400).json({ error: 'Champs manquants.' });
    if (!['owner', 'artisan'].includes(role)) return res.status(400).json({ error: 'Rôle invalide.' });
    if (role === 'artisan' && !TRADES.includes(trade)) return res.status(400).json({ error: 'Corps de métier invalide pour un artisan.' });
    if (password.length < 6) return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères.' });

    const cleanEmail = String(email).toLowerCase().trim();
    if (await db.users.findByEmail(cleanEmail)) return res.status(409).json({ error: 'Un compte existe déjà avec cet email.' });

    const hash = bcrypt.hashSync(password, 10);
    const user = await db.users.insert({
      email: cleanEmail, password_hash: hash, name, role, trade: role === 'artisan' ? trade : null,
    });
    res.status(201).json({ user: publicUser(user) });
  } catch (err) { res.status(500).json({ error: 'Erreur serveur.' }); }
});

router.delete('/users/:id', authenticate, requireRole('owner'), async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (id === req.user.id) return res.status(400).json({ error: 'Vous ne pouvez pas supprimer votre propre compte.' });
    await db.users.remove(id);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: 'Erreur serveur.' }); }
});

module.exports = router;
