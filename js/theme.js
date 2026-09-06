(() => {
  const STORAGE_KEY = 'medsbox-theme';
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;

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

  const setPreference = preference => {
    localStorage.setItem(STORAGE_KEY, preference);
    apply(preference);
  };

  const closeMenu = () => {
    const menu = document.getElementById('themeMenu');
    const button = document.getElementById('themeButton');
    if (menu) menu.classList.remove('open');
    if (button) button.setAttribute('aria-expanded', 'false');
  };

  const addMobileNav = () => {
    if (document.body.classList.contains('admin-page') || document.querySelector('.vision-bottom-nav')) return;
    const path = location.pathname.split('/').pop() || 'index.html';
    const active = key => (key === 'home' && (path === '' || path === 'index.html')) || (key === 'library' && path === 'library.html') || (key === 'apple' && path === 'ios-store.html') || (key === 'plans' && path === 'payment.html');
    const nav = document.createElement('nav');
    nav.className = 'vision-bottom-nav';
    nav.setAttribute('aria-label', 'Quick navigation');
    nav.innerHTML = `
      <a href="index.html" class="${active('home') ? 'active' : ''}"><i class="fa-solid fa-house"></i><span>Home</span></a>
      <a href="library.html" class="${active('library') ? 'active' : ''}"><i class="fa-solid fa-grid-2"></i><span>Library</span></a>
      <a href="ios-store.html" class="${active('apple') ? 'active' : ''}"><i class="fa-brands fa-apple"></i><span>Apple</span></a>
      <a href="payment.html" class="${active('plans') ? 'active' : ''}"><i class="fa-solid fa-sparkles"></i><span>Plans</span></a>
      <a href="https://t.me/ID29i" target="_blank" rel="noopener" aria-label="Support"><i class="fa-brands fa-telegram"></i><span>Support</span></a>`;
    document.body.appendChild(nav);
  };

  const init = () => {
    apply(getPreference());
    addMobileNav();
    const button = document.getElementById('themeButton');
    const menu = document.getElementById('themeMenu');
    if (button && menu) {
      button.addEventListener('click', event => {
        event.stopPropagation();
        const open = menu.classList.toggle('open');
        button.setAttribute('aria-expanded', String(open));
      });
      menu.querySelectorAll('[data-theme-choice]').forEach(choice => {
        choice.addEventListener('click', () => {
          setPreference(choice.dataset.themeChoice);
          closeMenu();
        });
      });
      document.addEventListener('click', event => {
        if (!menu.contains(event.target) && event.target !== button) closeMenu();
      });
    }
  };

  media.addEventListener?.('change', () => {
    if (getPreference() === 'system') apply('system');
  });
  window.addEventListener('DOMContentLoaded', init);
})();
