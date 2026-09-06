// ===== MedSBoX Pro — منطق الموقع + ربط Firebase =====

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ----- إعدادات Firebase الخاصة بمشروع MedSBoX Pro -----
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

// رسائل الأخطاء الشائعة بالعربي
function friendlyError(code) {
  const map = {
    "auth/email-already-in-use": "هذا البريد الإلكتروني مسجل مسبقاً. جرب تسجيل الدخول بدلاً من إنشاء حساب.",
    "auth/invalid-email": "صيغة البريد الإلكتروني غير صحيحة.",
    "auth/weak-password": "كلمة المرور ضعيفة، لازم تكون ٦ أحرف على الأقل.",
    "auth/invalid-credential": "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    "auth/user-not-found": "لا يوجد حساب بهذا البريد الإلكتروني.",
    "auth/wrong-password": "كلمة المرور غير صحيحة.",
    "auth/too-many-requests": "محاولات كثيرة، جرب بعد قليل."
  };
  return map[code] || "صار خطأ غير متوقع، حاول مرة أخرى.";
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('authOverlay');
  const openAuthBtn = document.getElementById('openAuthBtn');
  const heroSubscribeBtn = document.getElementById('heroSubscribeBtn');
  const closeBtn = document.getElementById('authClose');
  const tabs = document.querySelectorAll('.auth-tab');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const planButtons = document.querySelectorAll('.plan-btn');
  const messageBox = document.getElementById('authMessage');

  function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = 'auth-message ' + (type || '');
  }
  function clearMessage() {
    messageBox.textContent = '';
    messageBox.className = 'auth-message';
  }

  function openAuth(tabName) {
    overlay.classList.add('open');
    clearMessage();
    if (tabName) setTab(tabName);
  }
  function closeAuth() {
    overlay.classList.remove('open');
  }
  function setTab(name) {
    clearMessage();
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    loginForm.classList.toggle('hidden', name !== 'login');
    registerForm.classList.toggle('hidden', name !== 'register');
  }

  heroSubscribeBtn && heroSubscribeBtn.addEventListener('click', () => openAuth('login'));
  closeBtn.addEventListener('click', closeAuth);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeAuth(); });
  tabs.forEach(tab => tab.addEventListener('click', () => setTab(tab.dataset.tab)));

  // إذا انفتحت الصفحة من رابط فيه ?open=register (مثلاً من زر تحميل بالمكتبة)، افتح نافذة الحساب الجديد تلقائياً
  if (new URLSearchParams(window.location.search).get('open') === 'register') {
    openAuth('register');
  }

  // زر الهيدر يتغيّر حسب حالة الدخول — يبين لك بوضوح إنك داخل حسابك فعلاً بين الصفحات
  onAuthStateChanged(auth, (user) => {
    if (user) {
      openAuthBtn.textContent = 'مكتبتي / خروج';
      openAuthBtn.onclick = () => {
        if (confirm('تحب تفتح المكتبة؟ (إلغاء = تسجيل خروج)')) {
          window.location.href = 'library.html';
        } else {
          signOut(auth);
        }
      };
    } else {
      openAuthBtn.textContent = 'تسجيل الدخول';
      openAuthBtn.onclick = () => openAuth('login');
    }
  });

  planButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      openAuth('register');
      registerForm.dataset.selectedPlan = btn.dataset.plan;
    });
  });

  // ===== تسجيل الدخول =====
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessage();
    const email = loginForm.identifier.value.trim();
    const password = loginForm.password.value;
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showMessage('تم تسجيل الدخول بنجاح ✅ جاري تحويلك للمكتبة...', 'success');
      setTimeout(() => { window.location.href = 'library.html'; }, 1000);
    } catch (err) {
      showMessage(friendlyError(err.code), 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });

  // ===== إنشاء حساب جديد =====
  const dialCodes = { IQ:'+964', SA:'+966', AE:'+971', EG:'+20', JO:'+962', KW:'+965', QA:'+974', BH:'+973', OM:'+968', LB:'+961', SY:'+963', OTHER:'' };

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessage();
    const fullname = registerForm.fullname.value.trim();
    const country = registerForm.country.value;
    const phoneRaw = registerForm.phone.value.trim();
    const phone = phoneRaw ? `${dialCodes[country] || ''} ${phoneRaw}`.trim() : '';
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value;
    const plan = registerForm.dataset.selectedPlan || 'yearly';
    const submitBtn = registerForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', cred.user.uid), {
        fullname,
        country,
        phone,
        email,
        plan,
        subscriptionStatus: 'pending', // pending | active | expired
        createdAt: serverTimestamp()
      });
      showMessage('تم إنشاء الحساب بنجاح ✅ جاري تحويلك لصفحة الدفع...', 'success');
      const redirectUrl = `payment.html?plan=${encodeURIComponent(plan)}&email=${encodeURIComponent(email)}`;
      setTimeout(() => { window.location.href = redirectUrl; }, 1400);
    } catch (err) {
      showMessage(friendlyError(err.code), 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });
});
