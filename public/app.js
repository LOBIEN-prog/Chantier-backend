/* ===================== ICONS ===================== */
const svg=(paths,size=18)=>`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
const ICONS={
  helmet:svg('<path d="M4 18v-2a8 8 0 0 1 16 0v2"/><path d="M2 18h20v2H2z"/><path d="M12 6V3"/>'),
  wrench:svg('<path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L3 18l3 3 6.1-6.1a4 4 0 0 0 5.6-5.6l-2.5 2.5-2-2 2.5-2.5z"/>'),
  brick:svg('<rect x="3" y="7" width="8" height="5" rx="1"/><rect x="13" y="7" width="8" height="5" rx="1"/><rect x="8" y="14" width="8" height="5" rx="1"/>'),
  rebar:svg('<path d="M4 20 20 4"/><path d="M4 4l4 0m-4 0 0 4"/><path d="M20 20l-4 0m4 0 0-4"/><path d="M9 9l1.5 1.5M14 14l1.5 1.5"/>'),
  bolt:svg('<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>'),
  drop:svg('<path d="M12 2s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z"/>'),
  saw:svg('<path d="M3 12h13"/><path d="M16 6l5 6-5 6"/><path d="M6 9l3 3-3 3"/>'),
  camera:svg('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="14" r="3.5"/>'),
  mic:svg('<rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/><path d="M8 22h8"/>'),
  check:svg('<path d="M20 6 9 17l-5-5"/>'),
  x:svg('<path d="M18 6 6 18"/><path d="M6 6l12 12"/>'),
  coin:svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 9.5c0-1 1-1.8 3-1.8s3 .8 3 1.7c0 2.3-6 1-6 3.3 0 1 1 1.8 3 1.8s3-.8 3-1.7"/>'),
  arrowR:svg('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>'),
  plus:svg('<path d="M12 5v14"/><path d="M5 12h14"/>'),
  logout:svg('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>'),
  clock:svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>'),
  photo:svg('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 15-5-5-4 4-3-3-6 6"/>'),
  users:svg('<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
  trash:svg('<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>'),
  video:svg('<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-6 4 6 4z"/>'),
  wallet:svg('<path d="M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z"/><path d="M4 7V5a2 2 0 0 1 2-2h9l3 4"/><circle cx="16" cy="14" r="1.5"/>'),
  filter:svg('<path d="M3 5h18"/><path d="M6 12h12"/><path d="M10 19h4"/>'),
};

/* ===================== TRADES / STATUSES ===================== */
const TRADES={
  macon:{label:'Maçon',icon:ICONS.brick,color:'var(--macon)'},
  ferrailleur:{label:'Ferrailleur',icon:ICONS.rebar,color:'var(--ferrailleur)'},
  electricien:{label:'Électricien',icon:ICONS.bolt,color:'var(--electricien)'},
  plombier:{label:'Plombier',icon:ICONS.drop,color:'var(--plombier)'},
  menuisier:{label:'Menuisier',icon:ICONS.saw,color:'var(--menuisier)'},
};
const STATUSES=[
  {key:'a_faire',label:'À faire',color:'var(--gray)'},
  {key:'en_cours',label:'En cours',color:'var(--blue)'},
  {key:'attente_validation',label:'Attente validation',color:'var(--orange)'},
  {key:'valide',label:'Validé',color:'var(--green)'},
  {key:'paye',label:'Payé',color:'var(--gold)'},
];
const stMap=Object.fromEntries(STATUSES.map(s=>[s.key,s]));

/* ===================== STATE ===================== */
const state={
  token: sessionStorage.getItem('chantier_token') || null,
  user: null,
  tasks: [],
  filterTrade: 'all',
  loginError: '',
  capture: { photos: [], videos: [], audio: null },
  rec: { mediaRecorder: null, chunks: [], stream: null, timer: null, seconds: 0 },
  usersModal: { users: [] },
};

function fmt(n){ return (n||0).toLocaleString('fr-FR')+' FCFA'; }
function toast(msg){
  const el=document.getElementById('toast'); el.textContent=msg; el.classList.add('show');
  clearTimeout(toast._t); toast._t=setTimeout(()=>el.classList.remove('show'),2400);
}

/* ===================== API HELPER ===================== */
async function api(path, opts={}){
  const headers = Object.assign({'Content-Type':'application/json'}, opts.headers||{});
  if(state.token) headers['Authorization'] = 'Bearer '+state.token;
  const res = await fetch('/api'+path, { ...opts, headers });
  let body=null;
  try{ body = await res.json(); }catch(e){ /* pas de contenu JSON */ }
  if(res.status===401){ logout(true); throw new Error((body&&body.error)||'Session expirée'); }
  if(!res.ok){ throw new Error((body&&body.error)||'Erreur serveur'); }
  return body;
}

function logout(silent){
  state.token=null; state.user=null; state.tasks=[]; state.filterTrade='all';
  sessionStorage.removeItem('chantier_token');
  if(!silent) toast('Déconnecté');
  render();
}

/* ===================== INIT ===================== */
async function init(){
  if(state.token){
    try{
      const {user}=await api('/auth/me');
      state.user=user;
      await refreshTasks();
    }catch(e){ state.token=null; sessionStorage.removeItem('chantier_token'); }
  }
  render();
}
async function refreshTasks(){
  const {tasks}=await api('/tasks');
  state.tasks=tasks;
}
function findTask(id){ return state.tasks.find(t=>t.id===id); }

/* ===================== RENDER ROOT ===================== */
function render(){
  const app=document.getElementById('app');
  if(!state.user){ app.innerHTML=renderGate(); attachGateEvents(); return; }
  app.innerHTML = topbar() + (state.user.role==='owner' ? renderOwner() : renderArtisan());
  attachCommonEvents();
  if(state.user.role==='owner') attachOwnerEvents(); else attachArtisanEvents();
}

/* ===================== GATE (LOGIN) ===================== */
function renderGate(){
  return `
  <div class="gate">
    <div class="gate-mark">${ICONS.helmet}</div>
    <h1>Mon Chantier</h1>
    <p>Connectez-vous pour suivre l'avancement, déposer des preuves de travail ou valider les paiements par étape.</p>
    <div class="gate-card" style="width:100%;max-width:360px">
      ${state.loginError ? `<div class="error-box">${state.loginError}</div>` : ''}
      <form id="loginForm">
        <div class="field"><label>Email</label><input type="email" id="loginEmail" required placeholder="vous@exemple.com"></div>
        <div class="field"><label>Mot de passe</label><input type="password" id="loginPassword" required placeholder="••••••••"></div>
        <button type="submit" class="btn btn-orange btn-block">${ICONS.check} Se connecter</button>
      </form>
      <div class="small-note">Comptes de démonstration (voir la console du serveur au premier démarrage) : propriétaire, maçon, menuisier.</div>
    </div>
  </div>`;
}
function attachGateEvents(){
  document.getElementById('loginForm').onsubmit=async(e)=>{
    e.preventDefault();
    const email=document.getElementById('loginEmail').value.trim();
    const password=document.getElementById('loginPassword').value;
    try{
      const {token,user}=await api('/auth/login',{method:'POST',body:JSON.stringify({email,password})});
      state.token=token; state.user=user; state.loginError='';
      sessionStorage.setItem('chantier_token', token);
      await refreshTasks();
      render();
    }catch(err){
      state.loginError=err.message; render();
    }
  };
}

/* ===================== TOPBAR ===================== */
function topbar(){
  const u=state.user;
  const dot = u.role==='owner' ? 'var(--orange)' : TRADES[u.trade].color;
  const label = u.role==='owner' ? 'Propriétaire' : TRADES[u.trade].label;
  return `
  <div class="topbar">
    <div class="brand">
      <div class="brand-mark">${ICONS.helmet}</div>
      <div class="brand-text"><h1>Mon Chantier</h1><span>Connecté en tant que ${u.name}</span></div>
    </div>
    <div class="topbar-right">
      <div class="role-tag"><span class="role-dot" style="background:${dot}"></span>${label}</div>
      ${u.role==='owner' ? `<button class="btn-ghost" id="openFinance">${ICONS.wallet} Finances</button>` : ''}
      ${u.role==='owner' ? `<button class="btn-ghost" id="openUsers">${ICONS.users} Comptes</button>` : ''}
      <button class="btn-ghost" id="logoutBtn">${ICONS.logout} Déconnexion</button>
    </div>
  </div>`;
}
function attachCommonEvents(){
  document.getElementById('logoutBtn').onclick=()=>logout();
  const ub=document.getElementById('openUsers');
  if(ub) ub.onclick=openUsersModal;
  const fb=document.getElementById('openFinance');
  if(fb) fb.onclick=openFinanceModal;
}

/* ===================== OWNER VIEW ===================== */
function computeStats(){
  const tasks=state.tasks;
  const total=tasks.length;
  const byStatus=Object.fromEntries(STATUSES.map(s=>[s.key, tasks.filter(t=>t.status===s.key).length]));
  const pct = total? Math.round(((byStatus.valide+byStatus.paye)/total)*100):0;
  return {total, byStatus, pct};
}
function renderOwner(){
  const s=computeStats();
  return `
  <div class="hero">
    <div class="hero-top">
      <div><h2>Avancement global</h2><div class="sub">${s.total} tâches</div></div>
      <div class="gauge-wrap">
        <div class="gauge-label"><span>Progression</span><span>${s.pct}%</span></div>
        <div class="gauge"><div class="gauge-fill" style="width:${s.pct}%"></div></div>
      </div>
    </div>
    <div class="stat-row">
      ${STATUSES.map(st=>`<div class="stat-chip" style="border-left:4px solid ${st.color}"><b>${s.byStatus[st.key]}</b><span>${st.label}</span></div>`).join('')}
    </div>
  </div>
  <div class="filter-select-row">
    <span class="filter-select-icon">${ICONS.filter}</span>
    <select id="filterTradeSelect" class="filter-select">
      <option value="all" ${state.filterTrade==='all'?'selected':''}>Tous les corps de métier</option>
      ${Object.entries(TRADES).map(([k,t])=>`<option value="${k}" ${state.filterTrade===k?'selected':''}>${t.label}</option>`).join('')}
    </select>
  </div>
  <div class="board">${STATUSES.map(st=>renderColumn(st)).join('')}</div>
  <button class="fab" id="addTaskFab" title="Ajouter une tâche">${ICONS.plus}</button>`;
}
function renderColumn(st){
  let tasks=state.tasks.filter(t=>t.status===st.key);
  if(state.filterTrade!=='all') tasks=tasks.filter(t=>t.trade===state.filterTrade);
  return `
  <div class="col">
    <div class="col-head"><h4><span class="col-dot" style="background:${st.color}"></span>${st.label}</h4><span class="col-count">${tasks.length}</span></div>
    <div class="cards">${tasks.length? tasks.map(renderCard).join('') : `<div class="empty-col">Aucune tâche</div>`}</div>
  </div>`;
}
function renderCard(t){
  const tr=TRADES[t.trade]; const st=stMap[t.status];
  return `
  <div class="card" style="border-left-color:${tr.color}" data-id="${t.id}">
    <div class="stamp" style="color:${st.color}">${st.label}</div>
    <div class="card-trade"><span style="color:${tr.color};display:flex">${tr.icon}</span>${tr.label}</div>
    <h5>${t.title}</h5>
    <div class="amt">${fmt(t.montant)}</div>
    <div class="card-meta">
      ${t.photos.length?`<span class="proof-badge">${ICONS.photo} ${t.photos.length}</span>`:''}
      ${t.videos&&t.videos.length?`<span class="proof-badge">${ICONS.video} ${t.videos.length}</span>`:''}
