class themeClairDark {
  constructor(options = {}) {
    this.storageKey = options.storageKey || 'theme';
    this.className = options.className || 'dark-mode';
    this.buttonSelector = options.buttonSelector || '#theme-toggle';
    this.init();
  }

  init() {
    const save= localStorage.getItem(this.storageKey);
    if (save === 'dark') this.appliTheme('dark');
    else if (save === 'light') this.appliTheme('light');

    const btn = document.querySelector(this.buttonSelector);
    if (btn) {
      btn.addEventListener('click', () => this.toggle());
      this.updateButton(btn);
    }
  }

  toggle() {
    const isDark = document.documentElement.classList.contains(this.className);
    const newTheme = isDark ? 'light' : 'dark';
    this.definiTheme(newTheme);
    const btn = document.querySelector(this.buttonSelector);
    if (btn) this.updateButton(btn);
  }

    definiTheme(theme) {
    if (theme === 'dark') this.appliTheme('dark');
    else this.appliTheme('light');
    localStorage.setItem(this.storageKey, theme);
  }

  appliTheme(theme) {
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
