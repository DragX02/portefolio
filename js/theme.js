// classe gérant le basculement entre le thème clair et sombre
// le thème est sauvegardé dans un cookie pour que le serveur puisse le lire
class themeClairDark {
    constructor(options = {}) {
        // options configurables : nom du cookie, classe CSS, sélecteur du bouton, durée du cookie
        this.cookieName = options.cookieName || 'theme';
        this.className = options.className || 'dark-mode';
        this.buttonSelector = options.buttonSelector || '#theme-toggle';
        this.cookieDays = options.cookieDays || 365;
        this.init();
    }

    init() {
        // restauration du thème depuis le cookie
        const savedTheme = this.getCookie(this.cookieName) || 'light';
        this.appliTheme(savedTheme);

        // liaison du clic sur le bouton toggle
        const btn = document.querySelector(this.buttonSelector);
        if (btn) {
            this.updateButton(btn);
            btn.addEventListener('click', () => this.toggle());
        }
    }

    // bascule entre clair et sombre
    toggle() {
        const isDark = document.documentElement.classList.contains(this.className);
        const newTheme = isDark ? 'light' : 'dark';
        this.definiTheme(newTheme);
    }

    // applique, sauvegarde dans le cookie et met à jour le bouton
    definiTheme(theme) {
        this.appliTheme(theme);
        this.setCookie(this.cookieName, theme, this.cookieDays);
        const btn = document.querySelector(this.buttonSelector);
        if (btn) {
            this.updateButton(btn);
        }
    }

    // ajoute ou retire la classe dark-mode sur la balise html
    appliTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add(this.className);
        } else {
            document.documentElement.classList.remove(this.className);
        }
    }

    // met à jour l'icône et l'attribut aria du bouton
    updateButton(btn) {
        const isDark = document.documentElement.classList.contains(this.className);
        btn.textContent = isDark ? '☀️' : '🌙';
        btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    }

    // écriture d'un cookie avec une date d'expiration
    setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/; SameSite=Lax';
    }

    // lecture d'un cookie par son nom
    getCookie(name) {
        const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : null;
    }
}

// initialisation du gestionnaire de thème au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    new themeClairDark();
});
