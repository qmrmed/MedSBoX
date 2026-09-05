// ===== MedSBoX Pro — منطق صفحة الدفع =====

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const plan = params.get('plan') === 'lifetime' ? 'lifetime' : 'yearly';
  const email = params.get('email') || '';

  const planNames = { yearly: 'اشتراك سنوي', lifetime: 'اشتراك مدى الحياة' };
  const planPrices = { yearly: '$10', lifetime: '$20' };

  document.getElementById('planName').textContent = planNames[plan];
  document.getElementById('planPrice').innerHTML = `<bdi>${planPrices[plan]}</bdi>`;

  // رقم طلب مرجعي بسيط لتسهيل المطابقة عند التواصل
  const refCode = 'MSB-' + Math.floor(100000 + Math.random() * 900000);
  const refBtn = document.getElementById('refCode');
  refBtn.textContent = refCode;
  refBtn.addEventListener('click', () => {
    navigator.clipboard?.writeText(refCode).then(() => {
      refBtn.classList.add('copied');
      setTimeout(() => refBtn.classList.remove('copied'), 1600);
    });
  });

  // رابط تيليجرام مع رسالة جاهزة
  const messageLines = [
    `مرحباً، أريد إتمام الدفع لاشتراك MedSBoX Pro.`,
    `الخطة: ${planNames[plan]} (${planPrices[plan]})`,
    `رقم الطلب المرجعي: ${refCode}`
  ];
  if (email) messageLines.push(`البريد المسجل: ${email}`);
  const message = messageLines.join('\n');

  const telegramLink = document.getElementById('telegramCta');
  telegramLink.href = `https://t.me/ID29i?text=${encodeURIComponent(message)}`;

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
