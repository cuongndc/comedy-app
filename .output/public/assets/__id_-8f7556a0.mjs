import{d as h,a as V,z as S,A as B,al as D,C as H,N as M,aq as Y,u as a,o as y,b as C,e as o,w as _,U as j,t as p,f as e,_ as m,V as b,Z as N,B as $,G as F,D as U}from"./entry-b5225d3d.mjs";import Z from"./PageLoading-57fce9d5.mjs";import{a as q}from"./fetch-a362cbd0.mjs";const G=h(()=>m(()=>import("./entry-b5225d3d.mjs").then(function(f){return f.aY}),["entry-b5225d3d.mjs","entry.fa0f9e10.css"])),J=h(()=>m(()=>import("./ChapterImg-d4dead78.mjs"),["ChapterImg-d4dead78.mjs","MeeToonImg-d8f1e150.mjs","entry-b5225d3d.mjs","entry.fa0f9e10.css"])),K=h(()=>m(()=>import("./ReadMangaFooter-f566ba6a.mjs"),["ReadMangaFooter-f566ba6a.mjs","entry-b5225d3d.mjs","entry.fa0f9e10.css"])),Q={key:0},W={key:1,ref:"scrollComponent",class:"flex h-fit min-h-screen flex-col bg-black scrollbar-hide"},X={class:"relative flex h-fit flex-1 text-white"},ee={class:"h-fit min-h-screen w-full bg-black"},te={class:"fixed top-0 left-0 z-[999] h-[60px] w-full"},ae={class:"flex h-full w-full items-center justify-between text-lg md:text-2xl bg-accent-1"},ne={class:"flex h-full w-fit items-center justify-evenly gap-4 px-4 md:space-x-4"},se=e("button",null,null,-1),oe={class:"fond-bold h-fit w-[25%] capitalize line-clamp-1 md:w-[30%]"},ce={class:"h-[60%] w-fit max-w-[80px] whitespace-nowrap rounded-xl bg-highlight p-2 text-base line-clamp-1 md:text-lg"},le={class:"absolute-center h-full w-fit gap-4 md:mx-6"},de=V({__name:"[_id]",async setup(f){let r,x;const A=S().params,z=B(A.chapter_slug),d=D("chapters","$soZRuRfLuA"),{pending:E,data:t,refresh:L}=([r,x]=H(()=>q("/api/read-comic",{params:{chapter_slug:z.value}},"$tl5ShYp14A")),r=await r,x(),r);M(async()=>{d.value=await $fetch("/api/chapters",{params:{comic_slug:t.value.chapter.comicSlug}})}),Y(()=>{L()});const u=async c=>{if(c==="next"){const n=t.value.chapter.chapterOrderIndex+1,s=d.value.find(l=>l.chapterOrderIndex===n);b({path:`/${N}/${s.slug}/${s._id}`,replace:!0})}if(c==="prev"){const n=t.value.chapter.chapterOrderIndex-1,s=d.value.find(l=>l.chapterOrderIndex===n);b({path:`/${N}/${s.slug}/${s._id}`,replace:!0})}},P=c=>{u(c)};return(c,n)=>{var g,v;const s=Z,l=$("Title"),R=$("Head"),T=G,k=J,I=F,O=K;return a(E)?(y(),C("div",Q,[o(s)])):(y(),C("div",W,[o(R,null,{default:_(()=>[o(l,null,{default:_(()=>{var i,w;return[j(p((i=a(t).chapter)==null?void 0:i.chapterName)+" | Ch\u01B0\u01A1ng "+p((w=a(t).chapter)==null?void 0:w.chapterNum),1)]}),_:1})]),_:1}),e("div",X,[e("div",ee,[e("div",te,[e("div",ae,[e("div",ne,[o(T,{to:a(U)(a(t).chapter.comicSlug,a(t).chapter.comicId),class:"flex"},{default:_(()=>[se]),_:1},8,["to"]),e("h1",oe,p((g=a(t).chapter)==null?void 0:g.chapterName),1),e("button",ce," Chapter: "+p((v=a(t).chapter)==null?void 0:v.chapterNum),1),e("div",le,[e("button",{"data-id":"prev",class:"rounded-xl-lg bg-highlight p-4 md:p-4",onClick:n[0]||(n[0]=i=>u("prev"))}),e("button",{"data-id":"next",class:"rounded-xl-lg bg-highlight p-4 md:p-4",onClick:n[1]||(n[1]=i=>u("next"))})])])])]),o(I,null,{default:_(()=>[o(k,{pages:a(t).pages},null,8,["pages"])]),_:1}),o(O,{onNextProcess:P})])])],512))}}});export{de as default};
