// Tab switching with deep-link support
const tabs = document.querySelectorAll('.tab-link');
const contents = document.querySelectorAll('.tab-content');

function activateTab(id){
  tabs.forEach(t => t.classList.remove('active'));
  contents.forEach(c => c.classList.remove('active'));
  const targetTab = document.querySelector(`.tab-link[href='${id}']`);
  const targetContent = document.querySelector(id);
  if(targetTab && targetContent){
    targetTab.classList.add('active');
    targetContent.classList.add('active');
    window.scrollTo({ top:0, behavior:'smooth' });
  }
}

function initTabs(){
  tabs.forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault();
      const id = tab.getAttribute('href');
      activateTab(id);
      history.pushState(null, '', id);
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash || '#myself';
  activateTab(hash);
  initTabs();
  document.getElementById('year').textContent = new Date().getFullYear();
});

window.addEventListener('popstate', () => {
  const hash = window.location.hash || '#myself';
  activateTab(hash);
});

// Particle curved motion
const particle = document.getElementById('particle');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? scrollTop / docHeight : 0;
  const trackHeight = window.innerHeight - 160;
  const y = 80 + pct * trackHeight;
  const xOffset = Math.sin(pct * Math.PI * 2) * 40; // sinusoidal curve
  particle.style.transform = `translate(calc(-50% + ${xOffset}px), ${y}px)`;
});

// Fade-in on scroll
const faders = document.querySelectorAll('[data-fade]');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('in-view');
  });
},{ threshold:0.2 });
faders.forEach(el => io.observe(el));
