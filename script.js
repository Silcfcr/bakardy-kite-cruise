// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Header turns solid once the hero is behind it
const header = document.querySelector('.site-header');
new IntersectionObserver(([entry]) => {
  header.classList.toggle('solid', !entry.isIntersecting);
}, { threshold: 0.1 }).observe(document.querySelector('.hero'));

// Boat photo viewer
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
document.querySelectorAll('.rail button').forEach(b => {
  b.addEventListener('click', () => {
    lightboxImg.src = b.dataset.full;
    lightboxImg.alt = b.querySelector('img').alt;
    lightbox.showModal();
  });
});
lightbox.addEventListener('click', e => {
  if (e.target === lightbox || e.target === lightboxImg) lightbox.close();
});

// Clips play while they are on screen and stay muted. Tap or press a key to pause.
const clips = document.querySelectorAll('video.clip');
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  clips.forEach(v => v.setAttribute('controls', ''));
} else {
  const watch = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.play().catch(() => {});
      else e.target.pause();
    });
  }, { threshold: 0.35 });
  clips.forEach(v => {
    watch.observe(v);
    v.tabIndex = 0;
    const flip = () => (v.paused ? v.play() : v.pause());
    v.addEventListener('click', flip);
    v.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
    });
  });
}

// Cruise day steps reveal as they scroll into view
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('anim');
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.step').forEach(s => reveal.observe(s));
}
