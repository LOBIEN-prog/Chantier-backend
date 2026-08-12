# Mon Chantier — Backend d'authentification

Application de suivi de chantier avec un vrai serveur : mots de passe hashés
(bcrypt), sessions par jeton (JWT), et permissions vérifiées **côté serveur**
(pas seulement dans l'interface) pour séparer strictement l'accès du
propriétaire de celui de chaque corps de métier.

## 1. Installation

Prérequis : [Node.js](https://nodejs.org) 18 ou plus récent.

```bash
cd chantier-backend
npm install
cp .env.example .env
```

Ouvrez `.env` et changez `JWT_SECRET` par une chaîne aléatoire longue avant
toute mise en ligne réelle (ne gardez jamais la valeur d'exemple en
production).

## 2. Lancement

```bash
npm start
```

Le serveur démarre sur `http://localhost:4000` (modifiable via `PORT` dans
`.env`). Ouvrez cette adresse dans un navigateur.

Au tout premier démarrage, un fichier `chantier-data.json` est créé
automatiquement avec des tâches de démonstration au stade des fondations,
et **3 comptes de démonstration** dont les identifiants s'affichent dans la
console :

| Rôle          | Email                        | Mot de passe   |
|---------------|-------------------------------|----------------|
| Propriétaire  | proprietaire@chantier.local  | chantier2026   |
| Maçon         | macon@chantier.local          | macon2026      |
| Menuisier     | menuisier@chantier.local      | menuisier2026  |

**Changez ces mots de passe** (ou supprimez ces comptes et recréez les
vôtres depuis l'écran « Comptes ») avant tout usage réel.

## 3. Comment fonctionne la sécurité

- **Mots de passe** : jamais stockés en clair — hashés avec bcrypt avant
  d'entrer dans la base.
- **Connexion** : `POST /api/auth/login` vérifie l'email et le mot de passe,
  puis renvoie un jeton JWT valable 12h. Ce jeton est renvoyé à chaque
  requête suivante dans l'en-tête `Authorization`.
- **Séparation des accès** : chaque route de tâches vérifie le rôle contenu
  dans le jeton (impossible à falsifier sans le secret serveur) :
  - Le **propriétaire** peut créer des tâches, valider ou rejeter un
    travail, et valider un paiement.
  - Un **artisan** ne peut agir que sur les tâches de **son propre corps de
    métier** — vérifié en base à chaque requête, pas seulement caché dans
    l'écran. Un maçon ne peut pas démarrer une tâche de plomberie même en
    modifiant l'interface.
  - Seul le propriétaire peut créer ou supprimer des comptes (`/api/auth/users`).
- **Sessions** : le jeton est gardé en mémoire de session du navigateur
  (`sessionStorage`) — il disparaît à la fermeture de l'onglet, ce qui est
  adapté à des appareils partagés sur un chantier.

## 4. Gérer les comptes des artisans

Connecté en tant que propriétaire, cliquez sur **« Comptes »** en haut à
droite : vous pouvez y créer un accès pour chaque nouvel artisan (nom,
email, mot de passe, corps de métier) ou retirer un accès existant.

## 5. Limites à connaître avant une mise en ligne publique

- Le stockage en fichier JSON (`chantier-data.json`) convient très bien à
  un chantier unique avec quelques utilisateurs ; pour plusieurs chantiers
  ou beaucoup d'utilisateurs simultanés, migrez vers une vraie base de
  données (PostgreSQL, par exemple).
- Les photos/notes vocales sont stockées en base64 directement en base —
  simple et suffisant pour un usage modeste. Pour un chantier avec
  beaucoup de photos, un stockage de fichiers dédié (disque ou service
  cloud) serait plus efficace.
- Le serveur doit être déployé derrière **HTTPS** dès qu'il est accessible
  hors de votre réseau local, pour que les mots de passe circulent chiffrés.
- Pensez à sauvegarder régulièrement le fichier `chantier-data.json`.

## 6. Structure du projet

```
chantier-backend/
├── server.js              Point d'entrée du serveur
├── db.js                  Stockage JSON (fichier) + données de démonstration
├── middleware/auth.js     Vérification du jeton + contrôle des rôles
├── routes/auth.js         Connexion + gestion des comptes
├── routes/tasks.js        Tâches du chantier (Kanban, preuves, paiements)
└── public/                Frontend (HTML/CSS/JS servi par le serveur)
```
