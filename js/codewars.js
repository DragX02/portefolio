
let originalDescription = "";

async function getCodewarsChallenge(ChallId) {
    const url = "core/get_kat.php?id=" + ChallId; 

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur: ${response.status}`);

        const data = await response.json();
        originalDescription = data.description; 

        document.getElementById('titre-exo').innerText = data.name;
        document.getElementById('difficulte').innerText = data.rank.name;

        renderMarkdown(originalDescription);
        document.getElementById('translate-btn').innerText = "Traduire en Français 🇫🇷";

    } catch (error) {
        console.error("Erreur de récupération :", error);
    }
}

function renderMarkdown(text) {
    const descElement = document.getElementById('description-exo');
    if (typeof marked !== 'undefined') {
        descElement.innerHTML = marked.parse(text);
    } else {
        descElement.innerText = text;
    }
}

async function translateToFrench() {
    const btn = document.getElementById('translate-btn');
    if (!originalDescription) return;

    btn.innerText = "Traduction en cours...";

    const chunks = originalDescription.match(/[\s\S]{1,450}(?=\s|$)/g) || [originalDescription];
    let translatedFullText = "";

    try {
        for (let chunk of chunks) {
            const translateUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|fr`;
            const response = await fetch(translateUrl);
            const data = await response.json();
            
            if (data.responseData) {
                translatedFullText += data.responseData.translatedText + " ";
            }
        }

        renderMarkdown(translatedFullText);
        btn.innerText = "Texte Traduit !";

    } catch (error) {
        console.error("Erreur traduction :", error);
        btn.innerText = "Erreur (limite atteinte)";
    }
}

document.getElementById('kata-selector').addEventListener('change', (e) => {
    getCodewarsChallenge(e.target.value);
});

document.getElementById('translate-btn').addEventListener('click', translateToFrench);

getCodewarsChallenge('5277c8a221e209d3f6000b56');