import{a as w,o as s,b as a,r as _,f as e,t as n,e as d,w as u,F as o,u as x,Y as k,D as C,Z as N,U as h,c as m,$,a0 as T,a1 as V,a2 as j,V as A,y as B,G as L}from"./entry-e57c9408.mjs";import R from"./MeeToonImg-5e35f600.mjs";const S={class:"h-[40px] mb-4 flex justify-between"},D={class:"text-3xl font-bold flex justify-start items-center text-black"},F=h(" Th\xEAm "),M={class:"grid grid-cols-1 md:grid-cols-2 gap-14 mb-10"},U={class:"absolute bottom-[13px] left-[13px]"},E={class:"max-w-full w-[105px]"},G={class:"relative"},I={class:"absolute top-0"},O={key:0,class:"bg-primary rounded-xl text-white text-xl font-bold px-3 py-1 ml-1"},z={key:1,class:"bg-primary rounded-xl text-white text-xl font-bold px-3 py-1 ml-1"},H={class:"ml-[118px] p-4"},P={class:"text-xl font-medium"},Y={class:"rating flex items-center"},Z={class:"text-xl"},q=e("span",{class:"text-xl font-semibold text-gray-500"}," (369)",-1),J={class:"w-full text-base line-clamp-3"},K={class:"mt-3"},Q={class:"mt-3"},W={class:"flex items-center justify-start w-full text-gray-500"},X=e("img",{src:T,class:"mr-2",alt:"comment"},null,-1),c={class:"name text-base font-semibold"},tt={class:"whitespace-nowrap overflow-x-auto mb-10 scrollbar-hide"},at=w({__name:"RepresentCategory",props:{record:Object},setup(f){const g=r=>{const p=r.type!=="category"?`${V}/${r.slug}`:`${j}/${r.slug}`;return A(p)};return(r,p)=>{const i=B,v=L,b=R;return s(!0),a(o,null,_(f.record.content,l=>(s(),a("div",{key:l._id,class:"px-4"},[e("div",S,[e("h2",D,n(l.name||l.categoryVietName),1),d(v,null,{default:u(()=>[d(i,{class:"text-xl font-semibold flex items-center text-primary mr-1",onClick:t=>g(l)},{default:u(()=>[F]),_:2},1032,["onClick"])]),_:2},1024)]),e("div",M,[(s(!0),a(o,null,_(l.comicsReviewNewest,t=>(s(),a("div",{key:t._id,class:"col-span-1 rounded-[8px] p-13 max-w-[384px] w-full h-[138px] bg-white relative shadow-[0_3px_20px_rgba(0,0,0,10%)]"},[e("div",U,[d(i,{to:x(C)(t.slug,t._id)},{default:u(()=>[e("div",E,[e("div",G,[e("div",I,[t.adultContent?(s(),a("span",z," 17+ ")):(s(),a("span",O,n(x(k)[t.status]),1))]),d(b,{alt:t.comicName,sizes:"sm:100px 2xs:150px md:200px md:300px",class:"rounded-2xl visible h-full left-0 relative top-0 w-full",src:t.verticalLogo},null,8,["alt","src"])])])]),_:2},1032,["to"])]),e("div",H,[e("h3",P,[e("a",null,n(t==null?void 0:t.comicName),1)]),e("div",null,[e("div",Y,[(s(),a(o,null,_(5,y=>e("img",{key:y,src:N,alt:"rating"})),64)),e("p",Z,[h(n(t==null?void 0:t.avgRate.toFixed(1))+" ",1),q])]),e("a",null,[e("i",J,' "'+n(t==null?void 0:t.contentReview)+'" ',1)]),e("div",K,[e("a",Q,[e("p",W,[X,e("span",c,n(t.userComment.name),1)])])])])])]))),128))]),e("div",tt,[(s(!0),a(o,null,_(l.comics,t=>(s(),m(x($),{key:t==null?void 0:t.slug,_id:t==null?void 0:t._id,"adult-content":t==null?void 0:t.adultContent,"chap-number":t==null?void 0:t.newestChapter,"comic-name":t==null?void 0:t.comicName,slug:t==null?void 0:t.slug,status:t==null?void 0:t.status,"vertical-logo":t==null?void 0:t.verticalLogo,tags:t==null?void 0:t.tags},null,8,["_id","adult-content","chap-number","comic-name","slug","status","vertical-logo","tags"]))),128))])]))),128)}}});export{at as default};