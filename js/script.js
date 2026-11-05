window.addEventListener('load',()=>setTimeout(()=>{const l=document.querySelector('.loader-wrapper');l.style.opacity=0;setTimeout(()=>l.style.display='none',500)},1200));
const hd=document.querySelector('.header');
window.addEventListener('scroll',()=>hd.classList.toggle('scrolled',scrollY>60));
const nav=document.querySelector('.nav');
document.querySelector('.mobile-menu-btn').onclick=()=>nav.classList.toggle('open');
nav.querySelectorAll('a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
// typewriter
const lines=['Java Backend Developer','Building REST APIs with Spring Boot','MoneyManager | CineStage | SmartCart','Open to Java Backend Internships'],t=document.getElementById('typed');
let li=0,ci=0,del=false;
(function type(){const s=lines[li];t.textContent=s.slice(0,ci);
    if(!del&&ci===s.length){del=true;return setTimeout(type,1500)}
    if(del&&ci===0){del=false;li=(li+1)%lines.length}
    ci+=del?-1:1;setTimeout(type,del?28:65)})();
// projects slideshow (2 cards at a time, infinite loop) - must run before the row highlighter below
(function(){
    const track=document.querySelector('.slider-track');if(!track)return;
    const orig=[...track.children],n=orig.length;if(n<2)return;
    const DIR='left'; // 'right' = cards move left to right, 'left' = right to left
    const GAP_MS=4500,SLIDE_MS=900;
    for(let k=0;k<2;k++)orig.forEach(c=>{const x=c.cloneNode(true);x.setAttribute('aria-hidden','true');x.querySelectorAll('a').forEach(a=>a.tabIndex=-1);track.appendChild(x)});
    let p=n,timer=null;
    const stepPx=()=>track.children[0].offsetWidth+(parseFloat(getComputedStyle(track).columnGap)||0);
    const go=(anim)=>{track.style.transition=anim?'transform '+SLIDE_MS+'ms cubic-bezier(.65,0,.35,1)':'none';track.style.transform='translateX('+(-p*stepPx())+'px)'};
    go(false);
    track.addEventListener('transitionend',e=>{if(e.target!==track)return;if(p<=0||p>=2*n){p=n;go(false)}});
    const next=()=>{p+=DIR==='right'?-1:1;go(true)};
    const play=()=>{if(!timer&&!matchMedia('(prefers-reduced-motion:reduce)').matches)timer=setInterval(next,GAP_MS)};
    const pause=()=>{clearInterval(timer);timer=null};
    const box=track.parentElement;
    box.addEventListener('mouseenter',pause);box.addEventListener('mouseleave',play);
    box.addEventListener('focusin',pause);box.addEventListener('focusout',play);
    document.addEventListener('visibilitychange',()=>document.hidden?pause():play());
    window.addEventListener('resize',()=>go(false));
    play();
})();
// lit chips & rows
const pick=(sel)=>{const a=document.querySelectorAll(sel);if(!a.length)return;a.forEach(x=>x.classList.remove('on'));a[Math.floor(Math.random()*a.length)].classList.add('on')};
setInterval(()=>pick('.chip'),900);
document.querySelectorAll('.project-card').forEach(c=>{let i=0;const r=c.querySelectorAll('.trow');setInterval(()=>{r.forEach(x=>x.classList.remove('on'));r[i++%r.length].classList.add('on')},1400)});