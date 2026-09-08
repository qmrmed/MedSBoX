import{initializeApp}from'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import{getFirestore,doc,getDoc}from'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';

const PLANS={yearly:{id:'yearly',name:'Annual access',price:10,currency:'USD',period:'per year',description:'One year of access to 100+ ready-to-use Android applications.'},lifetime:{id:'lifetime',name:'Lifetime access',price:25,currency:'USD',period:'one time',description:'One-time access to 100+ ready-to-use Android applications.'}};
const cfg={apiKey:'AIzaSyATRvlq7VzIYFrVSprw5yVzv0uu5d-QrVM',authDomain:'medsbox-pro.firebaseapp.com',projectId:'medsbox-pro',storageBucket:'medsbox-pro.firebasestorage.app',messagingSenderId:'145094360411',appId:'1:145094360411:web:c8a525881927c294682e7e'};
const db=getFirestore(initializeApp(cfg));
const $=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const requested=new URLSearchParams(location.search).get('plan')||'yearly';
let currentPlan=PLANS[requested]?requested:'yearly';
let currentPlanData=PLANS[currentPlan];
const refCode=`MSB-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().slice(0,8)}`;
$('refCode').textContent=refCode;$('refCode').title='Copy reference';
$('refCode').onclick=async()=>{try{await navigator.clipboard.writeText(refCode);$('refCode').title='Reference copied'}catch{}};

function formatPlan(p){
  if(p.scope==='ios')return`${p.currency||'USD'} ${p.price} ${p.durationDays==null?'/ one time':`/ ${Math.max(1,Math.round(Number(p.durationDays)/30.4375))} mo`}`;
  return`${p.currency||'USD'} ${p.price} ${p.period}`;
}
function updateTelegram(){
  const p=currentPlanData||PLANS.yearly;
  const msg=['Hello, I would like to subscribe and activate MedSBoX Pro.',`Plan: ${p.name} — ${formatPlan(p)}`,`Reference: ${refCode}`,p.scope==='ios'?'Access: Apple Store catalog':'Access: 100+ Android applications'];
  $('telegramCta').href=`https://t.me/ID29i?text=${encodeURIComponent(msg.join('\n'))}`;
}
function render(){
  const p=currentPlanData||PLANS.yearly;
  $('planToggle').innerHTML=Object.values(PLANS).map(x=>`<button type="button" class="plan-toggle-btn ${x.id===currentPlan?'active':''}" data-plan="${x.id}" aria-pressed="${x.id===currentPlan?'true':'false'}"><span class="pt-name">${esc(x.name)}</span><span class="pt-price"><bdi>$${x.price}</bdi><small> / ${esc(x.period)}</small></span></button>`).join('');
  document.querySelectorAll('.plan-toggle-btn').forEach(b=>b.addEventListener('click',()=>{currentPlan=b.dataset.plan;currentPlanData=PLANS[currentPlan];render()}));
  $('planStatus').textContent=`Selected plan: ${p.name} — ${formatPlan(p)}`;
  $('planStatus').className='plan-status';
  updateTelegram();
}
async function loadRequestedIosPlan(){
  if(!requested.startsWith('ios-'))return;
  const id=requested.slice(4);
  try{
    const snap=await getDoc(doc(db,'iosPlans',id));
    const data=snap.exists()?{id:snap.id,...snap.data()}:null;
    if(data&&data.active!==false){
      currentPlan=requested;
      currentPlanData={...data,id:requested,scope:'ios',name:data.name||'Apple Store access'};
      const button=`<button type="button" class="plan-toggle-btn active" data-plan="${esc(requested)}" aria-pressed="true"><span class="pt-name">${esc(currentPlanData.name)}</span><span class="pt-price"><bdi>${esc(currentPlanData.currency||'USD')} ${esc(currentPlanData.price)}</bdi><small> / ${currentPlanData.durationDays==null?'one time':`${Math.max(1,Math.round(Number(currentPlanData.durationDays)/30.4375))} mo`}</small></span></button>`;
      $('planToggle').innerHTML=button;
      $('planStatus').textContent=`Selected plan: ${currentPlanData.name} — ${formatPlan(currentPlanData)}`;
      updateTelegram();
    }else render();
  }catch(error){console.warn('Apple plan lookup failed:',error);render();}
}
$('telegramCta').addEventListener('click',()=>{$('planStatus').textContent=`Opening Telegram for ${currentPlanData?.name||'subscription'} activation…`});
render();
loadRequestedIosPlan();
