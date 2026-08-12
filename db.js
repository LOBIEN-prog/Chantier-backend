const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_FILE = path.resolve(
  (process.env.DB_FILE || './chantier-data.json').replace(/\.db$/, '.json')
);

function uid(prefix) {
  return prefix + Math.random().toString(36).slice(2, 9);
}

function loadRaw() {
  if (!fs.existsSync(DATA_FILE)) return null;
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch (e) { return null; }
}
function saveRaw() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

let data = loadRaw() || { users: [], tasks: [], nextUserId: 1 };
if (!data.nextUserId) data.nextUserId = (data.users.reduce((m, u) => Math.max(m, u.id), 0) || 0) + 1;

// ---- Seed uniquement au tout premier démarrage (fichier vide ou absent) ----
if (data.users.length === 0) {
  const seedUsers = [
    { email: 'proprietaire@chantier.local', password: 'chantier2026', name: 'Propriétaire', role: 'owner', trade: null },
    { email: 'macon@chantier.local', password: 'macon2026', name: 'Équipe Maçonnerie', role: 'artisan', trade: 'macon' },
    { email: 'menuisier@chantier.local', password: 'menuisier2026', name: 'Équipe Menuiserie', role: 'artisan', trade: 'menuisier' },
  ];
  console.log('\n=== Comptes de démonstration créés (à changer en production) ===');
  for (const u of seedUsers) {
    const hash = bcrypt.hashSync(u.password, 10);
    data.users.push({ id: data.nextUserId++, email: u.email, password_hash: hash, name: u.name, role: u.role, trade: u.trade });
    console.log(`  ${u.role.padEnd(8)} ${u.trade ? '(' + u.trade + ')' : '        '}  ${u.email}  /  ${u.password}`);
  }
  console.log('==================================================================\n');
}

if (data.tasks.length === 0) {
  const seedTasks = [
    { trade: 'macon', title: 'Implantation et piquetage', description: 'Traçage des axes de fondation au sol selon le plan de masse.', montant: 60000, status: 'paye' },
    { trade: 'macon', title: 'Fouilles en rigole', description: "Terrassement des tranchées de fondation à la profondeur hors gel.", montant: 180000, status: 'valide' },
    { trade: 'menuisier', title: 'Coffrage des semelles filantes', description: 'Fabrication et pose du coffrage bois avant coulage du béton.', montant: 150000, status: 'attente_validation' },
    { trade: 'macon', title: 'Coulage béton des semelles', description: 'Coulage et vibrage du béton de fondation, contrôle du dosage et du niveau.', montant: 450000, status: 'en_cours' },
    { trade: 'macon', title: 'Remblai et élévation des fondations', description: "Montage de l'élévation en agglos jusqu'au niveau du sol fini.", montant: 320000, status: 'a_faire' },
    { trade: 'menuisier', title: 'Coffrage de la longrine', description: 'Coffrage de la poutre de chaînage bas avant coulage.', montant: 140000, status: 'a_faire' },
  ];
  for (const t of seedTasks) {
    data.tasks.push({ id: uid('t'), photos: [], audio: null, comment: '', ...t });
  }
}

saveRaw();

module.exports = {
  users: {
    all() { return data.users; },
    findByEmail(email) { return data.users.find(u => u.email === email); },
    findById(id) { return data.users.find(u => u.id === id); },
    insert(u) {
      const user = { id: data.nextUserId++, trade: null, ...u };
      data.users.push(user);
      saveRaw();
      return user;
    },
    remove(id) {
      data.users = data.users.filter(u => u.id !== id);
      saveRaw();
    },
  },
  tasks: {
    all() { return data.tasks; },
    byTrade(trade) { return data.tasks.filter(t => t.trade === trade); },
    find(id) { return data.tasks.find(t => t.id === id); },
    insert(t) {
      const task = { id: uid('t'), photos: [], audio: null, comment: '', ...t };
      data.tasks.push(task);
      saveRaw();
      return task;
    },
    update(id, patch) {
      const t = data.tasks.find(x => x.id === id);
      if (!t) return null;
      Object.assign(t, patch);
      saveRaw();
      return t;
    },
  },
};
