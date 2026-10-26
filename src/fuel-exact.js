// Reference preview uses the reference site's published Framer runtime.
// Keep custom changes outside its React tree so its original animations hydrate intact.
import './fuel-exact.css';
import {mountReferenceFluid} from './reference-fluid';
const layer=document.createElement('div');
layer.className='xiaoli-hero-layer';
layer.innerHTML='<video class="xiaoli-hero-video" autoplay muted loop playsinline preload="auto" poster="/assets/hero-user-final-poster.jpg" aria-label="李卓首屏视觉作品"><source src="/assets/hero-user-final.mp4" type="video/mp4"></video>';
document.body.append(layer);
const video=layer.querySelector('video');video.muted=true;video.playsInline=true;video.addEventListener('loadeddata',()=>{video.play().catch(()=>{});},{once:false});video.addEventListener('canplay',()=>{if(!matchMedia('(prefers-reduced-motion:reduce)').matches)video.play().catch(()=>{});},{once:false});
let fluidCleanup=null,fluidCanvas=null;
function updateFluid(){
 const enabled=innerWidth>=1200&&!matchMedia('(prefers-reduced-motion:reduce)').matches&&video.readyState>=2;
 if(enabled&&!fluidCanvas){fluidCanvas=document.createElement('canvas');fluidCanvas.className='xiaoli-fluid';fluidCanvas.style.cssText='position:absolute;top:-10%;left:-10%;width:120%;height:120%;';layer.append(fluidCanvas);try{fluidCleanup=mountReferenceFluid(fluidCanvas,layer,video);}catch(error){console.error('Video fluid effect:',error);fluidCanvas.remove();fluidCanvas=null;}}
 if(!enabled&&fluidCanvas){fluidCleanup?.();fluidCanvas.remove();fluidCanvas=null;fluidCleanup=null;}
}
video.addEventListener('loadeddata',updateFluid);
const update=()=>{
 const hero=document.querySelector('section[data-framer-name="Hero"]');
 if(!hero)return;
 document.querySelectorAll('section[data-framer-name="Pricing"],section[data-framer-name="Testimonial"],section[data-framer-name="Article"],section[data-framer-name="L"]').forEach(node=>node.remove());
 document.querySelectorAll('[aria-hidden="true"] img,[aria-hidden="true"] video,canvas').forEach(node=>{if(!layer.contains(node))node.remove();});
 document.querySelectorAll('video').forEach(node=>{if(!layer.contains(node))node.remove();});
 const wordmark=hero.querySelector('[data-framer-name="Place Your Logo Here"]');
 if(wordmark&&!wordmark.querySelector('.xiaoli-wordmark')){const text=document.createElement('div');text.className='xiaoli-wordmark';text.innerHTML='<span>XIAOLI</span><span>×</span>';wordmark.append(text);}
 if(wordmark){const r=wordmark.getBoundingClientRect();wordmark.style.setProperty('--xiaoli-type',Math.min(r.width*.155,r.height*1.2)+'px');}const bg=hero.querySelector(':scope > [data-framer-name="BG Image"]');if(bg){bg.querySelectorAll('img,[data-framer-background-image-wrapper],video,canvas').forEach(node=>{if(!layer.contains(node))node.remove();});if(layer.parentElement!==bg)bg.append(layer);}hero.querySelectorAll('img,video:not(.xiaoli-hero-video),canvas').forEach(node=>{if(!layer.contains(node))node.remove();});const box=hero.getBoundingClientRect();
 layer.style.cssText=`top:0;left:0;width:${box.width}px;height:${box.height}px;display:${box.bottom>0?'block':'none'}`;
 if(box.bottom<=0)video.pause();else if(video.paused&&!matchMedia('(prefers-reduced-motion:reduce)').matches)video.play().catch(()=>{});
 updateFluid();
};
let frame;
function schedule(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;update();});}
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
const observer=new MutationObserver(schedule);observer.observe(document.getElementById('main')||document.body,{childList:true,subtree:true});
update();
document.title='XIAOLI / PORTFOLIO';
document.addEventListener('click',event=>{
 const link=event.target.closest('a');if(!link)return;
 const url=new URL(link.getAttribute('href'),location.origin+'/');
 if(url.origin===location.origin && !url.hash){event.preventDefault();event.stopImmediatePropagation();location.assign(url.pathname==='/'?'/':url.pathname.replace(/\/$/,'')+'/index.html');}
},true);




