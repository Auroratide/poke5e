import{H as k,I as m,J as l,K as p}from"./H7NYa443.js";import{g,t as v,e as i,a as N}from"./DYRzBe43.js";function I(e,t){const n=t.token={};function r(s,c,_,d){if(t.token!==n)return;t.resolved=d;let u=t.ctx;_!==void 0&&(u=u.slice(),u[_]=d);const a=s&&(t.current=s)(u);let b=!1;t.block&&(t.blocks?t.blocks.forEach((h,o)=>{o!==c&&h&&(g(),v(h,1,1,()=>{t.blocks[o]===h&&(t.blocks[o]=null)}),i())}):t.block.d(1),a.c(),N(a,1),a.m(t.mount(),t.anchor),b=!0),t.block=a,t.blocks&&(t.blocks[c]=a),b&&p()}if(k(e)){const s=m();if(e.then(c=>{l(s),r(t.then,1,t.value,c),l(null)},c=>{if(l(s),r(t.catch,2,t.error,c),l(null),!t.hasCatch)throw c}),t.current!==t.pending)return r(t.pending,0),!0}else{if(t.current!==t.then)return r(t.then,1,t.value,e),!0;t.resolved=e}}function E(e,t,n){const r=t.slice(),{resolved:s}=e;e.current===e.then&&(r[e.value]=s),e.current===e.catch&&(r[e.error]=s),e.block.p(r,n)}var x=(e=>(e.Male="male",e.Female="female",e.None="none",e.Other="other",e))(x||{});const y=["reckless","rash","brave","arrogant","skittish","hasty","energetic","clumsy","apathetic","stubborn","grumpy","relaxed","careful","curious","naughty","cheerful","sassy","innocent","hardy","nimble"],F="other",H=e=>y.includes(e);export{F as C,x as G,y as N,I as h,H as i,E as u};
