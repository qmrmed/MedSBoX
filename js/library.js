// ===== MedSBoX Pro — صفحة المكتبة =====

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyATRvlq7VzIYFrVSprw5yVzv0uu5d-QrVM",
  authDomain: "medsbox-pro.firebaseapp.com",
  projectId: "medsbox-pro",
  storageBucket: "medsbox-pro.firebasestorage.app",
  messagingSenderId: "145094360411",
  appId: "1:145094360411:web:c8a525881927c294682e7e"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// حالة الوصول الحالية — تتحدث لما يرد الرد من Firebase، وتُقرأ وقت كل ضغطة تحميل
let isActiveSubscriber = false;

// ===== كتالوج التطبيقات — عدّل/أضف عناصر هنا وينعكس تلقائياً بالصفحة =====
const CATALOG = [
  {
    name: 'Farmakon', category: 'صيدلة', badge: 'Rx',
    color: 'linear-gradient(140deg,#14A5A0,#083D44)',
    devices: ['Android', 'iPhone'],
    link: 'https://t.me/QMR7S'
  },
  {
    name: 'MCQStar', category: 'أدوات دراسية', badge: 'Q★',
    color: 'linear-gradient(140deg,#E7A93F,#b5791f)',
    devices: ['Android', 'iPhone'],
    link: 'https://t.me/QMR7S'
  },
  {
    name: 'Q2Mid', category: 'أدوات دراسية', badge: 'Q2',
    color: 'linear-gradient(140deg,#E7A93F,#b5791f)',
    devices: ['Android', 'Tablet'],
    link: 'https://t.me/QMR7S'
  },
  {
    name: 'Hepatix', category: 'طب', badge: 'Hx',
    color: 'linear-gradient(140deg,#51636C,#0C1B24)',
    devices: ['iPhone', 'iPad'],
    link: 'https://t.me/QMR7S'
  },
  {
    name: 'Medi3y', category: 'طب', badge: 'M3',
    color: 'linear-gradient(140deg,#14A5A0,#083D44)',
    devices: ['Android', 'iPhone', 'iPad'],
    link: 'https://t.me/QMR7S'
  }
];

const arrowIcon = '<svg viewBox="0 0 24 24" fill="none"><path d="M12 4v13m0 0l-5-5m5 5l5-5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function renderCatalog() {
  const categories = ['الكل', ...new Set(CATALOG.map(a => a.category))];
  const tabsEl = document.getElementById('catTabs');
  const gridEl = document.getElementById('appsGrid');

  function deviceBtn(device, link) {
    return `<a href="#" class="device-dl-btn" data-link="${link}">
      <span class="device-dl-label">${device}</span>
      <span class="device-dl-arrow">${arrowIcon}</span>
    </a>`;
  }

  function renderGrid(filter) {
    const items = filter === 'الكل' ? CATALOG : CATALOG.filter(a => a.category === filter);
    gridEl.innerHTML = items.map(app => `
      <div class="app-card">
        <span class="app-card-icon" style="background:${app.color}">${app.badge}</span>
        <div>
          <div class="app-card-name">${app.name}</div>
          <div class="app-card-cat">${app.category}</div>
        </div>
        <div class="device-dl-list">${app.devices.map(d => deviceBtn(d, app.link)).join('')}</div>
      </div>
    `).join('');
  }

  tabsEl.innerHTML = categories.map((c, i) =>
    `<button type="button" class="cat-tab ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');

  tabsEl.querySelectorAll('.cat-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      tabsEl.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid(btn.dataset.cat);
    });
  });

  renderGrid('الكل');

  // تفويض ضغطة زر التحميل — يقرر الوجهة وقت الضغط الفعلي حسب حالة الاشتراك الحالية
  gridEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.device-dl-btn');
    if (!btn) return;
    e.preventDefault();
    if (isActiveSubscriber) {
      window.open(btn.dataset.link, '_blank', 'noopener');
    } else {
      window.location.href = 'index.html?open=register';
    }
  });
}

function updateAccessNotice(status) {
  const notice = document.getElementById('accessNotice');
  const text = document.getElementById('accessNoticeText');
  if (status === 'active') {
    notice.hidden = true;
    return;
  }
  notice.hidden = false;
  text.textContent = status === 'pending'
    ? 'اشتراكك بانتظار تأكيد الدفع — تصفح المكتبة متاح، وتفعيل روابط التحميل يصير بعد التفعيل.'
    : 'سجّل دخولك وفعّل اشتراكك حتى تنفتح لك روابط تحميل التطبيقات مباشرة.';
}

document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();

  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', () => signOut(auth).then(() => window.location.href = 'index.html'));

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      isActiveSubscriber = false;
      updateAccessNotice('logged-out');
      logoutBtn.hidden = true;
      return;
    }
    logoutBtn.hidden = false;
    try {
      const snap = await getDoc(doc(db, 'users', user.uid));
      const status = snap.exists() ? snap.data().subscriptionStatus : 'pending';
      isActiveSubscriber = status === 'active';
      updateAccessNotice(status);
    } catch (err) {
      isActiveSubscriber = false;
      updateAccessNotice('pending');
    }
  });
});
