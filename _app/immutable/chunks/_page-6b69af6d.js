import{c as t}from"./shared-23917130.js";const n=async({fetch:e})=>({pokemon:await e(`${t}/pokemon.json`).then(o=>o.json()).then(o=>o.items)}),r=Object.freeze(Object.defineProperty({__proto__:null,load:n},Symbol.toStringTag,{value:"Module"}));export{r as _,n as l};