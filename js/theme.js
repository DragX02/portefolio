class themeClairDark {
    constructor(options = {}) {
        this.cookieName = options.cookieName || 'theme';
        this.className = options.className || 'dark-mode';
        this.buttonSelector = options.buttonSelector || '#theme-toggle';
        this.cookieDays = options.cookieDays || 365;
        this.init();
    }

    init() {
        const savedTheme = this.getCookie(this.cookieName) || 'dark';
        this.appliTheme(savedTheme);

        const btn = document.querySelector(this.buttonSelector);
        if (btn) {
            this.updateButton(btn);
            btn.addEventListener('click', () => this.toggle());
        }
    }

    toggle() {
        const isDark = document.documentElement.classList.contains(this.className);
        const newTheme = isDark ? 'light' : 'dark';
        this.definiTheme(newTheme);
    }

    definiTheme(theme) {
        this.appliTheme(theme);
        this.setCookie(this.cookieName, theme, this.cookieDays);
        const btn = document.querySelector(this.buttonSelector);
        if (btn) {
            this.updateButton(btn);
        }
    }

    appliTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add(this.className);
        } else {
            document.documentElement.classList.remove(this.className);
        }
    }

    updateButton(btn) {
        const isDark = document.documentElement.classList.contains(this.className);
        btn.textContent = isDark ? '☀️' : '🌙';
        btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    }

    setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/; SameSite=Lax';
    }

    getCookie(name) {
        const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new themeClairDark();
});
