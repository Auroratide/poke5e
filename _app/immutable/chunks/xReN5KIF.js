import{s as b,d as c,i as v,b as d,e as m,f as p,h as u,c as $,j as _,a as g,x as k,k as y,t as L}from"./CWYpsIRk.js";import{S as E,i as P,d as D,t as I,a as S,m as V,c as j,b as q}from"./DBKEUvF-.js";import{P as w}from"./BEuLh5bB.js";function h(l){let e,s;return{c(){e=_("p"),s=L(l[0]),this.h()},l(a){e=p(a,"P",{class:!0});var i=u(e);s=y(i,l[0]),i.forEach(c),this.h()},h(){m(e,"class","svelte-nd9r2y")},m(a,i){v(a,e,i),d(e,s)},p(a,i){i&1&&k(s,a[0])},d(a){a&&c(e)}}}function C(l){let e,s,a,i,f;a=new w({props:{label:l[0]??"Loading"}});let t=l[0]&&h(l);return{c(){e=_("div"),s=_("div"),q(a.$$.fragment),i=g(),t&&t.c(),this.h()},l(n){e=p(n,"DIV",{class:!0});var o=u(e);s=p(o,"DIV",{class:!0});var r=u(s);j(a.$$.fragment,r),r.forEach(c),i=$(o),t&&t.l(o),o.forEach(c),this.h()},h(){m(s,"class","icon svelte-nd9r2y"),m(e,"class","loader svelte-nd9r2y")},m(n,o){v(n,e,o),d(e,s),V(a,s,null),d(e,i),t&&t.m(e,null),f=!0},p(n,[o]){const r={};o&1&&(r.label=n[0]??"Loading"),a.$set(r),n[0]?t?t.p(n,o):(t=h(n),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},i(n){f||(S(a.$$.fragment,n),f=!0)},o(n){I(a.$$.fragment,n),f=!1},d(n){n&&c(e),D(a),t&&t.d()}}}function z(l,e,s){let{caption:a=void 0}=e;return l.$$set=i=>{"caption"in i&&s(0,a=i.caption)},[a]}class G extends E{constructor(e){super(),P(this,e,z,C,b,{caption:0})}}export{G as L};
