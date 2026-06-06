const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');
const dots = document.querySelectorAll('.testimonial-dot');
const slides = document.querySelectorAll('.testimonial-slide');
let activeSlide = 0;

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

const showSlide = index => {
  slides.forEach((slide, idx) => slide.classList.toggle('active', idx === index));
  dots.forEach((dot, idx) => dot.classList.toggle('active', idx === index));
  activeSlide = index;
};

const nextSlide = () => {
  const nextIndex = (activeSlide + 1) % slides.length;
  showSlide(nextIndex);
};

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

dots.forEach(dot => {
  dot.addEventListener('click', () => showSlide(Number(dot.dataset.index)));
});

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
  showSlide(0);
  setInterval(nextSlide, 7000);
});
