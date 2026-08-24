require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const db = require('./db'); // initialise MongoDB + comptes de démonstration au premier lancement

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const financeRoutes = require('./routes/finance');

const app = express();
app.use(cors());
app.use(express.json({ limit: '40mb' })); // photos/vidéos courtes/audio en base64

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/finance', financeRoutes);

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 4000;

// On attend que MongoDB soit prêt avant d'accepter des requêtes
db.ready()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Chantier — serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Impossible de démarrer : connexion base de données échouée.', err);
    process.exit(1);
  });
