import{d as u,a as d,z as p,A as n,ak as x,N as f,o as s,b as l,f as e,e as o,w as _,c as h,u as y,_ as g,al as v,am as w,y as b}from"./entry-4cf3738f.mjs";import k from"./SearchLoading-5e7619ef.mjs";const C=u(()=>g(()=>import("./ComicItem-ebdca6f9.mjs"),["ComicItem-ebdca6f9.mjs","MeeToonImg-49cf5fba.mjs","entry-4cf3738f.mjs","entry.e4f449b8.css","index-b351655c.mjs"])),E={class:"bg-white h-[100vh]"},B={class:"flex justify-between justify-center",style:{"box-shadow":"rgb(242 242 242) 0 -1px 0 inset"}},N=e("img",{src:v,alt:"back"},null,-1),$=e("div",{class:"flex items-center justify-center w-[70%] mx-2 my-2 text-4xl text-black font-semibold"}," #Danh m\u1EE5c truy\u1EC7n ",-1),j=e("img",{src:w,alt:"search"},null,-1),z={class:"flex flex-wrap p-4 bg-white"},A={key:1,ref:"scrollComponent",class:"mt-4 overflow-auto scrollbar-hide",style:{height:"calc(100vh - 50px)"}},J=d({__name:"[slug]",setup(L){const i=p().params,m=n(i.slug),t=n(!1),a=x("comics","$JxmghgctY5");return f(async()=>{t.value=!0,a.value=await $fetch(`/api/tag/${m.value}`),t.value=!1}),(D,I)=>{const c=b,r=C;return s(),l("div",E,[e("div",B,[o(c,{to:"/",class:"mx-2 my-2 flex items-center"},{default:_(()=>[N]),_:1}),$,o(c,{to:"/tim-kiem",class:"flex items-center mr-2 h-[40px] w-[30px] mx-2 my-2 rounded-2xl text-white"},{default:_(()=>[j]),_:1})]),e("div",z,[t.value?(s(),h(k,{key:0,class:"w-[150px] h-[50px]"})):(s(),l("section",A,[o(r,{comics:y(a)},null,8,["comics"])],512))])])}}});export{J as default};
