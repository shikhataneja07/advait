/* ADVAIT — production bundle. Blocks isolated (try/catch) to mirror the
   original separate <script> tags: a failure in one never blocks another. */

/* --- core (assets, galleries, panels, animations) --- */
try{
if(window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
(function(){
var IMGDIR='assets/images/';
var ASSETS = {
  logo:   ['assets/icons/advait logo 02.svg','assets/icons/Advait logo 02.svg','assets/icons/Advait_logo_02.svg','assets/icons/advait-logo-02.svg','assets/icons/advait logo 01.svg','assets/icons/Advait logo 01.svg','assets/icons/Advait_logo_01.svg'],
  hero:   ['advait hero image.webp','advait-hero-image.webp','advait_hero_image.webp','advait hero image.jpg'],
  studio1:['advait new 1.webp','advait-new-1.webp','advait_new_1.webp'],
  studio2:['advait new 2.webp','advait-new-2.webp','advait_new_2.webp'],
  studio3:['advait new 3.webp','advait-new-3.webp','advait_new_3.webp'],
  studio4:['advait new 4.webp','advait-new-4.webp','advait_new_4.webp'],
  studio5:['advait new 5.webp','advait-new-5.webp','advait_new_5.webp'],
  studio6:['advait new 6.webp','advait-new-6.webp','advait_new_6.webp']
};
for(var i=0;i<=20;i++){
  var n = i===0 ? 'girikunj new' : 'girikunj new '+i;
  ASSETS['g'+(i===0?'0':i)] = [n+'.webp', n.replace(/ /g,'-')+'.webp', n.replace(/ /g,'_')+'.webp', n+'.jpg'];
}
function projAssets(pfx, base, count){
  for(var i=0;i<=count;i++){
    var suf = i===0 ? '' : '_'+i;
    ASSETS[pfx+i] = [
      base+suf+'.webp',
      base.replace(/ /g,'_')+suf+'.webp',
      base.replace(/ /g,'-')+(i===0?'':'-'+i)+'.webp',
      base+suf+'.jpg'
    ];
  }
}
projAssets('shv','shivarti house of mewar',34);
projAssets('aik','aikyam',10);
projAssets('cc','crystal couture',2);
projAssets('imp','display centre for imperial impex by advait',11);
projAssets('dz','office of dazzle marbles',8);
projAssets('don','dona kitchen store',27);
projAssets('jito','jito udaipur office',14);
projAssets('ern','earthen nest',26);
projAssets('nav','navlakha resort',7);
projAssets('meh','mehta residency',26);
projAssets('cas','modern casa',8);
projAssets('sam','samgrathanam',6);
projAssets('tig','the luxury tiger hotel',30);
ASSETS['founder']=['founder and principal designer.webp','founder and principal designer.jpg','founder-and-principal-designer.webp','founder_and_principal_designer.webp'];

/* Imperial Impex photos delivered as _3.._11 (base/_1/_2 not supplied);
   map the 9 gallery slots onto the 9 real files. */
(function(){var b='display centre for imperial impex by advait';
  for(var i=0;i<9;i++){ ASSETS['imp'+i]=[b+'_'+(i+3)+'.webp']; }
})();
function resolve(img, list, idx){
  idx = idx||0;
  if(idx>=list.length){
    if(img.closest('figure')) img.closest('figure').style.display='none';
    else img.style.display='none';
    return;
  }
  img.onerror = function(){ resolve(img, list, idx+1); };
  var p = list[idx];
  img.src = encodeURI(p.indexOf('/') !== -1 ? p : IMGDIR + p); /* absolute-ish entries (e.g. assets/icons/...) pass through as-is */
}
document.querySelectorAll('[data-asset]').forEach(function(img){
  var key = img.getAttribute('data-asset');
  if(ASSETS[key]) resolve(img, ASSETS[key]);
});

/* detail panels: generic opener for studio and every project */
(function(){
  function openPanel(p){ if(!p) return; document.querySelectorAll('.spanel.open').forEach(function(o){ if(o!==p) o.classList.remove('open'); }); p.classList.add('open'); document.body.classList.add('panel-open'); p.scrollTop=0; }
  function closePanel(p){ if(!p) return; p.classList.remove('open'); document.body.classList.remove('panel-open'); }
  document.querySelectorAll('[data-open]').forEach(function(btn){
    function go(){ openPanel(document.getElementById(btn.getAttribute('data-open'))); }
    btn.addEventListener('click', go);
    btn.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); go(); } });
  });
  document.addEventListener('click', function(e){
    var t=e.target; if(!t||!t.closest) return;
    var c=t.closest('.close');
    if(c && c.closest('.spanel')){ e.preventDefault(); closePanel(c.closest('.spanel')); }
  });
  addEventListener('keydown', function(e){ if(e.key==='Escape'){ var o=document.querySelector('.spanel.open'); if(o) closePanel(o); } });
})();

