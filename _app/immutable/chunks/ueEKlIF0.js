import{s as N,n as u,d as c,i as _,f as d,h as f,b as h,j as p,c as F,e as m,a as O,A as b,L as C,J as k,y as P,g as T,x as E,k as v,t as g}from"./Bn2cRfhZ.js";import{h as I,u as q}from"./CZGLW5tc.js";import{S as B,i as S}from"./BxmJgAAM.js";function w(a){let e,s;return{c(){e=m("img"),this.h()},l(t){e=h(t,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){C(e.src,s=a[0])||f(e,"src",s),f(e,"alt",a[1]),f(e,"class","svelte-hsw465"),k(e,"smaller",a[3]!=null),k(e,"shimmer",a[2])},m(t,l){_(t,e,l)},p(t,l){l&1&&!C(e.src,s=t[0])&&f(e,"src",s),l&2&&f(e,"alt",t[1]),l&8&&k(e,"smaller",t[3]!=null),l&4&&k(e,"shimmer",t[2])},d(t){t&&c(e)}}}function A(a){let e,s,t={ctx:a,current:null,token:null,hasCatch:!1,pending:R,then:J,catch:j,value:3};return I(s=a[3],t),{c(){e=b(),t.block.c()},l(l){e=b(),t.block.l(l)},m(l,i){_(l,e,i),t.block.m(l,t.anchor=i),t.mount=()=>e.parentNode,t.anchor=e},p(l,i){a=l,t.ctx=a,i&8&&s!==(s=a[3])&&I(s,t)||q(t,a,i)},d(l){l&&c(e),t.block.d(l),t.token=null,t=null}}}function j(a){return{c:u,l:u,m:u,p:u,d:u}}function J(a){let e,s=a[3]!=null&&G(a);return{c(){s&&s.c(),e=b()},l(t){s&&s.l(t),e=b()},m(t,l){s&&s.m(t,l),_(t,e,l)},p(t,l){t[3]!=null?s?s.p(t,l):(s=G(t),s.c(),s.m(e.parentNode,e)):s&&(s.d(1),s=null)},d(t){t&&c(e),s&&s.d(t)}}}function G(a){let e;function s(i,r){return typeof i[3]=="string"?M:L}let t=s(a),l=t(a);return{c(){l.c(),e=b()},l(i){l.l(i),e=b()},m(i,r){l.m(i,r),_(i,e,r)},p(i,r){t===(t=s(i))&&l?l.p(i,r):(l.d(1),l=t(i),l&&(l.c(),l.m(e.parentNode,e)))},d(i){i&&c(e),l.d(i)}}}function L(a){let e,s,t,l=a[3].author+"",i,r;return{c(){e=m("figcaption"),s=g("By "),t=m("a"),i=g(l),this.h()},l(n){e=h(n,"FIGCAPTION",{class:!0});var o=p(e);s=v(o,"By "),t=h(o,"A",{href:!0});var y=p(t);i=v(y,l),y.forEach(c),o.forEach(c),this.h()},h(){f(t,"href",r=a[3].link),f(e,"class","svelte-hsw465")},m(n,o){_(n,e,o),d(e,s),d(e,t),d(t,i)},p(n,o){o&8&&l!==(l=n[3].author+"")&&E(i,l),o&8&&r!==(r=n[3].link)&&f(t,"href",r)},d(n){n&&c(e)}}}function M(a){let e,s=a[3]+"",t;return{c(){e=m("figcaption"),t=g(s),this.h()},l(l){e=h(l,"FIGCAPTION",{class:!0});var i=p(e);t=v(i,s),i.forEach(c),this.h()},h(){f(e,"class","svelte-hsw465")},m(l,i){_(l,e,i),d(e,t)},p(l,i){i&8&&s!==(s=l[3]+"")&&E(t,s)},d(l){l&&c(e)}}}function R(a){let e,s="Getting attribution...";return{c(){e=m("figcaption"),e.textContent=s,this.h()},l(t){e=h(t,"FIGCAPTION",{class:!0,"data-svelte-h":!0}),T(e)!=="svelte-1m345tn"&&(e.textContent=s),this.h()},h(){f(e,"class","svelte-hsw465"),P(e,"visibility","hidden")},m(t,l){_(t,e,l)},p:u,d(t){t&&c(e)}}}function U(a){let e,s=a[0],t,l=w(a),i=a[3]&&A(a);return{c(){e=m("figure"),l.c(),t=O(),i&&i.c(),this.h()},l(r){e=h(r,"FIGURE",{class:!0});var n=p(e);l.l(n),t=F(n),i&&i.l(n),n.forEach(c),this.h()},h(){f(e,"class","svelte-hsw465")},m(r,n){_(r,e,n),l.m(e,null),d(e,t),i&&i.m(e,null)},p(r,[n]){n&1&&N(s,s=r[0])?(l.d(1),l=w(r),l.c(),l.m(e,t)):l.p(r,n),r[3]?i?i.p(r,n):(i=A(r),i.c(),i.m(e,null)):i&&(i.d(1),i=null)},i:u,o:u,d(r){r&&c(e),l.d(r),i&&i.d()}}}function z(a,e,s){let{src:t}=e,{attribution:l=void 0}=e,{alt:i}=e,{shimmer:r=!1}=e;return a.$$set=n=>{"src"in n&&s(0,t=n.src),"attribution"in n&&s(3,l=n.attribution),"alt"in n&&s(1,i=n.alt),"shimmer"in n&&s(2,r=n.shimmer)},[t,i,r,l]}class Q extends B{constructor(e){super(),S(this,e,z,U,N,{src:0,attribution:3,alt:1,shimmer:2})}}export{Q as A};
