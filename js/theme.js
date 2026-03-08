// classe gérant le basculement entre le thème clair et sombre
class themeClairDark {
  constructor(options = {}) {
    // options configurables : clé de stockage, classe CSS, sélecteur du bouton
    this.storageKey = options.storageKey || 'theme';
    this.className = options.className || 'dark-mode';
    this.buttonSelector = options.buttonSelector || '#theme-toggle';
    this.init();
  }

  init() {
    // restauration du thème sauvegardé dans le localStorage
    const save= localStorage.getItem(this.storageKey);
    if (save === 'dark') this.appliTheme('dark');
    else if (save === 'light') this.appliTheme('light');

    // liaison du clic sur le bouton toggle
    const btn = document.querySelector(this.buttonSelector);
    if (btn) {
      btn.addEventListener('click', () => this.toggle());
      this.updateButton(btn);
    }
  }

  // bascule entre clair et sombre
  toggle() {
    const isDark = document.documentElement.classList.contains(this.className);
    const newTheme = isDark ? 'light' : 'dark';
    this.definiTheme(newTheme);
    const btn = document.querySelector(this.buttonSelector);
    if (btn) this.updateButton(btn);
  }

  // applique et sauvegarde le thème choisi
  definiTheme(theme) {
    if (theme === 'dark') this.appliTheme('dark');
    else this.appliTheme('light');
    localStorage.setItem(this.storageKey, theme);
  }

  // ajoute ou retire la classe dark-mode sur la balise html
  appliTheme(theme) {
    if (theme === 'dark') document.documentElement.classList.add(this.className);
    else document.documentElement.classList.remove(this.className);
  }

  // met à jour l'icône et l'attribut aria du bouton
  updateButton(btn) {
    const isDark = document.documentElement.classList.contains(this.className);
    btn.textContent = isDark ? '🌙' : '☀️';
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }
}

// initialisation du gestionnaire de thème au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  window.themeClairDark = new themeClairDark({ buttonSelector: '#theme-toggle' });
});
