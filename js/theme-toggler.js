class themeClairDark {
  constructor(options = {}) {
    this.storageKey = options.storageKey || 'theme';
    this.className = options.className || 'dark-mode';
    this.buttonSelector = options.buttonSelector || '#theme-toggle';
    this.init();
  }

  init() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'dark') this.applyTheme('dark');
    else if (saved === 'light') this.applyTheme('light');

    const btn = document.querySelector(this.buttonSelector);
    if (btn) {
      btn.addEventListener('click', () => this.toggle());
      this.updateButton(btn);
    }
  }

  toggle() {
    const isDark = document.documentElement.classList.contains(this.className);
    const newTheme = isDark ? 'light' : 'dark';
    this.setTheme(newTheme);
    const btn = document.querySelector(this.buttonSelector);
    if (btn) this.updateButton(btn);
  }

  setTheme(theme) {
    if (theme === 'dark') this.applyTheme('dark');
    else this.applyTheme('light');
    localStorage.setItem(this.storageKey, theme);
  }

  applyTheme(theme) {
    if (theme === 'dark') document.documentElement.classList.add(this.className);
    else document.documentElement.classList.remove(this.className);
  }

  updateButton(btn) {
    const isDark = document.documentElement.classList.contains(this.className);
    btn.textContent = isDark ? '🌙' : '☀️';
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.themeClairDark = new themeClairDark({ buttonSelector: '#theme-toggle' });
});
