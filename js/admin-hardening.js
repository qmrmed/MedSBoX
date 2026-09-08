import{getApps,getApp}from'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import{getAuth,onAuthStateChanged}from'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import{getFirestore,collection,getDocs,doc,deleteDoc}from'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
const app=getApps().length?getApp():null;
if(app){
 const auth=getAuth(app),db=getFirestore(app);
 const $=id=>document.getElementById(id);
 const refreshDownloadCounts=async()=>{
  try{
   const snap=await getDocs(collection(db,'appDownloads'));
   const counts=new Map(snap.docs.map(d=>[d.id,Object.values(d.data()?.telegramUrls||{}).filter(v=>String(v||'').trim()).length]));
   document.querySelectorAll('[data-edit-app]').forEach(button=>{
    const row=button.closest('tr');if(!row)return;
    const cell=row.children[2];if(!cell)return;
    const count=counts.get(button.dataset.editApp)||0;
    const small=cell.querySelector('small');if(small){const text=count?`${count} protected download link${count===1?'':'s'}`:'No protected download links';if(small.textContent!==text)small.textContent=text}
   });
  }catch(e){console.warn('Protected download counts unavailable:',e)}
 };
 const bind=()=>{
  const table=$('appsTable');if(!table)return;
  let observer;
  const sync=async()=>{observer?.disconnect();try{await refreshDownloadCounts()}finally{observer?.observe(table,{childList:true,subtree:true})}};
  sync();
  observer=new MutationObserver(()=>sync());
  observer.observe(table,{childList:true,subtree:true});
 };
 document.addEventListener('click',async e=>{
  const del=e.target.closest('[data-del-app]');if(!del)return;
  e.preventDefault();e.stopImmediatePropagation();
  if(!confirm('Delete this application and its protected download links permanently?'))return;
  try{del.disabled=true;await deleteDoc(doc(db,'apps',del.dataset.delApp));await deleteDoc(doc(db,'appDownloads',del.dataset.delApp));location.reload()}catch(err){alert(err?.message||'Unable to delete application.');del.disabled=false}
 },true);
 onAuthStateChanged(auth,u=>{if(u)window.setTimeout(bind,0)});
}
