import{s as B,d as _,i as $,c as C,a as b,n as S,y as O,b as p,e as k,f as g,h as d,g as F,k as H,j as v,t as T}from"../chunks/CWYpsIRk.js";import{S as G,i as U,d as P,t as x,a as y,m as V,c as w,b as N}from"../chunks/DBKEUvF-.js";import{e as q}from"../chunks/DMiYXCRr.js";import{T as z}from"../chunks/DPwnchrF.js";import{C as A}from"../chunks/jMxaNxyD.js";import{c as j,v as D,g as J}from"../chunks/DdfwCSJJ.js";import{S as K}from"../chunks/BCfq6Shp.js";function M(i,e,r){const t=i.slice();return t[0]=e[r],t}function Q(i,e,r){const t=i.slice();return t[3]=e[r],t}function R(i,e,r){const t=i.slice();return t[6]=e[r],t}function W(i){let e,r;return{c(){e=v("li"),r=T(i[6])},l(t){e=g(t,"LI",{});var o=d(e);r=H(o,i[6]),o.forEach(_)},m(t,o){$(t,e,o),p(e,r)},p:S,d(t){t&&_(e)}}}function X(i){let e,r=i[3].name+"",t,o,l,f,m=q(i[3].description),c=[];for(let s=0;s<m.length;s+=1)c[s]=W(R(i,m,s));return{c(){e=v("h3"),t=T(r),o=b(),l=v("ul");for(let s=0;s<c.length;s+=1)c[s].c();f=b(),this.h()},l(s){e=g(s,"H3",{class:!0});var u=d(e);t=H(u,r),u.forEach(_),o=C(s),l=g(s,"UL",{class:!0});var a=d(l);for(let n=0;n<c.length;n+=1)c[n].l(a);f=C(a),a.forEach(_),this.h()},h(){k(e,"class","svelte-f56r6a"),k(l,"class","svelte-f56r6a")},m(s,u){$(s,e,u),p(e,t),$(s,o,u),$(s,l,u);for(let a=0;a<c.length;a+=1)c[a]&&c[a].m(l,null);p(l,f)},p:S,d(s){s&&(_(e),_(o),_(l)),O(c,s)}}}function Y(i){let e,r,t=i[0].description+"",o,l,f,m=q(J(i[0])),c=[];for(let s=0;s<m.length;s+=1)c[s]=X(Q(i,m,s));return{c(){e=v("section"),r=v("p"),o=T(t),l=b();for(let s=0;s<c.length;s+=1)c[s].c();f=b(),this.h()},l(s){e=g(s,"SECTION",{});var u=d(e);r=g(u,"P",{class:!0});var a=d(r);o=H(a,t),a.forEach(_),l=C(u);for(let n=0;n<c.length;n+=1)c[n].l(u);u.forEach(_),f=C(s),this.h()},h(){k(r,"class","svelte-f56r6a")},m(s,u){$(s,e,u),p(e,r),p(r,o),p(e,l);for(let a=0;a<c.length;a+=1)c[a]&&c[a].m(e,null);$(s,f,u)},p:S,d(s){s&&(_(e),_(f)),O(c,s)}}}function Z(i){let e,r;return e=new A({props:{title:i[0].name,level:2,inline:!0,$$slots:{default:[Y]},$$scope:{ctx:i}}}),{c(){N(e.$$.fragment)},l(t){w(e.$$.fragment,t)},m(t,o){V(e,t,o),r=!0},p(t,o){const l={};o&512&&(l.$$scope={dirty:o,ctx:t}),e.$set(l)},i(t){r||(y(e.$$.fragment,t),r=!0)},o(t){x(e.$$.fragment,t),r=!1},d(t){P(e,t)}}}function ee(i){let e,r,t="Version History",o,l,f,m,c,s,u=q(D.groups),a=[];for(let n=0;n<u.length;n+=1)a[n]=Z(M(i,u,n));return{c(){e=v("section"),r=v("h1"),r.textContent=t,o=b(),l=v("p"),f=T(j),m=b(),c=v("section");for(let n=0;n<a.length;n+=1)a[n].c();this.h()},l(n){e=g(n,"SECTION",{class:!0});var h=d(e);r=g(h,"H1",{class:!0,"data-svelte-h":!0}),F(r)!=="svelte-qtkxei"&&(r.textContent=t),o=C(h),l=g(h,"P",{class:!0});var E=d(l);f=H(E,j),E.forEach(_),h.forEach(_),m=C(n),c=g(n,"SECTION",{class:!0});var L=d(c);for(let I=0;I<a.length;I+=1)a[I].l(L);L.forEach(_),this.h()},h(){k(r,"class","svelte-f56r6a"),k(l,"class","svelte-f56r6a"),k(e,"class","title-section svelte-f56r6a"),k(c,"class","versions-section svelte-f56r6a")},m(n,h){$(n,e,h),p(e,r),p(e,o),p(e,l),p(l,f),$(n,m,h),$(n,c,h);for(let E=0;E<a.length;E+=1)a[E]&&a[E].m(c,null);s=!0},p:S,i(n){if(!s){for(let h=0;h<u.length;h+=1)y(a[h]);s=!0}},o(n){a=a.filter(Boolean);for(let h=0;h<a.length;h+=1)x(a[h]);s=!1},d(n){n&&(_(e),_(m),_(c)),O(a,n)}}}function te(i){let e,r,t,o;return e=new z({props:{value:"Version History"}}),t=new K({props:{$$slots:{default:[ee]},$$scope:{ctx:i}}}),{c(){N(e.$$.fragment),r=b(),N(t.$$.fragment)},l(l){w(e.$$.fragment,l),r=C(l),w(t.$$.fragment,l)},m(l,f){V(e,l,f),$(l,r,f),V(t,l,f),o=!0},p(l,[f]){const m={};f&512&&(m.$$scope={dirty:f,ctx:l}),t.$set(m)},i(l){o||(y(e.$$.fragment,l),y(t.$$.fragment,l),o=!0)},o(l){x(e.$$.fragment,l),x(t.$$.fragment,l),o=!1},d(l){l&&_(r),P(e,l),P(t,l)}}}class ie extends G{constructor(e){super(),U(this,e,null,te,B,{})}}export{ie as component};
