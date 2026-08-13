const express = require('express');
const db = require('../db');
const { authenticate, requireRole, requireOwnTradeOrOwner } = require('../middleware/auth');

const router = express.Router();
const TRADES = ['macon', 'ferrailleur', 'electricien', 'plombier', 'menuisier'];

function outTask(t) {
  return {
    id: t.id,
    trade: t.trade,
    title: t.title,
    desc: t.description,
    montant: t.montant,
    status: t.status,
    photos: t.photos || [],
    audio: t.audio || null,
    comment: t.comment || '',
  };
}

router.use(authenticate);

router.get('/', (req, res) => {
  const rows = req.user.role === 'owner' ? db.tasks.all() : db.tasks.byTrade(req.user.trade);
  res.json({ tasks: rows.map(outTask) });
});

router.post('/', requireRole('owner'), (req, res) => {
  const { trade, title, desc, montant } = req.body || {};
  if (!trade || !TRADES.includes(trade)) return res.status(400).json({ error: 'Corps de métier invalide.' });
  if (!title || !title.trim()) return res.status(400).json({ error: 'Titre requis.' });
  const task = db.tasks.insert({
    trade,
    title: title.trim(),
    description: (desc || '').trim(),
    montant: Math.max(0, parseInt(montant, 10) || 0),
    status: 'a_faire',
  });
  res.status(201).json({ task: outTask(task) });
});

router.patch('/:id/start', requireRole('artisan'), (req, res) => {
  const task = db.tasks.find(req.params.id);
  if (!task) return res.status(404).json({ error: 'Tâche introuvable.' });
  requireOwnTradeOrOwner(() => task.trade)(req, res, () => {
    if (task.status !== 'a_faire') return res.status(409).json({ error: "Cette tâche n'est plus au statut « à faire »." });
    const updated = db.tasks.update(task.id, { status: 'en_cours' });
    res.json({ task: outTask(updated) });
  });
});

router.patch('/:id/proof', requireRole('artisan'), (req, res) => {
  const task = db.tasks.find(req.params.id);
  if (!task) return res.status(404).json({ error: 'Tâche introuvable.' });
  requireOwnTradeOrOwner(() => task.trade)(req, res, () => {
    if (task.status !== 'en_cours') return res.status(409).json({ error: 'La tâche doit être « en cours » pour déposer une preuve.' });
    const { photos, audio } = req.body || {};
    const photoList = Array.isArray(photos) ? photos.slice(0, 6) : [];
    if (photoList.length === 0 && !audio) {
      return res.status(400).json({ error: 'Ajoutez au moins une photo ou une note vocale.' });
    }
    const updated = db.tasks.update(task.id, {
      status: 'attente_validation',
      photos: photoList,
      audio: audio || null,
      comment: '',
    });
    res.json({ task: outTask(updated) });
  });
});

router.patch('/:id/validate', requireRole('owner'), (req, res) => {
  const task = db.tasks.find(req.params.id);
  if (!task) return res.status(404).json({ error: 'Tâche introuvable.' });
  if (task.status !== 'attente_validation') return res.status(409).json({ error: "Cette tâche n'est pas en attente de validation." });
  const { approve, comment } = req.body || {};
  const updated = approve
    ? db.tasks.update(task.id, { status: 'valide', comment: '' })
    : db.tasks.update(task.id, { status: 'en_cours', comment: (comment && comment.trim()) || 'Reprise demandée par le propriétaire.' });
  res.json({ task: outTask(updated) });
});

router.patch('/:id/pay', requireRole('owner'), (req, res) => {
  const task = db.tasks.find(req.params.id);
  if (!task) return res.status(404).json({ error: 'Tâche introuvable.' });
  if (task.status !== 'valide') return res.status(409).json({ error: 'Le travail doit être validé avant paiement.' });
  const updated = db.tasks.update(task.id, { status: 'paye' });
  res.json({ task: outTask(updated) });
});

module.exports = router;
