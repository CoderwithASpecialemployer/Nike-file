/* ---------- Smooth‑Scroll ---------- */
document.querySelectorAll('.nav a[href^="#"]').forEach(link=>{
  link.onclick = e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
            .scrollIntoView({behavior: 'smooth'});
  };
});

/* ---------- Scroll‑Reveal ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(ent => {
    if (ent.isIntersecting) {
      ent.target.classList.add('active');
      revealObserver.unobserve(ent.target);
    }
  });
}, {threshold: 0.25});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Animated Stats ---------- */
function animateNum(el) {
  const target = +el.dataset.target;
  const inc    = Math.ceil(target / 60);   // ~1s animation
  let cur = 0;
  const tick = setInterval(() => {
    cur += inc;
    if (cur >= target) { cur = target; clearInterval(tick); }
    el.textContent = cur;
  }, 16);
}
const statsSection = document.getElementById('stats');
const statsObs = new IntersectionObserver(e => {
  if (e[0].isIntersecting) {
    statsSection.querySelectorAll('.num').forEach(animateNum);
    statsObs.unobserve(statsSection);
  }
}, {threshold: 0.5});
statsObs.observe(statsSection);

/* ---------- Back‑to‑Top ---------- */
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
});
toTop.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});

/* ---------- Dark / Light Toggle ---------- */
const body   = document.body;
const modeBtn = document.getElementById('modeBtn');
modeBtn.onclick = () => {
  body.classList.toggle('light');
  modeBtn.textContent = body.classList.contains('light') ? '☀️' : '🌙';
};
