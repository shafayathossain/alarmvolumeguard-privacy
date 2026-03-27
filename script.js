(() => {
  // ── Config ─────────────────────────────────────────────────────────────────
  const EFFECTIVE_DATE = 'March 27, 2026';

  // ── Date stamps ────────────────────────────────────────────────────────────
  document.getElementById('effective-date').textContent = EFFECTIVE_DATE;
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  // ── Back-to-top ────────────────────────────────────────────────────────────
  const btt = document.getElementById('btt');

  window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── Active TOC link ────────────────────────────────────────────────────────
  const HEADER_H  = 72; // px — sticky header + breathing room
  const cards     = Array.from(document.querySelectorAll('.card[id]'));
  const tocLinks  = Array.from(document.querySelectorAll('.toc-link'));

  function syncToc() {
    let active = '';
    for (const card of cards) {
      if (card.getBoundingClientRect().top <= HEADER_H) active = card.id;
    }
    tocLinks.forEach(l =>
      l.classList.toggle('active', l.getAttribute('href') === `#${active}`)
    );
  }

  window.addEventListener('scroll', syncToc, { passive: true });
  syncToc();

  // ── Card reveal on scroll ──────────────────────────────────────────────────
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
  );

  cards.forEach((card, i) => {
    // Stagger delay so cards cascade in
    card.style.transitionDelay = `${i * 40}ms`;
    io.observe(card);
  });

  // ── Smooth TOC clicks with offset ─────────────────────────────────────────
  tocLinks.forEach(link => {
    link.addEventListener('click', e => {
      const id     = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - HEADER_H;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // ── Hero CTA smooth scroll ─────────────────────────────────────────────────
  document.querySelector('.hero-cta')?.addEventListener('click', e => {
    e.preventDefault();
    const target = document.getElementById('overview');
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY - HEADER_H;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });

})();
