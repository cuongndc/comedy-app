import{a as m,o as n,b as l,r as d,f as t,t as e,u as o,F as x,j as u,k as p,l as y,m as f,T as g}from"./entry-6525e429.mjs";import{c as a}from"./index-b351655c.mjs";const h={class:"px-5 py-5 cursor-pointe"},v=["onClick"],k={class:"text-2xl mb-4"},C={class:"flex"},b={class:"mr-8 text-primary-gray text-2xl flex items-center"},T={class:"mr-[17px] flex items-center justify-center text-2xl"},A=t("img",{class:"mr-2",src:u,alt:"view"},null,-1),j={class:"text-primary-gray"},w={class:"mr-8 flex items-center justify-center text-2xl"},B=t("img",{class:"mr-2",src:p,alt:"like"},null,-1),L={class:"text-primary-gray"},N={class:"flex items-center justify-center mr-4 text-2xl"},$=t("img",{class:"mr-2",src:y,alt:"comment"},null,-1),D={class:"text-primary-gray"},F=m({__name:"ComicChapterTab",props:{chapters:Array},setup(c){const _=(i,r)=>f(`/${g}/${i}/${r}`);return(i,r)=>(n(!0),l(x,null,d(c.chapters,s=>(n(),l("div",{key:s._id,class:"relative bg-accent-4",style:{"border-bottom":"1px solid rgb(27, 28, 35)"}},[t("div",h,[t("a",{onClick:E=>_(s.slug,s._id)},[t("h3",k,[t("b",null," Ch\u01B0\u01A1ng "+e(s.chapterNum),1)]),t("div",C,[t("p",b,e(new Date(s.createdAt).toLocaleDateString()),1),t("div",T,[A,t("span",j,e(s.totalView?o(a)(s.totalView):0),1)]),t("div",w,[B,t("span",L,e(s.totalLike?o(a)(s.totalLike):0),1)]),t("div",N,[$,t("span",D,e(s.totalComment?o(a)(s.totalComment):0),1)])])],8,v)])]))),128))}});export{F as default};