/* projects: chaptered category navigation */
(function(){
  var links=[].slice.call(document.querySelectorAll('.catlink')),
      panes=[].slice.call(document.querySelectorAll('.cat-pane'));
  if(!links.length) return;
  function show(cat){
    links.forEach(function(l){ l.classList.toggle('is-on', l.getAttribute('data-cat')===cat); });
    panes.forEach(function(p){
      var on = p.getAttribute('data-pane')===cat;
      p.classList.toggle('is-active', on);
      if(on){
        var cards=p.querySelectorAll('.ecard');
        cards.forEach(function(c,i){ c.style.animation='none'; void c.offsetWidth; c.style.animation=''; c.style.animationDelay=(i*0.06)+'s'; });
      }
    });
  }
  links.forEach(function(l){
    l.addEventListener('click', function(){ show(l.getAttribute('data-cat')); });
    l.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); show(l.getAttribute('data-cat')); } });
  });
})();

/* projects: 'show all' reveal inside the All pane */
(function(){
  var btn=document.getElementById('showMoreAll');
  if(!btn) return;
  btn.addEventListener('click', function(){
    var pane=btn.closest('.cat-pane');
    if(!pane) return;
    pane.classList.add('revealed');
    var extras=[].slice.call(pane.querySelectorAll('.ecard.is-extra'));
    extras.forEach(function(c,i){ c.style.animation='none'; void c.offsetWidth; c.style.animation=''; c.style.animationDelay=(i*0.05)+'s'; });
  });
})();

/* hero sequence: waits for the image */
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
/* the WhatsApp button must never fail to appear */
setTimeout(function(){ document.getElementById('wa-float').classList.add('show'); }, 4000);
function heroReady(cb){
  var img = document.getElementById('heroImg');
  var done=false, go=function(){ if(!done){done=true;cb();} };
  if(img.complete && img.naturalWidth) return go();
  img.addEventListener('load', go);
  img.addEventListener('error', go);
  setTimeout(go, 3500);
}
heroReady(function(){
  var L = document.getElementById('loader');
  var heroImg = document.getElementById('heroImg');
  var navEl = document.getElementById('nav');
  var hEl = document.getElementById('heroH');

  function showAll(){
    var w=document.getElementById('heroWrap'); if(w) w.style.clipPath='inset(0 0 0 0)';
    if(heroImg) heroImg.style.transform='none';
    var sc=document.getElementById('heroScrim'); if(sc) sc.style.opacity=1;
    var gl=document.getElementById('goldLine'); if(gl) gl.style.width='90px';
    if(hEl) hEl.style.opacity=1;
    ['heroS','heroC'].forEach(function(id){var e=document.getElementById(id); if(e){e.style.opacity=1;e.style.transform='none';}});
    if(navEl) navEl.style.opacity=1;
    var wa=document.getElementById('wa-float'); if(wa) wa.classList.add('show');
  }

  if(reduce || !window.gsap){ if(L) L.remove(); showAll(); return; }
  var guard = setTimeout(showAll, 7000);

  var words=null, splitOK=false;
  try{ if(window.SplitType){ words=new SplitType(hEl,{types:'lines,words'}).words; splitOK=!!(words&&words.length); } }catch(e){}
  if(!splitOK){
    var txt=hEl.textContent; hEl.textContent='';
    words=txt.split(' ').map(function(wd){ var s=document.createElement('span'); s.className='wd2'; s.textContent=wd; hEl.appendChild(s); hEl.appendChild(document.createTextNode(' ')); return s; });
  }
  gsap.set(hEl,{opacity:1});
  gsap.set(words, splitOK ? {yPercent:115,opacity:0} : {y:26,opacity:0});

  gsap.fromTo(heroImg,{scale:1.09},{scale:1.0,duration:13,ease:'power2.out',delay:1.5});

  var tl = gsap.timeline({defaults:{ease:'power3.out'}, onComplete:function(){ clearTimeout(guard); }});
  tl.to(L, {yPercent:-100, duration:1.1, ease:'power4.inOut', delay:.7})
    .set(L, {display:'none'})
    .to('#heroWrap', {clipPath:'inset(0% 0 0 0)', duration:1.5}, '-=.5')
    .to('#heroScrim', {opacity:1, duration:1.9, ease:'power1.inOut'}, '-=1.15')
    .to('#goldLine', {width:'90px', duration:1.2, ease:'power2.inOut'}, '-=1.05')
    .to(words, {yPercent:0, y:0, opacity:1, duration:1.15, stagger:.06}, '-=.55')
    .to('#heroS', {opacity:1, duration:1.1}, '-=.45')
    .to(navEl, {opacity:1, duration:1.4, ease:'power2.out'}, '-=.35')
    .to('#heroC', {opacity:1, duration:1.0}, '-=.8')
    .add(function(){ var wa=document.getElementById('wa-float'); if(wa) wa.classList.add('show'); }, '-=.4');

  if(matchMedia('(hover:hover) and (pointer:fine)').matches){
    gsap.to(heroImg, { scale:.96, ease:'none',
      scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:true } });
    gsap.to('.hero .centre', { yPercent:-8, opacity:.5, ease:'none',
      scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:true } });
  }

  if(matchMedia('(hover:hover) and (pointer:fine)').matches){
    var hero=document.querySelector('.hero'), tx=0,ty=0,cx=0,cy=0,raf=null;
    function loop(){
      cx+=(tx-cx)*0.08; cy+=(ty-cy)*0.08;
      gsap.set(heroImg,{x:cx,y:cy});
      if(Math.abs(tx-cx)>.15||Math.abs(ty-cy)>.15){ raf=requestAnimationFrame(loop); }
      else { gsap.set(heroImg,{x:tx,y:ty}); raf=null; }
    }
    hero.addEventListener('mousemove',function(e){
      var r=hero.getBoundingClientRect();
      tx=((e.clientX-r.left)/r.width-0.5)*8;
      ty=((e.clientY-r.top)/r.height-0.5)*8;
      if(!raf) raf=requestAnimationFrame(loop);
    });
    hero.addEventListener('mouseleave',function(){ tx=0; ty=0; if(!raf) raf=requestAnimationFrame(loop); });
  }
});

