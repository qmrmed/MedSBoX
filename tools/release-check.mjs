import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root=process.cwd(),failures=[],notes=[];
function walk(dir){const out=[];for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(['.git','.firebase','node_modules'].includes(entry.name))continue;const full=path.join(dir,entry.name);if(entry.isDirectory())out.push(...walk(full));else out.push(full)}return out}
const files=walk(root),rel=file=>path.relative(root,file).replaceAll(path.sep,'/'),all=new Set(files.map(rel)),fail=m=>failures.push(m),note=m=>notes.push(m);
const version=fs.readFileSync(path.join(root,'VERSION'),'utf8').trim(),changelog=fs.readFileSync(path.join(root,'CHANGELOG.md'),'utf8');
if(!/^\d+\.\d+\.\d+$/.test(version))fail(`Invalid VERSION: ${version}`);
if(!changelog.includes(`## v${version}`))fail(`CHANGELOG.md has no entry for v${version}`);

for(const file of files.filter(f=>f.endsWith('.html'))){
  const text=fs.readFileSync(file,'utf8'),source=rel(file),refs=[...text.matchAll(/(?:src|href)=["']([^"']+)["']/gi)].map(m=>m[1]);
  for(const ref of refs){if(/^(https?:|mailto:|tel:|data:|javascript:|#)/i.test(ref))continue;const clean=ref.split('#')[0].split('?')[0];if(!clean)continue;const target=path.normalize(path.join(path.dirname(file),clean));if(!all.has(rel(target)))fail(`${source} references missing local asset: ${clean}`)}
  if(!/<title>[^<]+<\/title>/i.test(text))fail(`${source} is missing a title element`);
}
for(const file of files.filter(f=>f.endsWith('.js'))){const result=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});if(result.status!==0){const detail=String(result.stderr||result.stdout||'').trim().split('\n').slice(0,3).join(' ');fail(`${rel(file)} has invalid JavaScript syntax${detail?`: ${detail}`:'.'}`)}}

const payment=fs.readFileSync(path.join(root,'js/payment.js'),'utf8');
if(!payment.includes('price:10')||!payment.includes('price:25'))fail('js/payment.js is missing the fixed $10 annual / $25 lifetime plans.');
if(!payment.includes('https://t.me/ID29i?text='))fail('js/payment.js is missing the Telegram activation handoff.');
if(/createUserWithEmailAndPassword|signInWithEmailAndPassword|sendPasswordResetEmail|signInAnonymously/.test(payment))fail('js/payment.js must remain account-free and must not initialize Firebase Auth.');

const publicJs=['js/app.js','js/library.js','js/offers.js','js/ios-store.js','js/payment.js','js/activation.js'];
for(const file of publicJs){const text=fs.readFileSync(path.join(root,file),'utf8');if(/createUserWithEmailAndPassword|signInWithEmailAndPassword|sendPasswordResetEmail/.test(text))fail(`${file} still contains password-based public authentication.`)}

const library=fs.readFileSync(path.join(root,'js/library.js'),'utf8');
if(/Farmakon|MCQStar|Q2Mid|Hepatix|Medi3y/.test(library))fail('js/library.js still contains hardcoded catalog entries.');
const ios=fs.readFileSync(path.join(root,'js/ios-store.js'),'utf8');
if(/ChatGPT|Notion|Threads|PDF Expert|Netflix|CapCut|Canva/.test(ios))fail('js/ios-store.js still contains illustrative hardcoded Apple catalog entries.');
const homepage=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(/Farmakon|Q2Mid|Hepatix/.test(homepage))fail('index.html still contains hardcoded featured catalog examples.');
if(!/100\+[^<]{0,80}Android applications/i.test(homepage)||!homepage.includes('$10 / year')||!homepage.includes('$25'))fail('index.html is missing the new subscription messaging.');
if(/Create account|Forgot password|<button[^>]*>Sign in/i.test(homepage))fail('index.html exposes legacy account authentication UI.');

for(const file of ['index.html','library.html','offers.html','ios-store.html','payment.html','activation.html']){const text=fs.readFileSync(path.join(root,file),'utf8');if(/telegramUrls\s*[:=]/.test(text))fail(`${file} exposes legacy telegramUrls in public markup.`);if(/createUserWithEmailAndPassword|signInWithEmailAndPassword|sendPasswordResetEmail/.test(text))fail(`${file} exposes password-based public authentication UI.`)}

const admin=fs.readFileSync(path.join(root,'admin.html'),'utf8');
for(const id of['appsTable','offersTable','plansTable','ordersTable','codesTable','usersTable'])if(!admin.includes(`id="${id}"`))fail(`admin.html is missing ${id}.`);
const rules=fs.readFileSync(path.join(root,'firestore.rules'),'utf8');
if(/allow\s+(read|write|create|update|delete)\s*:\s*true\s*;/i.test(rules))fail('firestore.rules contains an unconditional allow=true rule.');
for(const rule of['match /appDownloads/{appId}','match /offerDownloads/{offerId}','match /iosDownloads/{appId}'])if(!rules.includes(rule))fail(`firestore.rules is missing ${rule}.`);
if(!rules.includes('function validActivationDates(codeData,userData)'))fail('firestore.rules is missing activation date integrity validation.');
if(!rules.includes("userData.expiresAt>request.time+duration.value(codeData.durationDays,'d')-duration.value(5,'m')"))fail('firestore.rules does not enforce the expected activation window.');
const theme=fs.readFileSync(path.join(root,'js/theme.js'),'utf8');
if(!theme.includes('normalizePublicFlow'))fail('theme.js is missing public account-flow normalization.');

const firebaseConfig=JSON.parse(fs.readFileSync(path.join(root,'firebase.json'),'utf8'));
if(firebaseConfig.firestore?.rules!=='firestore.rules')fail('firebase.json is not wired to firestore.rules.');
if(firebaseConfig.firestore?.indexes!=='firestore.indexes.json')fail('firebase.json is not wired to firestore.indexes.json.');
if(firebaseConfig.storage?.rules!=='storage.rules')fail('firebase.json is not wired to storage.rules.');
if(!all.has('firestore.indexes.json'))fail('firestore.indexes.json is missing.');
if(!all.has('storage.rules'))fail('storage.rules is missing.');
for(const doc of ['docs/ARCHITECTURE.md','docs/DATA-MODEL.md','docs/SECURITY-ARCHITECTURE.md','docs/DEVELOPMENT.md','docs/PHASE-1-FOUNDATION.md'])if(!all.has(doc))fail(`${doc} is missing from the Phase 1 foundation.`);

const designSystem=path.join(root,'css','design-system.css');
if(!fs.existsSync(designSystem))fail('css/design-system.css is missing.');
else {
  const ds=fs.readFileSync(designSystem,'utf8');
  for(const token of ['--msb-color-primary','--msb-color-text','--msb-color-surface','--msb-radius-md','--msb-focus-ring','prefers-reduced-motion'])if(!ds.includes(token))fail(`design-system.css is missing required foundation token or behavior: ${token}`);
}
const brandAssets=fs.readFileSync(path.join(root,'css','brand-assets.css'),'utf8');
if(!brandAssets.startsWith("@import url('./design-system.css');"))fail('brand-assets.css must activate the canonical design system globally.');
for(const asset of ['assets/img/medsbox-app-icon.svg','assets/img/medsbox-brand-mark.svg','assets/img/medsbox-logo-mark.svg','assets/img/medsbox-logo-mark-light.svg'])if(!all.has(asset))fail(`Approved brand asset is missing: ${asset}`);
if(!all.has('docs/DESIGN-SYSTEM.md'))fail('docs/DESIGN-SYSTEM.md is missing.');

note(`Checked ${files.length} repository files.`);note(`Release candidate: v${version}`);note('Checked local references, JavaScript syntax, fixed subscription pricing, account-free checkout, Telegram activation, live catalogs, admin sections, activation expiry integrity, core Firestore protections, Firebase infrastructure wiring, Phase 1 foundation, and the MedSBoX Pro Brand & Design System.');
if(failures.length){console.error(`\nMedSBoX release check FAILED (${failures.length})`);for(const item of failures)console.error(`- ${item}`);process.exit(1)}
console.log(`MedSBoX release check PASSED for v${version}`);for(const item of notes)console.log(`- ${item}`);
