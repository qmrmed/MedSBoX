import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const issues = [];
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', '.firebase', 'node_modules'].includes(entry.name)) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else files.push(file);
  }
}
walk(root);

const rel = file => path.relative(root, file).replaceAll(path.sep, '/');

for (const file of files.filter(x => x.endsWith('.html'))) {
  const text = fs.readFileSync(file, 'utf8');
  const name = rel(file);
  if (!/<title>[^<]+<\/title>/i.test(text)) issues.push(`${name}: missing title`);
  if (!/<meta\s+name=["']viewport["']/i.test(text)) issues.push(`${name}: missing viewport`);

  for (const match of text.matchAll(/(?:src|href)=["']([^"']+)["']/gi)) {
    const value = match[1];
    if (/^(https?:|mailto:|tel:|data:|javascript:|#)/i.test(value)) continue;
    const target = path.normalize(path.join(path.dirname(file), value.split('?')[0].split('#')[0]));
    if (!fs.existsSync(target)) issues.push(`${name}: missing local asset ${value}`);
  }
}

for (const file of files.filter(x => x.endsWith('.js'))) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) issues.push(`${rel(file)}: JavaScript syntax error`);
}

const rulesPath = path.join(root, 'firestore.rules');
if (fs.existsSync(rulesPath)) {
  const rules = fs.readFileSync(rulesPath, 'utf8');
  if (/allow\s+(read|write|create|update|delete)\s*:\s*true\s*;/i.test(rules)) {
    issues.push('firestore.rules: unconditional allow=true');
  }
}

const publicFiles = ['js/app.js', 'js/library.js', 'js/offers.js', 'js/ios-store.js', 'js/payment.js'];
for (const file of publicFiles) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) continue;
  const text = fs.readFileSync(full, 'utf8');
  if (/telegramUrls\s*[:=]/.test(text)) issues.push(`${file}: legacy Telegram link field in public code`);
  if (file === 'js/app.js' && /(createUserWithEmailAndPassword|signInWithEmailAndPassword|sendPasswordResetEmail)/.test(text)) {
    issues.push('js/app.js: password-based public authentication is not allowed');
  }
}

const indexPath = path.join(root, 'index.html');
if (fs.existsSync(indexPath)) {
  const index = fs.readFileSync(indexPath, 'utf8');
  if (/Create account|Forgot password|Sign in/i.test(index)) issues.push('index.html: legacy account authentication UI remains');
  if (!/100\+\s*(?:ready-to-use\s*)?Android applications/i.test(index)) issues.push('index.html: missing 100+ apps messaging');
  if (!/\$10\s*\/\s*year/i.test(index)) issues.push('index.html: missing $10 / year messaging');
  if (!/\$25/i.test(index)) issues.push('index.html: missing $25 lifetime messaging');
}

console.log(`Project audit: ${issues.length ? 'FAILED' : 'PASSED'}`);
console.log(`Scanned ${files.length} files.`);
for (const issue of issues) console.log(`- ${issue}`);
if (issues.length) process.exit(1);
