<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title data-i18n="site_title">My Project</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; max-width: 600px; margin: auto; }
    select { margin-top: 1rem; }
  </style>
</head>
<body>
  <h1 data-i18n="welcome_message">Welcome!</h1>
  <p data-i18n="intro_text">
    This site demonstrates simple multilingual support using JSON files.
  </p>

  <label for="langSelect" data-i18n="choose_lang">Choose language:</label>
  <select id="langSelect">
    <option value="en">English</option>
    <option value="es">Español</option>
  </select>

  <script>
    const currentLang = localStorage.getItem("lang") || "en";
    const select = document.getElementById("langSelect");
    select.value = currentLang;

    function loadLanguage(lang) {
      fetch(`/lang/${lang}.json`)
        .then((res) => res.json())
        .then((translations) => {
          document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (translations[key]) {
              if (el.tagName === "TITLE") document.title = translations[key];
              else el.innerText = translations[key];
            }
          });
        })
        .catch(() => console.error("Translation file missing for", lang));
    }

    // Load current language
    loadLanguage(currentLang);

    // Update on change
    select.addEventListener("change", (e) => {
      const lang = e.target.value;
      localStorage.setItem("lang", lang);
      loadLanguage(lang);
    });
  </script>
</body>
</html>


{
  "site_title": "My Project",
  "welcome_message": "Welcome!",
  "intro_text": "This site demonstrates simple multilingual support using JSON files.",
  "choose_lang": "Choose language:"
}
