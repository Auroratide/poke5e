import{H as m,I as d,J as u,K as p}from"./H7NYa443.js";import{g as v,t as g,e as x,a as w}from"./DYRzBe43.js";function H(e,t){const h=t.token={};function c(r,s,o,k){if(t.token!==h)return;t.resolved=k;let a=t.ctx;o!==void 0&&(a=a.slice(),a[o]=k);const l=r&&(t.current=r)(a);let b=!1;t.block&&(t.blocks?t.blocks.forEach((n,_)=>{_!==s&&n&&(v(),g(n,1,1,()=>{t.blocks[_]===n&&(t.blocks[_]=null)}),x())}):t.block.d(1),l.c(),w(l,1),l.m(t.mount(),t.anchor),b=!0),t.block=l,t.blocks&&(t.blocks[s]=l),b&&p()}if(m(e)){const r=d();if(e.then(s=>{u(r),c(t.then,1,t.value,s),u(null)},s=>{if(u(r),c(t.catch,2,t.error,s),u(null),!t.hasCatch)throw s}),t.current!==t.pending)return c(t.pending,0),!0}else{if(t.current!==t.then)return c(t.then,1,t.value,e),!0;t.resolved=e}}function I(e,t,h){const c=t.slice(),{resolved:r}=e;e.current===e.then&&(c[e.value]=r),e.current===e.catch&&(c[e.error]=r),e.block.p(c,h)}var C=(e=>(e.Male="male",e.Female="female",e.None="none",e.Other="other",e))(C||{});export{C as G,H as h,I as u};
