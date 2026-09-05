// ===== MedSBoX Pro — منطق صفحة الدفع =====

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email') || '';
  let currentPlan = params.get('plan') === 'lifetime' ? 'lifetime' : 'yearly';

  const planNames = { yearly: 'اشتراك سنوي', lifetime: 'اشتراك مدى الحياة' };
  const planPrices = { yearly: '$10', lifetime: '$25' };

  const toggleBtns = document.querySelectorAll('.plan-toggle-btn');
  const telegramLink = document.getElementById('telegramCta');

  // رقم طلب مرجعي بسيط لتسهيل المطابقة عند التواصل — ثابت طول الجلسة حتى لو بدّل الخطة
  const refCode = 'MSB-' + Math.floor(100000 + Math.random() * 900000);
  const refBtn = document.getElementById('refCode');
  refBtn.textContent = refCode;
  refBtn.addEventListener('click', () => {
    navigator.clipboard?.writeText(refCode).then(() => {
      refBtn.classList.add('copied');
      setTimeout(() => refBtn.classList.remove('copied'), 1600);
    });
  });

  function renderPlan() {
    toggleBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.plan === currentPlan));

    const messageLines = [
      `مرحباً، أريد إتمام الدفع لاشتراك MedSBoX Pro.`,
      `الخطة: ${planNames[currentPlan]} (${planPrices[currentPlan]})`,
      `رقم الطلب المرجعي: ${refCode}`
    ];
    if (email) messageLines.push(`البريد المسجل: ${email}`);
    telegramLink.href = `https://t.me/ID29i?text=${encodeURIComponent(messageLines.join('\n'))}`;
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentPlan = btn.dataset.plan;
      renderPlan();
    });
  });

  renderPlan();

  // ظهور تدريجي للعناصر عند التمرير
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }
});