/* nav: white-on-hero, charcoal after */
var nav = document.getElementById('nav');
addEventListener('scroll', function(){
  var past = scrollY > innerHeight*0.72;
  nav.classList.toggle('scrolled', past);
  nav.classList.toggle('on-hero', !past);
}, {passive:true});

/* scroll reveals */
var io = new IntersectionObserver(function(es){
  es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
(function(){
  function reveal(el,dir){ if(el.classList.contains('rv')) return; el.classList.add('rv'); if(dir) el.classList.add(dir); io.observe(el); }
  document.querySelectorAll('#projects .pane-head, .people-head, .testi .eyebrow, .testi h2, .testi-trust, .materials h2').forEach(function(e){ reveal(e); });
  document.querySelectorAll('.edito-grid').forEach(function(g){ g.querySelectorAll('.ecard').forEach(function(c,i){ reveal(c); c.style.transitionDelay=(Math.min(i,6)*80)+'ms'; }); });
  document.querySelectorAll('#people .portrait').forEach(function(e){ reveal(e,'rv-l'); });
  document.querySelectorAll('#people .pname').forEach(function(c,i){ reveal(c,'rv-r'); c.style.transitionDelay=(i*120)+'ms'; });
  document.querySelectorAll('.contact .inner > *').forEach(function(e,i){ reveal(e); e.style.transitionDelay=(i*90)+'ms'; });
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(window.gsap && window.ScrollTrigger && !rm && document.querySelector('.press-card')){
    gsap.set('.press-card',{opacity:0,y:30});
    ScrollTrigger.batch('.press-card',{ start:'top 86%', onEnter:function(batch){
      gsap.to(batch,{opacity:1,y:0,duration:.9,stagger:.12,ease:'power3.out',overwrite:true,onComplete:function(){ gsap.set(batch,{clearProps:'transform,opacity'}); }});
    }});
  }
  if(window.gsap && window.ScrollTrigger && !rm && document.querySelector('.testi-track .tcard')){
    document.querySelectorAll('.testi-track .tcard').forEach(function(c,i){ gsap.set(c,{opacity:0,y:30,x:(i%2?44:-44)}); });
    ScrollTrigger.batch('.testi-track .tcard',{ start:'top 90%', onEnter:function(batch){
      gsap.to(batch,{opacity:1,y:0,x:0,duration:.95,stagger:.12,ease:'power3.out',overwrite:true,onComplete:function(){ gsap.set(batch,{clearProps:'transform,opacity'}); }});
    }});
  }
  /* fail-safe: nothing GSAP-hid may stay invisible if ScrollTrigger misfires (iOS) */
  if(window.gsap){ addEventListener('load',function(){ setTimeout(function(){
    document.querySelectorAll('.press-card,.testi-track .tcard').forEach(function(el){
      if(parseFloat(getComputedStyle(el).opacity)<0.05) gsap.set(el,{opacity:1,x:0,y:0,clearProps:'transform'});
    });
  },4500); }); }
})();

/* centred brand: colour arrives, the jharokha draws itself */
var mark=document.getElementById('devMark'), halo=document.getElementById('halo'),
    line=document.getElementById('brandLine'), sec=document.getElementById('brandMoment');
var motifs=[].slice.call(document.querySelectorAll('.brand-moment .motif'));
function lerp(a,b,t){return a+(b-a)*t}
function hex(c){return '#'+c.map(function(v){return Math.round(v).toString(16).padStart(2,'0')}).join('')}
var GREY=[0x97,0x89,0x81], CLAY=[0x72,0x45,0x3A];
var mandala=document.getElementById('mandala'), floats=document.getElementById('floats');
function onScroll(){
  if(reduce) return;
  var r = sec.getBoundingClientRect();
  var mid = r.top + r.height/2 - innerHeight/2;
  var t = Math.max(0, Math.min(1, 1 - Math.abs(mid)/(innerHeight*0.6)));
  mark.style.color = hex([lerp(GREY[0],CLAY[0],t), lerp(GREY[1],CLAY[1],t), lerp(GREY[2],CLAY[2],t)]);
  mark.style.transform = 'scale('+lerp(0.96,1,t)+')';
  halo.style.opacity = t;
  line.style.opacity = t;
  if(mandala) mandala.style.opacity = t*0.5;
  if(floats) floats.style.opacity = t;
  motifs.forEach(function(m,i){
    var mt = Math.max(0,Math.min(1,(t-0.35-0.08*i)/0.4));
    m.style.opacity = mt;
    m.style.transform = 'scale('+lerp(0.4,1,mt)+') rotate('+lerp(-90,0,mt)+'deg)';
  });
}
addEventListener('scroll', onScroll, {passive:true});
addEventListener('resize', onScroll);
onScroll();
})();
}catch(e){ if(window.console) console.warn('[advait] core (assets, galleries, panels, animations) error:',e); }

