import{a as w,C as v,aq as b,u as n,o as a,c as k,b as c,f as t,e as _,w as x,F as C,r as N,am as B,an as E,y as T,t as s,E as i,U as h,af as $,Y as A,aA as F,aB as S,V,D as j}from"./entry-e57c9408.mjs";import L from"./MeeToonImg-5e35f600.mjs";import{u as U}from"./fetch-eded2b7d.mjs";import D from"./SearchLoading-f0247a97.mjs";import{c as I}from"./index-b351655c.mjs";import{i as M}from"./index-e38c411c.mjs";const O={key:1,class:"bg-white h-[100vh]"},q={class:"flex justify-between justify-center",style:{"box-shadow":"rgb(242 242 242) 0 -1px 0 inset"}},J=t("img",{src:B,alt:"back"},null,-1),P=t("div",{class:"flex items-center justify-center w-[70%] mx-2 my-2 text-4xl text-black font-semibold"}," #Truy\u1EC7n ch\u1EEF hot nh\u1EA5t ",-1),Y=t("img",{src:E,alt:"search"},null,-1),z={class:"flex flex-wrap bg-white"},G={class:"mt-4 overflow-auto scrollbar-hide",style:{height:"calc(100vh - 50px)"}},H={key:0,class:"text-4xl px-4 text-red-500"},K={key:1,class:"text-4xl px-4 text-red-400"},Q={key:2,class:"text-4xl px-4 text-red-300"},R={key:3,class:"text-4xl px-4"},W=["onClick"],X={class:"relative"},Z={class:"px-5",style:{width:"calc(100% - 102px)"}},tt={class:"text-xl font-semibold line-clamp-1 mb-1"},et={class:"line-clamp-2 text-primary-gray text-base"},st={class:"text-background my-2 text-base"},at={key:0,class:"text-[red] font-normal pl-2"},ot={class:"text-[#2dcb48] font-normal px-2"},ct={class:"flex items-center"},nt={class:"text-primary-gray mb-3 text-base flex items-center mr-4"},it=t("img",{class:"mr-1 w-6",src:F,alt:""},null,-1),rt={class:"text-primary-gray mb-3 text-base flex items-center"},lt=t("img",{class:"mr-1",src:S,alt:""},null,-1),yt=w({__name:"truyen-chu-hot",async setup(_t){let r,p;const{data:u,pending:f}=([r,p]=v(()=>U("/api/novel/trending","$dlptBOJrF1")),r=await r,p(),r),y=(m,l)=>V(j(m,l));return b(()=>{M&&window.scrollTo({top:0,behavior:"smooth"})}),(m,l)=>{const d=T,g=L;return n(f)?(a(),k(D,{key:0,class:"w-[150px] h-[50px]"})):(a(),c("div",O,[t("div",q,[_(d,{class:"mx-2 my-2 flex items-center",onClick:l[0]||(l[0]=e=>m.$router.back())},{default:x(()=>[J]),_:1}),P,_(d,{to:"/",class:"flex items-center mr-2 h-[40px] w-[30px] mx-2 my-2 rounded-2xl text-white"},{default:x(()=>[Y]),_:1})]),t("div",z,[t("section",G,[(a(!0),c(C,null,N(n(u),(e,o)=>(a(),c("div",{key:e._id,class:"p-4 col-span-1 flex items-center"},[o===0?(a(),c("div",H,s(o+1),1)):i("",!0),o===1?(a(),c("div",K,s(o+1),1)):i("",!0),o===2?(a(),c("div",Q,s(o+1),1)):i("",!0),o>2?(a(),c("div",R,s(o+1),1)):i("",!0),t("div",{class:"flex items-center",onClick:mt=>y(e.slug,e._id)},[t("div",X,[_(g,{width:75,height:100,class:"rounded-xl w-[75px] h-[100px] object-cover",src:e.verticalLogo},null,8,["src"])]),t("div",Z,[t("h3",tt,[_(d,{to:n($)(e.slug)},{default:x(()=>[h(s(e.name),1)]),_:2},1032,["to"])]),t("span",et,s(e.description),1),t("p",st,[h(" Ch\u01B0\u01A1ng "+s(e.newestChapter)+" ",1),e.adultContent?(a(),c("span",at," 17+ ")):i("",!0),t("span",ot,s(n(A)[e.novelStatus]),1)]),t("div",ct,[t("div",nt,[it,t("span",null,s(n(I)(e.viewCount)),1)]),t("div",rt,[lt,t("span",null," ("+s(e.reviewCount)+") ",1)])])])],8,W)]))),128))])])]))}}});export{yt as default};