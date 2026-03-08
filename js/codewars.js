let originalDescription = '';

async function getCodewarsChallenge(ChallId) {
    const titreEl = document.getElementById('titre-exo');
    const difficulteEl = document.getElementById('difficulte');
    const descriptionEl = document.getElementById('description-exo');

    titreEl.textContent = 'Chargement...';
    difficulteEl.textContent = '...';
    descriptionEl.innerHTML = '';

    try {
        const response = await fetch('core/get_kat.php?id=' + ChallId);
        const data = await response.json();

        if (data.error) {
            descriptionEl.innerHTML = '<p style="color:#ff6666;">Erreur : ' + data.error + '</p>';
            return;
        }

        titreEl.textContent = data.name;
        difficulteEl.textContent = data.rank ? data.rank.name : 'Inconnue';
        originalDescription = data.description || 'Pas de description disponible.';
        renderMarkdown(originalDescription);
    } catch (error) {
        descriptionEl.innerHTML = '<p style="color:#ff6666;">Erreur de chargement.</p>';
    }
}

function renderMarkdown(text) {
    const descriptionEl = document.getElementById('description-exo');
    if (typeof marked !== 'undefined') {
        descriptionEl.innerHTML = marked.parse(text);
    } else {
        descriptionEl.textContent = text;
    }
}

async function translateToFrench() {
    const btn = document.getElementById('translate-btn');
    const descriptionEl = document.getElementById('description-exo');

    if (!originalDescription) return;

    btn.textContent = 'Traduction en cours...';
    btn.disabled = true;

    try {
        // Decouper le texte en morceaux de 450 caracteres max
        const chunks = [];
        let text = originalDescription;
        while (text.length > 0) {
            chunks.push(text.substring(0, 450));
            text = text.substring(450);
        }

        let translated = '';
        for (const chunk of chunks) {
            const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(chunk) + '&langpair=en|fr';
            const response = await fetch(url);
            const data = await response.json();
            translated += data.responseData.translatedText;
        }

        renderMarkdown(translated);
        btn.textContent = 'Traduit !';
    } catch (error) {
        btn.textContent = 'Erreur de traduction';
    }

    setTimeout(() => {
        btn.textContent = 'Traduire en Français';
        btn.disabled = false;
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    const selector = document.getElementById('kata-selector');
    const translateBtn = document.getElementById('translate-btn');

    if (selector) {
        selector.addEventListener('change', function() {
            getCodewarsChallenge(this.value);
        });
    }

    if (translateBtn) {
        translateBtn.addEventListener('click', translateToFrench);
    }

    // Charger le premier challenge
    getCodewarsChallenge('5277c8a221e209d3f6000b56');
});