import{O as k,aq as F,ar as v}from"./entry-61439e31.mjs";function O(s,t,a){const[e,c]=typeof t=="string"?[{},t]:[t,a],o=e.key||c;if(!o||typeof o!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+o);if(!s)throw new Error("[nuxt] [useFetch] request is missing.");const u="$f"+o,r=k(()=>{let n=s;return typeof n=="function"&&(n=n()),F(n)?n.value:n}),{server:i,lazy:f,default:y,transform:h,pick:p,watch:l,initialCache:m,...w}=e,D={...w,cache:typeof e.cache=="boolean"?void 0:e.cache},d={server:i,lazy:f,default:y,transform:h,pick:p,initialCache:m,watch:[r,...l||[]]};return v(u,()=>$fetch(r.value,D),d,"$Y1nhoWDLED")}function z(s,t,a){const[e,c]=typeof t=="string"?[{},t]:[t,a];return O(s,{...e,lazy:!0},c)}export{z as a,O as u};
