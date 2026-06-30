const header = document.querySelector('.site-header');
const glow = document.querySelector('.cursor-glow');
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

if (glow) {
  window.addEventListener('pointermove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 42));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 22);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.4 });

counters.forEach((el) => counterObserver.observe(el));

/* ============================================================
   PREMIUM 3D INTERACTIONS
   - Pointer-driven tilt + glare on cards
   - Hero parallax (floating cards / orbital ring / main frame)
   Respects prefers-reduced-motion and skips on touch/coarse pointers.
   ============================================================ */
const finePointer = window.matchMedia('(pointer: fine)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (finePointer && !reduceMotion) {
  // --- Card tilt + glare ---
  const tiltSelector = '.service-card, .work-card, .industry-card, .process-step, .quote-card, .contact-card, .portrait-card, .stat-row div';
  const tiltEls = document.querySelectorAll(tiltSelector);

  tiltEls.forEach((el) => {
    const maxTilt = el.matches('.work-card, .industry-card, .quote-card, .contact-card, .portrait-card') ? 7 : 5;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;   // 0..1
      const y = (e.clientY - rect.top) / rect.height;    // 0..1
      const ry = (x - 0.5) * (maxTilt * 2);
      const rx = (0.5 - y) * (maxTilt * 2);
      el.style.setProperty('--ry', ry.toFixed(2) + 'deg');
      el.style.setProperty('--rx', rx.toFixed(2) + 'deg');
      el.style.setProperty('--glare-x', (x * 100).toFixed(1) + '%');
      el.style.setProperty('--glare-y', (y * 100).toFixed(1) + '%');
    };

    const onLeave = () => {
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--rx', '0deg');
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave, { passive: true });
  });

  // --- Hero parallax (mouse position drives CSS vars on .hero) ---
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    const onHeroMove = (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;   // -1..1
      const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;    // -1..1
      heroVisual.style.setProperty('--px', px.toFixed(3));
      heroVisual.style.setProperty('--py', py.toFixed(3));
    };
    const onHeroLeave = () => {
      heroVisual.style.setProperty('--px', 0);
      heroVisual.style.setProperty('--py', 0);
    };
    heroVisual.addEventListener('pointermove', onHeroMove, { passive: true });
    heroVisual.addEventListener('pointerleave', onHeroLeave, { passive: true });
  }
}
