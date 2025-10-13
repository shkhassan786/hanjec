// filepath: multilingual-website/multilingual-website/public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const languageButtons = document.querySelectorAll('.lang-btn');
    const content = document.getElementById('content');

    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            loadLanguage(lang);
        });
    });

    function loadLanguage(lang) {
        fetch(`locales/${lang}.json`)
            .then(response => response.json())
            .then(translations => {
                updateContent(translations);
                localStorage.setItem('preferredLanguage', lang);
            })
            .catch(error => console.error('Error loading language file:', error));
    }

    function updateContent(translations) {
        for (const key in translations) {
            const elements = document.querySelectorAll(`[data-translate="${key}"]`);
            elements.forEach(element => {
                element.textContent = translations[key];
            });
        }
    }

    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    loadLanguage(preferredLanguage);
});