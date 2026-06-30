const header = document.querySelector('.site-header');
const glow = document.querySelector('.cursor-glow');
const year = document.querySelector('#year');
const root = document.documentElement;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (year) year.textContent = new Date().getFullYear();

let scrollTicking = false;
const sectionLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
const navSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const updateScrollState = () => {
  const y = window.scrollY || 0;
  header?.classList.toggle('scrolled', y > 40);
  root.style.setProperty('--scroll', String(Math.round(y % 620)));

  let activeId = '';
  navSections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.38) activeId = section.id;
  });
  sectionLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${activeId}`);
  });

  scrollTicking = false;
};

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollState);
    scrollTicking = true;
  }
}, { passive: true });
updateScrollState();

if (glow && finePointer && !reduceMotion) {
  window.addEventListener('pointermove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

document
  .querySelectorAll('.service-card, .industry-card, .work-card, .process-step, .mission-cards article, .about-focus-grid article')
  .forEach((el, index) => {
    el.style.setProperty('--reveal-delay', `${Math.min((index % 6) * 0.065, 0.34)}s`);
  });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.14, rootMargin: '0px 0px -70px 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count || 0);
    const duration = 1150;
    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) window.requestAnimationFrame(animate);
    };

    window.requestAnimationFrame(animate);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.45 });

counters.forEach((el) => counterObserver.observe(el));

if (finePointer && !reduceMotion) {
  const tiltSelector = '.service-card, .work-card, .industry-card, .process-step, .quote-card, .contact-card, .portrait-card';
  document.querySelectorAll(tiltSelector).forEach((el) => {
    const maxTilt = el.matches('.work-card, .industry-card, .quote-card, .contact-card, .portrait-card') ? 6 : 4.5;

    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      el.style.setProperty('--ry', `${((x - 0.5) * maxTilt * 2).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${((0.5 - y) * maxTilt * 2).toFixed(2)}deg`);
      el.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`);
      el.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`);
    }, { passive: true });

    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--rx', '0deg');
    }, { passive: true });
  });

  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    heroVisual.addEventListener('pointermove', (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const px = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const py = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      heroVisual.style.setProperty('--px', px.toFixed(3));
      heroVisual.style.setProperty('--py', py.toFixed(3));
    }, { passive: true });

    heroVisual.addEventListener('pointerleave', () => {
      heroVisual.style.setProperty('--px', '0');
      heroVisual.style.setProperty('--py', '0');
    }, { passive: true });
  }

  document.querySelectorAll('.btn, .nav-cta').forEach((el) => {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.08}px, ${y * 0.16}px)`;
    }, { passive: true });

    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    }, { passive: true });
  });
}
