import{d as a,_ as c,o as E,c as f,n as k,g as v,u as t}from"./entry-a18a7735.mjs";const P={__name:"nuxt-error-page",props:{error:Object},setup(p){var o;const e=p.error;(e.stack||"").split(`
`).splice(1).map(s=>({text:s.replace("webpack:/","").replace(".vue",".js").trim(),internal:s.includes("node_modules")&&!s.includes(".cache")||s.includes("internal")||s.includes("new Promise")})).map(s=>`<span class="stack${s.internal?" internal":""}">${s.text}</span>`).join(`
`);const r=String(e.statusCode||500),n=r==="404",i=(o=e.statusMessage)!=null?o:n?"Page Not Found":"Internal Server Error",u=e.message||e.toString(),_=void 0,d=a(()=>c(()=>import("./error-404-6c1cfba8.mjs"),["error-404-6c1cfba8.mjs","error-404.314f7075.css","entry-a18a7735.mjs","entry.d7648aa8.css"])),l=a(()=>c(()=>import("./error-500-08a5e122.mjs"),["error-500-08a5e122.mjs","error-500.4e3461e5.css","entry-a18a7735.mjs","entry.d7648aa8.css"])),m=n?d:l;return(s,g)=>(E(),f(t(m),k(v({statusCode:t(r),statusMessage:t(i),description:t(u),stack:t(_)})),null,16))}};var j=P;export{j as default};
