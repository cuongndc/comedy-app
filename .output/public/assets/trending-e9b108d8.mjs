import{a as g,D as w,u as l,o,c as b,b as n,f as t,e as r,y as x,F as k,r as C,ad as N,ae as B,aq as E,A as F,t as s,z as i,R as j,E as h,ao as A,ap as T,W as V}from"./entry-a18a7735.mjs";import $ from"./MeeToonImg-3f161fa9.mjs";import L from"./SearchLoading-57e3ce5b.mjs";import{c as D}from"./index-b351655c.mjs";const P={key:1,class:"bg-white h-[100vh]"},R={class:"flex justify-between justify-center",style:{"box-shadow":"rgb(242 242 242) 0 -1px 0 inset"}},S=t("img",{src:N,alt:"back"},null,-1),q=t("div",{class:"flex items-center justify-center w-[70%] mx-2 my-2 text-4xl text-black font-semibold"}," #C\xF3 ch\u1EAFc l\xE0 HOT \u0111\xE2y ",-1),z=t("img",{src:B,alt:"search"},null,-1),H={class:"flex flex-wrap bg-white"},I={class:"mt-4 overflow-auto scrollbar-hide",style:{height:"calc(100vh - 50px)"}},M={key:0,class:"text-4xl px-4 text-red-500"},O={key:1,class:"text-4xl px-4 text-red-400"},Q={key:2,class:"text-4xl px-4 text-red-300"},U={key:3,class:"text-4xl px-4"},W=["onClick"],G={class:"relative"},J={class:"px-5",style:{width:"calc(100% - 102px)"}},K={class:"text-xl font-semibold line-clamp-1 mb-1"},X={class:"line-clamp-2 text-primary-gray text-base"},Y={class:"text-background my-2 text-base"},Z={class:"flex items-center"},tt={class:"text-primary-gray mb-3 text-base flex items-center mr-4"},et=t("img",{class:"mr-1 w-6",src:A,alt:""},null,-1),st={class:"text-primary-gray mb-3 text-base flex items-center"},at=t("img",{class:"mr-1",src:T,alt:""},null,-1),_t=g({__name:"trending",async setup(ot){let c,d;const{data:u,pending:f}=([c,d]=w(()=>E("/api/trending","$RC4PeQa94g")),c=await c,d(),c),v=(m,p)=>V(h(m,p));return(m,p)=>{const _=F,y=$;return l(f)?(o(),b(L,{key:0,class:"w-[150px] h-[50px]"})):(o(),n("div",P,[t("div",R,[r(_,{to:"/",class:"mx-2 my-2 flex items-center"},{default:x(()=>[S]),_:1}),q,r(_,{to:"/",class:"flex items-center mr-2 h-[40px] w-[30px] mx-2 my-2 rounded-2xl text-white"},{default:x(()=>[z]),_:1})]),t("div",H,[t("section",I,[(o(!0),n(k,null,C(l(u),(e,a)=>(o(),n("div",{key:e._id,class:"p-4 col-span-1 flex items-center"},[a===0?(o(),n("div",M,s(a+1),1)):i("",!0),a===1?(o(),n("div",O,s(a+1),1)):i("",!0),a===2?(o(),n("div",Q,s(a+1),1)):i("",!0),a>2?(o(),n("div",U,s(a+1),1)):i("",!0),t("div",{class:"flex items-center",onClick:nt=>v(e.slug,e._id)},[t("div",G,[r(y,{width:75,height:100,class:"rounded-xl w-[75px] h-[100px] object-cover",src:e.verticalLogo},null,8,["src"])]),t("div",J,[t("h3",K,[r(_,{to:l(h)(e.slug,e._id)},{default:x(()=>[j(s(e.comicName),1)]),_:2},1032,["to"])]),t("span",X,s(e.description),1),t("p",Y," Ch\u01B0\u01A1ng "+s(e.newestChapter),1),t("div",Z,[t("div",tt,[et,t("span",null,s(l(D)(e.viewCount)),1)]),t("div",st,[at,t("span",null," ("+s(e.reviewCount)+") ",1)])])])],8,W)]))),128))])])]))}}});export{_t as default};