/* --- ambient audio: start immediately on load (with gesture fallback) --- */
try{
(function(){
  var a=document.getElementById('bgm');
  if(!a) return;
  a.src="assets/audio/advait-ambient-trimmed.mp3";
  /* iOS/Safari ignores programmatic volume; detect so we can skip a fade that
     can never reach its target on those devices. */
  var canVol=false; try{ a.volume=0.5; canVol=Math.abs(a.volume-0.5)<0.01; }catch(e){} try{ a.volume=1; }catch(e){}
  var fadeT, started=false;
  function fade(to){
    clearInterval(fadeT);
    if(!canVol) return;
    var steps=0;
    fadeT=setInterval(function(){
      var d=to-a.volume; steps++;
      if(Math.abs(d)<0.03 || steps>28){ a.volume=to; clearInterval(fadeT); }
      else a.volume=Math.max(0,Math.min(1,a.volume+d*0.15));
    },40);
  }
  function start(){
    if(started) return;
    if(canVol) a.volume=0;
    var p=a.play();
    if(p&&p.then){
      p.then(function(){ started=true; removeGestureListeners(); fade(0.32); })
       .catch(function(){ /* autoplay blocked — wait for a user gesture (listeners below) */ });
    } else {
      /* older browsers: no promise returned, assume it started */
      started=true; removeGestureListeners(); fade(0.32);
    }
  }
  /* Most browsers block sound until the user interacts with the page, so the
     4.5s timer may be refused. These listeners retry on the first gesture. */
  function onGesture(){ start(); }
  var evts=['pointerdown','touchstart','keydown','scroll'];
  function removeGestureListeners(){
    evts.forEach(function(ev){ window.removeEventListener(ev,onGesture); });
  }
  evts.forEach(function(ev){ window.addEventListener(ev,onGesture,{passive:true}); });
  setTimeout(start, 0);
})();
}catch(e){ if(window.console) console.warn('[advait] ambient audio error:',e); }

