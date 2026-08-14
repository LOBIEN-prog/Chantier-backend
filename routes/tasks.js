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
    videos: t.videos || [],
    audio: t.audio || null,
    comment: t.comment || '',
  };
}

router.use(authenticate);

// GET /api/tasks — le propriétaire voit tout, l'artisan ne voit que son corps de métier
router.get('/', (req, res) => {
  const rows = req.user.role === 'owner' ? db.tasks.all() : db.tasks.byTrade(req.user.trade);
  res.json({ tasks: rows.map(outTask) });
});

// POST /api/tasks — création d'une étape (propriétaire uniquement)
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

// PATCH /api/tasks/:id/start — l'artisan démarre une tâche de son métier
router.patch('/:id/start', requireRole('artisan'), (req, res) => {
  const task = db.tasks.find(req.params.id);
  if (!task) return res.status(404).json({ error: 'Tâche introuvable.' });
  requireOwnTradeOrOwner(() => task.trade)(req, res, () => {
    if (task.status !== 'a_faire') return res.status(409).json({ error: "Cette tâche n'est plus au statut « à faire »." });
    const updated = db.tasks.update(task.id, { status: 'en_cours' });
    res.json({ task: outTask(updated) });
  });
});

// PATCH /api/tasks/:id/proof — l'artisan dépose photos/note vocale et envoie pour validation
router.patch('/:id/proof', requireRole('artisan'), (req, res) => {
  const task = db.tasks.find(req.params.id);
  if (!task) return res.status(404).json({ error: 'Tâche introuvable.' });
  requireOwnTradeOrOwner(() => task.trade)(req, res, () => {
    if (task.status !== 'en_cours') return res.status(409).json({ error: 'La tâche doit être « en cours » pour déposer une preuve.' });
    const { photos, videos, audio } = req.body || {};
    const photoList = Array.isArray(photos) ? photos.slice(0, 6) : [];
    const videoList = Array.isArray(videos) ? videos.slice(0, 2) : [];
    if (photoList.length === 0 && videoList.length === 0 && !audio) {
      return res.status(400).json({ error: 'Ajoutez au moins une photo, une vidéo ou une note vocale.' });
    }
    const updated = db.tasks.update(task.id, {
      status: 'attente_validation',
      photos: photoList,
      videos: videoList,
      audio: audio || null,
      comment: '',
    });
    res.json({ task: outTask(updated) });
  });
});

// PATCH /api/tasks/:id/validate — le propriétaire valide ou rejette le travail
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

// PATCH /api/tasks/:id/pay — le propriétaire valide le paiement de l'étape
router.patch('/:id/pay', requireRole('owner'), (req, res) => {
  const task = db.tasks.find(req.params.id);
  if (!task) return res.status(404).json({ error: 'Tâche introuvable.' });
  if (task.status !== 'valide') return res.status(409).json({ error: 'Le travail doit être validé avant paiement.' });
  const updated = db.tasks.update(task.id, { status: 'paye' });
  // Enregistre automatiquement ce paiement dans le module financier
  db.finance.insert({
    type: 'paiement_etape',
    montant: task.montant,
    description: `Paiement — ${task.title}`,
    taskId: task.id,
  });
  res.json({ task: outTask(updated) });
});

module.exports = router;
