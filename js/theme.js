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

  const init = () => {
    apply(getPreference());
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
