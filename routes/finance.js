const express = require('express');
const db = require('../db');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();
const TYPES = ['financement', 'depense', 'avance'];

async function computeSummary() {
  const tasks = await db.tasks.all();
  const finance = await db.finance.all();
  const budgetTotal = tasks.reduce((sum, t) => sum + t.montant, 0);
  const paiementsEtapes = finance.filter(f => f.type === 'paiement_etape').reduce((s, f) => s + f.montant, 0);
  const depenses = finance.filter(f => f.type === 'depense').reduce((s, f) => s + f.montant, 0);
  const avances = finance.filter(f => f.type === 'avance').reduce((s, f) => s + f.montant, 0);
  const financement = finance.filter(f => f.type === 'financement').reduce((s, f) => s + f.montant, 0);
  const solde = financement - (paiementsEtapes + depenses + avances);
  return { budgetTotal, paiementsEtapes, depenses, avances, financement, solde };
}

router.use(authenticate, requireRole('owner'));

router.get('/', async (req, res) => {
  try {
    const transactions = (await db.finance.all()).sort((a, b) => (a.date < b.date ? 1 : -1));
    res.json({ transactions, summary: await computeSummary() });
  } catch (err) { res.status(500).json({ error: 'Erreur serveur.' }); }
});

router.post('/', async (req, res) => {
  try {
    const { type, montant, description, date, taskId } = req.body || {};
    if (!TYPES.includes(type)) return res.status(400).json({ error: 'Type de transaction invalide.' });
    const amount = Math.max(0, parseInt(montant, 10) || 0);
    if (amount <= 0) return res.status(400).json({ error: 'Montant invalide.' });
    if (!description || !description.trim()) return res.status(400).json({ error: 'Description requise.' });
    const entry = await db.finance.insert({
      type, montant: amount, description: description.trim(),
      date: date || new Date().toISOString().slice(0, 10), taskId: taskId || null,
    });
    res.status(201).json({ transaction: entry, summary: await computeSummary() });
  } catch (err) { res.status(500).json({ error: 'Erreur serveur.' }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const entry = (await db.finance.all()).find(f => f.id === req.params.id);
    if (!entry) return res.status(404).json({ error: 'Transaction introuvable.' });
    if (entry.type === 'paiement_etape') return res.status(400).json({ error: "Un paiement d'étape ne peut pas être supprimé ici." });
    await db.finance.remove(req.params.id);
    res.json({ ok: true, summary: await computeSummary() });
  } catch (err) { res.status(500).json({ error: 'Erreur serveur.' }); }
});

module.exports = router;
