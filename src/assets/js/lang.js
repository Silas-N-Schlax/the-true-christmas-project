// lang.js
const langSelect = document.getElementById('langSelect');

// Load JSON and replace content
async function loadLanguage(lang) {
  try {
    const response = await fetch(`/assets/lang/${lang}.json`);
    const translations = await response.json();

    // Update elements with data-i18n (HTML allowed)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const keys = key.split('.');
      let value = translations;

      keys.forEach(k => {
        if (value && typeof value === 'object') value = value[k];
      });

      if (typeof value === 'string') {
        // Allows full HTML (e.g., <b>, <a>, <br>)
        el.innerHTML = value;
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const keys = key.split('.');
      let value = translations;

      keys.forEach(k => {
        if (value && typeof value === 'object') value = value[k];
      });

      if (typeof value === 'string') {
        el.placeholder = value;
      }
    });

  } catch (err) {
    console.error(`Error loading language file: ${lang}`, err);
  }
}

// Handle dropdown change
langSelect.addEventListener('change', e => {
  const selectedLang = e.target.value;
  localStorage.setItem('lang', selectedLang);
  loadLanguage(selectedLang);
});

// Load saved language or default
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'en';
  langSelect.value = savedLang;
  loadLanguage(savedLang);
});
