// clone slider items (safe snapshot)
const track = document.querySelector('.scroll-track');
if (track) {
  const originalItems = Array.from(track.children);
  originalItems.forEach(item => {
    track.appendChild(item.cloneNode(true));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const googleEl = document.getElementById('google_translate_element');

  // fallback if the official widget doesn't populate (blocked or slow)
  if (googleEl) {
    setTimeout(() => {
      if (googleEl.children.length === 0) {
        const fallback = document.createElement('div');
        fallback.className = 'translate-fallback';
        const url = 'https://translate.google.com/translate?sl=auto&tl=en&u=' + encodeURIComponent(location.href);
        fallback.innerHTML = '<a href="' + url + '" target="_blank" rel="noopener">Translate this page</a>';
        googleEl.appendChild(fallback);
        console.warn('Google Translate widget failed to load — fallback link added.');
      }
    }, 2000);
  }

  // --- custom shortcuts UI (now runs after DOM is ready) ---
  const langSelect = document.querySelector('.lang-select');
  if (!langSelect) {
    console.warn('lang-select element not found.');
    return;
  }

  // add languages mapping (code -> short label)
  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'अ' },
    { code: 'es', label: 'ES' },
    { code: 'fr', label: 'FR' },
    { code: 'de', label: 'DE' }
  ];

  // populate select options
  languages.forEach(lang => {
    const opt = document.createElement('option');
    opt.value = lang.code;
    opt.textContent = lang.label;
    langSelect.appendChild(opt);
  });

  // set initial value from saved preference if present
  const saved = localStorage.getItem('googpref');
  if (saved) {
    try { langSelect.value = saved; } catch (e) { /* ignore */ }
  }

  // change handler: set cookie and trigger translation
  langSelect.addEventListener('change', () => {
    translateTo(langSelect.value);
  });

  function setCookie(name, value) {
    const expires = 'expires=Fri, 31 Dec 9999 23:59:59 GMT';
    const cookieSecure = `${name}=${value};${expires};path=/;SameSite=None; Secure`;
    try {
      // set for current host
      document.cookie = cookieSecure;
      // also try root domain
      const domain = '.' + location.hostname.replace(/^www\./, '');
      document.cookie = `${name}=${value};${expires};path=/;domain=${domain};SameSite=None; Secure`;
    } catch (e) {
      console.warn('cookie set failed with Secure flags, falling back', e);
      // best-effort fallback
      document.cookie = `${name}=${value};${expires};path=/`;
    }
  }

  function clearGoogtransCookies() {
    try {
      const domain = '.' + location.hostname.replace(/^www\./, '');
      document.cookie = 'googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      document.cookie = 'googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=' + domain;
    } catch (e) { /* ignore */ }
  }

  function translateTo(lang) {
    // save preference for future visits and set cookie now
    localStorage.setItem('googpref', lang);
    setCookie('googtrans', `/auto/${lang}`);

    // try to drive the widget without reload
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      try {
        combo.value = lang;
        combo.dispatchEvent(new Event('change', { bubbles: true }));
        return;
      } catch (e) {
        console.warn('Could not programmatically change goog-te-combo, will reload.', e);
      }
    }

    // fallback: reload so the widget picks up cookie on next load
    setTimeout(() => {
      location.reload();
    }, 150);
  }
});