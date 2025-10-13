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
  const shortcutsContainer = document.querySelector('.lang-shortcuts');
  if (!shortcutsContainer) {
    console.warn('lang-shortcuts container not found.');
    return;
  }

  function setCookie(name, value) {
    const expires = 'expires=Fri, 31 Dec 9999 23:59:59 GMT';
    try {
      document.cookie = `${name}=${value};${expires};path=/`;
      const domain = '.' + location.hostname.replace(/^www\./, '');
      document.cookie = `${name}=${value};${expires};path=/;domain=${domain}`;
    } catch (e) {
      console.warn('Could not set cookie for domain root.', e);
    }
  }

  function translateTo(lang) {
    // set googtrans cookie the Google widget reads on load
    setCookie('googtrans', `/auto/${lang}`);
    setCookie('googtrans', `/auto/${lang}`); // duplicate for compatibility

    setTimeout(() => {
      // if the widget exists and rendered, reload to let it apply translation
      if (googleEl && googleEl.children.length > 0) {
        location.reload();
      } else {
        // fallback: open Google Translate preview in new tab
        const url = 'https://translate.google.com/translate?sl=auto&tl=' + encodeURIComponent(lang) + '&u=' + encodeURIComponent(location.href);
        window.open(url, '_blank', 'noopener');
      }
    }, 150);
  }

  // build buttons
  languages.forEach(lang => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lang-btn';
    btn.title = lang.code;
    btn.textContent = lang.label;
    btn.addEventListener('click', () => translateTo(lang.code));
    shortcutsContainer.appendChild(btn);
  });
});