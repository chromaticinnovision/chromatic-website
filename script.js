const header = document.querySelector('.site-header');
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

let scrollTicking = false;
const sectionLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
const navSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const updateScrollState = () => {
  const y = window.scrollY || 0;
  header?.classList.toggle('scrolled', y > 40);

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
