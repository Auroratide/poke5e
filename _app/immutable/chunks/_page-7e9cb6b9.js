import{e as r}from"./index-e9ed3a62.js";import{b as a}from"./paths-6cd3a76e.js";const s=async({fetch:e,params:o})=>e(`${a}/tms/${o.id}.json`).then(async t=>{if(t.status===404)throw r(404);return{tm:await t.json()}}),i=Object.freeze(Object.defineProperty({__proto__:null,load:s},Symbol.toStringTag,{value:"Module"}));export{i as _,s as l};
