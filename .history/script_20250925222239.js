// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
if (hamburger){
  hamburger.addEventListener('click', () => {
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    hamburger.setAttribute('aria-expanded', String(!open));
  });
}

// Year in footer
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

// Scroll progress particle along left rail
(function(){
  const dot = document.getElementById('progressDot');
  if(!dot) return;

  const clamp = (v,min,max)=>Math.max(min,Math.min(max,v));

  const update = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? scrollTop / docHeight : 0; // 0..1
    const trackTop = 80;                        // px from top
    const trackBottom = window.innerHeight - 80; // px from bottom
    const y = trackTop + pct * (trackBottom - trackTop);
    dot.style.transform = `translateY(${clamp(y, trackTop, trackBottom)}px)`;
    // slight horizontal shimmer
    dot.style.filter = `drop-shadow(0 0 ${6 + 10*pct}px rgba(26,183,116,.6))`;
  };

  update();
  window.addEventListener('scroll', update, {passive:true});
  window.addEventListener('resize', update);
})();

// Intersection-based reveal animations
const revealTargets = document.querySelectorAll('[data-rail]');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in-view'); }
  });
},{ threshold: 0.15 });
revealTargets.forEach(el=>io.observe(el));
