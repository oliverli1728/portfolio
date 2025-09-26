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

// Particle system with trail
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize(){
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function drawParticle(){
  ctx.clearRect(0,0,width,height);
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? scrollTop / docHeight : 0;
  const trackHeight = height - 160;
  const y = 80 + pct * trackHeight;
  const x = width/2 + Math.sin(pct * Math.PI * 2) * 60;

  // trail effect
  ctx.fillStyle = 'rgba(26,183,116,0.1)';
  ctx.fillRect(0,0,width,height);

  ctx.beginPath();
  ctx.arc(x, y, 12, 0, Math.PI*2);
  ctx.fillStyle = 'rgba(183,255,216,0.9)';
  ctx.shadowColor = 'rgba(26,183,116,0.7)';
  ctx.shadowBlur = 25;
  ctx.fill();
}

function animate(){
  drawParticle();
  requestAnimationFrame(animate);
}
animate();

// Fade-in on scroll
const faders = document.querySelectorAll('[data-fade]');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('in-view');
  });
},{ threshold:0.2 });
faders.forEach(el => io.observe(el));
