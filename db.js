const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('⚠️  MONGODB_URI manquant dans les variables d\'environnement.');
}

const client = new MongoClient(uri);
let usersCol, tasksCol, financeCol, countersCol;

function uid(prefix) {
  return prefix + Math.random().toString(36).slice(2, 9);
}

async function nextUserId() {
  const res = await countersCol.findOneAndUpdate(
    { _id: 'userId' },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: 'after' }
  );
  return res.seq;
}

async function connect() {
  await client.connect();
  const db = client.db('chantier');
  usersCol = db.collection('users');
  tasksCol = db.collection('tasks');
  financeCol = db.collection('finance');
  countersCol = db.collection('counters');

  // Index unique sur l'email pour éviter les doublons de comptes
  await usersCol.createIndex({ email: 1 }, { unique: true });

  // ---- Seed uniquement si la base est vide (premier démarrage) ----
  const userCount = await usersCol.countDocuments();
  if (userCount === 0) {
    const seedUsers = [
      { email: 'proprietaire@chantier.local', password: 'chantier2026', name: 'Propriétaire', role: 'owner', trade: null },
      { email: 'macon@chantier.local', password: 'macon2026', name: 'Équipe Maçonnerie', role: 'artisan', trade: 'macon' },
      { email: 'menuisier@chantier.local', password: 'menuisier2026', name: 'Équipe Menuiserie', role: 'artisan', trade: 'menuisier' },
    ];
    console.log('\n=== Comptes de démonstration créés (à changer en production) ===');
    for (const u of seedUsers) {
      const hash = bcrypt.hashSync(u.password, 10);
      const id = await nextUserId();
      await usersCol.insertOne({ id, email: u.email, password_hash: hash, name: u.name, role: u.role, trade: u.trade });
      console.log(`  ${u.role.padEnd(8)} ${u.trade ? '(' + u.trade + ')' : '        '}  ${u.email}  /  ${u.password}`);
    }
    console.log('==================================================================\n');
  }

  const taskCount = await tasksCol.countDocuments();
  if (taskCount === 0) {
    const seedTasks = [
      { trade: 'macon', title: 'Implantation et piquetage', description: 'Traçage des axes de fondation au sol selon le plan de masse.', montant: 60000, status: 'paye' },
      { trade: 'macon', title: 'Fouilles en rigole', description: "Terrassement des tranchées de fondation à la profondeur hors gel.", montant: 180000, status: 'valide' },
      { trade: 'menuisier', title: 'Coffrage des semelles filantes', description: 'Fabrication et pose du coffrage bois avant coulage du béton.', montant: 150000, status: 'attente_validation' },
      { trade: 'macon', title: 'Coulage béton des semelles', description: 'Coulage et vibrage du béton de fondation, contrôle du dosage et du niveau.', montant: 450000, status: 'en_cours' },
      { trade: 'macon', title: 'Remblai et élévation des fondations', description: "Montage de l'élévation en agglos jusqu'au niveau du sol fini.", montant: 320000, status: 'a_faire' },
      { trade: 'menuisier', title: 'Coffrage de la longrine', description: 'Coffrage de la poutre de chaînage bas avant coulage.', montant: 140000, status: 'a_faire' },
    ];
    for (const t of seedTasks) {
      await tasksCol.insertOne({ id: uid('t'), photos: [], videos: [], audio: null, comment: '', ...t });
    }
  }

  console.log('✅ MongoDB connecté — stockage permanent actif.');
}

const readyPromise = connect().catch((err) => {
  console.error('❌ Erreur de connexion MongoDB :', err.message);
  process.exit(1);
});

function strip(doc) {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return rest;
}

module.exports = {
  ready: () => readyPromise,
  users: {
    async all() { return (await usersCol.find({}).toArray()).map(strip); },
    async findByEmail(email) { return strip(await usersCol.findOne({ email })); },
    async findById(id) { return strip(await usersCol.findOne({ id })); },
    async insert(u) {
      const id = await nextUserId();
      const user = { id, trade: null, ...u };
      await usersCol.insertOne(user);
      return strip(user);
    },
    async remove(id) { await usersCol.deleteOne({ id }); },
  },
  tasks: {
    async all() { return (await tasksCol.find({}).toArray()).map(strip); },
    async byTrade(trade) { return (await tasksCol.find({ trade }).toArray()).map(strip); },
    async find(id) { return strip(await tasksCol.findOne({ id })); },
    async insert(t) {
      const task = { id: uid('t'), photos: [], videos: [], audio: null, comment: '', ...t };
      await tasksCol.insertOne(task);
      return strip(task);
    },
    async update(id, patch) {
      await tasksCol.updateOne({ id }, { $set: patch });
      return strip(await tasksCol.findOne({ id }));
    },
  },
  finance: {
    async all() { return (await financeCol.find({}).toArray()).map(strip); },
    async insert(rec) {
      const entry = { id: uid('f'), date: new Date().toISOString().slice(0, 10), taskId: null, ...rec };
      await financeCol.insertOne(entry);
      return strip(entry);
    },
    async remove(id) { await financeCol.deleteOne({ id }); },
  },
};
