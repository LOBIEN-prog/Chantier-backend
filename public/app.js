/* ===================== ICONS ===================== */
const svg=(paths,size=20)=>`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
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
  grid:svg('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>'),
  user:svg('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>'),
  menu:svg('<path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>'),
  search:svg('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
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
  {key:'a_faire',label:'À faire',color:'var(--st-a-faire)'},
  {key:'en_cours',label:'En cours',color:'var(--st-en-cours)'},
  {key:'attente_validation',label:'Attente validation',color:'var(--st-attente)'},
  {key:'valide',label:'Validé',color:'var(--st-valide)'},
  {key:'paye',label:'Payé',color:'var(--st-paye)'},
];
const stMap=Object.fromEntries(STATUSES.map(s=>[s.key,s]));

const OWNER_TABS=[
  {key:'chantiers',label:'Chantiers',icon:ICONS.grid},
  {key:'medias',label:'Médias',icon:ICONS.photo},
  {key:'finance',label:'Finance',icon:ICONS.wallet},
  {key:'intervenants',label:'Intervenants',icon:ICONS.users},
  {key:'compte',label:'Compte',icon:ICONS.user},
];
const ARTISAN_TABS=[
  {key:'taches',label:'Mes tâches',icon:ICONS.grid},
  {key:'medias',label:'Médias',icon:ICONS.photo},
  {key:'compte',label:'Compte',icon:ICONS.user},
];
const SUBFILTERS=[
  {key:'tous',label:'Tous'},
  {key:'en_cours',label:'En cours'},
  {key:'attente_validation',label:'En attente'},
  {key:'valide',label:'Validé'},
];

/* ===================== STATE ===================== */
const state={
  token: sessionStorage.getItem('chantier_token') || null,
  user: null,
  tasks: [],
  activeTab: null,
  subFilter: 'tous',
  tradeFilter: 'all',
  searchOpen: false,
  searchQuery: '',
  drawerOpen: false,
  loginError: '',
  capture: { photos: [], videos: [], audio: null },
  rec: { mediaRecorder: null, chunks: [], stream: null, timer: null, seconds: 0 },
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
  try{ body = await res.json(); }catch(e){}
  if(res.status===401){ logout(true); throw new Error((body&&body.error)||'Session expirée'); }
  if(!res.ok){ throw new Error((body&&body.error)||'Erreur serveur'); }
  return body;
}
function logout(silent){
  state.token=null; state.user=null; state.tasks=[]; state.activeTab=null;
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
      state.activeTab = user.role==='owner' ? 'chantiers' : 'taches';
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
function currentTabs(){ return state.user.role==='owner' ? OWNER_TABS : ARTISAN_TABS; }

/* ===================== RENDER ROOT ===================== */
function render(){
  const app=document.getElementById('app');
  if(!state.user){ app.innerHTML=renderGate(); attachGateEvents(); return; }
  app.innerHTML = `
    ${renderTopbar()}
    <div class="page-content">${renderPage()}</div>
    ${renderBottomNav()}
    ${state.drawerOpen ? renderDrawer() : ''}
  `;
  attachTopbarEvents();
  attachBottomNavEvents();
  if(state.drawerOpen) attachDrawerEvents();
  attachPageEvents();
}

/* ===================== GATE (LOGIN) ===================== */
function renderGate(){
  return `
  <div class="gate">
    <div class="gate-mark">${ICONS.helmet}</div>
    <h1>Mon Chantier</h1>
    <p>Connectez-vous pour suivre l'avancement, déposer des preuves de travail ou valider les paiements par étape.</p>
    <div class="gate-card">
      ${state.loginError ? `<div class="error-box">${state.loginError}</div>` : ''}
      <form id="loginForm">
        <div class="field"><label>Email</label><input type="email" id="loginEmail" required placeholder="vous@exemple.com"></div>
        <div class="field"><label>Mot de passe</label><input type="password" id="loginPassword" required placeholder="••••••••"></div>
        <button type="submit" class="btn btn-primary btn-block">${ICONS.check} Se connecter</button>
      </form>
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
      state.activeTab = user.role==='owner' ? 'chantiers' : 'taches';
      sessionStorage.setItem('chantier_token', token);
      await refreshTasks();
      render();
    }catch(err){ state.loginError=err.message; render(); }
  };
}