/* --- finale --- */
try{
(function(){
  var track=document.getElementById('testiTrack'), prev=document.getElementById('testiPrev'), next=document.getElementById('testiNext');
  if(!track||!prev||!next) return;
  function step(){ var c=track.querySelectorAll('.tcard'); return c.length>1 ? (c[1].offsetLeft-c[0].offsetLeft) : (c[0]?c[0].offsetWidth:track.clientWidth); }
  function upd(){ var max=track.scrollWidth-track.clientWidth-2; prev.disabled=track.scrollLeft<=2; next.disabled=track.scrollLeft>=max; }
  prev.addEventListener('click',function(){ track.scrollBy({left:-step(),behavior:'smooth'}); });
  next.addEventListener('click',function(){ track.scrollBy({left:step(),behavior:'smooth'}); });
  track.addEventListener('scroll',upd,{passive:true});
  window.addEventListener('resize',upd);
  upd();
})();
}catch(e){ if(window.console) console.warn('[advait] finale error:',e); }

/* ============================================================
   ANIMATION + INTERACTION UPGRADE — isolated modules.
   ============================================================ */

/* --- mobile hamburger menu (robust; no GSAP dependency) --- */
try{
(function(){
  var toggle=document.getElementById('navToggle'), menu=document.getElementById('mobileMenu');
  if(!toggle||!menu) return;
  var links=[].slice.call(menu.querySelectorAll('a')), lastFocus=null;
  function open(){
    document.body.classList.add('menu-open'); menu.classList.add('open'); toggle.classList.add('on');
    toggle.setAttribute('aria-expanded','true'); toggle.setAttribute('aria-label','Close menu');
    menu.setAttribute('aria-hidden','false');
    if(window.__lenis && window.__lenis.stop) window.__lenis.stop();
    lastFocus=document.activeElement; setTimeout(function(){ if(links[0]) links[0].focus(); },60);
  }
  function close(){
    document.body.classList.remove('menu-open'); menu.classList.remove('open'); toggle.classList.remove('on');
    toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Open menu');
    menu.setAttribute('aria-hidden','true');
    if(window.__lenis && window.__lenis.start) window.__lenis.start();
    if(lastFocus && lastFocus.focus) lastFocus.focus();
  }
  toggle.addEventListener('click',function(){ toggle.classList.contains('on')?close():open(); });
  links.forEach(function(a){ a.addEventListener('click',close); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape' && toggle.classList.contains('on')) close(); });
  window.addEventListener('resize',function(){ if(innerWidth>820 && toggle.classList.contains('on')) close(); });
})();
}catch(e){ if(window.console) console.warn('[advait] menu error:',e); }

/* --- nav hide on scroll-down, show on scroll-up (below hero only) --- */
try{
(function(){
  var navEl=document.getElementById('nav'); if(!navEl) return;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  var last=window.scrollY||0, ticking=false, T=6;
  function upd(){
    var y=window.scrollY||0;
    if(document.body.classList.contains('menu-open')){ navEl.classList.remove('nav-up'); last=y; ticking=false; return; }
    if(y>last+T && y>innerHeight*0.9){ navEl.classList.add('nav-up'); }
    else if(y<last-T || y<innerHeight*0.6){ navEl.classList.remove('nav-up'); }
    last=y; ticking=false;
  }
  addEventListener('scroll',function(){ if(!ticking){ requestAnimationFrame(upd); ticking=true; } },{passive:true});
})();
}catch(e){ if(window.console) console.warn('[advait] navhide error:',e); }

/* --- extra reveals: clip-path images + divider scaleX (fail-open, no GSAP) --- */
try{
(function(){
  var els=[].slice.call(document.querySelectorAll('.reveal-img,.animrule'));
  if(!els.length) return;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches) return; /* leave visible (CSS default) */
  function reveal(el){ el.classList.add('in'); }
  els.forEach(function(el){ el.classList.add('armed'); }); /* hide via JS; if JS had failed, images stay visible */
  if(!('IntersectionObserver' in window)){ els.forEach(reveal); return; }
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ reveal(e.target); io.unobserve(e.target);} }); },{threshold:0,rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(el){ io.observe(el); });
  /* safety net 1 — reveal anything whose top has entered the viewport (backs up the observer) */
  function sweep(){ for(var i=0;i<els.length;i++){ var el=els[i]; if(el.classList.contains('in'))continue; if(el.getBoundingClientRect().top < innerHeight*0.92){ reveal(el); io.unobserve(el);} } }
  addEventListener('scroll',sweep,{passive:true}); sweep();
  /* safety net 2 — nothing may ever stay hidden */
  addEventListener('load',function(){ setTimeout(function(){ els.forEach(reveal); },4000); });
})();
}catch(e){ if(window.console) console.warn('[advait] reveal2 error:',e); }

