import{a as f,d as p,l as d,m as n,a2 as x,G as h,o,b as i,f as e,e as t,w as l,u as _,c as y,_ as v,s as g,a3 as w}from"./entry.bd086d26.mjs";import{_ as b,a as k}from"./icon-search.4c3f9bdf.mjs";import{_ as C}from"./CateList.vue_vue_type_script_setup_true_lang.6be97c83.mjs";import{_ as E}from"./SearchLoading.vue_vue_type_script_setup_true_lang.8b7553fe.mjs";const $=p(()=>v(()=>import("./ComicItem.56c9839b.mjs"),["assets/ComicItem.56c9839b.mjs","assets/MeeToonImg.vue_vue_type_script_setup_true_lang.8429f958.mjs","assets/entry.bd086d26.mjs","assets/entry.75345f29.css","assets/index.b31a4486.mjs"])),B={class:"bg-white h-[100vh]"},L={class:"flex justify-between justify-center",style:{"box-shadow":"rgb(242 242 242) 0 -1px 0 inset"}},j=e("img",{src:b,alt:"back"},null,-1),M=e("div",{class:"flex items-center justify-center w-[70%] mx-2 my-2 text-4xl text-black font-semibold"}," #Danh m\u1EE5c truy\u1EC7n ",-1),N=e("img",{src:k,alt:"search"},null,-1),V={class:"flex flex-wrap p-4 bg-white"},z={key:1,ref:"scrollComponent",class:"mt-4 overflow-auto scrollbar-hide",style:{height:"calc(100vh - 50px)"}},S=f({__name:"[slug]",setup(A){const r=d().params,m=n(r.slug),s=n(!1),a=x("comics","$EqMMiGvL00");return h(async()=>{s.value=!0,a.value=await $fetch(`/api/danh-muc/${m.value}`),s.value=!1}),(G,I)=>{const c=g,u=$;return o(),i("div",B,[e("div",L,[t(c,{to:"/",class:"mx-2 my-2 flex items-center"},{default:l(()=>[j]),_:1}),M,t(c,{to:"/tim-kiem",class:"flex items-center mr-2 h-[40px] w-[30px] mx-2 my-2 rounded-2xl text-white"},{default:l(()=>[N]),_:1})]),e("div",V,[t(C,{categories:_(w)},null,8,["categories"]),s.value?(o(),y(E,{key:0,class:"w-[150px] h-[50px]"})):(o(),i("section",z,[t(u,{comics:_(a)},null,8,["comics"])],512))])])}}});export{S as default};
