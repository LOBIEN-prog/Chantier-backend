const express = require('express');
const db = require('../db');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();
const TYPES = ['financement', 'depense', 'avance'];

function computeSummary() {
  const tasks = db.tasks.all();
  const finance = db.finance.all();
  const budgetTotal = tasks.reduce((sum, t) => sum + t.montant, 0);
  const paiementsEtapes = finance.filter(f => f.type === 'paiement_etape').reduce((s, f) => s + f.montant, 0);
  const depenses = finance.filter(f => f.type === 'depense').reduce((s, f) => s + f.montant, 0);
  const avances = finance.filter(f => f.type === 'avance').reduce((s, f) => s + f.montant, 0);
  const financement = finance.filter(f => f.type === 'financement').reduce((s, f) => s + f.montant, 0);
  const solde = financement - (paiementsEtapes + depenses + avances);
  return { budgetTotal, paiementsEtapes, depenses, avances, financement, solde };
}

router.use(authenticate, requireRole('owner'));

// GET /api/finance — toutes les transactions + résumé
router.get('/', (req, res) => {
  const transactions = [...db.finance.all()].sort((a, b) => (a.date < b.date ? 1 : -1));
  res.json({ transactions, summary: computeSummary() });
});

// POST /api/finance — ajouter une dépense, une avance ou un financement reçu
router.post('/', (req, res) => {
  const { type, montant, description, date, taskId } = req.body || {};
  if (!TYPES.includes(type)) return res.status(400).json({ error: 'Type de transaction invalide.' });
  const amount = Math.max(0, parseInt(montant, 10) || 0);
  if (amount <= 0) return res.status(400).json({ error: 'Montant invalide.' });
  if (!description || !description.trim()) return res.status(400).json({ error: 'Description requise.' });
  const entry = db.finance.insert({
    type,
    montant: amount,
    description: description.trim(),
    date: date || new Date().toISOString().slice(0, 10),
    taskId: taskId || null,
  });
  res.status(201).json({ transaction: entry, summary: computeSummary() });
});

// DELETE /api/finance/:id — retirer une transaction saisie manuellement
router.delete('/:id', (req, res) => {
  const entry = db.finance.all().find(f => f.id === req.params.id);
  if (!entry) return res.status(404).json({ error: 'Transaction introuvable.' });
  if (entry.type === 'paiement_etape') {
    return res.status(400).json({ error: "Un paiement d'étape ne peut pas être supprimé ici." });
  }
  db.finance.remove(req.params.id);
  res.json({ ok: true, summary: computeSummary() });
});

module.exports = router;
module.exports.computeSummary = computeSummary;