/* ===================== TOPBAR ===================== */
function pageTitle(){
  const titles={chantiers:'Chantiers',taches:'Mes tâches',medias:'Médias',finance:'Finance',intervenants:'Intervenants',compte:'Compte'};
  return titles[state.activeTab] || 'Mon Chantier';
}
function renderTopbar(){
  const u=state.user;
  return `
  <div class="topbar">
    <button class="icon-btn" id="burgerBtn">${ICONS.menu}</button>
    <div class="topbar-info">
      <div class="site-name">Mon Chantier</div>
      <div class="user-line">${u.role==='owner'?'Propriétaire':TRADES[u.trade].label} · ${u.name}</div>
    </div>
    <div class="topbar-actions">
      <button class="icon-btn gold" id="searchBtn">${ICONS.search}</button>
      ${quickAddVisible() ? `<button class="icon-btn gold" id="quickAddBtn">${ICONS.plus}</button>` : ''}
    </div>
  </div>
  ${state.searchOpen ? `
  <div class="search-row">
    <input type="text" id="searchInput" placeholder="Rechercher..." value="${state.searchQuery}">
  </div>` : ''}
  `;
}
function quickAddVisible(){
  if(state.user.role!=='owner') return false;
  return ['chantiers','finance','intervenants'].includes(state.activeTab);
}
function attachTopbarEvents(){
  document.getElementById('burgerBtn').onclick=()=>{ state.drawerOpen=true; render(); };
  document.getElementById('searchBtn').onclick=()=>{ state.searchOpen=!state.searchOpen; if(!state.searchOpen) state.searchQuery=''; render(); };
  const si=document.getElementById('searchInput');
  if(si){ si.focus(); si.setSelectionRange(si.value.length,si.value.length);
    si.oninput=()=>{ state.searchQuery=si.value; renderPageOnly(); };
  }
  const qa=document.getElementById('quickAddBtn');
  if(qa) qa.onclick=()=>{
    if(state.activeTab==='chantiers') openAddTaskModal();
    else if(state.activeTab==='finance') openAddFinanceModal();
    else if(state.activeTab==='intervenants') openAddUserModal();
  };
}
function renderPageOnly(){
  document.querySelector('.page-content').innerHTML=renderPage();
  attachPageEvents();
}

/* ===================== DRAWER (menu burger) ===================== */
function renderDrawer(){
  const u=state.user;
  const tabs=currentTabs();
  return `
  <div class="drawer-overlay" id="drawerOverlay">
    <div class="drawer">
      <div class="drawer-head">
        <div class="drawer-avatar">${u.name.charAt(0).toUpperCase()}</div>
        <div>
          <b>${u.name}</b>
          <span>${u.email}</span>
          <span class="drawer-role">${u.role==='owner'?'Propriétaire':TRADES[u.trade].label}</span>
        </div>
      </div>
      <div class="drawer-nav">
        ${tabs.map(t=>`<button class="drawer-link ${state.activeTab===t.key?'active':''}" data-tab="${t.key}">${t.icon}<span>${t.label}</span></button>`).join('')}
      </div>
      <button class="btn btn-outline-gold btn-block" id="drawerLogout">${ICONS.logout} Déconnexion</button>
    </div>
  </div>`;
}
function attachDrawerEvents(){
  document.getElementById('drawerOverlay').onclick=(e)=>{ if(e.target.id==='drawerOverlay'){ state.drawerOpen=false; render(); } };
  document.querySelectorAll('.drawer-link').forEach(b=>{
    b.onclick=()=>{ state.activeTab=b.dataset.tab; state.subFilter='tous'; state.drawerOpen=false; render(); };
  });
  document.getElementById('drawerLogout').onclick=()=>{ state.drawerOpen=false; logout(); };
}

/* ===================== BOTTOM NAV ===================== */
function renderBottomNav(){
  const tabs=currentTabs();
  return `
  <nav class="bottom-nav">
    ${tabs.map(t=>`
      <button class="bn-item ${state.activeTab===t.key?'active':''}" data-tab="${t.key}">
        ${t.icon}<span>${t.label}</span>
      </button>`).join('')}
  </nav>`;
}
function attachBottomNavEvents(){
  document.querySelectorAll('.bn-item').forEach(b=>{
    b.onclick=()=>{ state.activeTab=b.dataset.tab; state.subFilter='tous'; state.searchOpen=false; state.searchQuery=''; render(); };
  });
}

