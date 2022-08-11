import{d as X,a as Z,z as tt,A as _,al as M,C as et,N as st,aq as ot,u as a,o as h,b as x,e as C,w as b,U as at,t as l,f as t,aE as i,h as P,au as U,aF as F,F as nt,r as lt,E as it,aG as rt,_ as ct,aH as dt,aI as _t,aJ as ut,k as pt,B as I,ah as mt,aK as ht,aL as xt,aM as ft,aN as vt,aO as gt,aP as wt,W as Ct,X as yt,Y as kt,V as N,af as L}from"./entry-b5225d3d.mjs";import bt from"./PageLoading-57fce9d5.mjs";import{a as Nt}from"./fetch-a362cbd0.mjs";import{o as Lt}from"./index-06a1a6d4.mjs";import{s as c}from"./index-9d82279a.mjs";const $t=X(()=>ct(()=>import("./entry-b5225d3d.mjs").then(function($){return $.aY}),["entry-b5225d3d.mjs","entry.fa0f9e10.css"])),At={key:0},Et={key:1,ref:"scrollComponent",class:"flex h-fit min-h-screen flex-col bg-black scrollbar-hide"},zt={class:"relative flex h-fit flex-1 text-white"},St=["onClick"],jt={class:"flex h-full w-full items-center justify-between text-lg md:text-2xl bg-black/40"},Bt=t("img",{src:dt,alt:"back"},null,-1),Tt={class:"text-2xl font-semibold text-white"},Vt=t("img",{src:_t,alt:"arrow down"},null,-1),Dt=t("div",{class:"mr-4"},[t("img",{src:ut,alt:"report"})],-1),Ht={class:"flex justify-around h-full"},Mt=pt('<div class="flex align-center w-[30px] ml-3"><img src="'+ht+'" alt="follow"></div><div class="flex align-center w-[30px]"><img src="'+xt+'" alt="comment"></div><div class="flex align-center w-[30px]"><img src="'+ft+'" alt="share"></div>',3),Pt=t("img",{src:vt,alt:"setting"},null,-1),Ut=[Pt],Ft=t("img",{src:gt,alt:"setting"},null,-1),It=[Ft],Rt=t("img",{src:wt,alt:"setting"},null,-1),Ot=[Rt],Yt={class:"setting-font flex items-center justify-around h-full"},Gt=["onClick"],Qt=["onClick"],qt=["onClick"],Jt={class:"absolute w-full"},Kt=t("div",{class:"rounded-l-2xl rounded-r-2xl px-5 py-5"},[t("h3",{class:"text-white text-3xl"}," Chapters ")],-1),Wt={class:"px-5 py-5 cursor-pointe"},Xt=["onClick"],Zt={class:"text-xl mb-4"},te={class:"flex"},ee={class:"mr-8 text-primary-gray text-2xl flex items-center"},se={class:"mr-[17px] flex items-center justify-center text-2xl"},oe=t("img",{class:"mr-2",src:Ct,alt:"view"},null,-1),ae={class:"text-primary-gray"},ne={class:"mr-8 flex items-center justify-center text-2xl"},le=t("img",{class:"mr-2",src:yt,alt:"like"},null,-1),ie={class:"text-primary-gray"},re={class:"flex items-center justify-center mr-4 text-2xl"},ce=t("img",{class:"mr-2",src:kt,alt:"comment"},null,-1),de={class:"text-primary-gray"},_e={class:"px-7 pt-[60px] font-[Literata] text-3xl"},ue=["innerHTML"],ge=Z({__name:"[_id]",async setup($){let f,A;const R=tt().params,O=_(R.chapter_slug),E=M("novelInfo","$cwyGjVa8vQ"),u=M("chapters","$k69yApPceL"),v=_(!0),g=_(!1),d=_(15),z=_(null),y=_(!1);Lt(z,o=>c(y,!1));const{pending:Y,data:n,refresh:G}=([f,A]=et(()=>Nt("/api/novel/read-novel",{params:{slug:O.value}},"$he2fwTMN6A")),f=await f,A(),f);st(async()=>{var o,s;u.value||(E.value=await $fetch("/api/novel/information",{params:{novelId:(o=n.value)==null?void 0:o.novel._id}}),c(u,(s=E.value)==null?void 0:s.chapters))}),ot(()=>{G()});const Q=()=>{c(d,d.value-1)},q=()=>{c(d,d.value+1)},J=()=>{c(d,15)},K=()=>{c(v,!v.value),c(g,!1)},W=o=>N(`/${L}/${o}}`),S=async o=>{var w;const s=(w=n.value)==null?void 0:w.chapter.chapterNum;if(o==="next"){const p=s+1,r=u.value.find(m=>m.chapterNum===p);N({path:`/${L}/${r.slug}/${r._id}`,replace:!0})}if(o==="prev"){const p=s-1,r=u.value.find(m=>m.chapterNum===p);N({path:`/${L}/${r.slug}/${r._id}`,replace:!0})}};return(o,s)=>{var j,B,T,V,D,H;const w=bt,p=I("Title"),r=I("Head"),m=$t;return a(Y)?(h(),x("div",At,[C(w)])):(h(),x("div",Et,[C(r,null,{default:b(()=>[C(p,null,{default:b(()=>{var e,k;return[at(l((e=a(n).novel)==null?void 0:e.name)+" | Ch\u01B0\u01A1ng "+l((k=a(n))==null?void 0:k.chapter.chapterNum),1)]}),_:1})]),_:1}),t("div",zt,[t("div",{class:"h-fit min-h-screen w-full bg-[#f8f3e6] text-black",onClick:i(K,["prevent"])},[t("div",{class:P([{"top-0":v.value},"ease-in-out duration-300 fixed top-[-70px] left-0 z-[999] h-[44px] w-full"])},[t("div",jt,[C(m,{to:a(mt)((j=a(n).novel)==null?void 0:j.slug),class:"w-[30px] h-[30px] flex ml-4"},{default:b(()=>[Bt]),_:1},8,["to"]),t("div",{class:"flex align-center",onClick:s[0]||(s[0]=i(e=>y.value=!0,["stop"]))},[t("span",Tt," Ch\u01B0\u01A1ng "+l((B=a(n))==null?void 0:B.chapter.chapterNum),1),Vt]),Dt])],2),t("footer",{class:P(["fixed bottom-[-70px] h-[70px] bg-black/40 backdrop-blur-xl w-full ease-in-out duration-300",{"bottom-0":v.value}])},[U(t("div",Ht,[Mt,t("div",{class:"flex align-center w-[30px]",onClick:s[1]||(s[1]=i(e=>g.value=!0,["stop"]))},Ut),t("div",{class:"flex align-center w-[30px]",onClick:s[2]||(s[2]=i(e=>S("prev"),["stop"]))},It),t("div",{class:"flex align-center w-[30px] mr-3",onClick:s[3]||(s[3]=i(e=>S("next"),["stop"]))},Ot)],512),[[F,!g.value]]),U(t("div",Yt,[t("div",{class:"flex items-center justify-center w-[95px] h-[30px] border-[1px] border-white rounded-2xl text-white text-center",onClick:i(Q,["stop"])}," A ",8,Gt),t("div",{class:"flex items-center justify-center w-[95px] h-[30px] border-[1px] border-white rounded-2xl text-white text-center",onClick:i(q,["stop"])}," A+ ",8,Qt),t("div",{class:"flex items-center justify-center w-[95px] h-[30px] border-[1px] border-white rounded-2xl text-white text-center",onClick:i(J,["stop"])}," M\u1EB7c \u0111\u1ECBnh ",8,qt)],512),[[F,g.value]])],2),y.value?(h(),x("div",{key:0,ref_key:"chapterListEL",ref:z,class:"fixed z-[9999] bottom-0 w-full h-full h-[90%] bg-accent-4 overflow-auto scrollbar-hide"},[t("div",Jt,[Kt,(h(!0),x(nt,null,lt(a(u),e=>(h(),x("div",{key:e._id,class:"relative",style:{"border-bottom":"1px solid rgb(27, 28, 35)"}},[t("div",Wt,[t("a",{onClick:k=>W(e.slug)},[t("h3",Zt,[t("b",null," Ch\u01B0\u01A1ng "+l(e.chapterNum),1)]),t("div",te,[t("p",ee,l(new Date(e.createdAt).toLocaleDateString()),1),t("div",se,[oe,t("span",ae,l(e.totalView?o.convertUnit(e.totalView):0),1)]),t("div",ne,[le,t("span",ie,l(e.totalLike?o.convertUnit(e.totalLike):0),1)]),t("div",re,[ce,t("span",de,l(e.totalComment?o.convertUnit(e.totalComment):0),1)])])],8,Xt)])]))),128))])],512)):it("",!0),t("div",null,[t("h1",_e," Ch\u01B0\u01A1ng "+l((T=a(n))==null?void 0:T.chapter.chapterNum)+": "+l((V=a(n))!=null&&V.chapter.chapterName?(D=a(n))==null?void 0:D.chapter.chapterName:"..."),1),t("div",{style:rt({"font-size":`${d.value}px`}),class:"px-7 pt-10 chapter-content font-[Literata]",innerHTML:(H=a(n))==null?void 0:H.chapter.content},null,12,ue)])],8,St)])],512))}}});export{ge as default};
