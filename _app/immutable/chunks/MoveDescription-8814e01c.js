import{S as R,i as S,s as T,k as c,Y as E,a as v,l as _,m as d,Z as H,c as g,h as p,n as O,b as m,G as h,B as w,q as b,r as y,u as D,e as L}from"./index-53b314aa.js";const G=n=>`<p>${n}</p>`,M=n=>`<table>
    <thead>
        <tr>
            ${n.headers.map(e=>`<th>${e}</th>`).join("")}
        </tr>
    </thead>
    <tbody>
        ${n.rows.map(e=>`<tr>
            ${e.map(i=>`<td>${i}</td>`).join("")}
        </tr>`).join("")}
    </tbody>
</table>`,u=n=>n.map(e=>typeof e=="string"?G(e):typeof e=="object"&&e.type==="table"?M(e):"").join("");function $(n){let e,i,f,o=n[0].higherLevels+"",r;return{c(){e=c("p"),i=c("strong"),f=b("At Higher Levels: "),r=b(o)},l(s){e=_(s,"P",{});var l=d(e);i=_(l,"STRONG",{});var t=d(i);f=y(t,"At Higher Levels: "),t.forEach(p),r=y(l,o),l.forEach(p)},m(s,l){m(s,e,l),h(e,i),h(i,f),h(e,r)},p(s,l){l&1&&o!==(o=s[0].higherLevels+"")&&D(r,o)},d(s){s&&p(e)}}}function j(n){let e,i,f,o,r,s=u(n[0].optional)+"",l;return{c(){e=c("p"),i=c("strong"),f=b("Optional Rules:"),o=v(),r=new E(!1),l=L(),this.h()},l(t){e=_(t,"P",{class:!0});var a=d(e);i=_(a,"STRONG",{});var k=d(i);f=y(k,"Optional Rules:"),k.forEach(p),a.forEach(p),o=g(t),r=H(t,!1),l=L(),this.h()},h(){O(e,"class","optional-heading svelte-ws8hof"),r.a=l},m(t,a){m(t,e,a),h(e,i),h(i,f),m(t,o,a),r.m(s,t,a),m(t,l,a)},p(t,a){a&1&&s!==(s=u(t[0].optional)+"")&&r.p(s)},d(t){t&&p(e),t&&p(o),t&&p(l),t&&r.d()}}}function P(n){let e,i,f=u(n[0].description)+"",o,r,s=n[0].higherLevels!==void 0&&$(n),l=n[0].optional!==void 0&&j(n);return{c(){e=c("div"),i=new E(!1),o=v(),s&&s.c(),r=v(),l&&l.c(),this.h()},l(t){e=_(t,"DIV",{class:!0});var a=d(e);i=H(a,!1),o=g(a),s&&s.l(a),r=g(a),l&&l.l(a),a.forEach(p),this.h()},h(){i.a=o,O(e,"class","description svelte-ws8hof")},m(t,a){m(t,e,a),i.m(f,e),h(e,o),s&&s.m(e,null),h(e,r),l&&l.m(e,null)},p(t,[a]){a&1&&f!==(f=u(t[0].description)+"")&&i.p(f),t[0].higherLevels!==void 0?s?s.p(t,a):(s=$(t),s.c(),s.m(e,r)):s&&(s.d(1),s=null),t[0].optional!==void 0?l?l.p(t,a):(l=j(t),l.c(),l.m(e,null)):l&&(l.d(1),l=null)},i:w,o:w,d(t){t&&p(e),s&&s.d(),l&&l.d()}}}function q(n,e,i){let{move:f}=e;return n.$$set=o=>{"move"in o&&i(0,f=o.move)},[f]}class N extends R{constructor(e){super(),S(this,e,q,P,T,{move:0})}}export{N as M};
