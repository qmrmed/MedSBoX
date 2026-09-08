import { getApps, getApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import { getFirestore, collection, getDocs, doc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';

const app = getApps().length ? getApp() : null;
if (!app) throw new Error('Firebase app is not initialized.');

const auth = getAuth(app);
const db = getFirestore(app);

const starterApps = [
  { id: 'farmakon', name: 'Farmakon', category: 'Pharmacy', description: 'A pharmacology tool for students and healthcare learners.', platforms: ['Android', 'iPhone'] },
  { id: 'mcqstar', name: 'MCQStar', category: 'Study Tools', description: 'Question practice and study review app.', platforms: ['Android', 'iPhone'] },
  { id: 'q2mid', name: 'Q2Mid', category: 'Study Tools', description: 'A focused study and revision assistant.', platforms: ['Android', 'Tablet'] },
  { id: 'hepatix', name: 'Hepatix', category: 'Medicine', description: 'A clinical medicine learning tool.', platforms: ['iPhone', 'iPad'] },
  { id: 'medi3y', name: 'Medi3y', category: 'Medicine', description: 'Medical tools and educational content.', platforms: ['Android', 'iPhone', 'iPad'] }
];

const seedMissingApps = async () => {
  const snapshot = await getDocs(collection(db, 'apps'));
  const existing = new Set(snapshot.docs.map(d => d.id));
  const missing = starterApps.filter(a => !existing.has(a.id));
  if (!missing.length) return 0;

  await Promise.all(missing.map(a => setDoc(doc(db, 'apps', a.id), {
    name: a.name,
    category: a.category,
    version: '',
    description: a.description,
    iconUrl: '',
    platforms: a.platforms,
    active: true,
    updatedAt: serverTimestamp()
  })));
  return missing.length;
};

const addSeedButton = () => {
  const sectionHead = document.querySelector('#apps .section-head');
  if (!sectionHead || document.getElementById('seedCatalogBtn')) return;
  const button = document.createElement('button');
  button.id = 'seedCatalogBtn';
  button.className = 'btn ghost';
  button.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Initialize starter catalog';
  button.title = 'Convert the five starter applications into editable Firestore records';
  sectionHead.querySelector('.section-head > button')?.before(button);
  button.addEventListener('click', async () => {
    button.disabled = true;
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Initializing…';
    try {
      const count = await seedMissingApps();
      alert(count ? `${count} starter application${count === 1 ? '' : 's'} added. They are now editable.` : 'The starter applications are already editable.');
      location.reload();
    } catch (error) {
      console.error(error);
      alert(error?.message || 'Unable to initialize the catalog.');
      button.disabled = false;
      button.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Initialize starter catalog';
    }
  });
};

document.addEventListener('DOMContentLoaded', addSeedButton);
onAuthStateChanged(auth, async user => {
  if (!user) return;
  try {
    const snapshot = await getDocs(collection(db, 'apps'));
    if (!snapshot.size) addSeedButton();
  } catch (error) {
    console.warn('Catalog initialization check failed:', error);
  }
});