/* ===================== PAGE ROUTER ===================== */
function renderPage(){
  if(state.user.role==='owner'){
    if(state.activeTab==='chantiers') return renderChantiersPage();
    if(state.activeTab==='medias') return renderMediasPage();
    if(state.activeTab==='finance') return renderFinancePage();
    if(state.activeTab==='intervenants') return renderIntervenantsPage();
    if(state.activeTab==='compte') return renderComptePage();
  } else {
    if(state.activeTab==='taches') return renderChantiersPage();
    if(state.activeTab==='medias') return renderMediasPage();
    if(state.activeTab==='compte') return renderComptePage();
  }
  return '';
}
function attachPageEvents(){
  const sf=document.querySelectorAll('.subfilter-chip');
  sf.forEach(c=>{ c.onclick=()=>{ state.subFilter=c.dataset.f; renderPageOnly(); }; });
  const tf=document.getElementById('tradeFilterSelect');
  if(tf) tf.onchange=()=>{ state.tradeFilter=tf.value; renderPageOnly(); };

  document.querySelectorAll('.task-row').forEach(c=>{ c.onclick=()=>openTaskModal(c.dataset.id); });
  document.querySelectorAll('[data-start]').forEach(b=>{
    b.onclick=async(e)=>{ e.stopPropagation();
      try{ await api(`/tasks/${b.dataset.start}/start`,{method:'PATCH'}); await refreshTasks(); renderPageOnly(); toast('Tâche démarrée'); }
      catch(err){ toast(err.message); }
    };
  });
  document.querySelectorAll('[data-finish]').forEach(b=>{
    b.onclick=(e)=>{ e.stopPropagation(); openProofModal(b.dataset.finish); };
  });
  document.querySelectorAll('.media-thumb').forEach(m=>{
    m.onclick=()=>openMediaLightbox(m.dataset.src, m.dataset.type);
  });
  document.querySelectorAll('[data-del]').forEach(b=>{
    b.onclick=async()=>{
      try{ await api(`/auth/users/${b.dataset.del}`,{method:'DELETE'}); const r=await api('/auth/users'); state.usersCache=r.users; renderPageOnly(); toast('Accès supprimé'); }
      catch(err){ toast(err.message); }
    };
  });
  document.querySelectorAll('[data-delf]').forEach(b=>{
    b.onclick=async()=>{
      try{ const r=await api(`/finance/${b.dataset.delf}`,{method:'DELETE'}); state.financeCache=r; toast('Transaction supprimée'); await loadFinance(); renderPageOnly(); }
      catch(err){ toast(err.message); }
    };
  });
  const addUserForm=document.getElementById('createUser');
  if(addUserForm) attachIntervenantsFormEvents();
  const addFinanceForm=document.getElementById('createFinance');
  if(addFinanceForm) attachFinanceFormEvents();
  const logoutBtn=document.getElementById('compteLogout');
  if(logoutBtn) logoutBtn.onclick=()=>logout();
}

/* ===================== CHANTIERS / MES TÂCHES ===================== */
function filteredTasks(){
  let list = state.user.role==='owner' ? state.tasks : state.tasks;
  if(state.tradeFilter!=='all') list=list.filter(t=>t.trade===state.tradeFilter);
  if(state.subFilter==='en_cours') list=list.filter(t=>t.status==='en_cours');
  else if(state.subFilter==='attente_validation') list=list.filter(t=>t.status==='attente_validation');
  else if(state.subFilter==='valide') list=list.filter(t=>t.status==='valide'||t.status==='paye');
  if(state.searchQuery.trim()){
    const q=state.searchQuery.toLowerCase();
    list=list.filter(t=>t.title.toLowerCase().includes(q) || TRADES[t.trade].label.toLowerCase().includes(q));
  }
  return list;
}
function renderChantiersPage(){
  const isOwner = state.user.role==='owner';
  const list=filteredTasks();
  const total=state.tasks.length;
  const done=state.tasks.filter(t=>t.status==='valide'||t.status==='paye').length;
  const pct= total? Math.round((done/total)*100):0;
  return `
  <div class="page-head">
    <h2>${isOwner?'Chantiers':'Mes tâches'}</h2>
    <div class="gauge-wrap">
      <div class="gauge-label"><span>Progression</span><span>${pct}%</span></div>
      <div class="gauge"><div class="gauge-fill" style="width:${pct}%"></div></div>
    </div>
  </div>
  <div class="subfilter-row">
    ${SUBFILTERS.map(f=>`<button class="subfilter-chip ${state.subFilter===f.key?'active':''}" data-f="${f.key}">${f.label}</button>`).join('')}
  </div>
  ${isOwner ? `
  <div class="filter-select-row">
    <select id="tradeFilterSelect" class="filter-select">
      <option value="all" ${state.tradeFilter==='all'?'selected':''}>Tous les corps de métier</option>
      ${Object.entries(TRADES).map(([k,t])=>`<option value="${k}" ${state.tradeFilter===k?'selected':''}>${t.label}</option>`).join('')}
    </select>
  </div>` : ''}
  <div class="task-list">
    ${list.length? list.map(t=>renderTaskRow(t,isOwner)).join('') : `<div class="empty-state">Aucune tâche ici</div>`}
  </div>`;
}
function renderTaskRow(t,isOwner){
  const tr=TRADES[t.trade]; const st=stMap[t.status];
  let action='';
  if(!isOwner){
    if(t.status==='a_faire') action=`<button class="btn btn-primary btn-sm" data-start="${t.id}">${ICONS.arrowR} Démarrer</button>`;
    else if(t.status==='en_cours') action=`<button class="btn btn-gold btn-sm" data-finish="${t.id}">${ICONS.camera} Preuve</button>`;
  }
  return `
  <div class="task-row" data-id="${t.id}" style="border-left-color:${tr.color}">
    <div class="task-row-main">
      <div class="task-row-top">
        <span class="task-trade" style="color:${tr.color}">${tr.icon} ${tr.label}</span>
        <span class="status-badge" style="background:${st.color}">${st.label}</span>
      </div>
      <h5>${t.title}</h5>
      <div class="task-row-bottom">
        <span class="amt">${fmt(t.montant)}</span>
        <span class="proof-icons">
          ${t.photos.length?`<span class="proof-badge">${ICONS.photo}${t.photos.length}</span>`:''}
          ${t.videos&&t.videos.length?`<span class="proof-badge">${ICONS.video}${t.videos.length}</span>`:''}
          ${t.audio?`<span class="proof-badge">${ICONS.mic}1</span>`:''}
        </span>
      </div>
      ${t.comment && t.status==='en_cours' ? `<div class="reject-note">${ICONS.x} ${t.comment}</div>`:''}
    </div>
    ${action ? `<div class="task-row-action">${action}</div>` : ''}
  </div>`;
}

