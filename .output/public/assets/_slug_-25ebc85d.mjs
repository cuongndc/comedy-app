import{j as K,d as O,a as G,z as H,A as B,ai as Z,a1 as Q,D as Y,M as q,an as J,P as x,o as m,b as R,f as t,e as z,w as tt,aA as et,u as e,t as n,F as st,r as ot,i as v,c as L,G as N,_ as at,U as ct,aE as it,y as nt,W as lt,X as rt,aL as l,a6 as _t,a7 as dt,aM as ut,aN as mt,aO as pt,aP as xt,Z as vt,aQ as ht,aR as ft}from"./entry-41548e57.mjs";import{u as gt}from"./fetch-0230be40.mjs";import{c as h}from"./index-b351655c.mjs";import bt from"./ComicChapterTab-5a13599a.mjs";import wt from"./ComicTab-9ae7bf30.mjs";import{i as yt}from"./index-95feeb32.mjs";const Ct=O(()=>at(()=>import("./MeeToonImg-121eef16.mjs"),["MeeToonImg-121eef16.mjs","entry-41548e57.mjs","entry.3a105836.css"])),a=_=>(_t("data-v-1857b6fe"),_=_(),dt(),_),kt=a(()=>t("img",{src:ut,alt:"back"},null,-1)),Et=a(()=>t("div",{class:"flex items-center bg-deep-black/50 h-[30px] rounded-2xl px-3 mr-4"},[t("img",{class:"mr-2",src:mt,alt:"report"}),t("span",{class:"text-white text-2xl"},"B\xE1o c\xE1o")],-1)),Tt={class:"fixed top-0 w-full max-w-[768px]"},$t={class:"relative mt-[150px]"},It={class:"px-5",style:{background:"linear-gradient(rgba(17, 18, 23, 0) 0%, rgba(17, 18, 23, 0.5) 33.85%, rgba(17, 18, 23, 0.8) 68.75%, rgb(17, 18, 23) 100%)"}},St={class:"bg-contain p-6 bg-comic flex items-center justify-between rounded-xl",style:{"background-image":"url(/icons/comicPage/backgroundInfo.png)"}},At={class:"left"},Bt={class:"text-ellipsis line-clamp-1 text-3xl font-bold text-white"},Rt={class:"flex flex-wrap"},zt={class:"my-4 flex items-center justify-center rounded-xl text-[#1fcf84] border-[#1fcf84] text-base border-[1px] h-[20px] w-[80px]"},Lt={class:"mx-4 my-4 flex items-center text-gray-50 text-base"},Nt=a(()=>t("img",{src:pt,alt:"view count"},null,-1)),Pt={class:"ml-1"},Dt={class:"mx-4 my-4 flex items-center text-gray-50 text-base"},Ft=a(()=>t("img",{class:"w-[18px] h-[18px]",src:xt,alt:"follow count"},null,-1)),Mt={class:"ml-1"},jt={class:"flex items-center text-base text-gray-50"},Ut=a(()=>t("img",{src:vt,alt:"comment count"},null,-1)),Vt={class:"ml-1"},Xt={class:"right"},Wt={class:"w-[80px] text-center cursor-pointer"},Kt=a(()=>t("p",{class:"text-yellow-400 text-4xl"}," 5 ",-1)),Ot={class:"flex items-center justify-center"},Gt={class:"text-white text-xl"},Ht=a(()=>t("div",{class:"cursor-pointer"},[t("img",{src:ht,alt:"Chia s\u1EBB"})],-1)),Zt=a(()=>t("div",{class:"ml-6 cursor-pointer"},[t("img",{src:ft,alt:"Theo d\xF5i"})],-1)),Qt={class:"relative bg-accent-4"},Yt={class:"whitespace-nowrap overflow-x-auto border-b-[1px solid rgb(27, 28, 35)]"},qt=a(()=>t("span",null,"Gi\u1EDBi thi\u1EC7u",-1)),Jt=[qt],te=a(()=>t("a",null,"\u0110\xE1nh gi\xE1",-1)),ee=[te],se=G({__name:"[slug]",async setup(_){let d,f;const P=H().params,D=B(P.slug),u=B("comic"),c=Z("chapters","$MPIostZ64n"),F=Q(),{data:s,pending:ae,refresh:M}=([d,f]=Y(()=>gt(`/api/novel/${D.value}`,"$yV313FkRXc")),d=await d,f(),d);q(async()=>{!s.value||(c.value=await $fetch("/api/novel/chapters",{params:{novelId:s.value._id}}))}),J(async()=>{yt&&window.scrollTo({top:0,behavior:"smooth"}),await M()});const g=x(()=>u.value===l.comic),b=x(()=>u.value===l.chapter),j=x(()=>u.value===l.review),p=i=>{u.value=i},U=()=>{var i,o;return c.value&&c.value.length>0?ct(`/${it}/${(i=c.value[0])==null?void 0:i.slug}/${(o=c.value[0])==null?void 0:o._id}`):""},V=i=>({backgroundImage:`url(${F.public.imgCDN}${i})`});return(i,o)=>{var w,y,C,k,E,T,$,I,S,A;const X=nt,W=Ct;return m(),R("section",null,[t("div",{style:et(V((w=e(s))==null?void 0:w.verticalLogo)),class:"flex items-center justify-between h-[50px] z-10 fixed top-0 w-full overflow-hidden bg-cover"},[z(X,{class:"ml-4",onClick:o[0]||(o[0]=r=>i.$router.back())},{default:tt(()=>[kt]),_:1}),Et],4),t("div",Tt,[z(W,{class:"relative w-full",src:(y=e(s))==null?void 0:y.verticalLogo},null,8,["src"])]),t("div",$t,[t("div",It,[t("div",St,[t("div",At,[t("div",null,[t("h1",Bt,n((C=e(s))==null?void 0:C.name),1)]),t("div",Rt,[t("div",zt,n(e(lt)[(k=e(s))==null?void 0:k.novelStatus]),1),t("div",Lt,[Nt,t("span",Pt,n(e(h)((E=e(s))==null?void 0:E.viewCount)),1)]),t("div",Dt,[Ft,t("span",Mt,n(e(h)((T=e(s))==null?void 0:T.followingCount)),1)]),t("div",jt,[Ut,t("span",Vt,n(e(h)(($=e(s))==null?void 0:$.totalComment)),1)])])]),t("div",Xt,[t("div",Wt,[Kt,t("div",Ot,[(m(),R(st,null,ot(5,r=>t("img",{key:r,src:rt,alt:"rating"})),64))]),t("div",null,[t("span",Gt,n((I=e(s))==null?void 0:I.reviewCount)+" \u0110\xE1nh gi\xE1",1)])])])])])]),t("div",{class:"bg-footer-comic_page px-3 fixed bottom-0 w-full h-[60px] max-w-[768px] flex items-center z-50"},[Ht,Zt,t("a",{class:"comic-read",onClick:U}," B\u1EAFt \u0111\u1EA7u \u0111\u1ECDc ")]),t("div",Qt,[t("div",Yt,[t("div",{class:v([{active:e(g)},"eKaTWX inline-block"]),onClick:o[1]||(o[1]=r=>p(e(l).comic))},Jt,2),t("div",{class:v([{active:e(b)},"eKaTWX"]),onClick:o[2]||(o[2]=r=>p(e(l).chapter))},[t("a",null,"Chapters ("+n((S=e(c))!=null&&S.length?(A=e(c))==null?void 0:A.length:0)+")",1)],2),t("div",{class:v([{active:e(j)},"eKaTWX"]),onClick:o[3]||(o[3]=r=>p(e(l).review))},ee,2)])]),e(g)?(m(),L(wt,{key:0,comic:e(s)},null,8,["comic"])):N("",!0),e(b)?(m(),L(bt,{key:1,chapters:e(c)},null,8,["chapters"])):N("",!0)])}}});var de=K(se,[["__scopeId","data-v-1857b6fe"]]);export{de as default};
