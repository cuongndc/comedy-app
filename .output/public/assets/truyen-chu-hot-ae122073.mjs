import{a as w,E as v,ap as b,u as i,o as a,c as k,b as c,f as t,e as l,w as m,F as C,r as N,al as E,am as T,y as B,t as s,H as n,U as p,ag as A,Y as F,az as S,aA as V,V as j,G as $}from"./entry-95a94210.mjs";import L from"./MeeToonImg-bc5596ec.mjs";import{u as U}from"./fetch-4d52fed5.mjs";import I from"./SearchLoading-8d92fc5d.mjs";import{c as M}from"./index-b351655c.mjs";import{i as O}from"./index-8f148cb3.mjs";const z={key:1,class:"bg-white h-[100vh]"},D={class:"flex justify-between justify-center",style:{"box-shadow":"rgb(242 242 242) 0 -1px 0 inset"}},G=t("img",{src:E,alt:"back"},null,-1),H=t("div",{class:"flex items-center justify-center w-[70%] mx-2 my-2 text-4xl text-black font-semibold"}," #Truy\u1EC7n ch\u1EEF hot nh\u1EA5t ",-1),J=t("img",{src:T,alt:"search"},null,-1),P={class:"flex flex-wrap bg-white"},Y={class:"mt-4 overflow-auto scrollbar-hide",style:{height:"calc(100vh - 50px)"}},q={key:0,class:"text-4xl px-4 text-red-500"},K={key:1,class:"text-4xl px-4 text-red-400"},Q={key:2,class:"text-4xl px-4 text-red-300"},R={key:3,class:"text-4xl px-4"},W=["onClick"],X={class:"relative"},Z={class:"px-5",style:{width:"calc(100% - 102px)"}},tt={class:"text-xl font-semibold line-clamp-1 mb-1"},et={class:"line-clamp-2 text-primary-gray text-base"},st={class:"text-background my-2 text-base"},at={key:0,class:"text-[red] font-normal pl-2"},ot={class:"text-[#2dcb48] font-normal px-2"},ct={class:"flex items-center"},it={class:"text-primary-gray mb-3 text-base flex items-center mr-4"},nt=t("img",{class:"mr-1 w-6",src:S,alt:""},null,-1),rt={class:"text-primary-gray mb-3 text-base flex items-center"},lt=t("img",{class:"mr-1",src:V,alt:""},null,-1),yt=w({__name:"truyen-chu-hot",async setup(_t){let r,d;const{data:u,pending:f}=([r,d]=v(()=>U("/api/novel/trending","$dlptBOJrF1")),r=await r,d(),r),y=(x,h)=>j($(x,h));return b(()=>{O&&window.scrollTo({top:0,behavior:"smooth"})}),(x,h)=>{const _=B,g=L;return i(f)?(a(),k(I,{key:0,class:"w-[150px] h-[50px]"})):(a(),c("div",z,[t("div",D,[l(_,{to:"/",class:"mx-2 my-2 flex items-center"},{default:m(()=>[G]),_:1}),H,l(_,{to:"/",class:"flex items-center mr-2 h-[40px] w-[30px] mx-2 my-2 rounded-2xl text-white"},{default:m(()=>[J]),_:1})]),t("div",P,[t("section",Y,[(a(!0),c(C,null,N(i(u),(e,o)=>(a(),c("div",{key:e._id,class:"p-4 col-span-1 flex items-center"},[o===0?(a(),c("div",q,s(o+1),1)):n("",!0),o===1?(a(),c("div",K,s(o+1),1)):n("",!0),o===2?(a(),c("div",Q,s(o+1),1)):n("",!0),o>2?(a(),c("div",R,s(o+1),1)):n("",!0),t("div",{class:"flex items-center",onClick:mt=>y(e.slug,e._id)},[t("div",X,[l(g,{width:75,height:100,class:"rounded-xl w-[75px] h-[100px] object-cover",src:e.verticalLogo},null,8,["src"])]),t("div",Z,[t("h3",tt,[l(_,{to:i(A)(e.slug)},{default:m(()=>[p(s(e.name),1)]),_:2},1032,["to"])]),t("span",et,s(e.description),1),t("p",st,[p(" Ch\u01B0\u01A1ng "+s(e.newestChapter)+" ",1),e.adultContent?(a(),c("span",at," 17+ ")):n("",!0),t("span",ot,s(i(F)[e.novelStatus]),1)]),t("div",ct,[t("div",it,[nt,t("span",null,s(i(M)(e.viewCount)),1)]),t("div",rt,[lt,t("span",null," ("+s(e.reviewCount)+") ",1)])])])],8,W)]))),128))])])]))}}});export{yt as default};
