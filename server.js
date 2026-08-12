require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

require('./db'); // initialise la base + comptes de démonstration au premier lancement

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json({ limit: '15mb' })); // photos/audio en base64

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Chantier — serveur démarré sur http://localhost:${PORT}`);
});
