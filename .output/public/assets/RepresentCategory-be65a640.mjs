import{a as f,o as e,b as l,r as d,f as s,t as n,e as o,w as x,u as r,a0 as v,a1 as b,F as _,C as w,v as y,a2 as C,x as p,c as k,$ as N,a3 as m,y as $}from"./entry-6525e429.mjs";import T from"./MeeToonImg-a4086449.mjs";const j={class:"h-[70px] mb-4 flex justify-between"},A={class:"text-3xl font-bold flex justify-start items-center text-black"},B=p(" Th\xEAm "),L={class:"grid grid-cols-1 md:grid-cols-2 gap-14 mb-10"},R={class:"absolute bottom-[13px] left-[13px]"},S={class:"max-w-full w-[105px]"},V={class:"relative"},F={class:"absolute top-0"},M={key:0,class:"bg-primary rounded-xl text-white text-xl font-bold px-3 py-1 ml-1"},D={key:1,class:"bg-primary rounded-xl text-white text-xl font-bold px-3 py-1 ml-1"},E={class:"ml-[118px] p-4"},I={class:"text-xl font-medium"},O={class:"rating flex items-center"},U={class:"text-xl"},z=s("span",{class:"text-xl font-semibold text-gray-500"}," (369)",-1),G={class:"w-full text-base line-clamp-3"},H={class:"mt-3"},P={class:"mt-3"},q={class:"flex items-center justify-start w-full text-gray-500"},J=s("img",{src:m,class:"mr-2",alt:"comment"},null,-1),K={class:"name text-base font-semibold"},Q={class:"whitespace-nowrap overflow-x-auto mb-10 scrollbar-hide"},c=f({__name:"RepresentCategory",props:{record:Object},setup(h){return(W,X)=>{const u=$,i=T;return e(!0),l(_,null,d(h.record.content,a=>(e(),l("div",{key:a._id,class:"px-4"},[s("div",j,[s("h2",A,n(a.name||a.categoryVietName),1),o(u,{to:a.type!=="category"?`${r(v)}/${a.slug}`:`${r(b)}/${a.slug}`,class:"text-xl font-semibold flex items-center text-primary mr-1"},{default:x(()=>[B]),_:2},1032,["to"])]),s("div",L,[(e(!0),l(_,null,d(a.comicsReviewNewest,t=>(e(),l("div",{key:t._id,class:"col-span-1 rounded-[8px] p-13 max-w-[384px] w-full h-[138px] bg-white relative shadow-[0_3px_20px_rgba(0,0,0,10%)]"},[s("div",R,[o(u,{to:r(y)(t.slug,t._id)},{default:x(()=>[s("div",S,[s("div",V,[s("div",F,[t.adultContent?(e(),l("span",D," 17+ ")):(e(),l("span",M,n(r(w)[t.status]),1))]),o(i,{alt:t.comicName,sizes:"sm:100px 2xs:150px md:200px md:300px",class:"rounded-2xl visible h-full left-0 relative top-0 w-full",src:t.verticalLogo},null,8,["alt","src"])])])]),_:2},1032,["to"])]),s("div",E,[s("h3",I,[s("a",null,n(t==null?void 0:t.comicName),1)]),s("div",null,[s("div",O,[(e(),l(_,null,d(5,g=>s("img",{key:g,src:C,alt:"rating"})),64)),s("p",U,[p(n(t==null?void 0:t.avgRate.toFixed(1))+" ",1),z])]),s("a",null,[s("i",G,' "'+n(t==null?void 0:t.contentReview)+'" ',1)]),s("div",H,[s("a",P,[s("p",q,[J,s("span",K,n(t.userComment.name),1)])])])])])]))),128))]),s("div",Q,[(e(!0),l(_,null,d(a.comics,t=>(e(),k(r(N),{key:t==null?void 0:t.slug,_id:t==null?void 0:t._id,"adult-content":t==null?void 0:t.adultContent,"chap-number":t==null?void 0:t.newestChapter,"comic-name":t==null?void 0:t.comicName,slug:t==null?void 0:t.slug,status:t==null?void 0:t.status,"vertical-logo":t==null?void 0:t.verticalLogo,tags:t==null?void 0:t.tags},null,8,["_id","adult-content","chap-number","comic-name","slug","status","vertical-logo","tags"]))),128))])]))),128)}}});export{c as default};