import L from"./MeeToonImg-3f161fa9.mjs";import{a4 as y,a5 as M,a as N,w,a6 as I,o as p,c as g,y as b,b as h,r as S,u as E,e as O,f as F,F as T,E as P,A as B}from"./entry-a18a7735.mjs";import{S as C,a as z}from"./swiper-slide-04218a47.mjs";function D(f){let{swiper:e,extendParams:m,on:u,emit:n}=f,t;e.autoplay={running:!1,paused:!1},m({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});function s(){if(!e.size){e.autoplay.running=!1,e.autoplay.paused=!1;return}const a=e.slides.eq(e.activeIndex);let r=e.params.autoplay.delay;a.attr("data-swiper-autoplay")&&(r=a.attr("data-swiper-autoplay")||e.params.autoplay.delay),clearTimeout(t),t=M(()=>{let l;e.params.autoplay.reverseDirection?e.params.loop?(e.loopFix(),l=e.slidePrev(e.params.speed,!0,!0),n("autoplay")):e.isBeginning?e.params.autoplay.stopOnLastSlide?o():(l=e.slideTo(e.slides.length-1,e.params.speed,!0,!0),n("autoplay")):(l=e.slidePrev(e.params.speed,!0,!0),n("autoplay")):e.params.loop?(e.loopFix(),l=e.slideNext(e.params.speed,!0,!0),n("autoplay")):e.isEnd?e.params.autoplay.stopOnLastSlide?o():(l=e.slideTo(0,e.params.speed,!0,!0),n("autoplay")):(l=e.slideNext(e.params.speed,!0,!0),n("autoplay")),(e.params.cssMode&&e.autoplay.running||l===!1)&&s()},r)}function i(){return typeof t!="undefined"||e.autoplay.running?!1:(e.autoplay.running=!0,n("autoplayStart"),s(),!0)}function o(){return!e.autoplay.running||typeof t=="undefined"?!1:(t&&(clearTimeout(t),t=void 0),e.autoplay.running=!1,n("autoplayStop"),!0)}function d(a){!e.autoplay.running||e.autoplay.paused||(t&&clearTimeout(t),e.autoplay.paused=!0,a===0||!e.params.autoplay.waitForTransition?(e.autoplay.paused=!1,s()):["transitionend","webkitTransitionEnd"].forEach(r=>{e.$wrapperEl[0].addEventListener(r,c)}))}function _(){const a=y();a.visibilityState==="hidden"&&e.autoplay.running&&d(),a.visibilityState==="visible"&&e.autoplay.paused&&(s(),e.autoplay.paused=!1)}function c(a){!e||e.destroyed||!e.$wrapperEl||a.target===e.$wrapperEl[0]&&(["transitionend","webkitTransitionEnd"].forEach(r=>{e.$wrapperEl[0].removeEventListener(r,c)}),e.autoplay.paused=!1,e.autoplay.running?s():o())}function v(){e.params.autoplay.disableOnInteraction?o():(n("autoplayPause"),d()),["transitionend","webkitTransitionEnd"].forEach(a=>{e.$wrapperEl[0].removeEventListener(a,c)})}function x(){e.params.autoplay.disableOnInteraction||(e.autoplay.paused=!1,n("autoplayResume"),s())}function $(){e.params.autoplay.pauseOnMouseEnter&&(e.$el.on("mouseenter",v),e.$el.on("mouseleave",x))}function k(){e.$el.off("mouseenter",v),e.$el.off("mouseleave",x)}u("init",()=>{e.params.autoplay.enabled&&(i(),y().addEventListener("visibilitychange",_),$())}),u("beforeTransitionStart",(a,r,l)=>{e.autoplay.running&&(l||!e.params.autoplay.disableOnInteraction?e.autoplay.pause(r):o())}),u("sliderFirstMove",()=>{e.autoplay.running&&(e.params.autoplay.disableOnInteraction?o():d())}),u("touchEnd",()=>{e.params.cssMode&&e.autoplay.paused&&!e.params.autoplay.disableOnInteraction&&s()}),u("destroy",()=>{k(),e.autoplay.running&&o(),y().removeEventListener("visibilitychange",_)}),Object.assign(e.autoplay,{pause:d,run:s,start:i,stop:o})}const R={class:"w-full bottom-0"},q=N({__name:"Spotlight",props:{banner:Object},setup(f){const e=w([D]);I();const m=w({delay:25333300,disableOnInteraction:!1});return(u,n)=>{const t=L,s=B;return p(),g(E(z),{loop:!0,modules:e.value,autoplay:m.value},{default:b(()=>[(p(!0),h(T,null,S(f.banner.covers,i=>(p(),g(E(C),{key:i._id},{default:b(()=>[O(s,{to:E(P)(i.slug,i._id),class:"relative block h-[65vw] sm:h-[460px] md:[460px]",title:i.comicName},{default:b(()=>[F("div",R,[O(t,{class:"w-full",alt:i.comicName,src:`${i.link}`,sizes:"xs:320px 2xs:390px sm:640px md:768px"},null,8,["alt","src"])]),(p(!0),h(T,null,S(i.animations,o=>(p(),g(t,{key:o.image,class:"absolute w-full bottom-0",alt:i.comicName,src:`${o.image}`,sizes:"xs:320px 2xs:390px sm:640px md:768px",width:375,height:280},null,8,["alt","src"]))),128))]),_:2},1032,["to","title"])]),_:2},1024))),128))]),_:1},8,["modules","autoplay"])}}});export{q as default};