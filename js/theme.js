class themeClairDark {
    constructor(options = {}) {
        this.storageKey = options.storageKey || 'theme';
        this.className = options.className || 'dark-mode';
        this.buttonSelector = options.buttonSelector || '#theme-toggle';
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem(this.storageKey) || 'dark';
        this.appliTheme(savedTheme);

        const btn = document.querySelector(this.buttonSelector);
        if (btn) {
            this.updateButton(btn);
            btn.addEventListener('click', () => this.toggle());
        }
    }

    toggle() {
        const current = document.documentElement.classList.contains(this.className) ? 'dark' : 'light';
        const newTheme = current === 'dark' ? 'light' : 'dark';
        this.definiTheme(newTheme);
    }

    definiTheme(theme) {
        this.appliTheme(theme);
        localStorage.setItem(this.storageKey, theme);
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
        btn.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19';
        btn.setAttribute('aria-pressed', isDark);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new themeClairDark();
});