import{d,a as f,v as p,w as n,ac as x,L as h,o,b as l,f as e,e as t,y as i,u as _,c as y,_ as v,ad as g,ae as w,A as b,af as k}from"./entry-a18a7735.mjs";import C from"./CateList-f4e80b9b.mjs";import E from"./SearchLoading-57e3ce5b.mjs";const $=d(()=>v(()=>import("./ComicItem-7f967daf.mjs"),["ComicItem-7f967daf.mjs","MeeToonImg-3f161fa9.mjs","entry-a18a7735.mjs","entry.d7648aa8.css","index-b351655c.mjs"])),B={class:"bg-white h-[100vh]"},L={class:"flex justify-between justify-center",style:{"box-shadow":"rgb(242 242 242) 0 -1px 0 inset"}},j=e("img",{src:g,alt:"back"},null,-1),A=e("div",{class:"flex items-center justify-center w-[70%] mx-2 my-2 text-4xl text-black font-semibold"}," #Danh m\u1EE5c truy\u1EC7n ",-1),N=e("img",{src:w,alt:"search"},null,-1),P={class:"flex flex-wrap p-4 bg-white"},V={key:1,ref:"scrollComponent",class:"mt-4 overflow-auto scrollbar-hide",style:{height:"calc(100vh - 50px)"}},S=f({__name:"[slug]",setup(z){const r=p().params,m=n(r.slug),s=n(!1),a=x("comics","$r7coXaXPet");return h(async()=>{s.value=!0,a.value=await $fetch(`/api/danh-muc/${m.value}`),s.value=!1}),(I,R)=>{const c=b,u=$;return o(),l("div",B,[e("div",L,[t(c,{to:"/",class:"mx-2 my-2 flex items-center"},{default:i(()=>[j]),_:1}),A,t(c,{to:"/tim-kiem",class:"flex items-center mr-2 h-[40px] w-[30px] mx-2 my-2 rounded-2xl text-white"},{default:i(()=>[N]),_:1})]),e("div",P,[t(C,{categories:_(k)},null,8,["categories"]),s.value?(o(),y(E,{key:0,class:"w-[150px] h-[50px]"})):(o(),l("section",V,[t(u,{comics:_(a)},null,8,["comics"])],512))])])}}});export{S as default};