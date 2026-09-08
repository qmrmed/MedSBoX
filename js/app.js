import{initializeApp}from'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import{getFirestore,collection,getDocs}from'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';

const cfg={apiKey:'AIzaSyATRvlq7VzIYFrVSprw5yVzv0uu5d-QrVM',authDomain:'medsbox-pro.firebaseapp.com',projectId:'medsbox-pro',storageBucket:'medsbox-pro.firebasestorage.app',messagingSenderId:'145094360411',appId:'1:145094360411:web:c8a525881927c294682e7e'};
const app=initializeApp(cfg),db=getFirestore(app);
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

function wirePlanButtons(){
  document.querySelectorAll('.plan-btn').forEach(button=>button.addEventListener('click',()=>{
    const plan=button.dataset.plan||'yearly';
    location.href=`payment.html?plan=${encodeURIComponent(plan)}`;
  }));
}

async function loadPublicPlans(){
  const host=$('plans');
  if(!host)return;
  host.setAttribute('aria-busy','true');
  try{
    const snap=await getDocs(collection(db,'plans'));
    const plans=snap.docs.map(d=>({id:d.id,...d.data()})).filter(p=>p.active!==false&&p.scope!=='ios');
    if(!plans.length){
      host.innerHTML='<div class="plans-empty glass-card"><strong>Plans are temporarily unavailable.</strong><span>Please check back shortly or contact support.</span></div>';
      return;
    }
    host.innerHTML=plans.map(p=>{
      const lifetime=p.durationDays==null;
      const annual=p.id==='yearly'||/annual|year/i.test(String(p.name||''));
      const years=Math.max(1,Math.round(Number(p.durationDays)/365.2425));
      const period=lifetime?'/ one time':`/ ${years} year${years===1?'':'s'}`;
      return `<article class="glass-card plan">${annual?'<span class="tag">MOST POPULAR</span>':''}<h3>${esc(p.name||p.id)}</h3><strong>${esc(p.currency||'USD')} ${esc(p.price)} <small>${period}</small></strong><p>${esc(p.description||'Full MedSBoX Pro access.')}</p><button class="btn primary plan-btn" data-plan="${esc(p.id)}">Choose ${esc(p.name||'plan')}</button></article>`;
    }).join('');
    wirePlanButtons();
  }catch(error){
    console.warn('Homepage plans could not be loaded:',error);
    host.innerHTML='<div class="plans-empty glass-card"><strong>Plans could not be loaded.</strong><span>Check your connection or contact support.</span></div>';
  }finally{host.removeAttribute('aria-busy');}
}

async function loadFeaturedApps(){
  const host=$('featuredApps');
  if(!host)return;
  host.setAttribute('aria-busy','true');
  try{
    const snap=await getDocs(collection(db,'apps'));
    const apps=snap.docs.map(d=>({id:d.id,...d.data()})).filter(a=>a.active!==false).sort((a,b)=>Number(b.priority||0)-Number(a.priority||0)).slice(0,3);
    if(!apps.length){host.innerHTML='<div class="featured-empty">Live catalog updates will appear here.</div>';return;}
    host.innerHTML=apps.map(a=>{
      const name=String(a.name||a.id||'Application');
      const initials=name.replace(/[^A-Za-z0-9]/g,'').slice(0,2).toUpperCase()||'AP';
      const platforms=Array.isArray(a.platforms)?a.platforms.join(' · '):'Medical tool';
      const icon=a.iconUrl?`<img src="${esc(a.iconUrl)}" alt="" style="width:48px;height:48px;border-radius:15px;object-fit:cover">`:esc(initials);
      return `<div class="mini-app"><strong>${icon}</strong><div><b>${esc(name)}</b><small>${esc(a.category||'Medical')} · ${esc(platforms)}</small></div><em>›</em></div>`;
    }).join('');
  }catch(error){
    console.warn('Featured apps could not be loaded:',error);
    host.innerHTML='<div class="featured-empty">Open the Library to explore the current catalog.</div>';
  }finally{host.removeAttribute('aria-busy');}
}

wirePlanButtons();
loadPublicPlans();
loadFeaturedApps();