/* ===================== MÉDIAS ===================== */
function renderMediasPage(){
  const isOwner=state.user.role==='owner';
  let items=[];
  state.tasks.forEach(t=>{
    (t.photos||[]).forEach(p=>items.push({src:p,type:'image',task:t}));
    (t.videos||[]).forEach(v=>items.push({src:v,type:'video',task:t}));
  });
  if(state.tradeFilter!=='all') items=items.filter(i=>i.task.trade===state.tradeFilter);
  if(state.searchQuery.trim()){
    const q=state.searchQuery.toLowerCase();
    items=items.filter(i=>i.task.title.toLowerCase().includes(q));
  }
  return `
  <div class="page-head"><h2>Médias</h2><div class="sub">${items.length} fichier(s)</div></div>
  ${isOwner ? `
  <div class="filter-select-row">
    <select id="tradeFilterSelect" class="filter-select">
      <option value="all" ${state.tradeFilter==='all'?'selected':''}>Tous les corps de métier</option>
      ${Object.entries(TRADES).map(([k,t])=>`<option value="${k}" ${state.tradeFilter===k?'selected':''}>${t.label}</option>`).join('')}
    </select>
  </div>` : ''}
  <div class="media-grid">
    ${items.length? items.map(i=>`
      <div class="media-thumb" data-src="${i.src}" data-type="${i.type}">
        ${i.type==='image'? `<img src="${i.src}">` : `<video src="${i.src}" muted></video><span class="media-play">${ICONS.video}</span>`}
        <div class="media-caption">${i.task.title}</div>
      </div>`).join('') : `<div class="empty-state">Aucun média déposé pour l'instant</div>`}
  </div>`;
}
function openMediaLightbox(src,type){
  document.getElementById('modalRoot').innerHTML=`
  <div class="overlay" id="ov">
    <div class="modal lightbox-modal">
      <button class="x-btn lightbox-close" id="closeM">${ICONS.x}</button>
      ${type==='image' ? `<img src="${src}" class="lightbox-media">` : `<video src="${src}" controls autoplay class="lightbox-media"></video>`}
    </div>
  </div>`;
  document.getElementById('closeM').onclick=closeModal;
  document.getElementById('ov').onclick=(e)=>{ if(e.target.id==='ov') closeModal(); };
}

/* ===================== FINANCE (page) ===================== */
const FINANCE_TYPES={
  financement:{label:'Financement reçu',color:'var(--forest)'},
  paiement_etape:{label:"Paiement d'étape",color:'var(--gold-dark)'},
  depense:{label:'Dépense',color:'var(--danger)'},
  avance:{label:'Avance / prêt',color:'var(--info)'},
};
async function loadFinance(){
  try{ state.financeCache=await api('/finance'); }catch(err){ toast(err.message); }
}
function renderFinancePage(){
  if(!state.financeCache){ loadFinance().then(renderPageOnly); return `<div class="empty-state">Chargement…</div>`; }
  const {transactions,summary}=state.financeCache;
  return `
  <div class="page-head"><h2>Finance</h2><div class="sub">Paiements, dépenses et avances</div></div>
  <div class="finance-summary">
    <div class="finance-stat"><span>Budget total</span><b>${fmt(summary.budgetTotal)}</b></div>
    <div class="finance-stat"><span>Financement reçu</span><b style="color:var(--forest)">${fmt(summary.financement)}</b></div>
    <div class="finance-stat"><span>Payé aux artisans</span><b style="color:var(--gold-dark)">${fmt(summary.paiementsEtapes)}</b></div>
    <div class="finance-stat"><span>Dépenses</span><b style="color:var(--danger)">${fmt(summary.depenses)}</b></div>
    <div class="finance-stat"><span>Avances / prêts</span><b style="color:var(--info)">${fmt(summary.avances)}</b></div>
    <div class="finance-stat finance-solde"><span>Solde disponible</span><b>${fmt(summary.solde)}</b></div>
  </div>
  <h3 class="section-title">Historique</h3>
  <div class="finance-list">
    ${transactions.length? transactions.map(f=>`
      <div class="finance-row">
        <div class="who"><b style="color:${FINANCE_TYPES[f.type].color}">${FINANCE_TYPES[f.type].label}</b><span>${f.description} · ${f.date}</span></div>
        <div class="finance-amt">${fmt(f.montant)}</div>
        ${f.type!=='paiement_etape' ? `<button class="btn btn-outline-gold btn-sm" data-delf="${f.id}">${ICONS.trash}</button>` : ''}
      </div>`).join('') : `<div class="empty-state">Aucune transaction pour l'instant</div>`}
  </div>
  <h3 class="section-title">Ajouter une transaction</h3>
  <div class="inline-form">
    <div class="field"><label>Type</label>
      <select id="ftType">
        <option value="financement">Financement reçu</option>
        <option value="depense">Dépense</option>
        <option value="avance">Avance donnée à un artisan</option>
      </select>
    </div>
    <div class="field"><label>Description</label><input id="ftDesc" placeholder="Ex. Achat ciment et fer à béton"></div>
    <div class="field"><label>Montant (FCFA)</label><input id="ftMontant" type="number" placeholder="Ex. 120000"></div>
    <button class="btn btn-gold btn-block" id="createFinance">${ICONS.plus} Ajouter</button>
  </div>`;
}
function attachFinanceFormEvents(){
  document.getElementById('createFinance').onclick=async()=>{
    const type=document.getElementById('ftType').value;
    const description=document.getElementById('ftDesc').value.trim();
    const montant=parseInt(document.getElementById('ftMontant').value)||0;
    if(!description||montant<=0){ toast('Merci de remplir la description et un montant valide'); return; }
    try{ await api('/finance',{method:'POST',body:JSON.stringify({type,description,montant})}); await loadFinance(); renderPageOnly(); toast('Transaction ajoutée'); }
    catch(err){ toast(err.message); }
  };
}
function openAddFinanceModal(){
  document.querySelector('.page-content')?.scrollIntoView();
  const el=document.getElementById('ftDesc');
  if(el) el.focus();
}

/* ===================== INTERVENANTS (page) ===================== */
async function loadUsers(){
  try{ const r=await api('/auth/users'); state.usersCache=r.users; }catch(err){ toast(err.message); }
}
function renderIntervenantsPage(){
  if(!state.usersCache){ loadUsers().then(renderPageOnly); return `<div class="empty-state">Chargement…</div>`; }
  const users=state.usersCache;
  return `
  <div class="page-head"><h2>Intervenants</h2><div class="sub">${users.length} compte(s)</div></div>
  <div class="user-list">
    ${users.map(u=>`
      <div class="user-row">
        <div class="who"><b>${u.name}</b><span>${u.email} · ${u.role==='owner'?'Propriétaire':TRADES[u.trade].label}</span></div>
        ${u.id!==state.user.id ? `<button class="btn btn-outline-gold btn-sm" data-del="${u.id}">${ICONS.trash}</button>` : ''}
      </div>`).join('')}
  </div>
  <h3 class="section-title">Ajouter un accès</h3>
  <div class="inline-form">
    <div class="field"><label>Nom</label><input id="nName" placeholder="Ex. Équipe Électricité"></div>
    <div class="field"><label>Email</label><input id="nEmail" type="email" placeholder="nouveau@chantier.local"></div>
    <div class="field"><label>Mot de passe</label><input id="nPassword" type="password" placeholder="6 caractères minimum"></div>
    <div class="field"><label>Rôle</label>
      <select id="nRole"><option value="artisan">Artisan</option><option value="owner">Propriétaire</option></select>
    </div>
    <div class="field" id="nTradeField"><label>Corps de métier</label>
      <select id="nTrade">${Object.entries(TRADES).map(([k,t])=>`<option value="${k}">${t.label}</option>`).join('')}</select>
    </div>
    <button class="btn btn-gold btn-block" id="createUser">${ICONS.plus} Créer le compte</button>
  </div>`;
}
function attachIntervenantsFormEvents(){
  const roleSel=document.getElementById('nRole'); const tradeField=document.getElementById('nTradeField');
  const sync=()=>{ tradeField.style.display = roleSel.value==='artisan' ? 'block':'none'; };
  sync(); roleSel.onchange=sync;
  document.getElementById('createUser').onclick=async()=>{
    const name=document.getElementById('nName').value.trim();
    const email=document.getElementById('nEmail').value.trim();
    const password=document.getElementById('nPassword').value;
    const role=roleSel.value;
    const trade=document.getElementById('nTrade').value;
    if(!name||!email||!password){ toast('Merci de remplir tous les champs'); return; }
    try{
      await api('/auth/users',{method:'POST',body:JSON.stringify({name,email,password,role,trade})});
      await loadUsers(); renderPageOnly(); toast('Compte créé');
    }catch(err){ toast(err.message); }
  };
}
function openAddUserModal(){
  document.getElementById('nName')?.focus();
}

/* ===================== COMPTE ===================== */
function renderComptePage(){
  const u=state.user;
  return `
  <div class="page-head"><h2>Compte</h2></div>
  <div class="compte-card">
    <div class="compte-avatar">${u.name.charAt(0).toUpperCase()}</div>
    <h3>${u.name}</h3>
    <div class="compte-role">${u.role==='owner'?'Propriétaire':TRADES[u.trade].label}</div>
    <div class="compte-email">${u.email}</div>
  </div>
  <button class="btn btn-outline-gold btn-block" id="compteLogout">${ICONS.logout} Déconnexion</button>`;
}

/* ===================== TASK DETAIL MODAL ===================== */
function closeModal(){ document.getElementById('modalRoot').innerHTML=''; stopRecordingIfAny(); state.capture={photos:[],videos:[],audio:null}; }
function openTaskModal(id){
  const t=findTask(id); const tr=TRADES[t.trade]; const st=stMap[t.status];
  let actions='';
  if(state.user.role==='owner'){
    if(t.status==='attente_validation'){
      actions=`
      <div class="action-row">
        <button class="btn btn-primary" id="validateWork">${ICONS.check} Valider le travail</button>
        <button class="btn btn-outline-gold" id="rejectWork">${ICONS.x} Rejeter</button>
      </div>
      <div class="field" style="margin-top:10px"><label>Commentaire (si rejet)</label><textarea id="rejectComment" placeholder="Expliquer ce qui doit être repris..."></textarea></div>`;
    } else if(t.status==='valide'){
      actions=`<div class="action-row"><button class="btn btn-gold" id="validatePayment">${ICONS.coin} Valider le paiement (${fmt(t.montant)})</button></div>`;
    } else if(t.status==='paye'){
      actions=`<div class="small-note">${ICONS.check} Étape validée et payée.</div>`;
    } else {
      actions=`<div class="small-note">En attente d'exécution ou de dépôt de preuve par l'artisan.</div>`;
    }
  }
  document.getElementById('modalRoot').innerHTML=`
  <div class="overlay" id="ov">
    <div class="modal">
      <div class="modal-head">
        <div><div class="trade-line"><span style="color:${tr.color};display:flex">${tr.icon}</span>${tr.label} · <span style="color:${st.color}">${st.label}</span></div><h3>${t.title}</h3></div>
        <button class="x-btn" id="closeM">${ICONS.x}</button>
      </div>
      <div class="modal-body">
        <div class="desc-box">${t.desc}</div>
        <div class="amount-box"><span>Montant de l'étape</span><b>${fmt(t.montant)}</b></div>
        <div class="field"><label>${ICONS.photo} Photos de preuve</label>
          ${t.photos.length? `<div class="proof-gallery">${t.photos.map(p=>`<img src="${p}">`).join('')}</div>` : `<div class="small-note">Aucune photo déposée</div>`}
        </div>
        <div class="field"><label>${ICONS.video} Vidéos de preuve</label>
          ${t.videos&&t.videos.length? `<div class="proof-gallery">${t.videos.map(v=>`<video src="${v}" controls></video>`).join('')}</div>` : `<div class="small-note">Aucune vidéo déposée</div>`}
        </div>
        <div class="field"><label>${ICONS.mic} Note vocale</label>
          ${t.audio? `<div class="audio-row"><audio controls src="${t.audio}"></audio></div>` : `<div class="small-note">Aucune note vocale</div>`}
        </div>
        ${actions}
      </div>
    </div>
  </div>`;
  document.getElementById('closeM').onclick=closeModal;
  document.getElementById('ov').onclick=(e)=>{ if(e.target.id==='ov') closeModal(); };
  const vw=document.getElementById('validateWork');
  if(vw) vw.onclick=async()=>{
    try{ await api(`/tasks/${t.id}/validate`,{method:'PATCH',body:JSON.stringify({approve:true})}); await refreshTasks(); closeModal(); renderPageOnly(); toast('Travail validé ✓'); }
    catch(err){ toast(err.message); }
  };
  const rj=document.getElementById('rejectWork');
  if(rj) rj.onclick=async()=>{
    const c=document.getElementById('rejectComment').value.trim();
    try{ await api(`/tasks/${t.id}/validate`,{method:'PATCH',body:JSON.stringify({approve:false,comment:c})}); await refreshTasks(); closeModal(); renderPageOnly(); toast("Travail renvoyé à l'artisan"); }
    catch(err){ toast(err.message); }
  };
  const vp=document.getElementById('validatePayment');
  if(vp) vp.onclick=async()=>{
    try{ await api(`/tasks/${t.id}/pay`,{method:'PATCH'}); await refreshTasks(); state.financeCache=null; closeModal(); renderPageOnly(); toast('Paiement validé 💰'); }
    catch(err){ toast(err.message); }
  };
}

function openAddTaskModal(){
  document.getElementById('modalRoot').innerHTML=`
  <div class="overlay" id="ov">
    <div class="modal">
      <div class="modal-head"><div><h3>${ICONS.plus} Nouvelle tâche</h3><div class="trade-line">Ajouter une étape au chantier</div></div><button class="x-btn" id="closeM">${ICONS.x}</button></div>
      <div class="modal-body">
        <div class="field"><label>Corps de métier</label><select id="fTrade">${Object.entries(TRADES).map(([k,t])=>`<option value="${k}">${t.label}</option>`).join('')}</select></div>
        <div class="field"><label>Titre de la tâche</label><input id="fTitle" placeholder="Ex. Pose du carrelage salon"></div>
        <div class="field"><label>Description</label><textarea id="fDesc" placeholder="Détails de l'étape à réaliser"></textarea></div>
        <div class="field"><label>Montant (FCFA)</label><input id="fMontant" type="number" placeholder="Ex. 250000"></div>
        <button class="btn btn-primary btn-block" id="createTask">${ICONS.check} Créer la tâche</button>
      </div>
    </div>
  </div>`;
  document.getElementById('closeM').onclick=closeModal;
  document.getElementById('ov').onclick=(e)=>{ if(e.target.id==='ov') closeModal(); };
  document.getElementById('createTask').onclick=async()=>{
    const title=document.getElementById('fTitle').value.trim();
    const desc=document.getElementById('fDesc').value.trim();
    const montant=parseInt(document.getElementById('fMontant').value)||0;
    const trade=document.getElementById('fTrade').value;
    if(!title){ toast('Merci de saisir un titre'); return; }
    try{ await api('/tasks',{method:'POST',body:JSON.stringify({trade,title,desc,montant})}); await refreshTasks(); closeModal(); renderPageOnly(); toast('Tâche ajoutée'); }
    catch(err){ toast(err.message); }
  };
}

/* ---------- Proof modal (artisan) ---------- */
function openProofModal(id){
  const t=findTask(id); const tr=TRADES[t.trade];
  state.capture={photos:[],videos:[],audio:null};
  document.getElementById('modalRoot').innerHTML=`
  <div class="overlay" id="ov">
    <div class="modal">
      <div class="modal-head"><div><div class="trade-line"><span style="color:${tr.color};display:flex">${tr.icon}</span>${tr.label}</div><h3>Preuve de travail</h3></div><button class="x-btn" id="closeM">${ICONS.x}</button></div>
      <div class="modal-body">
        <div class="desc-box" style="margin-bottom:14px"><b>${t.title}</b><br>${t.desc}</div>
        <div class="field"><label>${ICONS.camera} Photos courtes</label>
          <div class="capture-zone">
            <input type="file" accept="image/*" capture="environment" id="photoInput" style="display:none" multiple>
            <button class="btn btn-outline-gold btn-sm" id="addPhotoBtn">${ICONS.camera} Prendre / choisir une photo</button>
            <div id="thumbs" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;justify-content:center"></div>
          </div>
        </div>
        <div class="field"><label>${ICONS.video} Vidéo courte (2 max)</label>
          <div class="capture-zone">
            <input type="file" accept="video/*" capture="environment" id="videoInput" style="display:none">
            <button class="btn btn-outline-gold btn-sm" id="addVideoBtn">${ICONS.video} Filmer / choisir une vidéo</button>
            <div id="videoThumbs" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;justify-content:center"></div>
            <div class="small-note">Gardez la vidéo très courte (10-15 secondes).</div>
          </div>
        </div>
        <div class="field"><label>${ICONS.mic} Note vocale courte (30s max)</label>
          <div class="capture-zone">
            <button class="btn btn-outline-gold btn-sm" id="recBtn">${ICONS.mic} Démarrer l'enregistrement</button>
            <div id="recStatus"></div>
            <div id="audioPreview"></div>
          </div>
        </div>
        <button class="btn btn-primary btn-block" id="submitProof">${ICONS.check} Envoyer pour validation</button>
      </div>
    </div>
  </div>`;
  document.getElementById('closeM').onclick=closeModal;
  document.getElementById('ov').onclick=(e)=>{ if(e.target.id==='ov') closeModal(); };
  const photoInput=document.getElementById('photoInput');
  document.getElementById('addPhotoBtn').onclick=()=>photoInput.click();
  photoInput.onchange=async()=>{
    for(const file of photoInput.files){ const dataUrl=await compressImage(file); state.capture.photos.push(dataUrl); }
    renderThumbs(); photoInput.value='';
  };
  const videoInput=document.getElementById('videoInput');
  document.getElementById('addVideoBtn').onclick=()=>{
    if(state.capture.videos.length>=2){ toast('Maximum 2 vidéos par preuve'); return; }
    videoInput.click();
  };
  videoInput.onchange=async()=>{
    const file=videoInput.files[0];
    if(file){
      if(file.size>25*1024*1024){ toast('Vidéo trop lourde (25 Mo max)'); videoInput.value=''; return; }
      const dataUrl=await fileToDataUrl(file);
      state.capture.videos.push(dataUrl);
      renderVideoThumbs();
    }
    videoInput.value='';
  };
  document.getElementById('recBtn').onclick=toggleRecording;
  document.getElementById('submitProof').onclick=async()=>{
    if(state.capture.photos.length===0 && state.capture.videos.length===0 && !state.capture.audio){ toast('Ajoutez au moins une photo, une vidéo ou une note vocale'); return; }
    try{
      await api(`/tasks/${t.id}/proof`,{method:'PATCH',body:JSON.stringify({photos:state.capture.photos,videos:state.capture.videos,audio:state.capture.audio})});
      await refreshTasks(); closeModal(); renderPageOnly(); toast('Preuve envoyée, en attente de validation ✓');
    }catch(err){ toast(err.message); }
  };
}
function renderThumbs(){
  const wrap=document.getElementById('thumbs'); if(!wrap) return;
  wrap.innerHTML=state.capture.photos.map((p,i)=>`<span class="mini-thumb"><img src="${p}"><button class="rm" data-i="${i}">×</button></span>`).join('');
  wrap.querySelectorAll('.rm').forEach(b=>{ b.onclick=()=>{ state.capture.photos.splice(+b.dataset.i,1); renderThumbs(); }; });
}
function renderVideoThumbs(){
  const wrap=document.getElementById('videoThumbs'); if(!wrap) return;
  wrap.innerHTML=state.capture.videos.map((v,i)=>`<span class="mini-thumb"><video src="${v}" muted></video><button class="rm" data-vi="${i}">×</button></span>`).join('');
  wrap.querySelectorAll('.rm').forEach(b=>{ b.onclick=()=>{ state.capture.videos.splice(+b.dataset.vi,1); renderVideoThumbs(); }; });
}
function fileToDataUrl(file){
  return new Promise((resolve)=>{ const reader=new FileReader(); reader.onload=()=>resolve(reader.result); reader.readAsDataURL(file); });
}
function compressImage(file){
  return new Promise((resolve)=>{
    const reader=new FileReader();
    reader.onload=(e)=>{
      const img=new Image();
      img.onload=()=>{
        const maxW=900; const scale=Math.min(1,maxW/img.width);
        const canvas=document.createElement('canvas');
        canvas.width=img.width*scale; canvas.height=img.height*scale;
        const ctx=canvas.getContext('2d');
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        resolve(canvas.toDataURL('image/jpeg',0.72));
      };
      img.src=e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ---------- Voice recording ---------- */
async function toggleRecording(){
  const btn=document.getElementById('recBtn'); const statusEl=document.getElementById('recStatus');
  if(state.rec.mediaRecorder && state.rec.mediaRecorder.state==='recording'){ state.rec.mediaRecorder.stop(); return; }
  try{
    const stream=await navigator.mediaDevices.getUserMedia({audio:true});
    state.rec.stream=stream;
    const mr=new MediaRecorder(stream);
    state.rec.mediaRecorder=mr; state.rec.chunks=[]; state.rec.seconds=0;
    mr.ondataavailable=(e)=>state.rec.chunks.push(e.data);
    mr.onstop=()=>{
      clearInterval(state.rec.timer);
      const blob=new Blob(state.rec.chunks,{type:'audio/webm'});
      const reader=new FileReader();
      reader.onload=()=>{
        state.capture.audio=reader.result;
        const prev=document.getElementById('audioPreview');
        if(prev) prev.innerHTML=`<div class="audio-row"><audio controls src="${reader.result}"></audio></div>`;
        if(statusEl) statusEl.innerHTML='';
        if(btn) btn.innerHTML=`${ICONS.mic} Réenregistrer`;
      };
      reader.readAsDataURL(blob);
      stream.getTracks().forEach(tr=>tr.stop());
    };
    mr.start();
    btn.innerHTML=`${ICONS.x} Arrêter l'enregistrement`;
    state.rec.timer=setInterval(()=>{
      state.rec.seconds++;
      if(statusEl) statusEl.innerHTML=`<div class="rec-indicator"><span class="rec-dot"></span>Enregistrement… ${state.rec.seconds}s</div>`;
      if(state.rec.seconds>=30) mr.stop();
    },1000);
  }catch(err){ toast("Micro indisponible — autorisez l'accès dans le navigateur"); }
}
function stopRecordingIfAny(){
  if(state.rec.mediaRecorder && state.rec.mediaRecorder.state==='recording') state.rec.mediaRecorder.stop();
  clearInterval(state.rec.timer);
}

/* ===================== INIT ===================== */
init();
