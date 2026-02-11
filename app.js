(function () {
  const openers = document.querySelectorAll('[data-modal-target]');
  const body = document.body;
  let lastFocused = null;

  function getModal(selector) {
    return document.querySelector(selector);
  }

  function openModal(modal) {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');

    // manda il focus al primo elemento interattivo della modale
    const focusable = getFocusable(modal);
    if (focusable.length) {
      focusable[0].focus();
    }

    // gestori per ESC e focus trap
    document.addEventListener('keydown', onKeyDown);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');

    // se nessun’altra modale è aperta, riabilita scroll
    const anyOpen = document.querySelector('.modal[aria-hidden="false"]');
    if (!anyOpen) body.classList.remove('modal-open');

    // restituisci il focus all’elemento precedente
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }

    document.removeEventListener('keydown', onKeyDown);
  }

  function onKeyDown(e) {
    const current = document.querySelector('.modal[aria-hidden="false"]');
    if (!current) return;

    if (e.key === 'Escape') {
      closeModal(current);
    }

    // Focus trap con TAB
    if (e.key === 'Tab') {
      const focusable = getFocusable(current);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }

  function getFocusable(root) {
    return Array.from(
      root.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
  }

  // click su apri-modale (hamburger e link nav)
  openers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const selector = btn.getAttribute('data-modal-target');
      const modal = getModal(selector);

      // se proviene dal menu nella modal nav, chiudi prima la nav
      const toCloseSelector = btn.getAttribute('data-close-parent');
      if (toCloseSelector) {
        const parentModal = getModal(toCloseSelector);
        closeModal(parentModal);
        // piccolo timeout per evitare conflitti di repaint
        setTimeout(() => openModal(modal), 20);
      } else {
        openModal(modal);
      }
    });
  });

  // chiusura: click su backdrop o pulsante X
  document.querySelectorAll('.modal [data-close], .modal__backdrop').forEach(el => {
    el.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      closeModal(modal);
    });
  });

  // chiudi modal quando una navigazione "vera" dovesse avvenire
  window.addEventListener('hashchange', () => {
    document.querySelectorAll('.modal').forEach(m => m.setAttribute('aria-hidden', 'true'));
    body.classList.remove('modal-open');
  });

  // All’avvio: tutte le modali nascoste
  document.querySelectorAll('.modal').forEach(m => m.setAttribute('aria-hidden', 'true'));
})();
