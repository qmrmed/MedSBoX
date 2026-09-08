import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const failures = [];
const notes = [];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', '.firebase', 'node_modules'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const files = walk(root);
const rel = file => path.relative(root, file).replaceAll(path.sep, '/');
const all = new Set(files.map(rel));

function fail(message) { failures.push(message); }
function note(message) { notes.push(message); }

const version = fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim();
if (!/^\d+\.\d+\.\d+$/.test(version)) fail(`Invalid VERSION: ${version}`);

const changelog = fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8');
if (!changelog.includes(`## v${version}`)) fail(`CHANGELOG.md has no entry for v${version}`);

for (const file of files.filter(f => f.endsWith('.html'))) {
  const text = fs.readFileSync(file, 'utf8');
  const source = rel(file);
  const refs = [...text.matchAll(/(?:src|href)=["']([^"']+)["']/gi)].map(m => m[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:|javascript:|#)/i.test(ref)) continue;
    const clean = ref.split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = path.normalize(path.join(path.dirname(file), clean));
    if (!all.has(rel(target))) fail(`${source} references missing local asset: ${clean}`);
  }
  if (!/<title>[^<]+<\/title>/i.test(text)) fail(`${source} is missing a title element`);
}

for (const file of files.filter(f => f.endsWith('.js'))) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) {
    const detail = String(result.stderr || result.stdout || '').trim().split('\n').slice(0, 3).join(' ');
    fail(`${rel(file)} has invalid JavaScript syntax${detail ? `: ${detail}` : '.'}`);
  }
}

const payment = fs.readFileSync(path.join(root, 'js/payment.js'), 'utf8');
if (/const\s+fallback\s*=|DEFAULT_PLANS|price\s*:\s*10|price\s*:\s*25/.test(payment)) {
  fail('js/payment.js still contains hardcoded plan fallback/pricing.');
}
if (!payment.includes('location.href=`https://t.me/ID29i?text=')) {
  fail('js/payment.js is missing the support checkout handoff.');
}
if (!payment.includes('await setDoc(doc(db,\'orders\',orderId)')) {
  fail('js/payment.js is missing the order persistence step.');
}

const library = fs.readFileSync(path.join(root, 'js/library.js'), 'utf8');
if (/Farmakon|MCQStar|Q2Mid|Hepatix|Medi3y/.test(library)) {
  fail('js/library.js still contains hardcoded catalog entries.');
}

const ios = fs.readFileSync(path.join(root, 'js/ios-store.js'), 'utf8');
if (/ChatGPT|Notion|Threads|PDF Expert|Netflix|CapCut|Canva/.test(ios)) {
  fail('js/ios-store.js still contains illustrative hardcoded Apple catalog entries.');
}

const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
if (/Farmakon|Q2Mid|Hepatix/.test(homepage)) fail('index.html still contains hardcoded featured catalog examples.');
if (/\$10\s*\/\s*year|\$25\s*\/\s*one time|\$25\s*iPhone\s*\/\s*\$20\s*iPad/i.test(homepage)) {
  fail('index.html still contains hardcoded subscription pricing.');
}

const publicScripts = files.filter(f => /^(index|library|offers|ios-store|payment|activation)\.html$/.test(path.basename(f)));
for (const file of publicScripts) {
  const text = fs.readFileSync(file, 'utf8');
  if (/telegramUrls\s*[:=]/.test(text)) fail(`${rel(file)} exposes legacy telegramUrls in public markup.`);
}

const admin = fs.readFileSync(path.join(root, 'admin.html'), 'utf8');
for (const id of ['appsTable','offersTable','plansTable','ordersTable','codesTable','usersTable']) {
  if (!admin.includes(`id="${id}"`)) fail(`admin.html is missing ${id}.`);
}

const rules = fs.readFileSync(path.join(root, 'firestore.rules'), 'utf8');
if (/allow\s+(read|write|create|update|delete)\s*:\s*true\s*;/.test(rules)) fail('firestore.rules contains an unconditional allow=true rule.');
if (!rules.includes('match /appDownloads/{appId}')) fail('firestore.rules is missing protected appDownloads rules.');
if (!rules.includes('match /offerDownloads/{offerId}')) fail('firestore.rules is missing protected offerDownloads rules.');
if (!rules.includes('match /iosDownloads/{appId}')) fail('firestore.rules is missing protected iosDownloads rules.');

note(`Checked ${files.length} repository files.`);
note(`Release candidate: v${version}`);
note('Checked local references, JavaScript syntax, release metadata, public hardcoded catalogs/pricing, checkout persistence, admin sections, and core Firestore protections.');

if (failures.length) {
  console.error(`\nMedSBoX release check FAILED (${failures.length})`);
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`MedSBoX release check PASSED for v${version}`);
for (const item of notes) console.log(`- ${item}`);
