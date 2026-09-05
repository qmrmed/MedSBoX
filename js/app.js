// ===== MedSBoX Pro — واجهة الموقع (الخطوة ١: التصميم + التفاعل الأساسي) =====
// ملاحظة: هذا الملف حالياً يدير فتح/إغلاق نافذة الدخول والتبديل بين التبويبات فقط.
// خطوة لاحقة: ربط هذا الملف بـ Firebase Authentication و Firestore، وبصفحة الدفع.

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('authOverlay');
  const openBtns = [document.getElementById('openAuthBtn'), document.getElementById('heroSubscribeBtn')];
  const closeBtn = document.getElementById('authClose');
  const tabs = document.querySelectorAll('.auth-tab');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const planButtons = document.querySelectorAll('.plan-btn');

  function openAuth(tabName){
    overlay.classList.add('open');
    if (tabName) setTab(tabName);
  }
  function closeAuth(){
    overlay.classList.remove('open');
  }
  function setTab(name){
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    loginForm.classList.toggle('hidden', name !== 'login');
    registerForm.classList.toggle('hidden', name !== 'register');
  }

  openBtns.forEach(btn => btn && btn.addEventListener('click', () => openAuth('login')));
  closeBtn.addEventListener('click', closeAuth);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeAuth(); });

  tabs.forEach(tab => tab.addEventListener('click', () => setTab(tab.dataset.tab)));

  // أزرار خطط الاشتراك تفتح نافذة إنشاء الحساب مباشرة (سيتم توجيهها لصفحة الدفع لاحقاً)
  planButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      openAuth('register');
      registerForm.dataset.selectedPlan = btn.dataset.plan;
    });
  });

  // ===== TODO (الخطوة القادمة) =====
  // 1. loginForm.addEventListener('submit', ...) -> Firebase signInWithEmailAndPassword
  // 2. registerForm.addEventListener('submit', ...) -> Firebase createUserWithEmailAndPassword
  //    ثم إنشاء وثيقة مستخدم في Firestore بحالة subscription: "pending"
  //    ثم التوجيه لصفحة الدفع (payment.html) مع تمرير الخطة المختارة
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('تسجيل الدخول سيتم تفعيله في الخطوة القادمة (ربط Firebase).');
  });
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('إنشاء الحساب سيتم تفعيله في الخطوة القادمة، وسينقلك مباشرة لصفحة الدفع.');
  });
});
