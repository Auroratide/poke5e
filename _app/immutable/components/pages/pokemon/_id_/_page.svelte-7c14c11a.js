import{S as Ee,i as De,s as Te,e as ne,b as m,B as ce,h as r,L as we,k as $,q as S,l as d,m as E,r as N,n as G,G as b,V as he,u as Q,a as g,c as w,p as hl,U as kl,W as bl,w as X,x as Y,y as Z,f as z,t as O,z as y,_ as Ce,g as ve,d as pe,M as Ge}from"../../../../chunks/index-af2e2c4d.js";import{C as El,F as be,T as Dl}from"../../../../chunks/TypeTag-d95e46c5.js";import{e as Re,A as Tl,T as gl}from"../../../../chunks/string-33100f11.js";import{c as $e}from"../../../../chunks/shared-23917130.js";import{m as dl,t as wl}from"../../../../chunks/store-5760e4ad.js";import{e as qe,p as Oe,s as He,g as Be,l as ge,a as Ve,b as Ue}from"../../../../chunks/filter-f04b55bd.js";import{p as Ll}from"../../../../chunks/store-9a41ea7c.js";import{L as Sl}from"../../../../chunks/_layout-65bf5108.js";import{T as Nl}from"../../../../chunks/Title-cd1035a3.js";function je(u,e,n){const l=u.slice();return l[3]=e[n],l}function Il(u){let e,n;return{c(){e=$("span"),n=S("..."),this.h()},l(l){e=d(l,"SPAN",{class:!0,"aria-label":!0});var t=E(e);n=N(t,"..."),t.forEach(r),this.h()},h(){G(e,"class","loading svelte-dqg77z"),G(e,"aria-label","Loading")},m(l,t){m(l,e,t),b(e,n)},p:ce,d(l){l&&r(e)}}}function Pl(u){let e,n=u[0],l=[];for(let t=0;t<n.length;t+=1)l[t]=Fe(je(u,n,t));return{c(){e=$("ul");for(let t=0;t<l.length;t+=1)l[t].c();this.h()},l(t){e=d(t,"UL",{class:!0});var f=E(e);for(let i=0;i<l.length;i+=1)l[i].l(f);f.forEach(r),this.h()},h(){G(e,"class","svelte-dqg77z")},m(t,f){m(t,e,f);for(let i=0;i<l.length;i+=1)l[i].m(e,null)},p(t,f){if(f&5){n=t[0];let i;for(i=0;i<n.length;i+=1){const s=je(t,n,i);l[i]?l[i].p(s,f):(l[i]=Fe(s),l[i].c(),l[i].m(e,null))}for(;i<l.length;i+=1)l[i].d(1);l.length=n.length}},d(t){t&&r(e),he(l,t)}}}function Fe(u){let e,n,l=u[2](u[3])+"",t,f;return{c(){e=$("li"),n=$("a"),t=S(l),this.h()},l(i){e=d(i,"LI",{class:!0});var s=E(e);n=d(s,"A",{href:!0});var o=E(n);t=N(o,l),o.forEach(r),s.forEach(r),this.h()},h(){G(n,"href",f=$e+"/moves/"+u[3]),G(e,"class","svelte-dqg77z")},m(i,s){m(i,e,s),b(e,n),b(n,t)},p(i,s){s&1&&l!==(l=i[2](i[3])+"")&&Q(t,l),s&1&&f!==(f=$e+"/moves/"+i[3])&&G(n,"href",f)},d(i){i&&r(e)}}}function Al(u){let e;function n(f,i){return f[1]!==void 0?Pl:Il}let l=n(u),t=l(u);return{c(){t.c(),e=ne()},l(f){t.l(f),e=ne()},m(f,i){t.m(f,i),m(f,e,i)},p(f,[i]){l===(l=n(f))&&t?t.p(f,i):(t.d(1),t=l(f),t&&(t.c(),t.m(e.parentNode,e)))},i:ce,o:ce,d(f){t.d(f),f&&r(e)}}}function Ml(u,e,n){let l;we(u,dl,i=>n(1,l=i));let{moves:t}=e;const f=i=>{var s;return(s=l.find(o=>o.id===i))==null?void 0:s.name};return u.$$set=i=>{"moves"in i&&n(0,t=i.moves)},[t,l,f]}class de extends Ee{constructor(e){super(),De(this,e,Ml,Al,Te,{moves:0})}}function We(u,e,n){const l=u.slice();return l[3]=e[n],l}function zl(u){let e,n;return{c(){e=$("span"),n=S("..."),this.h()},l(l){e=d(l,"SPAN",{class:!0,"aria-label":!0});var t=E(e);n=N(t,"..."),t.forEach(r),this.h()},h(){G(e,"class","loading svelte-dqg77z"),G(e,"aria-label","Loading")},m(l,t){m(l,e,t),b(e,n)},p:ce,d(l){l&&r(e)}}}function Cl(u){let e,n=u[0],l=[];for(let t=0;t<n.length;t+=1)l[t]=Je(We(u,n,t));return{c(){e=$("ul");for(let t=0;t<l.length;t+=1)l[t].c();this.h()},l(t){e=d(t,"UL",{class:!0});var f=E(e);for(let i=0;i<l.length;i+=1)l[i].l(f);f.forEach(r),this.h()},h(){G(e,"class","svelte-dqg77z")},m(t,f){m(t,e,f);for(let i=0;i<l.length;i+=1)l[i].m(e,null)},p(t,f){if(f&5){n=t[0];let i;for(i=0;i<n.length;i+=1){const s=We(t,n,i);l[i]?l[i].p(s,f):(l[i]=Je(s),l[i].c(),l[i].m(e,null))}for(;i<l.length;i+=1)l[i].d(1);l.length=n.length}},d(t){t&&r(e),he(l,t)}}}function Je(u){let e,n,l=u[3]+"",t,f,i;return{c(){e=$("li"),n=$("a"),t=S(l),this.h()},l(s){e=d(s,"LI",{class:!0});var o=E(e);n=d(o,"A",{href:!0,title:!0});var a=E(n);t=N(a,l),a.forEach(r),o.forEach(r),this.h()},h(){G(n,"href",f=$e+"/tms/"+u[3]),G(n,"title",i=u[2](u[3])),G(e,"class","svelte-dqg77z")},m(s,o){m(s,e,o),b(e,n),b(n,t)},p(s,o){o&1&&l!==(l=s[3]+"")&&Q(t,l),o&1&&f!==(f=$e+"/tms/"+s[3])&&G(n,"href",f),o&1&&i!==(i=s[2](s[3]))&&G(n,"title",i)},d(s){s&&r(e)}}}function Gl(u){let e;function n(f,i){return f[1]!==void 0?Cl:zl}let l=n(u),t=l(u);return{c(){t.c(),e=ne()},l(f){t.l(f),e=ne()},m(f,i){t.m(f,i),m(f,e,i)},p(f,[i]){l===(l=n(f))&&t?t.p(f,i):(t.d(1),t=l(f),t&&(t.c(),t.m(e.parentNode,e)))},i:ce,o:ce,d(f){t.d(f),f&&r(e)}}}function Rl(u,e,n){let l;we(u,wl,i=>n(1,l=i));let{tms:t}=e;const f=i=>{var s,o;return(o=(s=l.find(a=>a.id===i))==null?void 0:s.moveInfo)==null?void 0:o.name};return u.$$set=i=>{"tms"in i&&n(0,t=i.tms)},[t,l,f]}class ql extends Ee{constructor(e){super(),De(this,e,Rl,Gl,Te,{tms:0})}}function Ke(u,e,n){const l=u.slice();return l[5]=e[n],l}function Qe(u,e,n){const l=u.slice();l[8]=e[n],l[11]=n;const t=l[2].find(function(...i){return u[4](l[8],...i)});return l[9]=t,l}function Xe(u){var s;let e,n,l=((s=u[1].from)==null?void 0:s.length)>0&&Ye(u);function t(o,a){var p;return((p=o[1].to)==null?void 0:p.length)>0?Hl:Ol}let f=t(u),i=f(u);return{c(){l&&l.c(),e=g(),i.c(),n=ne()},l(o){l&&l.l(o),e=w(o),i.l(o),n=ne()},m(o,a){l&&l.m(o,a),m(o,e,a),i.m(o,a),m(o,n,a)},p(o,a){var p;((p=o[1].from)==null?void 0:p.length)>0?l?l.p(o,a):(l=Ye(o),l.c(),l.m(e.parentNode,e)):l&&(l.d(1),l=null),f===(f=t(o))&&i?i.p(o,a):(i.d(1),i=f(o),i&&(i.c(),i.m(n.parentNode,n)))},d(o){l&&l.d(o),o&&r(e),i.d(o),o&&r(n)}}}function Ye(u){let e,n=u[0].name+"",l,t,f,i=u[1].from,s=[];for(let o=0;o<i.length;o+=1)s[o]=ye(Qe(u,i,o));return{c(){e=$("p"),l=S(n),t=S(` evolves from
                `);for(let o=0;o<s.length;o+=1)s[o].c();f=S("."),this.h()},l(o){e=d(o,"P",{class:!0});var a=E(e);l=N(a,n),t=N(a,` evolves from
                `);for(let p=0;p<s.length;p+=1)s[p].l(a);f=N(a,"."),a.forEach(r),this.h()},h(){G(e,"class","svelte-kxv90g")},m(o,a){m(o,e,a),b(e,l),b(e,t);for(let p=0;p<s.length;p+=1)s[p].m(e,null);b(e,f)},p(o,a){if(a&1&&n!==(n=o[0].name+"")&&Q(l,n),a&6){i=o[1].from;let p;for(p=0;p<i.length;p+=1){const M=Qe(o,i,p);s[p]?s[p].p(M,a):(s[p]=ye(M),s[p].c(),s[p].m(e,f))}for(;p<s.length;p+=1)s[p].d(1);s.length=i.length}},d(o){o&&r(e),he(s,o)}}}function Ze(u){let e;return{c(){e=S(", ")},l(n){e=N(n,", ")},m(n,l){m(n,e,l)},d(n){n&&r(e)}}}function ye(u){let e,n=u[9].name+"",l,t,f,i=u[11]!==u[1].from.length-1&&Ze();return{c(){e=$("a"),l=S(n),i&&i.c(),f=ne(),this.h()},l(s){e=d(s,"A",{href:!0});var o=E(e);l=N(o,n),o.forEach(r),i&&i.l(s),f=ne(),this.h()},h(){G(e,"href",t=$e+"/pokemon/"+u[9].id)},m(s,o){m(s,e,o),b(e,l),i&&i.m(s,o),m(s,f,o)},p(s,o){o&6&&n!==(n=s[9].name+"")&&Q(l,n),o&6&&t!==(t=$e+"/pokemon/"+s[9].id)&&G(e,"href",t),s[11]!==s[1].from.length-1?i||(i=Ze(),i.c(),i.m(f.parentNode,f)):i&&(i.d(1),i=null)},d(s){s&&r(e),i&&i.d(s),s&&r(f)}}}function Ol(u){let e,n;return{c(){e=$("p"),n=S("This pokemon is at its highest evolutionary state."),this.h()},l(l){e=d(l,"P",{class:!0});var t=E(e);n=N(t,"This pokemon is at its highest evolutionary state."),t.forEach(r),this.h()},h(){G(e,"class","svelte-kxv90g")},m(l,t){m(l,e,t),b(e,n)},p:ce,d(l){l&&r(e)}}}function Hl(u){let e=[],n=new Map,l,t=u[1].to;const f=i=>i[5].id;for(let i=0;i<t.length;i+=1){let s=Ke(u,t,i),o=f(s);n.set(o,e[i]=xe(o,s))}return{c(){for(let i=0;i<e.length;i+=1)e[i].c();l=ne()},l(i){for(let s=0;s<e.length;s+=1)e[s].l(i);l=ne()},m(i,s){for(let o=0;o<e.length;o+=1)e[o].m(i,s);m(i,l,s)},p(i,s){s&15&&(t=i[1].to,e=kl(e,s,f,1,i,t,n,l.parentNode,bl,xe,l,Ke))},d(i){for(let s=0;s<e.length;s+=1)e[s].d(i);i&&r(l)}}}function xe(u,e){let n,l=Re(e[0].name,e[5],qe($e,e[2],e[3]))+"";return{key:u,first:null,c(){n=$("p"),this.h()},l(t){n=d(t,"P",{class:!0});var f=E(n);f.forEach(r),this.h()},h(){G(n,"class","svelte-kxv90g"),this.first=n},m(t,f){m(t,n,f),n.innerHTML=l},p(t,f){e=t,f&15&&l!==(l=Re(e[0].name,e[5],qe($e,e[2],e[3]))+"")&&(n.innerHTML=l)},d(t){t&&r(n)}}}function Bl(u){let e,n,l,t,f,i=u[1].stage+"",s,o,a=u[1].maxStage+"",p,M,C=u[2]&&u[3]&&Xe(u);return{c(){e=$("section"),n=$("p"),l=$("strong"),t=S("Evolution:"),f=g(),s=S(i),o=S(" / "),p=S(a),M=g(),C&&C.c(),this.h()},l(D){e=d(D,"SECTION",{class:!0});var L=E(e);n=d(L,"P",{class:!0});var I=E(n);l=d(I,"STRONG",{});var P=E(l);t=N(P,"Evolution:"),P.forEach(r),f=w(I),s=N(I,i),o=N(I," / "),p=N(I,a),I.forEach(r),M=w(L),C&&C.l(L),L.forEach(r),this.h()},h(){G(n,"class","svelte-kxv90g"),hl(n,"margin-bottom","0.125em"),G(e,"class","evolution")},m(D,L){m(D,e,L),b(e,n),b(n,l),b(l,t),b(n,f),b(n,s),b(n,o),b(n,p),b(e,M),C&&C.m(e,null)},p(D,[L]){L&2&&i!==(i=D[1].stage+"")&&Q(s,i),L&2&&a!==(a=D[1].maxStage+"")&&Q(p,a),D[2]&&D[3]?C?C.p(D,L):(C=Xe(D),C.c(),C.m(e,null)):C&&(C.d(1),C=null)},i:ce,o:ce,d(D){D&&r(e),C&&C.d()}}}function Vl(u,e,n){let l,t,f;we(u,Ll,o=>n(2,t=o)),we(u,dl,o=>n(3,f=o));let{pokemon:i}=e;const s=(o,a)=>a.id===o;return u.$$set=o=>{"pokemon"in o&&n(0,i=o.pokemon)},u.$$.update=()=>{u.$$.dirty&1&&n(1,l=i.evolution)},[i,l,t,f,s]}class Ul extends Ee{constructor(e){super(),De(this,e,Vl,Bl,Te,{pokemon:0})}}function el(u,e,n){const l=u.slice();return l[2]=e[n],l}function ll(u,e,n){const l=u.slice();return l[5]=e[n],l}function tl(u,e,n){const l=u.slice();return l[8]=e[n],l}function jl(u){let e,n,l,t,f=Oe(u[0].number)+"",i,s,o,a,p,M,C=u[0].size+"",D,L,I,P,k,c,T,W=He(u[0].sr)+"",te,fe,J,oe,se,B,V=u[0].eggGroup.join(", ")+"",h,R,H,re,x,ie,U=u[0].minLevel+"",j,ue,K,F,_,A,le=Be(u[0].gender)+"",ae;return{c(){e=$("dt"),n=S("Number"),l=g(),t=$("dd"),i=S(f),s=g(),o=$("dt"),a=S("Size"),p=g(),M=$("dd"),D=S(C),L=g(),I=$("dt"),P=$("abbr"),k=S("SR"),c=g(),T=$("dd"),te=S(W),fe=g(),J=$("dt"),oe=S("Egg Group"),se=g(),B=$("dd"),h=S(V),R=g(),H=$("dt"),re=S("Min Level"),x=g(),ie=$("dd"),j=S(U),ue=g(),K=$("dt"),F=S("Gender"),_=g(),A=$("dd"),ae=S(le),this.h()},l(v){e=d(v,"DT",{});var q=E(e);n=N(q,"Number"),q.forEach(r),l=w(v),t=d(v,"DD",{});var me=E(t);i=N(me,f),me.forEach(r),s=w(v),o=d(v,"DT",{});var _e=E(o);a=N(_e,"Size"),_e.forEach(r),p=w(v),M=d(v,"DD",{class:!0});var ee=E(M);D=N(ee,C),ee.forEach(r),L=w(v),I=d(v,"DT",{});var ke=E(I);P=d(ke,"ABBR",{title:!0});var Le=E(P);k=N(Le,"SR"),Le.forEach(r),ke.forEach(r),c=w(v),T=d(v,"DD",{});var Se=E(T);te=N(Se,W),Se.forEach(r),fe=w(v),J=d(v,"DT",{});var Ne=E(J);oe=N(Ne,"Egg Group"),Ne.forEach(r),se=w(v),B=d(v,"DD",{class:!0});var Ie=E(B);h=N(Ie,V),Ie.forEach(r),R=w(v),H=d(v,"DT",{});var Pe=E(H);re=N(Pe,"Min Level"),Pe.forEach(r),x=w(v),ie=d(v,"DD",{});var Ae=E(ie);j=N(Ae,U),Ae.forEach(r),ue=w(v),K=d(v,"DT",{});var Me=E(K);F=N(Me,"Gender"),Me.forEach(r),_=w(v),A=d(v,"DD",{class:!0});var ze=E(A);ae=N(ze,le),ze.forEach(r),this.h()},h(){G(M,"class","cap svelte-sienao"),G(P,"title","Species Rating"),G(B,"class","cap svelte-sienao"),G(A,"class","cap svelte-sienao")},m(v,q){m(v,e,q),b(e,n),m(v,l,q),m(v,t,q),b(t,i),m(v,s,q),m(v,o,q),b(o,a),m(v,p,q),m(v,M,q),b(M,D),m(v,L,q),m(v,I,q),b(I,P),b(P,k),m(v,c,q),m(v,T,q),b(T,te),m(v,fe,q),m(v,J,q),b(J,oe),m(v,se,q),m(v,B,q),b(B,h),m(v,R,q),m(v,H,q),b(H,re),m(v,x,q),m(v,ie,q),b(ie,j),m(v,ue,q),m(v,K,q),b(K,F),m(v,_,q),m(v,A,q),b(A,ae)},p(v,q){q&1&&f!==(f=Oe(v[0].number)+"")&&Q(i,f),q&1&&C!==(C=v[0].size+"")&&Q(D,C),q&1&&W!==(W=He(v[0].sr)+"")&&Q(te,W),q&1&&V!==(V=v[0].eggGroup.join(", ")+"")&&Q(h,V),q&1&&U!==(U=v[0].minLevel+"")&&Q(j,U),q&1&&le!==(le=Be(v[0].gender)+"")&&Q(ae,le)},d(v){v&&r(e),v&&r(l),v&&r(t),v&&r(s),v&&r(o),v&&r(p),v&&r(M),v&&r(L),v&&r(I),v&&r(c),v&&r(T),v&&r(fe),v&&r(J),v&&r(se),v&&r(B),v&&r(R),v&&r(H),v&&r(x),v&&r(ie),v&&r(ue),v&&r(K),v&&r(_),v&&r(A)}}}function fl(u){let e,n;return{c(){e=$("img"),this.h()},l(l){e=d(l,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){Ge(e.src,n=u[0].media.main)||G(e,"src",n),G(e,"alt",""),G(e,"class","svelte-sienao")},m(l,t){m(l,e,t)},p(l,t){t&1&&!Ge(e.src,n=l[0].media.main)&&G(e,"src",n)},d(l){l&&r(e)}}}function sl(u){let e,n=Ve(u[8])+"",l;return{c(){e=$("dd"),l=S(n)},l(t){e=d(t,"DD",{});var f=E(e);l=N(f,n),f.forEach(r)},m(t,f){m(t,e,f),b(e,l)},p(t,f){f&1&&n!==(n=Ve(t[8])+"")&&Q(l,n)},d(t){t&&r(e)}}}function il(u){let e,n,l,t,f=u[0].senses,i=[];for(let s=0;s<f.length;s+=1)i[s]=nl(ll(u,f,s));return{c(){e=$("dt"),n=S("Senses"),l=g(),t=$("div");for(let s=0;s<i.length;s+=1)i[s].c();this.h()},l(s){e=d(s,"DT",{});var o=E(e);n=N(o,"Senses"),o.forEach(r),l=w(s),t=d(s,"DIV",{class:!0});var a=E(t);for(let p=0;p<i.length;p+=1)i[p].l(a);a.forEach(r),this.h()},h(){G(t,"class","cap svelte-sienao")},m(s,o){m(s,e,o),b(e,n),m(s,l,o),m(s,t,o);for(let a=0;a<i.length;a+=1)i[a].m(t,null)},p(s,o){if(o&1){f=s[0].senses;let a;for(a=0;a<f.length;a+=1){const p=ll(s,f,a);i[a]?i[a].p(p,o):(i[a]=nl(p),i[a].c(),i[a].m(t,null))}for(;a<i.length;a+=1)i[a].d(1);i.length=f.length}},d(s){s&&r(e),s&&r(l),s&&r(t),he(i,s)}}}function nl(u){let e,n=Ue(u[5])+"",l;return{c(){e=$("dd"),l=S(n)},l(t){e=d(t,"DD",{});var f=E(e);l=N(f,n),f.forEach(r)},m(t,f){m(t,e,f),b(e,l)},p(t,f){f&1&&n!==(n=Ue(t[5])+"")&&Q(l,n)},d(t){t&&r(e)}}}function Fl(u){let e,n,l,t,f=u[0].ac+"",i,s,o,a,p,M,C=u[0].hp+"",D,L,I=u[0].hitDice+"",P,k,c,T,W,te,fe,J,oe,se=u[0].speed,B=[];for(let h=0;h<se.length;h+=1)B[h]=sl(tl(u,se,h));let V=u[0].senses.length>0&&il(u);return{c(){e=$("dt"),n=S("Armor Class"),l=g(),t=$("dd"),i=S(f),s=g(),o=$("dt"),a=S("Hit Points"),p=g(),M=$("dd"),D=S(C),L=S(" ("),P=S(I),k=S(")"),c=g(),T=$("dt"),W=S("Speed"),te=g(),fe=$("div");for(let h=0;h<B.length;h+=1)B[h].c();J=g(),V&&V.c(),oe=ne()},l(h){e=d(h,"DT",{});var R=E(e);n=N(R,"Armor Class"),R.forEach(r),l=w(h),t=d(h,"DD",{});var H=E(t);i=N(H,f),H.forEach(r),s=w(h),o=d(h,"DT",{});var re=E(o);a=N(re,"Hit Points"),re.forEach(r),p=w(h),M=d(h,"DD",{});var x=E(M);D=N(x,C),L=N(x," ("),P=N(x,I),k=N(x,")"),x.forEach(r),c=w(h),T=d(h,"DT",{});var ie=E(T);W=N(ie,"Speed"),ie.forEach(r),te=w(h),fe=d(h,"DIV",{});var U=E(fe);for(let j=0;j<B.length;j+=1)B[j].l(U);U.forEach(r),J=w(h),V&&V.l(h),oe=ne()},m(h,R){m(h,e,R),b(e,n),m(h,l,R),m(h,t,R),b(t,i),m(h,s,R),m(h,o,R),b(o,a),m(h,p,R),m(h,M,R),b(M,D),b(M,L),b(M,P),b(M,k),m(h,c,R),m(h,T,R),b(T,W),m(h,te,R),m(h,fe,R);for(let H=0;H<B.length;H+=1)B[H].m(fe,null);m(h,J,R),V&&V.m(h,R),m(h,oe,R)},p(h,R){if(R&1&&f!==(f=h[0].ac+"")&&Q(i,f),R&1&&C!==(C=h[0].hp+"")&&Q(D,C),R&1&&I!==(I=h[0].hitDice+"")&&Q(P,I),R&1){se=h[0].speed;let H;for(H=0;H<se.length;H+=1){const re=tl(h,se,H);B[H]?B[H].p(re,R):(B[H]=sl(re),B[H].c(),B[H].m(fe,null))}for(;H<B.length;H+=1)B[H].d(1);B.length=se.length}h[0].senses.length>0?V?V.p(h,R):(V=il(h),V.c(),V.m(oe.parentNode,oe)):V&&(V.d(1),V=null)},d(h){h&&r(e),h&&r(l),h&&r(t),h&&r(s),h&&r(o),h&&r(p),h&&r(M),h&&r(c),h&&r(T),h&&r(te),h&&r(fe),he(B,h),h&&r(J),V&&V.d(h),h&&r(oe)}}}function Wl(u){let e,n,l,t,f=ge(u[0].skills)+"",i,s,o,a,p,M,C=ge(u[0].savingThrows)+"",D,L,I,P;return I=new gl({props:{type:u[0].type}}),{c(){e=$("dt"),n=S("Proficiencies"),l=g(),t=$("dd"),i=S(f),s=g(),o=$("dt"),a=S("Saving Throws"),p=g(),M=$("dd"),D=S(C),L=g(),X(I.$$.fragment),this.h()},l(k){e=d(k,"DT",{});var c=E(e);n=N(c,"Proficiencies"),c.forEach(r),l=w(k),t=d(k,"DD",{class:!0});var T=E(t);i=N(T,f),T.forEach(r),s=w(k),o=d(k,"DT",{});var W=E(o);a=N(W,"Saving Throws"),W.forEach(r),p=w(k),M=d(k,"DD",{class:!0});var te=E(M);D=N(te,C),te.forEach(r),L=w(k),Y(I.$$.fragment,k),this.h()},h(){G(t,"class","cap svelte-sienao"),G(M,"class","upper svelte-sienao")},m(k,c){m(k,e,c),b(e,n),m(k,l,c),m(k,t,c),b(t,i),m(k,s,c),m(k,o,c),b(o,a),m(k,p,c),m(k,M,c),b(M,D),m(k,L,c),Z(I,k,c),P=!0},p(k,c){(!P||c&1)&&f!==(f=ge(k[0].skills)+"")&&Q(i,f),(!P||c&1)&&C!==(C=ge(k[0].savingThrows)+"")&&Q(D,C);const T={};c&1&&(T.type=k[0].type),I.$set(T)},i(k){P||(z(I.$$.fragment,k),P=!0)},o(k){O(I.$$.fragment,k),P=!1},d(k){k&&r(e),k&&r(l),k&&r(t),k&&r(s),k&&r(o),k&&r(p),k&&r(M),k&&r(L),y(I,k)}}}function ol(u){let e,n,l=u[0].specialAbilityText+"",t;return{c(){e=$("p"),n=$("strong"),t=S(l),this.h()},l(f){e=d(f,"P",{class:!0});var i=E(e);n=d(i,"STRONG",{});var s=E(n);t=N(s,l),s.forEach(r),i.forEach(r),this.h()},h(){G(e,"class","svelte-sienao")},m(f,i){m(f,e,i),b(e,n),b(n,t)},p(f,i){i&1&&l!==(l=f[0].specialAbilityText+"")&&Q(t,l)},d(f){f&&r(e)}}}function rl(u){let e,n,l=u[2].name+"",t,f,i,s=u[2].description+"",o;return{c(){e=$("p"),n=$("strong"),t=S(l),f=S(":"),i=g(),o=S(s),this.h()},l(a){e=d(a,"P",{class:!0});var p=E(e);n=d(p,"STRONG",{});var M=E(n);t=N(M,l),f=N(M,":"),M.forEach(r),i=w(p),o=N(p,s),p.forEach(r),this.h()},h(){G(e,"class","svelte-sienao")},m(a,p){m(a,e,p),b(e,n),b(n,t),b(n,f),b(e,i),b(e,o)},p(a,p){p&1&&l!==(l=a[2].name+"")&&Q(t,l),p&1&&s!==(s=a[2].description+"")&&Q(o,s)},d(a){a&&r(e)}}}function ul(u){let e,n,l,t;return l=new Ul({props:{pokemon:u[0]}}),{c(){e=$("hr"),n=g(),X(l.$$.fragment)},l(f){e=d(f,"HR",{}),n=w(f),Y(l.$$.fragment,f)},m(f,i){m(f,e,i),m(f,n,i),Z(l,f,i),t=!0},p(f,i){const s={};i&1&&(s.pokemon=f[0]),l.$set(s)},i(f){t||(z(l.$$.fragment,f),t=!0)},o(f){O(l.$$.fragment,f),t=!1},d(f){f&&r(e),f&&r(n),y(l,f)}}}function al(u){let e,n,l,t,f,i;return f=new de({props:{moves:u[0].moves.level2}}),{c(){e=$("dt"),n=S("Level 2"),l=g(),t=$("dd"),X(f.$$.fragment)},l(s){e=d(s,"DT",{});var o=E(e);n=N(o,"Level 2"),o.forEach(r),l=w(s),t=d(s,"DD",{});var a=E(t);Y(f.$$.fragment,a),a.forEach(r)},m(s,o){m(s,e,o),b(e,n),m(s,l,o),m(s,t,o),Z(f,t,null),i=!0},p(s,o){const a={};o&1&&(a.moves=s[0].moves.level2),f.$set(a)},i(s){i||(z(f.$$.fragment,s),i=!0)},o(s){O(f.$$.fragment,s),i=!1},d(s){s&&r(e),s&&r(l),s&&r(t),y(f)}}}function ml(u){let e,n,l,t,f,i;return f=new de({props:{moves:u[0].moves.level6}}),{c(){e=$("dt"),n=S("Level 6"),l=g(),t=$("dd"),X(f.$$.fragment)},l(s){e=d(s,"DT",{});var o=E(e);n=N(o,"Level 6"),o.forEach(r),l=w(s),t=d(s,"DD",{});var a=E(t);Y(f.$$.fragment,a),a.forEach(r)},m(s,o){m(s,e,o),b(e,n),m(s,l,o),m(s,t,o),Z(f,t,null),i=!0},p(s,o){const a={};o&1&&(a.moves=s[0].moves.level6),f.$set(a)},i(s){i||(z(f.$$.fragment,s),i=!0)},o(s){O(f.$$.fragment,s),i=!1},d(s){s&&r(e),s&&r(l),s&&r(t),y(f)}}}function _l(u){let e,n,l,t,f,i;return f=new de({props:{moves:u[0].moves.level10}}),{c(){e=$("dt"),n=S("Level 10"),l=g(),t=$("dd"),X(f.$$.fragment)},l(s){e=d(s,"DT",{});var o=E(e);n=N(o,"Level 10"),o.forEach(r),l=w(s),t=d(s,"DD",{});var a=E(t);Y(f.$$.fragment,a),a.forEach(r)},m(s,o){m(s,e,o),b(e,n),m(s,l,o),m(s,t,o),Z(f,t,null),i=!0},p(s,o){const a={};o&1&&(a.moves=s[0].moves.level10),f.$set(a)},i(s){i||(z(f.$$.fragment,s),i=!0)},o(s){O(f.$$.fragment,s),i=!1},d(s){s&&r(e),s&&r(l),s&&r(t),y(f)}}}function cl(u){let e,n,l,t,f,i;return f=new de({props:{moves:u[0].moves.level14}}),{c(){e=$("dt"),n=S("Level 14"),l=g(),t=$("dd"),X(f.$$.fragment)},l(s){e=d(s,"DT",{});var o=E(e);n=N(o,"Level 14"),o.forEach(r),l=w(s),t=d(s,"DD",{});var a=E(t);Y(f.$$.fragment,a),a.forEach(r)},m(s,o){m(s,e,o),b(e,n),m(s,l,o),m(s,t,o),Z(f,t,null),i=!0},p(s,o){const a={};o&1&&(a.moves=s[0].moves.level14),f.$set(a)},i(s){i||(z(f.$$.fragment,s),i=!0)},o(s){O(f.$$.fragment,s),i=!1},d(s){s&&r(e),s&&r(l),s&&r(t),y(f)}}}function vl(u){let e,n,l,t,f,i;return f=new de({props:{moves:u[0].moves.level18}}),{c(){e=$("dt"),n=S("Level 18"),l=g(),t=$("dd"),X(f.$$.fragment)},l(s){e=d(s,"DT",{});var o=E(e);n=N(o,"Level 18"),o.forEach(r),l=w(s),t=d(s,"DD",{});var a=E(t);Y(f.$$.fragment,a),a.forEach(r)},m(s,o){m(s,e,o),b(e,n),m(s,l,o),m(s,t,o),Z(f,t,null),i=!0},p(s,o){const a={};o&1&&(a.moves=s[0].moves.level18),f.$set(a)},i(s){i||(z(f.$$.fragment,s),i=!0)},o(s){O(f.$$.fragment,s),i=!1},d(s){s&&r(e),s&&r(l),s&&r(t),y(f)}}}function Jl(u){let e,n,l,t,f,i,s,o,a,p,M,C;f=new de({props:{moves:u[0].moves.start}});let D=u[0].moves.level2!==void 0&&al(u),L=u[0].moves.level6!==void 0&&ml(u),I=u[0].moves.level10!==void 0&&_l(u),P=u[0].moves.level14!==void 0&&cl(u),k=u[0].moves.level18!==void 0&&vl(u);return{c(){e=$("dt"),n=S("Starting"),l=g(),t=$("dd"),X(f.$$.fragment),i=g(),D&&D.c(),s=g(),L&&L.c(),o=g(),I&&I.c(),a=g(),P&&P.c(),p=g(),k&&k.c(),M=ne()},l(c){e=d(c,"DT",{});var T=E(e);n=N(T,"Starting"),T.forEach(r),l=w(c),t=d(c,"DD",{});var W=E(t);Y(f.$$.fragment,W),W.forEach(r),i=w(c),D&&D.l(c),s=w(c),L&&L.l(c),o=w(c),I&&I.l(c),a=w(c),P&&P.l(c),p=w(c),k&&k.l(c),M=ne()},m(c,T){m(c,e,T),b(e,n),m(c,l,T),m(c,t,T),Z(f,t,null),m(c,i,T),D&&D.m(c,T),m(c,s,T),L&&L.m(c,T),m(c,o,T),I&&I.m(c,T),m(c,a,T),P&&P.m(c,T),m(c,p,T),k&&k.m(c,T),m(c,M,T),C=!0},p(c,T){const W={};T&1&&(W.moves=c[0].moves.start),f.$set(W),c[0].moves.level2!==void 0?D?(D.p(c,T),T&1&&z(D,1)):(D=al(c),D.c(),z(D,1),D.m(s.parentNode,s)):D&&(ve(),O(D,1,1,()=>{D=null}),pe()),c[0].moves.level6!==void 0?L?(L.p(c,T),T&1&&z(L,1)):(L=ml(c),L.c(),z(L,1),L.m(o.parentNode,o)):L&&(ve(),O(L,1,1,()=>{L=null}),pe()),c[0].moves.level10!==void 0?I?(I.p(c,T),T&1&&z(I,1)):(I=_l(c),I.c(),z(I,1),I.m(a.parentNode,a)):I&&(ve(),O(I,1,1,()=>{I=null}),pe()),c[0].moves.level14!==void 0?P?(P.p(c,T),T&1&&z(P,1)):(P=cl(c),P.c(),z(P,1),P.m(p.parentNode,p)):P&&(ve(),O(P,1,1,()=>{P=null}),pe()),c[0].moves.level18!==void 0?k?(k.p(c,T),T&1&&z(k,1)):(k=vl(c),k.c(),z(k,1),k.m(M.parentNode,M)):k&&(ve(),O(k,1,1,()=>{k=null}),pe())},i(c){C||(z(f.$$.fragment,c),z(D),z(L),z(I),z(P),z(k),C=!0)},o(c){O(f.$$.fragment,c),O(D),O(L),O(I),O(P),O(k),C=!1},d(c){c&&r(e),c&&r(l),c&&r(t),y(f),c&&r(i),D&&D.d(c),c&&r(s),L&&L.d(c),c&&r(o),I&&I.d(c),c&&r(a),P&&P.d(c),c&&r(p),k&&k.d(c),c&&r(M)}}}function pl(u){let e,n,l,t,f,i;return f=new de({props:{moves:u[0].moves.egg}}),{c(){e=$("dt"),n=S("Egg"),l=g(),t=$("dd"),X(f.$$.fragment)},l(s){e=d(s,"DT",{});var o=E(e);n=N(o,"Egg"),o.forEach(r),l=w(s),t=d(s,"DD",{});var a=E(t);Y(f.$$.fragment,a),a.forEach(r)},m(s,o){m(s,e,o),b(e,n),m(s,l,o),m(s,t,o),Z(f,t,null),i=!0},p(s,o){const a={};o&1&&(a.moves=s[0].moves.egg),f.$set(a)},i(s){i||(z(f.$$.fragment,s),i=!0)},o(s){O(f.$$.fragment,s),i=!1},d(s){s&&r(e),s&&r(l),s&&r(t),y(f)}}}function $l(u){let e,n,l,t,f,i;return f=new ql({props:{tms:u[0].moves.tm}}),{c(){e=$("dt"),n=S("TM"),l=g(),t=$("dd"),X(f.$$.fragment)},l(s){e=d(s,"DT",{});var o=E(e);n=N(o,"TM"),o.forEach(r),l=w(s),t=d(s,"DD",{});var a=E(t);Y(f.$$.fragment,a),a.forEach(r)},m(s,o){m(s,e,o),b(e,n),m(s,l,o),m(s,t,o),Z(f,t,null),i=!0},p(s,o){const a={};o&1&&(a.tms=s[0].moves.tm),f.$set(a)},i(s){i||(z(f.$$.fragment,s),i=!0)},o(s){O(f.$$.fragment,s),i=!1},d(s){s&&r(e),s&&r(l),s&&r(t),y(f)}}}function Kl(u){let e,n,l,t=u[0].moves.egg!==void 0&&pl(u),f=u[0].moves.tm!==void 0&&$l(u);return{c(){t&&t.c(),e=g(),f&&f.c(),n=ne()},l(i){t&&t.l(i),e=w(i),f&&f.l(i),n=ne()},m(i,s){t&&t.m(i,s),m(i,e,s),f&&f.m(i,s),m(i,n,s),l=!0},p(i,s){i[0].moves.egg!==void 0?t?(t.p(i,s),s&1&&z(t,1)):(t=pl(i),t.c(),z(t,1),t.m(e.parentNode,e)):t&&(ve(),O(t,1,1,()=>{t=null}),pe()),i[0].moves.tm!==void 0?f?(f.p(i,s),s&1&&z(f,1)):(f=$l(i),f.c(),z(f,1),f.m(n.parentNode,n)):f&&(ve(),O(f,1,1,()=>{f=null}),pe())},i(i){l||(z(t),z(f),l=!0)},o(i){O(t),O(f),l=!1},d(i){t&&t.d(i),i&&r(e),f&&f.d(i),i&&r(n)}}}function Ql(u){let e,n,l,t,f,i,s,o=u[0].description+"",a,p,M,C,D,L,I,P,k,c,T,W,te,fe,J,oe,se,B,V,h,R,H,re,x,ie;l=new be({props:{columns:u[1]?1:2,$$slots:{default:[jl]},$$scope:{ctx:u}}});let U=u[1]&&fl(u);L=new be({props:{$$slots:{default:[Fl]},$$scope:{ctx:u}}}),P=new Tl({props:{attributes:u[0].attributes}}),T=new be({props:{$$slots:{default:[Wl]},$$scope:{ctx:u}}});let j=u[0].specialAbilityText!==void 0&&ol(u),ue=u[0].abilities,K=[];for(let _=0;_<ue.length;_+=1)K[_]=rl(el(u,ue,_));let F=u[0].evolution!==void 0&&ul(u);return H=new be({props:{$$slots:{default:[Jl]},$$scope:{ctx:u}}}),x=new be({props:{$$slots:{default:[Kl]},$$scope:{ctx:u}}}),{c(){e=$("section"),n=$("div"),X(l.$$.fragment),t=g(),U&&U.c(),i=g(),s=$("p"),a=S(o),p=g(),M=$("hr"),C=g(),D=$("section"),X(L.$$.fragment),I=g(),X(P.$$.fragment),k=g(),c=$("section"),X(T.$$.fragment),W=g(),te=$("hr"),fe=g(),J=$("section"),j&&j.c(),oe=g();for(let _=0;_<K.length;_+=1)K[_].c();se=g(),F&&F.c(),B=g(),V=$("hr"),h=g(),R=$("section"),X(H.$$.fragment),re=g(),X(x.$$.fragment),this.h()},l(_){e=d(_,"SECTION",{class:!0});var A=E(e);n=d(A,"DIV",{class:!0});var le=E(n);Y(l.$$.fragment,le),t=w(le),U&&U.l(le),le.forEach(r),i=w(A),s=d(A,"P",{class:!0});var ae=E(s);a=N(ae,o),ae.forEach(r),A.forEach(r),p=w(_),M=d(_,"HR",{}),C=w(_),D=d(_,"SECTION",{class:!0});var v=E(D);Y(L.$$.fragment,v),I=w(v),Y(P.$$.fragment,v),v.forEach(r),k=w(_),c=d(_,"SECTION",{class:!0});var q=E(c);Y(T.$$.fragment,q),q.forEach(r),W=w(_),te=d(_,"HR",{}),fe=w(_),J=d(_,"SECTION",{class:!0});var me=E(J);j&&j.l(me),oe=w(me);for(let ee=0;ee<K.length;ee+=1)K[ee].l(me);me.forEach(r),se=w(_),F&&F.l(_),B=w(_),V=d(_,"HR",{}),h=w(_),R=d(_,"SECTION",{class:!0});var _e=E(R);Y(H.$$.fragment,_e),re=w(_e),Y(x.$$.fragment,_e),_e.forEach(r),this.h()},h(){G(n,"class",f=Ce(u[1]?"row":"")+" svelte-sienao"),G(s,"class","svelte-sienao"),G(e,"class","info svelte-sienao"),G(D,"class","stats"),G(c,"class","skills"),G(J,"class","abilities"),G(R,"class","moves")},m(_,A){m(_,e,A),b(e,n),Z(l,n,null),b(n,t),U&&U.m(n,null),b(e,i),b(e,s),b(s,a),m(_,p,A),m(_,M,A),m(_,C,A),m(_,D,A),Z(L,D,null),b(D,I),Z(P,D,null),m(_,k,A),m(_,c,A),Z(T,c,null),m(_,W,A),m(_,te,A),m(_,fe,A),m(_,J,A),j&&j.m(J,null),b(J,oe);for(let le=0;le<K.length;le+=1)K[le].m(J,null);m(_,se,A),F&&F.m(_,A),m(_,B,A),m(_,V,A),m(_,h,A),m(_,R,A),Z(H,R,null),b(R,re),Z(x,R,null),ie=!0},p(_,A){const le={};A&2&&(le.columns=_[1]?1:2),A&2049&&(le.$$scope={dirty:A,ctx:_}),l.$set(le),_[1]?U?U.p(_,A):(U=fl(_),U.c(),U.m(n,null)):U&&(U.d(1),U=null),(!ie||A&2&&f!==(f=Ce(_[1]?"row":"")+" svelte-sienao"))&&G(n,"class",f),(!ie||A&1)&&o!==(o=_[0].description+"")&&Q(a,o);const ae={};A&2049&&(ae.$$scope={dirty:A,ctx:_}),L.$set(ae);const v={};A&1&&(v.attributes=_[0].attributes),P.$set(v);const q={};if(A&2049&&(q.$$scope={dirty:A,ctx:_}),T.$set(q),_[0].specialAbilityText!==void 0?j?j.p(_,A):(j=ol(_),j.c(),j.m(J,oe)):j&&(j.d(1),j=null),A&1){ue=_[0].abilities;let ee;for(ee=0;ee<ue.length;ee+=1){const ke=el(_,ue,ee);K[ee]?K[ee].p(ke,A):(K[ee]=rl(ke),K[ee].c(),K[ee].m(J,null))}for(;ee<K.length;ee+=1)K[ee].d(1);K.length=ue.length}_[0].evolution!==void 0?F?(F.p(_,A),A&1&&z(F,1)):(F=ul(_),F.c(),z(F,1),F.m(B.parentNode,B)):F&&(ve(),O(F,1,1,()=>{F=null}),pe());const me={};A&2049&&(me.$$scope={dirty:A,ctx:_}),H.$set(me);const _e={};A&2049&&(_e.$$scope={dirty:A,ctx:_}),x.$set(_e)},i(_){ie||(z(l.$$.fragment,_),z(L.$$.fragment,_),z(P.$$.fragment,_),z(T.$$.fragment,_),z(F),z(H.$$.fragment,_),z(x.$$.fragment,_),ie=!0)},o(_){O(l.$$.fragment,_),O(L.$$.fragment,_),O(P.$$.fragment,_),O(T.$$.fragment,_),O(F),O(H.$$.fragment,_),O(x.$$.fragment,_),ie=!1},d(_){_&&r(e),y(l),U&&U.d(),_&&r(p),_&&r(M),_&&r(C),_&&r(D),y(L),y(P),_&&r(k),_&&r(c),y(T),_&&r(W),_&&r(te),_&&r(fe),_&&r(J),j&&j.d(),he(K,_),_&&r(se),F&&F.d(_),_&&r(B),_&&r(V),_&&r(h),_&&r(R),y(H),y(x)}}}function Xl(u){let e,n;return e=new Dl({props:{slot:"header-extra",type:u[0].type}}),{c(){X(e.$$.fragment)},l(l){Y(e.$$.fragment,l)},m(l,t){Z(e,l,t),n=!0},p(l,t){const f={};t&1&&(f.type=l[0].type),e.$set(f)},i(l){n||(z(e.$$.fragment,l),n=!0)},o(l){O(e.$$.fragment,l),n=!1},d(l){y(e,l)}}}function Yl(u){let e,n;return e=new El({props:{title:u[0].name,$$slots:{"header-extra":[Xl],default:[Ql]},$$scope:{ctx:u}}}),{c(){X(e.$$.fragment)},l(l){Y(e.$$.fragment,l)},m(l,t){Z(e,l,t),n=!0},p(l,[t]){const f={};t&1&&(f.title=l[0].name),t&2051&&(f.$$scope={dirty:t,ctx:l}),e.$set(f)},i(l){n||(z(e.$$.fragment,l),n=!0)},o(l){O(e.$$.fragment,l),n=!1},d(l){y(e,l)}}}function Zl(u,e,n){let l,{pokemon:t}=e;return u.$$set=f=>{"pokemon"in f&&n(0,t=f.pokemon)},u.$$.update=()=>{u.$$.dirty&1&&n(1,l=t.media!=null)},[t,l]}class yl extends Ee{constructor(e){super(),De(this,e,Zl,Yl,Te,{pokemon:0})}}function xl(u){let e,n;return e=new yl({props:{pokemon:u[0]}}),{c(){X(e.$$.fragment)},l(l){Y(e.$$.fragment,l)},m(l,t){Z(e,l,t),n=!0},p(l,t){const f={};t&1&&(f.pokemon=l[0]),e.$set(f)},i(l){n||(z(e.$$.fragment,l),n=!0)},o(l){O(e.$$.fragment,l),n=!1},d(l){y(e,l)}}}function et(u){let e,n,l,t;return e=new Nl({props:{value:u[0].name}}),l=new Sl({props:{$$slots:{default:[xl]},$$scope:{ctx:u}}}),{c(){X(e.$$.fragment),n=g(),X(l.$$.fragment)},l(f){Y(e.$$.fragment,f),n=w(f),Y(l.$$.fragment,f)},m(f,i){Z(e,f,i),m(f,n,i),Z(l,f,i),t=!0},p(f,[i]){const s={};i&1&&(s.value=f[0].name),e.$set(s);const o={};i&5&&(o.$$scope={dirty:i,ctx:f}),l.$set(o)},i(f){t||(z(e.$$.fragment,f),z(l.$$.fragment,f),t=!0)},o(f){O(e.$$.fragment,f),O(l.$$.fragment,f),t=!1},d(f){y(e,f),f&&r(n),y(l,f)}}}function lt(u,e,n){let l,{data:t}=e;return u.$$set=f=>{"data"in f&&n(1,t=f.data)},u.$$.update=()=>{u.$$.dirty&2&&n(0,l=t.pokemon)},[l,t]}class mt extends Ee{constructor(e){super(),De(this,e,lt,et,Te,{data:1})}}export{mt as default};
