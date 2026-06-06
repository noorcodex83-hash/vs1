const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');
const dots = document.querySelectorAll('.testimonial-dot');
const slides = document.querySelectorAll('.testimonial-slide');
let activeSlide = 0;

/* Smooth active nav highlighting */
const updateActiveNav = () => {
  const scrollPosition = window.scrollY + window.innerHeight / 3;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href*="${id}"]`);
    if (link) {
      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
};

/* Testimonial slider (fade transitions are CSS-driven) */
const showSlide = index => {
  slides.forEach((slide, idx) => slide.classList.toggle('active', idx === index));
  dots.forEach((dot, idx) => dot.classList.toggle('active', idx === index));
  activeSlide = index;
};

const nextSlide = () => {
  const nextIndex = (activeSlide + 1) % slides.length;
  showSlide(nextIndex);
};

/* Add smooth scrolling for nav links */
navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

dots.forEach(dot => {
  dot.addEventListener('click', () => showSlide(Number(dot.dataset.index)));
});

/* Header scrolled state */
const header = document.querySelector('.topbar');
const onScrollHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', () => { updateActiveNav(); onScrollHeader(); });

/* Reveal-on-scroll using IntersectionObserver */
const revealSelector = ['.hero-copy', '.visual-card', '.feature-card', '.property-card', '.tour-media', '.testimonial-slide', '.footer-copy', '.footer-form'];
const elems = document.querySelectorAll(revealSelector.join(', '));
elems.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

elems.forEach(el => revealObserver.observe(el));

/* Small play-button interaction (visual emphasis only) */
const playBtn = document.querySelector('.play-button');
if (playBtn) {
  playBtn.addEventListener('click', () => {
    playBtn.classList.add('clicked');
    setTimeout(() => playBtn.classList.remove('clicked'), 420);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
  onScrollHeader();
  showSlide(0);
  setInterval(nextSlide, 7000);
  // subtle headline shimmer: apply after layout to avoid flash
  const h = document.querySelector('.hero-copy h1');
  if (h) h.classList.add('shimmer');
});
