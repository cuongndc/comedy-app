import{Q as k,aC as F,aD as v}from"./entry-2f3658bf.mjs";function _(s,t,a){const[e,c]=typeof t=="string"?[{},t]:[t,a],o=e.key||c;if(!o||typeof o!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+o);if(!s)throw new Error("[nuxt] [useFetch] request is missing.");const u="$f"+o,r=k(()=>{let n=s;return typeof n=="function"&&(n=n()),F(n)?n.value:n}),{server:i,lazy:f,default:y,transform:h,pick:p,watch:l,initialCache:D,...m}=e,w={...m,cache:typeof e.cache=="boolean"?void 0:e.cache},d={server:i,lazy:f,default:y,transform:h,pick:p,initialCache:D,watch:[r,...l||[]]};return v(u,()=>$fetch(r.value,w),d,"$Y1nhoWDLED")}function E(s,t,a){const[e,c]=typeof t=="string"?[{},t]:[t,a];return _(s,{...e,lazy:!0},c)}export{E as a,_ as u};