/* --- word-split heading reveals: rise + blur->sharp (non-panel headings) --- */
try{
(function(){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  if(!('IntersectionObserver' in window)) return;
  var heads=[].slice.call(document.querySelectorAll('h2:not(.pd-title)'));
  if(!heads.length) return;
  function split(h){
    if(h.dataset.hsplit) return; h.dataset.hsplit='1';
    var frag=document.createDocumentFragment();
    [].slice.call(h.childNodes).forEach(function(n){
      if(n.nodeType===3){
        n.textContent.split(/(\s+)/).forEach(function(p){
          if(p==='') return;
          if(/^\s+$/.test(p)) frag.appendChild(document.createTextNode(p));
          else { var s=document.createElement('span'); s.className='hw'; s.textContent=p; frag.appendChild(s); }
        });
      } else { frag.appendChild(n.cloneNode(true)); }
    });
    h.innerHTML=''; h.appendChild(frag); h.classList.add('hsplit');
    [].slice.call(h.querySelectorAll('.hw')).forEach(function(w,i){ w.style.transitionDelay=(i*0.05)+'s'; });
  }
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }); },{threshold:.2});
  heads.forEach(function(h){ split(h); io.observe(h); });
})();
}catch(e){ if(window.console) console.warn('[advait] hsplit error:',e); }

/* --- Lenis smooth scroll (desktop, non-touch, non-reduced-motion; graceful) --- */
try{
(function(){
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var coarse=matchMedia('(hover:none),(pointer:coarse)').matches;
  if(reduce || coarse || !window.Lenis) return;
  var lenis=new Lenis({lerp:0.09});
  window.__lenis=lenis;
  function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  if(window.ScrollTrigger){ lenis.on('scroll', ScrollTrigger.update); if(window.gsap) gsap.ticker.lagSmoothing(0); }
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var id=a.getAttribute('href'); if(!id||id.length<2) return;
      var t=document.querySelector(id); if(!t) return;
      e.preventDefault(); lenis.scrollTo(t,{offset:-8});
    });
  });
})();
}catch(e){ if(window.console) console.warn('[advait] lenis error:',e); }

/* --- stats: staggered count-up on scroll + hover replay (interactive) --- */
try{
(function(){
  var stats=document.getElementById('stats');
  if(!stats) return;
  var nums=[].slice.call(stats.querySelectorAll('.stat-num[data-count]'));
  if(!nums.length) return;
  function fin(el){ return el.getAttribute('data-count')+(el.getAttribute('data-suffix')||''); }
  if(!('IntersectionObserver' in window) || !window.requestAnimationFrame){
    nums.forEach(function(el){ el.textContent=fin(el); }); return;
  }
  function animate(el, delay){
    var target=+el.getAttribute('data-count'), suf=el.getAttribute('data-suffix')||'', dur=1300;
    el.textContent='0';
    setTimeout(function(){
      var t0=null;
      function step(ts){ if(!t0) t0=ts; var p=Math.min((ts-t0)/dur,1), e=1-Math.pow(1-p,3);
        el.textContent=Math.round(e*target)+(p>=1?suf:''); if(p<1) requestAnimationFrame(step); }
      requestAnimationFrame(step);
    }, delay||0);
  }
  nums.forEach(function(el){ el.textContent='0'; });
  var done=false;
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting || done) return;
      done=true; io.disconnect();
      nums.forEach(function(el,i){ animate(el, i*200); });   /* stagger -> sense of movement */
    });
  },{threshold:0.4});
  io.observe(stats);
  /* hover a stat to replay its count-up */
  nums.forEach(function(el){
    var stat=el.closest ? el.closest('.stat') : el.parentNode;
    (stat||el).addEventListener('mouseenter', function(){ if(done) animate(el, 0); });
  });
})();
}catch(e){ if(window.console) console.warn('[advait] stats counter error:',e); }
