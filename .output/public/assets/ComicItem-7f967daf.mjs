import p from"./MeeToonImg-3f161fa9.mjs";import{a as d,o as n,b as r,r as x,e as a,y as i,f as e,t as s,u as o,E as c,R as m,F as h,A as f}from"./entry-a18a7735.mjs";import{c as g}from"./index-b351655c.mjs";const b={class:"relative"},y=e("div",{class:"absolute bottom-0 bg-deep-black h-[30px] w-full rounded-b-xl opacity-80"},null,-1),v={class:"absolute bottom-0 w-full text-xl font-semibold text-white h-[30px] flex items-center justify-center"},w={class:"px-5 h-[168px]",style:{width:"calc(100% - 102px)"}},C={class:"text-1xl font-semibold line-clamp-1 mb-1"},E={class:"text-primary-gray mb-3 text-base line-clamp-3"},N={class:"text-primary-gray text-xl"},D={class:"text-primary-gray text-xl mt-4"},S=d({__name:"ComicItem",props:{comics:Object},setup(u){return(k,A)=>{const _=p,l=f;return n(!0),r(h,null,x(u.comics,t=>(n(),r("div",{key:t.slug},[a(l,{class:"flex items-center p-4",to:o(c)(t.slug,t._id)},{default:i(()=>[e("div",b,[a(_,{class:"w-[125px] h-[168px]",width:125,height:168,lazy:!0,src:t.verticalLogo,fil:"fill"},null,8,["src"]),y,e("div",v,[e("a",null,"Ch\u01B0\u01A1ng "+s(t.newestChapter),1)])]),e("div",w,[e("h3",C,[a(l,{to:o(c)(t.slug,t._id)},{default:i(()=>[m(s(t.comicName),1)]),_:2},1032,["to"])]),e("p",E,s(t.description),1),e("p",N," L\u01B0\u1EE3t xem: "+s(o(g)(t.viewCount)),1),e("p",D," C\u1EADp nh\u1EADt cu\u1ED1i: "+s(new Date(t.updatedAt).toLocaleDateString("vi-VN")),1)])]),_:2},1032,["to"])]))),128)}}});export{S as default};
