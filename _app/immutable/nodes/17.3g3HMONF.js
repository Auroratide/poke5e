import{e as O}from"../chunks/index.CzR0xuCU.js";import{b as y}from"../chunks/paths.BknzQtcT.js";import{s as S,e as u,a as T,b as p,g as M,c as L,f as _,d as c,h,i as f,n as x,y as z,t as A,k as H,j as C,x as N}from"../chunks/scheduler.-RKjxNWI.js";import{S as q,i as I,c as $,a as g,m as d,t as v,b as k,d as b}from"../chunks/index.CKbqrZqE.js";import{L as U}from"../chunks/_layout.I9Z_pbfZ.js";import{P as B}from"../chunks/PokeMove.D3SCi7js.js";import{T as D}from"../chunks/Title.CyQOXNIE.js";import{e as w}from"../chunks/each.DLVsBx_3.js";const F=async({fetch:l,params:e})=>l(`${y}/tms/${e.id}.json`).then(async o=>{if(o.status===404)O(404);else return{tm:await o.json()}}),se=Object.freeze(Object.defineProperty({__proto__:null,load:F},Symbol.toStringTag,{value:"Module"}));function E(l,e,o){const t=l.slice();return t[1]=e[o],t}function P(l){let e,o,t=l[1].name+"",a,n;return{c(){e=u("li"),o=u("a"),a=A(t),this.h()},l(s){e=p(s,"LI",{});var r=_(e);o=p(r,"A",{href:!0});var m=_(o);a=H(m,t),m.forEach(c),r.forEach(c),this.h()},h(){h(o,"href",n=y+"/pokemon/"+l[1].id)},m(s,r){f(s,e,r),C(e,o),C(o,a)},p(s,r){r&1&&t!==(t=s[1].name+"")&&N(a,t),r&1&&n!==(n=y+"/pokemon/"+s[1].id)&&h(o,"href",n)},d(s){s&&c(e)}}}function G(l){let e,o="Can teach this to:",t,a,n=w(l[0]),s=[];for(let r=0;r<n.length;r+=1)s[r]=P(E(l,n,r));return{c(){e=u("h2"),e.textContent=o,t=T(),a=u("ul");for(let r=0;r<s.length;r+=1)s[r].c();this.h()},l(r){e=p(r,"H2",{class:!0,"data-svelte-h":!0}),M(e)!=="svelte-ats20a"&&(e.textContent=o),t=L(r),a=p(r,"UL",{class:!0});var m=_(a);for(let i=0;i<s.length;i+=1)s[i].l(m);m.forEach(c),this.h()},h(){h(e,"class","svelte-1jbv3qu"),h(a,"class","svelte-1jbv3qu")},m(r,m){f(r,e,m),f(r,t,m),f(r,a,m);for(let i=0;i<s.length;i+=1)s[i]&&s[i].m(a,null)},p(r,[m]){if(m&1){n=w(r[0]);let i;for(i=0;i<n.length;i+=1){const j=E(r,n,i);s[i]?s[i].p(j,m):(s[i]=P(j),s[i].c(),s[i].m(a,null))}for(;i<s.length;i+=1)s[i].d(1);s.length=n.length}},i:x,o:x,d(r){r&&(c(e),c(t),c(a)),z(s,r)}}}function J(l,e,o){let{pokemon:t}=e;return l.$$set=a=>{"pokemon"in a&&o(0,t=a.pokemon)},[t]}class K extends q{constructor(e){super(),I(this,e,J,G,S,{pokemon:0})}}function Q(l){let e,o,t;return o=new K({props:{pokemon:l[0].pokemon}}),{c(){e=u("section"),$(o.$$.fragment),this.h()},l(a){e=p(a,"SECTION",{slot:!0});var n=_(e);g(o.$$.fragment,n),n.forEach(c),this.h()},h(){h(e,"slot","extra")},m(a,n){f(a,e,n),d(o,e,null),t=!0},p(a,n){const s={};n&1&&(s.pokemon=a[0].pokemon),o.$set(s)},i(a){t||(v(o.$$.fragment,a),t=!0)},o(a){k(o.$$.fragment,a),t=!1},d(a){a&&c(e),b(o)}}}function R(l){let e,o;return e=new B({props:{move:l[1],$$slots:{extra:[Q]},$$scope:{ctx:l}}}),{c(){$(e.$$.fragment)},l(t){g(e.$$.fragment,t)},m(t,a){d(e,t,a),o=!0},p(t,a){const n={};a&2&&(n.move=t[1]),a&9&&(n.$$scope={dirty:a,ctx:t}),e.$set(n)},i(t){o||(v(e.$$.fragment,t),o=!0)},o(t){k(e.$$.fragment,t),o=!1},d(t){b(e,t)}}}function V(l){let e,o,t,a;return e=new D({props:{value:l[1].name}}),t=new U({props:{$$slots:{default:[R]},$$scope:{ctx:l}}}),{c(){$(e.$$.fragment),o=T(),$(t.$$.fragment)},l(n){g(e.$$.fragment,n),o=L(n),g(t.$$.fragment,n)},m(n,s){d(e,n,s),f(n,o,s),d(t,n,s),a=!0},p(n,[s]){const r={};s&2&&(r.value=n[1].name),e.$set(r);const m={};s&11&&(m.$$scope={dirty:s,ctx:n}),t.$set(m)},i(n){a||(v(e.$$.fragment,n),v(t.$$.fragment,n),a=!0)},o(n){k(e.$$.fragment,n),k(t.$$.fragment,n),a=!1},d(n){n&&c(o),b(e,n),b(t,n)}}}function W(l,e,o){let t,a,{data:n}=e;return l.$$set=s=>{"data"in s&&o(2,n=s.data)},l.$$.update=()=>{l.$$.dirty&4&&o(0,t=n.tm),l.$$.dirty&1&&o(1,a=t.moveInfo)},[t,a,n]}class re extends q{constructor(e){super(),I(this,e,W,V,S,{data:2})}}export{re as component,se as universal};
