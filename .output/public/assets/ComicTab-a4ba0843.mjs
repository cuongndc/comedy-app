import m from"./ComicsRelated-5ab5af01.mjs";import p from"./ChapterRepresent-bf3e368a.mjs";import{a as u,p as _,o as a,b as s,f as t,t as n,F as h,r as f,e as i,u as x}from"./entry-6525e429.mjs";import"./MeeToonImg-a4086449.mjs";const b={class:"relative bg-dark-gray"},g={class:"px-6 h-auto relative overflow-hidden pt-6"},v={class:"content mb-4"},w={class:"text-xl text-white whitespace-pre-line"},k={class:"scrollbar-hide overflow-auto whitespace-nowrap p-4",style:{display:"-webkit-box"}},N=u({__name:"ComicTab",props:{comic:Object},setup(e){const{comic:l}=e,d=_(()=>l.tags.map(o=>o.slug));return(o,y)=>{var c;return a(),s("div",b,[t("div",g,[t("div",v,[t("p",w,n((c=e.comic)==null?void 0:c.description),1)])]),t("div",k,[(a(!0),s(h,null,f(e.comic.tags,r=>(a(),s("a",{key:r._id,class:"inline-block py-1 px-4 mr-2 text-xl rounded-xl bg-accent-5",href:"#"},"# "+n(r.name),1))),128))]),i(p,{"represent-data":e.comic.chaptersRepresentData},null,8,["represent-data"]),i(m,{tags:x(d)},null,8,["tags"])])}}});export{N as default};