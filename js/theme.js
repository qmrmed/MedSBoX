(() => {
  const STORAGE_KEY = 'medsbox-theme';
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;
  const publicPages = ['index.html','library.html','offers.html','ios-store.html','payment.html','activation.html'];
  const isPublic = publicPages.includes(location.pathname.split('/').pop() || 'index.html');
  const getPreference = () => localStorage.getItem(STORAGE_KEY) || 'system';
  const isDark = preference => preference === 'dark' || (preference === 'system' && media.matches);
  const apply = preference => {
    root.dataset.theme = isDark(preference) ? 'dark' : 'light';
    root.dataset.themePreference = preference;
    const icon = document.getElementById('themeIcon');
    const label = document.getElementById('themeCurrent');
    if (icon) icon.className = `fa-solid ${preference === 'dark' ? 'fa-moon' : preference === 'light' ? 'fa-sun' : 'fa-desktop'}`;
    if (label) label.textContent = preference.charAt(0).toUpperCase() + preference.slice(1);
    document.querySelectorAll('[data-theme-choice]').forEach(button => {
      const active = button.dataset.themeChoice === preference;
      button.classList.toggle('active', active);
      button.setAttribute('aria-checked', String(active));
    });
  };
  const setPreference = preference => { if (['system','light','dark'].includes(preference)) { localStorage.setItem(STORAGE_KEY, preference); apply(preference); } };
  const closeMenu = () => { const menu=document.getElementById('themeMenu'),button=document.getElementById('themeButton');if(menu)menu.classList.remove('open');if(button)button.setAttribute('aria-expanded','false'); };
  const normalizePublicFlow = () => {
    if (!isPublic) return;
    document.querySelectorAll('#accountBtn').forEach(el=>el.remove());
    document.querySelectorAll('a[href*="open=register"],a[href*="open=login"]').forEach(a=>{a.href='payment.html';a.textContent='Subscribe & activate';});
    document.querySelectorAll('a,button').forEach(el=>{
      const text=(el.textContent||'').trim();
      if (/^(Sign in|Sign out|Create account|Register|Forgot password)$/i.test(text)) { el.textContent='Subscribe & activate'; if(el.tagName==='A')el.href='payment.html'; }
    });
  };
  const addMobileNav = () => {
    if (document.body.classList.contains('admin-page') || document.querySelector('.vision-bottom-nav')) return;
    const path=location.pathname.split('/').pop()||'index.html';
    const active=key=>(key==='home'&&(path===''||path==='index.html'))||(key==='library'&&path==='library.html')||(key==='apple'&&path==='ios-store.html')||(key==='plans'&&path==='payment.html');
    const nav=document.createElement('nav');nav.className='vision-bottom-nav';nav.setAttribute('aria-label','Quick navigation');nav.style.transition='transform .32s cubic-bezier(.22,.8,.25,1),opacity .24s ease';
    nav.innerHTML=`<a href="index.html" class="${active('home')?'active':''}"><i class="fa-solid fa-house"></i><span>Home</span></a><a href="library.html" class="${active('library')?'active':''}"><i class="fa-solid fa-table-cells"></i><span>Library</span></a><a href="ios-store.html" class="${active('apple')?'active':''}"><i class="fa-brands fa-apple"></i><span>Apple</span></a><a href="payment.html" class="${active('plans')?'active':''}"><i class="fa-solid fa-star"></i><span>Subscribe</span></a><a href="https://t.me/ID29i" target="_blank" rel="noopener" aria-label="Support"><i class="fa-brands fa-telegram"></i><span>Support</span></a>`;
    document.body.appendChild(nav);
    let lastY=window.scrollY,ticking=false;
    const syncNav=()=>{const y=window.scrollY,delta=y-lastY;if(Math.abs(delta)>8){const hidden=delta>0&&y>120;nav.style.transform=hidden?'translateY(calc(120% + env(safe-area-inset-bottom)))':'translateY(0)';nav.style.opacity=hidden?'0':'1';nav.style.pointerEvents=hidden?'none':'auto';lastY=y}ticking=false};
    window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(syncNav);ticking=true}},{passive:true});
  };
  const addPageInteractions = () => {
    const header=document.querySelector('.header');let ticking=false;
    const syncHeader=()=>{if(header)header.classList.toggle('scrolled',window.scrollY>24);ticking=false};
    window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(syncHeader);ticking=true}},{passive:true});syncHeader();
    if(media.matches&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const targets=document.querySelectorAll('.section,.hero-card,.app-card,.store-app,.ios-plan,.pay-step,.social-card,.support-note,.activation-card,.access-notice,.empty-state');
    if(!('IntersectionObserver'in window))return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('vf-visible');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -7% 0px'});
    targets.forEach((el,index)=>{el.classList.add('vf-reveal');el.style.setProperty('--vf-delay',`${Math.min(index%5,4)*45}ms`);observer.observe(el)});
  };
  const init=()=>{apply(getPreference());normalizePublicFlow();addMobileNav();addPageInteractions();const button=document.getElementById('themeButton'),menu=document.getElementById('themeMenu');if(button&&menu){button.addEventListener('click',event=>{event.stopPropagation();const open=menu.classList.toggle('open');button.setAttribute('aria-expanded',String(open))});menu.querySelectorAll('[data-theme-choice]').forEach(choice=>choice.addEventListener('click',()=>{setPreference(choice.dataset.themeChoice);closeMenu()}));document.addEventListener('click',event=>{if(!menu.contains(event.target)&&event.target!==button)closeMenu()})}};
  media.addEventListener?.('change',()=>{if(getPreference()==='system')apply('system')});window.addEventListener('DOMContentLoaded',init);
})();
