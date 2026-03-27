(() => {
  // ── Effective date & footer year ──────────────────────────────────────────
  const EFFECTIVE_DATE = 'March 27, 2026';

  document.getElementById('effective-date').textContent = EFFECTIVE_DATE;
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  // ── Back-to-top button ────────────────────────────────────────────────────
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Active TOC link on scroll ─────────────────────────────────────────────
  const sections  = Array.from(document.querySelectorAll('section[id]'));
  const tocLinks  = Array.from(document.querySelectorAll('.toc-link'));

  const HEADER_OFFSET = 90; // px — accounts for sticky header height

  function setActiveLink() {
    let current = '';

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= HEADER_OFFSET) {
        current = section.id;
      }
    }

    tocLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('active', isActive);
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink(); // run once on load

  // ── Section reveal on scroll (IntersectionObserver) ───────────────────────
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.08 }
  );

  sections.forEach(section => observer.observe(section));

  // Also reveal the hero immediately (not a <section>)
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.opacity = '1';
  }
})();
