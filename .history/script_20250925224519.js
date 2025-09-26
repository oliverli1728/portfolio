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

// Main particle: organic motion + glow illumination
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize(){
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let angle = 0;
function drawParticle(){
  ctx.clearRect(0,0,width,height);
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? scrollTop / docHeight : 0;

  const baseY = pct * (height - 200) + 100;
  angle += 0.02;
  const x = width/2 + (Math.sin(angle*1.3)+Math.sin(angle*0.7))*60;
  const y = baseY + Math.sin(angle*0.5)*40;

  const gradient = ctx.createRadialGradient(x,y,0,x,y,180);
  gradient.addColorStop(0,'rgba(26,183,116,0.25)');
  gradient.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,width,height);

  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI*2);
  ctx.fillStyle = 'rgba(183,255,216,0.9)';
  ctx.shadowColor = 'rgba(26,183,116,0.8)';
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

// Penrose particles emitter with organic drift
const penroseCanvas = document.getElementById('penroseParticles');
if(penroseCanvas){
  const pctx = penroseCanvas.getContext('2d');
  let pw, ph;
  function resizePenrose(){ pw = penroseCanvas.width = penroseCanvas.offsetWidth; ph = penroseCanvas.height = penroseCanvas.offsetHeight; }
  window.addEventListener('resize', resizePenrose); resizePenrose();

  const particles=[];
  function spawnParticle(){
    particles.push({x:pw/2, y:ph/2, vx:(Math.random()-0.5)*1.2, vy:-Math.random()*2-0.5, life:120});
  }

  function drawPenrose(){
    pctx.clearRect(0,0,pw,ph);
    particles.forEach((p,i)=>{
      p.x+=p.vx + Math.sin(p.life*0.1)*0.3;
      p.y+=p.vy;
      p.life--;
      pctx.beginPath();
      pctx.arc(p.x,p.y,2,0,Math.PI*2);
      pctx.fillStyle=`rgba(26,183,116,${p.life/120})`;
      pctx.fill();
      if(p.life<=0) particles.splice(i,1);
    });
    if(Math.random()<0.4) spawnParticle();
    requestAnimationFrame(drawPenrose);
  }
  drawPenrose();
}
