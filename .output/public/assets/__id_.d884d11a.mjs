import{a as F,d as D,l as V,m as x,a2 as q,Y as K,z as X,G,a5 as H,K as g,o as m,b as E,f as s,e as $,w as M,ab as W,u as t,t as n,F as Y,r as O,h,c as A,q as R,_ as Z,O as J,T as Q,s as ss,ac as l,$ as ts,a0 as es,j as os}from"./entry.bd086d26.mjs";import{u as cs}from"./fetch.79d5467c.mjs";import{_ as as}from"./icon-comment-count.49875df9.mjs";import{_ as is}from"./icon-star.f3501c99.mjs";import{c as v}from"./index.b31a4486.mjs";import{_ as ns}from"./ComicChapterTab.vue_vue_type_script_setup_true_lang.6765bdcb.mjs";import{_ as ls}from"./ComicTab.vue_vue_type_script_setup_true_lang.8d9b3140.mjs";import"./ChapterRepresent.vue_vue_type_script_setup_true_lang.fe058ab3.mjs";import"./MeeToonImg.vue_vue_type_script_setup_true_lang.8429f958.mjs";const rs=""+globalThis.__publicAssetsURL("icons/comicPage/icon-back.svg"),_s=""+globalThis.__publicAssetsURL("icons/comicPage/icon-report.svg"),ds=""+globalThis.__publicAssetsURL("icons/comicPage/icon-view-count.svg"),us=""+globalThis.__publicAssetsURL("icons/comicPage/icon-follow-count.svg"),ms=""+globalThis.__publicAssetsURL("icons/comicPage/icon-share.svg"),ps=""+globalThis.__publicAssetsURL("icons/comicPage/icon-follow.svg"),xs=D(()=>Z(()=>import("./MeeToonImg.e214bd0d.mjs"),["assets/MeeToonImg.e214bd0d.mjs","assets/MeeToonImg.vue_vue_type_script_setup_true_lang.8429f958.mjs","assets/entry.bd086d26.mjs","assets/entry.75345f29.css"])),e=r=>(ts("data-v-d367214d"),r=r(),es(),r),gs=e(()=>s("img",{src:rs,alt:"back"},null,-1)),hs=e(()=>s("div",{class:"flex items-center bg-deep-black/50 h-[30px] rounded-2xl px-3 mr-4"},[s("img",{class:"mr-2",src:_s,alt:"report"}),s("span",{class:"text-white text-2xl"},"B\xE1o c\xE1o")],-1)),vs={class:"fixed top-0 w-full max-w-[768px]"},fs={class:"relative mt-[150px]"},bs={class:"px-5",style:{background:"linear-gradient(rgba(17, 18, 23, 0) 0%, rgba(17, 18, 23, 0.5) 33.85%, rgba(17, 18, 23, 0.8) 68.75%, rgb(17, 18, 23) 100%)"}},ws={class:"bg-contain p-6 bg-comic flex items-center justify-between rounded-xl",style:{"background-image":"url(/icons/comicPage/backgroundInfo.png)"}},ys={class:"left"},Cs={class:"text-ellipsis line-clamp-1 text-3xl font-bold text-white"},Ts={class:"flex flex-wrap"},ks=e(()=>s("div",{class:"my-4 flex items-center justify-center rounded-xl text-primary text-base border-[1px] border-red-700 h-[20px] w-[80px]"}," Ho\xE0n t\u1EA5t ",-1)),Es={class:"mx-4 my-4 flex items-center text-gray-50 text-base"},$s=e(()=>s("img",{src:ds,alt:"view count"},null,-1)),As={class:"ml-1"},Rs={class:"mx-4 my-4 flex items-center text-gray-50 text-base"},Ls=e(()=>s("img",{class:"w-[18px] h-[18px]",src:us,alt:"follow count"},null,-1)),Ps={class:"ml-1"},Bs={class:"flex items-center text-base text-gray-50"},Is=e(()=>s("img",{src:as,alt:"comment count"},null,-1)),zs={class:"ml-1"},Ns={class:"right"},Ss={class:"w-[80px] text-center cursor-pointer"},Us=e(()=>s("p",{class:"text-yellow-400 text-4xl"}," 5 ",-1)),js={class:"flex items-center justify-center"},Fs={class:"text-white text-xl"},Ds=e(()=>s("div",{class:"cursor-pointer"},[s("img",{src:ms,alt:"Chia s\u1EBB"})],-1)),Vs=e(()=>s("div",{class:"ml-6 cursor-pointer"},[s("img",{src:ps,alt:"Theo d\xF5i"})],-1)),qs={class:"relative bg-accent-4"},Ks={class:"whitespace-nowrap overflow-x-auto border-b-[1px solid rgb(27, 28, 35)]"},Xs=e(()=>s("span",null,"Gi\u1EDBi thi\u1EC7u",-1)),Gs=[Xs],Hs=e(()=>s("a",null,"\u0110\xE1nh gi\xE1",-1)),Ms=[Hs],Ws=F({__name:"[_id]",async setup(r){let _,f;const b=V().params,L=x(b.slug),P=x(b._id),d=x("comic"),a=q("chapters","$pVyGScZ5Yg"),B=K(),{data:o,pending:Os,refresh:I}=([_,f]=X(()=>cs(`/api/comic/${L.value}/${P.value}`,"$X5Mzj7eFdq")),_=await _,f(),_);G(async()=>{!o.value||(a.value=await $fetch("/api/chapters",{params:{comic_slug:o.value.slug}}))}),H(async()=>{await I()});const w=g(()=>d.value===l.comic),y=g(()=>d.value===l.chapter),z=g(()=>d.value===l.review),p=i=>{d.value=i},N=()=>{var i,c;return a.value&&a.value.length>0?J(`/${Q}/${(i=a.value[0])==null?void 0:i.slug}/${(c=a.value[0])==null?void 0:c._id}`):""},S=i=>({backgroundImage:`url(${B.public.imgCDN}${i})`});return(i,c)=>{var C,T,k;const U=ss,j=xs;return m(),E("section",null,[s("div",{style:W(S(t(o).squareCover)),class:"flex items-center justify-between h-[50px] z-10 fixed top-0 w-full overflow-hidden bg-cover"},[$(U,{to:"/",class:"ml-4"},{default:M(()=>[gs]),_:1}),hs],4),s("div",vs,[$(j,{class:"relative w-full",src:t(o).squareCover},null,8,["src"])]),s("div",fs,[s("div",bs,[s("div",ws,[s("div",ys,[s("div",null,[s("h1",Cs,n((C=t(o))==null?void 0:C.comicName),1)]),s("div",Ts,[ks,s("div",Es,[$s,s("span",As,n(t(v)(t(o).viewCount)),1)]),s("div",Rs,[Ls,s("span",Ps,n(t(v)(t(o).followingCount)),1)]),s("div",Bs,[Is,s("span",zs,n(t(v)(t(o).totalComment)),1)])])]),s("div",Ns,[s("div",Ss,[Us,s("div",js,[(m(),E(Y,null,O(5,u=>s("img",{key:u,src:is,alt:"rating"})),64))]),s("div",null,[s("span",Fs,n(t(o).reviewCount)+" \u0110\xE1nh gi\xE1",1)])])])])])]),s("div",{class:"bg-footer-comic_page px-3 fixed bottom-0 w-full h-[60px] max-w-[768px] flex items-center z-50"},[Ds,Vs,s("a",{class:"comic-read",onClick:N}," B\u1EAFt \u0111\u1EA7u \u0111\u1ECDc ")]),s("div",qs,[s("div",Ks,[s("div",{class:h([{active:t(w)},"eKaTWX inline-block"]),onClick:c[0]||(c[0]=u=>p(t(l).comic))},Gs,2),s("div",{class:h([{active:t(y)},"eKaTWX"]),onClick:c[1]||(c[1]=u=>p(t(l).chapter))},[s("a",null,"Chapters ("+n((T=t(a))!=null&&T.length?(k=t(a))==null?void 0:k.length:0)+")",1)],2),s("div",{class:h([{active:t(z)},"eKaTWX"]),onClick:c[2]||(c[2]=u=>p(t(l).review))},Ms,2)])]),t(w)?(m(),A(ls,{key:0,comic:t(o)},null,8,["comic"])):R("",!0),t(y)?(m(),A(ns,{key:1,chapters:t(a)},null,8,["chapters"])):R("",!0)])}}});const it=os(Ws,[["__scopeId","data-v-d367214d"]]);export{it as default};
