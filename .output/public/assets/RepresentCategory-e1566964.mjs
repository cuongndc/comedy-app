import{a as w,o as s,b as a,r as _,f as e,t as n,e as d,w as u,F as o,u as x,a0 as k,G as C,a1 as N,T as h,c as m,a2 as T,a3 as $,a4 as j,a5 as A,X as B,y as L,H as R}from"./entry-8fb9504e.mjs";import S from"./MeeToonImg-57a5fba4.mjs";const V={class:"h-[40px] mb-4 flex justify-between"},F={class:"text-3xl font-bold flex justify-start items-center text-black"},M=h(" Th\xEAm "),D={class:"grid grid-cols-1 md:grid-cols-2 gap-14 mb-10"},E={class:"absolute bottom-[13px] left-[13px]"},G={class:"max-w-full w-[105px]"},H={class:"relative"},I={class:"absolute top-0"},O={key:0,class:"bg-primary rounded-xl text-white text-xl font-bold px-3 py-1 ml-1"},U={key:1,class:"bg-primary rounded-xl text-white text-xl font-bold px-3 py-1 ml-1"},z={class:"ml-[118px] p-4"},P={class:"text-xl font-medium"},X={class:"rating flex items-center"},q={class:"text-xl"},J=e("span",{class:"text-xl font-semibold text-gray-500"}," (369)",-1),K={class:"w-full text-base line-clamp-3"},Q={class:"mt-3"},W={class:"mt-3"},Y={class:"flex items-center justify-start w-full text-gray-500"},Z=e("img",{src:$,class:"mr-2",alt:"comment"},null,-1),c={class:"name text-base font-semibold"},tt={class:"whitespace-nowrap overflow-x-auto mb-10 scrollbar-hide"},at=w({__name:"RepresentCategory",props:{record:Object},setup(f){const g=r=>{const p=r.type!=="category"?`${j}/${r.slug}`:`${A}/${r.slug}`;return B(p)};return(r,p)=>{const i=L,v=R,b=S;return s(!0),a(o,null,_(f.record.content,l=>(s(),a("div",{key:l._id,class:"px-4"},[e("div",V,[e("h2",F,n(l.name||l.categoryVietName),1),d(v,null,{default:u(()=>[d(i,{class:"text-xl font-semibold flex items-center text-primary mr-1",onClick:t=>g(l)},{default:u(()=>[M]),_:2},1032,["onClick"])]),_:2},1024)]),e("div",D,[(s(!0),a(o,null,_(l.comicsReviewNewest,t=>(s(),a("div",{key:t._id,class:"col-span-1 rounded-[8px] p-13 max-w-[384px] w-full h-[138px] bg-white relative shadow-[0_3px_20px_rgba(0,0,0,10%)]"},[e("div",E,[d(i,{to:x(C)(t.slug,t._id)},{default:u(()=>[e("div",G,[e("div",H,[e("div",I,[t.adultContent?(s(),a("span",U," 17+ ")):(s(),a("span",O,n(x(k)[t.status]),1))]),d(b,{alt:t.comicName,sizes:"sm:100px 2xs:150px md:200px md:300px",class:"rounded-2xl visible h-full left-0 relative top-0 w-full",src:t.verticalLogo},null,8,["alt","src"])])])]),_:2},1032,["to"])]),e("div",z,[e("h3",P,[e("a",null,n(t==null?void 0:t.comicName),1)]),e("div",null,[e("div",X,[(s(),a(o,null,_(5,y=>e("img",{key:y,src:N,alt:"rating"})),64)),e("p",q,[h(n(t==null?void 0:t.avgRate.toFixed(1))+" ",1),J])]),e("a",null,[e("i",K,' "'+n(t==null?void 0:t.contentReview)+'" ',1)]),e("div",Q,[e("a",W,[e("p",Y,[Z,e("span",c,n(t.userComment.name),1)])])])])])]))),128))]),e("div",tt,[(s(!0),a(o,null,_(l.comics,t=>(s(),m(x(T),{key:t==null?void 0:t.slug,_id:t==null?void 0:t._id,"adult-content":t==null?void 0:t.adultContent,"chap-number":t==null?void 0:t.newestChapter,"comic-name":t==null?void 0:t.comicName,slug:t==null?void 0:t.slug,status:t==null?void 0:t.status,"vertical-logo":t==null?void 0:t.verticalLogo,tags:t==null?void 0:t.tags},null,8,["_id","adult-content","chap-number","comic-name","slug","status","vertical-logo","tags"]))),128))])]))),128)}}});export{at as default};
