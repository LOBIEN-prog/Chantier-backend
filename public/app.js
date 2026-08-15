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
      ${t.audio?`<span class="proof-badge">${ICONS.mic} 1</span>`:''}
    </div>
    ${t.comment && t.status==='en_cours' ? `<div class="reject-note">${ICONS.x} ${t.comment}</div>`:''}
  </div>`;
}
function attachOwnerEvents(){
  const sel=document.getElementById('filterTradeSelect');
  if(sel) sel.onchange=()=>{ state.filterTrade=sel.value; render(); };
  document.querySelectorAll('.card').forEach(c=>{ c.onclick=()=>openTaskModal(c.dataset.id); });
  const fab=document.getElementById('addTaskFab'); if(fab) fab.onclick=openAddTaskModal;
}

/* ===================== ARTISAN VIEW ===================== */
function renderArtisan(){
  const tr=TRADES[state.user.trade];
  const my=state.tasks;
  const done=my.filter(t=>t.status==='paye'||t.status==='valide').length;
  const pct= my.length? Math.round((done/my.length)*100):0;
  const cols=STATUSES.filter(s=>['a_faire','en_cours','attente_validation'].includes(s.key));
  const histCols=STATUSES.filter(s=>['valide','paye'].includes(s.key));
  return `
  <div class="hero">
    <div class="hero-top">
      <div><h2 style="display:flex;align-items:center;gap:8px"><span style="color:${tr.color};display:flex">${tr.icon}</span>${tr.label}</h2><div class="sub">${my.length} tâches assignées</div></div>
      <div class="gauge-wrap">
        <div class="gauge-label"><span>Mes tâches terminées</span><span>${pct}%</span></div>
        <div class="gauge"><div class="gauge-fill" style="width:${pct}%;background:${tr.color}"></div></div>
      </div>
    </div>
  </div>
  <div class="board artisan">${cols.map(st=>renderArtisanColumn(st,my)).join('')}</div>
  <div class="hero" style="margin-top:16px">
    <h2 style="font-size:15px;margin-bottom:10px">Historique validé</h2>
    <div class="board artisan" style="grid-template-columns:1fr 1fr">${histCols.map(st=>renderArtisanColumn(st,my)).join('')}</div>
  </div>`;
}
function renderArtisanColumn(st,my){
  const tasks=my.filter(t=>t.status===st.key);
  return `
  <div class="col">
    <div class="col-head"><h4><span class="col-dot" style="background:${st.color}"></span>${st.label}</h4><span class="col-count">${tasks.length}</span></div>
    <div class="cards">${tasks.length? tasks.map(renderArtisanCard).join(''):`<div class="empty-col">Rien ici</div>`}</div>
  </div>`;
}
function renderArtisanCard(t){
  const st=stMap[t.status];
  let action='';
  if(t.status==='a_faire') action=`<button class="btn btn-blue btn-sm btn-block" data-start="${t.id}">${ICONS.arrowR} Démarrer</button>`;
  else if(t.status==='en_cours') action=`<button class="btn btn-orange btn-sm btn-block" data-finish="${t.id}">${ICONS.camera} Terminer avec preuve</button>`;
  else if(t.status==='attente_validation') action=`<div class="small-note">${ICONS.clock} En attente de validation</div>`;
  else if(t.status==='valide') action=`<div class="small-note">${ICONS.check} Validé — paiement à venir</div>`;
  else if(t.status==='paye') action=`<div class="small-note">${ICONS.coin} Payé</div>`;
  return `
  <div class="card" style="border-left-color:${TRADES[t.trade].color}">
    <div class="stamp" style="color:${st.color}">${st.label}</div>
    <h5>${t.title}</h5>
    <div class="desc-box" style="margin:6px 0">${t.desc}</div>
    <div class="amt">${fmt(t.montant)}</div>
    ${t.comment && t.status==='en_cours' ? `<div class="reject-note">${ICONS.x} Rejeté : ${t.comment}</div>`:''}
    ${action}
  </div>`;
}
function attachArtisanEvents(){
  document.querySelectorAll('[data-start]').forEach(b=>{
    b.onclick=async(e)=>{ e.stopPropagation();
      try{ await api(`/tasks/${b.dataset.start}/start`,{method:'PATCH'}); await refreshTasks(); render(); toast('Tâche démarrée'); }
      catch(err){ toast(err.message); }
    };
  });
  document.querySelectorAll('[data-finish]').forEach(b=>{
    b.onclick=(e)=>{ e.stopPropagation(); openProofModal(b.dataset.finish); };
  });
}

/* ===================== MODALS ===================== */
function closeModal(){ document.getElementById('modalRoot').innerHTML=''; stopRecordingIfAny(); state.capture={photos:[],videos:[],audio:null}; }

function openTaskModal(id){
  const t=findTask(id); const tr=TRADES[t.trade]; const st=stMap[t.status];
  let actions='';
  if(t.status==='attente_validation'){
    actions=`
    <div class="action-row">
      <button class="btn btn-green" id="validateWork">${ICONS.check} Valider le travail</button>
      <button class="btn btn-red" id="rejectWork">${ICONS.x} Rejeter</button>
    </div>
    <div class="field" style="margin-top:10px"><label>Commentaire (si rejet)</label><textarea id="rejectComment" placeholder="Expliquer ce qui doit être repris..."></textarea></div>`;
  } else if(t.status==='valide'){
    actions=`<div class="action-row"><button class="btn btn-gold" id="validatePayment">${ICONS.coin} Valider le paiement (${fmt(t.montant)})</button></div>`;
  } else if(t.status==='paye'){
    actions=`<div class="small-note">${ICONS.check} Étape validée et payée.</div>`;
  } else {
    actions=`<div class="small-note">En attente d'exécution ou de dépôt de preuve par l'artisan.</div>`;
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
    try{ await api(`/tasks/${t.id}/validate`,{method:'PATCH',body:JSON.stringify({approve:true})}); await refreshTasks(); closeModal(); render(); toast('Travail validé ✓'); }
    catch(err){ toast(err.message); }
  };
  const rj=document.getElementById('rejectWork');
  if(rj) rj.onclick=async()=>{
    const c=document.getElementById('rejectComment').value.trim();
    try{ await api(`/tasks/${t.id}/validate`,{method:'PATCH',body:JSON.stringify({approve:false,comment:c})}); await refreshTasks(); closeModal(); render(); toast("Travail renvoyé à l'artisan"); }
    catch(err){ toast(err.message); }
  };
  const vp=document.getElementById('validatePayment');
  if(vp) vp.onclick=async()=>{
    try{ await api(`/tasks/${t.id}/pay`,{method:'PATCH'}); await refreshTasks(); closeModal(); render(); toast('Paiement validé 💰'); }
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
        <button class="btn btn-orange btn-block" id="createTask">${ICONS.check} Créer la tâche</button>
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
    try{ await api('/tasks',{method:'POST',body:JSON.stringify({trade,title,desc,montant})}); await refreshTasks(); closeModal(); render(); toast('Tâche ajoutée'); }
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
            <button class="btn btn-outline btn-sm" id="addPhotoBtn">${ICONS.camera} Prendre / choisir une photo</button>
            <div id="thumbs" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;justify-content:center"></div>
          </div>
        </div>
        <div class="field"><label>${ICONS.video} Vidéo courte (2 max, restez brefs)</label>
          <div class="capture-zone">
            <input type="file" accept="video/*" capture="environment" id="videoInput" style="display:none">
            <button class="btn btn-outline btn-sm" id="addVideoBtn">${ICONS.video} Filmer / choisir une vidéo</button>
            <div id="videoThumbs" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;justify-content:center"></div>
            <div class="small-note">Gardez la vidéo très courte (10-15 secondes) pour un envoi rapide.</div>
          </div>
        </div>
        <div class="field"><label>${ICONS.mic} Note vocale courte (30s max)</label>
          <div class="capture-zone">
            <button class="btn btn-outline btn-sm" id="recBtn">${ICONS.mic} Démarrer l'enregistrement</button>
            <div id="recStatus"></div>
            <div id="audioPreview"></div>
          </div>
        </div>
        <button class="btn btn-orange btn-block" id="submitProof">${ICONS.check} Envoyer pour validation</button>
        <div class="small-note">La tâche passera en « Attente de validation » et le propriétaire sera notifié.</div>
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
      if(file.size>25*1024*1024){ toast('Vidéo trop lourde (25 Mo max) — filmez plus court'); videoInput.value=''; return; }
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
      await refreshTasks(); closeModal(); render(); toast('Preuve envoyée, en attente de validation ✓');
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
  return new Promise((resolve)=>{
    const reader=new FileReader();
    reader.onload=()=>resolve(reader.result);
    reader.readAsDataURL(file);
  });
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

/* ---------- Owner: gestion des comptes ---------- */
async function openUsersModal(){
  let users=[];
  try{ const r=await api('/auth/users'); users=r.users; }catch(err){ toast(err.message); return; }
  renderUsersModal(users);
}
function renderUsersModal(users){
  document.getElementById('modalRoot').innerHTML=`
  <div class="overlay" id="ov">
    <div class="modal">
      <div class="modal-head"><div><h3>${ICONS.users} Comptes</h3><div class="trade-line">Propriétaire et artisans ayant accès</div></div><button class="x-btn" id="closeM">${ICONS.x}</button></div>
      <div class="modal-body">
        <div id="userList">
          ${users.map(u=>`
            <div class="user-row">
              <div class="who"><b>${u.name}</b><span>${u.email} · ${u.role==='owner'?'Propriétaire':TRADES[u.trade].label}</span></div>
              ${u.id!==state.user.id ? `<button class="btn btn-red btn-sm" data-del="${u.id}">${ICONS.trash}</button>` : ''}
            </div>`).join('')}
        </div>
        <hr style="border:none;border-top:1px solid var(--line);margin:16px 0">
        <h3 style="font-family:var(--font-d);font-size:14px;text-transform:uppercase;margin:0 0 10px">Ajouter un accès</h3>
        <div class="field"><label>Nom</label><input id="nName" placeholder="Ex. Équipe Électricité"></div>
        <div class="field"><label>Email</label><input id="nEmail" type="email" placeholder="nouveau@chantier.local"></div>
        <div class="field"><label>Mot de passe</label><input id="nPassword" type="password" placeholder="6 caractères minimum"></div>
        <div class="field"><label>Rôle</label>
          <select id="nRole">
            <option value="artisan">Artisan</option>
            <option value="owner">Propriétaire</option>
          </select>
        </div>
        <div class="field" id="nTradeField"><label>Corps de métier</label>
          <select id="nTrade">${Object.entries(TRADES).map(([k,t])=>`<option value="${k}">${t.label}</option>`).join('')}</select>
        </div>
        <button class="btn btn-orange btn-block" id="createUser">${ICONS.plus} Créer le compte</button>
      </div>
    </div>
  </div>`;
  document.getElementById('closeM').onclick=closeModal;
  document.getElementById('ov').onclick=(e)=>{ if(e.target.id==='ov') closeModal(); };
  document.querySelectorAll('[data-del]').forEach(b=>{
    b.onclick=async()=>{
      try{ await api(`/auth/users/${b.dataset.del}`,{method:'DELETE'}); const r=await api('/auth/users'); renderUsersModal(r.users); toast('Accès supprimé'); }
      catch(err){ toast(err.message); }
    };
  });
  const roleSel=document.getElementById('nRole'); const tradeField=document.getElementById('nTradeField');
  const syncTrade=()=>{ tradeField.style.display = roleSel.value==='artisan' ? 'block':'none'; };
  syncTrade(); roleSel.onchange=syncTrade;
  document.getElementById('createUser').onclick=async()=>{
    const name=document.getElementById('nName').value.trim();
    const email=document.getElementById('nEmail').value.trim();
    const password=document.getElementById('nPassword').value;
    const role=roleSel.value;
    const trade=document.getElementById('nTrade').value;
    if(!name||!email||!password){ toast('Merci de remplir tous les champs'); return; }
    try{
      await api('/auth/users',{method:'POST',body:JSON.stringify({name,email,password,role,trade})});
      const r=await api('/auth/users'); renderUsersModal(r.users); toast('Compte créé');
    }catch(err){ toast(err.message); }
  };
}

/* ---------- Owner: module financier ---------- */
const FINANCE_TYPES={
  financement:{label:'Financement reçu',color:'var(--green)',sign:1},
  paiement_etape:{label:"Paiement d'étape",color:'var(--gold)',sign:-1},
  depense:{label:'Dépense',color:'var(--red)',sign:-1},
  avance:{label:'Avance / prêt',color:'var(--blue)',sign:-1},
};
async function openFinanceModal(){
  let payload;
  try{ payload=await api('/finance'); }catch(err){ toast(err.message); return; }
  renderFinanceModal(payload);
}
function renderFinanceModal({transactions,summary}){
  document.getElementById('modalRoot').innerHTML=`
  <div class="overlay" id="ov">
    <div class="modal" style="max-width:600px">
      <div class="modal-head"><div><h3>${ICONS.wallet} Finances</h3><div class="trade-line">Paiements, dépenses et avances du chantier</div></div><button class="x-btn" id="closeM">${ICONS.x}</button></div>
      <div class="modal-body">
        <div class="finance-summary">
          <div class="finance-stat"><span>Budget total (tâches)</span><b>${fmt(summary.budgetTotal)}</b></div>
          <div class="finance-stat"><span>Financement reçu</span><b style="color:var(--green)">${fmt(summary.financement)}</b></div>
          <div class="finance-stat"><span>Payé aux artisans</span><b style="color:var(--gold)">${fmt(summary.paiementsEtapes)}</b></div>
          <div class="finance-stat"><span>Dépenses</span><b style="color:var(--red)">${fmt(summary.depenses)}</b></div>
          <div class="finance-stat"><span>Avances / prêts</span><b style="color:var(--blue)">${fmt(summary.avances)}</b></div>
          <div class="finance-stat finance-solde"><span>Solde disponible</span><b>${fmt(summary.solde)}</b></div>
        </div>
        <hr style="border:none;border-top:1px solid var(--line);margin:16px 0">
        <h3 style="font-family:var(--font-d);font-size:14px;text-transform:uppercase;margin:0 0 10px">Historique</h3>
        <div id="financeList">
          ${transactions.length? transactions.map(f=>`
            <div class="finance-row">
              <div class="who">
                <b style="color:${FINANCE_TYPES[f.type].color}">${FINANCE_TYPES[f.type].label}</b>
                <span>${f.description} · ${f.date}</span>
              </div>
              <div class="finance-amt">${fmt(f.montant)}</div>
              ${f.type!=='paiement_etape' ? `<button class="btn btn-red btn-sm" data-delf="${f.id}">${ICONS.trash}</button>` : ''}
            </div>`).join('') : `<div class="small-note">Aucune transaction pour l'instant</div>`}
        </div>
        <hr style="border:none;border-top:1px solid var(--line);margin:16px 0">
        <h3 style="font-family:var(--font-d);font-size:14px;text-transform:uppercase;margin:0 0 10px">Ajouter une transaction</h3>
        <div class="field"><label>Type</label>
          <select id="ftType">
            <option value="financement">Financement reçu (prêt, apport, avance de fonds)</option>
            <option value="depense">Dépense (matériaux, location, transport...)</option>
            <option value="avance">Avance donnée à un artisan</option>
          </select>
        </div>
        <div class="field"><label>Description</label><input id="ftDesc" placeholder="Ex. Achat ciment et fer à béton"></div>
        <div class="field"><label>Montant (FCFA)</label><input id="ftMontant" type="number" placeholder="Ex. 120000"></div>
        <button class="btn btn-orange btn-block" id="createFinance">${ICONS.plus} Ajouter</button>
      </div>
    </div>
  </div>`;
  document.getElementById('closeM').onclick=closeModal;
  document.getElementById('ov').onclick=(e)=>{ if(e.target.id==='ov') closeModal(); };
  document.querySelectorAll('[data-delf]').forEach(b=>{
    b.onclick=async()=>{
      try{ await api(`/finance/${b.dataset.delf}`,{method:'DELETE'}); openFinanceModal(); toast('Transaction supprimée'); }
      catch(err){ toast(err.message); }
    };
  });
  document.getElementById('createFinance').onclick=async()=>{
    const type=document.getElementById('ftType').value;
    const description=document.getElementById('ftDesc').value.trim();
    const montant=parseInt(document.getElementById('ftMontant').value)||0;
    if(!description||montant<=0){ toast('Merci de remplir la description et un montant valide'); return; }
    try{
      await api('/finance',{method:'POST',body:JSON.stringify({type,description,montant})});
      openFinanceModal(); toast('Transaction ajoutée');
    }catch(err){ toast(err.message); }
  };
}

/* ===================== INIT ===================== */
init();
