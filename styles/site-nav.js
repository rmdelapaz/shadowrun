(function() {
  // Page order for prev/next navigation
  const pages = [
    { href: '/sr_intro.html', label: 'Introduction' },
    { href: '/sr_char.html', label: 'Characters' },
    { href: '/sr_mechanics.html', label: 'Game Mechanics' },
    { href: '/sr_dice_roller.html', label: 'Dice Roller' },
    { href: '/sr_character_examples.html', label: 'Character Examples' },
    { href: '/sr_100.html', label: '100 Characters' },
    { href: '/sr_names.html', label: 'Character Names' },
    { href: '/sr_contacts.html', label: 'Contacts & Lifestyle' },
    { href: '/sr_planning.html', label: 'Planning' },
    { href: '/sr_matrix.html', label: 'The Matrix' },
    { href: '/sr_magic.html', label: 'Magic' },
    { href: '/sr_urban.html', label: 'Urban Sprawl' },
    { href: '/sr_adv.html', label: 'Advanced Campaigns' }
  ];

  const path = window.location.pathname;
  const isIndex = path === '/' || path === '/index.html';

  // --- Dark mode ---
  const saved = localStorage.getItem('sr-theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('sr-theme', isDark ? 'light' : 'dark');
    updateToggleBtn();
  }

  function updateToggleBtn() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
    btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  }

  // --- Inject top nav ---
  document.addEventListener('DOMContentLoaded', function() {
    const nav = document.createElement('nav');
    nav.id = 'site-nav';
    nav.innerHTML = `
      <div class="nav-left">
        <a href="/index.html">🏠 Home</a>
        <a href="https://rays-home.netlify.app/" target="_blank" rel="noopener">Ray's House of Fun</a>
        <a href="https://rays-home.netlify.app/contact" target="_blank" rel="noopener">Contact</a>
      </div>
      <button id="theme-toggle" type="button" aria-label="Toggle dark mode"></button>
    `;
    document.body.prepend(nav);
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    updateToggleBtn();

    // --- Prev / Next (non-index pages only) ---
    if (!isIndex) {
      const idx = pages.findIndex(p => path.endsWith(p.href) || path === p.href);
      if (idx !== -1) {
        const prev = idx > 0 ? pages[idx - 1] : null;
        const next = idx < pages.length - 1 ? pages[idx + 1] : null;
        const pnNav = document.createElement('nav');
        pnNav.className = 'prev-next';
        pnNav.innerHTML = `
          ${prev ? `<a href="${prev.href}" class="pn-link pn-prev">← ${prev.label}</a>` : '<span></span>'}
          <a href="/index.html" class="pn-link pn-home">Table of Contents</a>
          ${next ? `<a href="${next.href}" class="pn-link pn-next">${next.label} →</a>` : '<span></span>'}
        `;
        document.body.appendChild(pnNav);
      }
    }
  });
})();
