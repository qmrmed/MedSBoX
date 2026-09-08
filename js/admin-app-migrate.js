import{getApps,getApp}from'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import{getAuth,onAuthStateChanged}from'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import{getFirestore,collection,getDocs,doc,getDoc,writeBatch,serverTimestamp,deleteField}from'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
const app=getApps().length?getApp():null;
if(app){
 const auth=getAuth(app),db=getFirestore(app);
 const waitForAuth=()=>new Promise(resolve=>{let done=false;const unsub=onAuthStateChanged(auth,u=>{if(!done){done=true;unsub();resolve(u)}})});
 const run=async()=>{
  const u=await waitForAuth();if(!u)return;
  const adminSnap=await getDoc(doc(db,'admins',u.uid));if(!adminSnap.exists()||adminSnap.data().enabled!==true)return;
  const snap=await getDocs(collection(db,'apps'));
  const legacy=snap.docs.filter(d=>{const links=d.data()?.telegramUrls;return links&&typeof links==='object'&&Object.values(links).some(v=>String(v||'').trim())});
  let changed=0;
  for(let i=0;i<legacy.length;i+=200){
   const batch=writeBatch(db);
   legacy.slice(i,i+200).forEach(d=>{
    const links=d.data()?.telegramUrls||{};
    batch.set(doc(db,'appDownloads',d.id),{appId:d.id,telegramUrls:links,updatedAt:serverTimestamp()},{merge:true});
    batch.update(d.ref,{telegramUrls:deleteField(),updatedAt:serverTimestamp()});
   });
   await batch.commit();
   changed+=Math.min(200,legacy.length-i);
  }
  window.__medsboxAppMigration={changed,done:true};
 };
 run().catch(e=>console.warn('Legacy app-link migration skipped:',e));
}
