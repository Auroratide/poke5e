import{e as mt}from"../chunks/index.CzR0xuCU.js";import{b as ve}from"../chunks/paths.BknzQtcT.js";import{s as De,D as ne,i as u,n as pe,d as a,u as Ne,e as v,b as p,g as U,h as R,f as I,y as be,t as M,k as q,j as L,x as Q,a as D,c as E,E as _t,Q as ct,R as dt,a9 as Le}from"../chunks/scheduler.-RKjxNWI.js";import{S as Ee,i as Te,c as W,a as J,m as K,t as S,b as z,d as X,g as he,e as ke}from"../chunks/index.CKbqrZqE.js";import{e as ae,u as vt,d as pt}from"../chunks/each.DLVsBx_3.js";import{C as $t}from"../chunks/Card.BaFbRfBQ.js";import{F as Ce}from"../chunks/FlatDl.eVg9otIG.js";import{e as Pe,P as ht,A as kt,T as gt}from"../chunks/PokemonArt.JgkSFcQv.js";import{m as ut,t as bt}from"../chunks/store.CGUEzF1C.js";import{T as Ct}from"../chunks/TypeTag.D85GhlZs.js";import{e as Ie,p as je,s as Ae,g as ze,l as we,a as Oe,b as Re}from"../chunks/filter.BzkLsrbX.js";import{p as Dt}from"../chunks/store.aVLroaOp.js";import{L as Et}from"../chunks/_layout.BIHzlw6f.js";import{T as Tt}from"../chunks/Title.CyQOXNIE.js";const wt=async({fetch:r,params:e})=>r(`${ve}/pokemon/${e.id}.json`).then(async f=>{if(f.status===404)mt(404);else return{pokemon:await f.json()}}),dl=Object.freeze(Object.defineProperty({__proto__:null,load:wt},Symbol.toStringTag,{value:"Module"}));function He(r,e,f){const t=r.slice();return t[3]=e[f],t}function Nt(r){let e,f="...";return{c(){e=v("span"),e.textContent=f,this.h()},l(t){e=p(t,"SPAN",{class:!0,"aria-label":!0,"data-svelte-h":!0}),U(e)!=="svelte-1ol864"&&(e.textContent=f),this.h()},h(){R(e,"class","loading svelte-y0uf3z"),R(e,"aria-label","Loading")},m(t,s){u(t,e,s)},p:pe,d(t){t&&a(e)}}}function St(r){let e,f=ae(r[0]),t=[];for(let s=0;s<f.length;s+=1)t[s]=Me(He(r,f,s));return{c(){e=v("ul");for(let s=0;s<t.length;s+=1)t[s].c();this.h()},l(s){e=p(s,"UL",{class:!0});var l=I(e);for(let n=0;n<t.length;n+=1)t[n].l(l);l.forEach(a),this.h()},h(){R(e,"class","svelte-y0uf3z")},m(s,l){u(s,e,l);for(let n=0;n<t.length;n+=1)t[n]&&t[n].m(e,null)},p(s,l){if(l&5){f=ae(s[0]);let n;for(n=0;n<f.length;n+=1){const i=He(s,f,n);t[n]?t[n].p(i,l):(t[n]=Me(i),t[n].c(),t[n].m(e,null))}for(;n<t.length;n+=1)t[n].d(1);t.length=f.length}},d(s){s&&a(e),be(t,s)}}}function Me(r){let e,f,t=r[2](r[3])+"",s,l;return{c(){e=v("li"),f=v("a"),s=M(t),this.h()},l(n){e=p(n,"LI",{class:!0});var i=I(e);f=p(i,"A",{href:!0});var o=I(f);s=q(o,t),o.forEach(a),i.forEach(a),this.h()},h(){R(f,"href",l=ve+"/moves/"+r[3]),R(e,"class","svelte-y0uf3z")},m(n,i){u(n,e,i),L(e,f),L(f,s)},p(n,i){i&1&&t!==(t=n[2](n[3])+"")&&Q(s,t),i&1&&l!==(l=ve+"/moves/"+n[3])&&R(f,"href",l)},d(n){n&&a(e)}}}function Lt(r){let e;function f(l,n){return l[1]!==void 0?St:Nt}let t=f(r),s=t(r);return{c(){s.c(),e=ne()},l(l){s.l(l),e=ne()},m(l,n){s.m(l,n),u(l,e,n)},p(l,[n]){t===(t=f(l))&&s?s.p(l,n):(s.d(1),s=t(l),s&&(s.c(),s.m(e.parentNode,e)))},i:pe,o:pe,d(l){l&&a(e),s.d(l)}}}function Pt(r,e,f){let t;Ne(r,ut,n=>f(1,t=n));let{moves:s}=e;const l=n=>{var i;return(i=t.find(o=>o.id===n))==null?void 0:i.name};return r.$$set=n=>{"moves"in n&&f(0,s=n.moves)},[s,t,l]}class ge extends Ee{constructor(e){super(),Te(this,e,Pt,Lt,De,{moves:0})}}function qe(r,e,f){const t=r.slice();return t[3]=e[f],t}function It(r){let e,f="...";return{c(){e=v("span"),e.textContent=f,this.h()},l(t){e=p(t,"SPAN",{class:!0,"aria-label":!0,"data-svelte-h":!0}),U(e)!=="svelte-1ol864"&&(e.textContent=f),this.h()},h(){R(e,"class","loading svelte-y0uf3z"),R(e,"aria-label","Loading")},m(t,s){u(t,e,s)},p:pe,d(t){t&&a(e)}}}function jt(r){let e,f=ae(r[0]),t=[];for(let s=0;s<f.length;s+=1)t[s]=Ge(qe(r,f,s));return{c(){e=v("ul");for(let s=0;s<t.length;s+=1)t[s].c();this.h()},l(s){e=p(s,"UL",{class:!0});var l=I(e);for(let n=0;n<t.length;n+=1)t[n].l(l);l.forEach(a),this.h()},h(){R(e,"class","svelte-y0uf3z")},m(s,l){u(s,e,l);for(let n=0;n<t.length;n+=1)t[n]&&t[n].m(e,null)},p(s,l){if(l&5){f=ae(s[0]);let n;for(n=0;n<f.length;n+=1){const i=qe(s,f,n);t[n]?t[n].p(i,l):(t[n]=Ge(i),t[n].c(),t[n].m(e,null))}for(;n<t.length;n+=1)t[n].d(1);t.length=f.length}},d(s){s&&a(e),be(t,s)}}}function Ge(r){let e,f,t=r[3]+"",s,l,n;return{c(){e=v("li"),f=v("a"),s=M(t),this.h()},l(i){e=p(i,"LI",{class:!0});var o=I(e);f=p(o,"A",{href:!0,title:!0});var m=I(f);s=q(m,t),m.forEach(a),o.forEach(a),this.h()},h(){R(f,"href",l=ve+"/tms/"+r[3]),R(f,"title",n=r[2](r[3])),R(e,"class","svelte-y0uf3z")},m(i,o){u(i,e,o),L(e,f),L(f,s)},p(i,o){o&1&&t!==(t=i[3]+"")&&Q(s,t),o&1&&l!==(l=ve+"/tms/"+i[3])&&R(f,"href",l),o&1&&n!==(n=i[2](i[3]))&&R(f,"title",n)},d(i){i&&a(e)}}}function At(r){let e;function f(l,n){return l[1]!==void 0?jt:It}let t=f(r),s=t(r);return{c(){s.c(),e=ne()},l(l){s.l(l),e=ne()},m(l,n){s.m(l,n),u(l,e,n)},p(l,[n]){t===(t=f(l))&&s?s.p(l,n):(s.d(1),s=t(l),s&&(s.c(),s.m(e.parentNode,e)))},i:pe,o:pe,d(l){l&&a(e),s.d(l)}}}function zt(r,e,f){let t;Ne(r,bt,n=>f(1,t=n));let{tms:s}=e;const l=n=>{var i,o;return(o=(i=t.find(m=>m.id===n))==null?void 0:i.moveInfo)==null?void 0:o.name};return r.$$set=n=>{"tms"in n&&f(0,s=n.tms)},[s,t,l]}class Ot extends Ee{constructor(e){super(),Te(this,e,zt,At,De,{tms:0})}}function Ve(r,e,f){const t=r.slice();return t[5]=e[f],t}function Fe(r,e,f){const t=r.slice();t[8]=e[f],t[11]=f;const s=t[2].find(function(...n){return r[4](t[8],...n)});return t[9]=s,t}function Ue(r){var i;let e,f,t=((i=r[1].from)==null?void 0:i.length)>0&&Be(r);function s(o,m){var d;return((d=o[1].to)==null?void 0:d.length)>0?Ht:Rt}let l=s(r),n=l(r);return{c(){t&&t.c(),e=D(),n.c(),f=ne()},l(o){t&&t.l(o),e=E(o),n.l(o),f=ne()},m(o,m){t&&t.m(o,m),u(o,e,m),n.m(o,m),u(o,f,m)},p(o,m){var d;((d=o[1].from)==null?void 0:d.length)>0?t?t.p(o,m):(t=Be(o),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null),l===(l=s(o))&&n?n.p(o,m):(n.d(1),n=l(o),n&&(n.c(),n.m(f.parentNode,f)))},d(o){o&&(a(e),a(f)),t&&t.d(o),n.d(o)}}}function Be(r){let e,f=r[0].name+"",t,s,l,n=ae(r[1].from),i=[];for(let o=0;o<n.length;o+=1)i[o]=We(Fe(r,n,o));return{c(){e=v("p"),t=M(f),s=M(` evolves from
					`);for(let o=0;o<i.length;o+=1)i[o].c();l=M("."),this.h()},l(o){e=p(o,"P",{class:!0});var m=I(e);t=q(m,f),s=q(m,` evolves from
					`);for(let d=0;d<i.length;d+=1)i[d].l(m);l=q(m,"."),m.forEach(a),this.h()},h(){R(e,"class","svelte-1f7kwjm")},m(o,m){u(o,e,m),L(e,t),L(e,s);for(let d=0;d<i.length;d+=1)i[d]&&i[d].m(e,null);L(e,l)},p(o,m){if(m&1&&f!==(f=o[0].name+"")&&Q(t,f),m&6){n=ae(o[1].from);let d;for(d=0;d<n.length;d+=1){const N=Fe(o,n,d);i[d]?i[d].p(N,m):(i[d]=We(N),i[d].c(),i[d].m(e,l))}for(;d<i.length;d+=1)i[d].d(1);i.length=n.length}},d(o){o&&a(e),be(i,o)}}}function Qe(r){let e;return{c(){e=M(", ")},l(f){e=q(f,", ")},m(f,t){u(f,e,t)},d(f){f&&a(e)}}}function We(r){let e,f=r[9].name+"",t,s,l,n=r[11]!==r[1].from.length-1&&Qe();return{c(){e=v("a"),t=M(f),n&&n.c(),l=ne(),this.h()},l(i){e=p(i,"A",{href:!0});var o=I(e);t=q(o,f),o.forEach(a),n&&n.l(i),l=ne(),this.h()},h(){R(e,"href",s=ve+"/pokemon/"+r[9].id)},m(i,o){u(i,e,o),L(e,t),n&&n.m(i,o),u(i,l,o)},p(i,o){o&6&&f!==(f=i[9].name+"")&&Q(t,f),o&6&&s!==(s=ve+"/pokemon/"+i[9].id)&&R(e,"href",s),i[11]!==i[1].from.length-1?n||(n=Qe(),n.c(),n.m(l.parentNode,l)):n&&(n.d(1),n=null)},d(i){i&&(a(e),a(l)),n&&n.d(i)}}}function Rt(r){let e,f="This pokemon is at its highest evolutionary state.";return{c(){e=v("p"),e.textContent=f,this.h()},l(t){e=p(t,"P",{class:!0,"data-svelte-h":!0}),U(e)!=="svelte-iey9kc"&&(e.textContent=f),this.h()},h(){R(e,"class","svelte-1f7kwjm")},m(t,s){u(t,e,s)},p:pe,d(t){t&&a(e)}}}function Ht(r){let e=[],f=new Map,t,s=ae(r[1].to);const l=n=>n[5].id;for(let n=0;n<s.length;n+=1){let i=Ve(r,s,n),o=l(i);f.set(o,e[n]=Je(o,i))}return{c(){for(let n=0;n<e.length;n+=1)e[n].c();t=ne()},l(n){for(let i=0;i<e.length;i+=1)e[i].l(n);t=ne()},m(n,i){for(let o=0;o<e.length;o+=1)e[o]&&e[o].m(n,i);u(n,t,i)},p(n,i){i&15&&(s=ae(n[1].to),e=vt(e,i,l,1,n,s,f,t.parentNode,pt,Je,t,Ve))},d(n){n&&a(t);for(let i=0;i<e.length;i+=1)e[i].d(n)}}}function Je(r,e){let f,t,s=Pe(e[0].name,e[5],Ie(ve,e[2],e[3]))+"";return{key:r,first:null,c(){f=v("p"),t=new ct(!1),this.h()},l(l){f=p(l,"P",{class:!0});var n=I(f);t=dt(n,!1),n.forEach(a),this.h()},h(){t.a=null,R(f,"class","svelte-1f7kwjm"),this.first=f},m(l,n){u(l,f,n),t.m(s,f)},p(l,n){e=l,n&15&&s!==(s=Pe(e[0].name,e[5],Ie(ve,e[2],e[3]))+"")&&t.p(s)},d(l){l&&a(f)}}}function Mt(r){let e,f,t,s="Evolution:",l,n=r[1].stage+"",i,o,m=r[1].maxStage+"",d,N,P=r[2]&&r[3]&&Ue(r);return{c(){e=v("section"),f=v("p"),t=v("strong"),t.textContent=s,l=D(),i=M(n),o=M(" / "),d=M(m),N=D(),P&&P.c(),this.h()},l(T){e=p(T,"SECTION",{class:!0});var C=I(e);f=p(C,"P",{class:!0});var g=I(f);t=p(g,"STRONG",{"data-svelte-h":!0}),U(t)!=="svelte-xxlo5h"&&(t.textContent=s),l=E(g),i=q(g,n),o=q(g," / "),d=q(g,m),g.forEach(a),N=E(C),P&&P.l(C),C.forEach(a),this.h()},h(){R(f,"class","svelte-1f7kwjm"),_t(f,"margin-bottom","0.125em"),R(e,"class","evolution")},m(T,C){u(T,e,C),L(e,f),L(f,t),L(f,l),L(f,i),L(f,o),L(f,d),L(e,N),P&&P.m(e,null)},p(T,[C]){C&2&&n!==(n=T[1].stage+"")&&Q(i,n),C&2&&m!==(m=T[1].maxStage+"")&&Q(d,m),T[2]&&T[3]?P?P.p(T,C):(P=Ue(T),P.c(),P.m(e,null)):P&&(P.d(1),P=null)},i:pe,o:pe,d(T){T&&a(e),P&&P.d()}}}function qt(r,e,f){let t,s,l;Ne(r,Dt,o=>f(2,s=o)),Ne(r,ut,o=>f(3,l=o));let{pokemon:n}=e;const i=(o,m)=>m.id===o;return r.$$set=o=>{"pokemon"in o&&f(0,n=o.pokemon)},r.$$.update=()=>{r.$$.dirty&1&&f(1,t=n.evolution)},[n,t,s,l,i]}class Gt extends Ee{constructor(e){super(),Te(this,e,qt,Mt,De,{pokemon:0})}}function Ke(r,e,f){const t=r.slice();return t[2]=e[f],t}function Xe(r,e,f){const t=r.slice();return t[5]=e[f],t}function Ye(r,e,f){const t=r.slice();return t[8]=e[f],t}function Vt(r){let e,f="Number",t,s,l=je(r[0].number)+"",n,i,o,m="Size",d,N,P=r[0].size+"",T,C,g,A='<abbr title="Species Rating">SR</abbr>',$,c,b=Ae(r[0].sr)+"",x,ie,Z,ue="Egg Group",B,ee,G=r[0].eggGroup.join(", ")+"",V,k,O,H="Min Level",te,fe,oe=r[0].minLevel+"",me,Y,re,y="Gender",F,_,w=ze(r[0].gender)+"",le;return{c(){e=v("dt"),e.textContent=f,t=D(),s=v("dd"),n=M(l),i=D(),o=v("dt"),o.textContent=m,d=D(),N=v("dd"),T=M(P),C=D(),g=v("dt"),g.innerHTML=A,$=D(),c=v("dd"),x=M(b),ie=D(),Z=v("dt"),Z.textContent=ue,B=D(),ee=v("dd"),V=M(G),k=D(),O=v("dt"),O.textContent=H,te=D(),fe=v("dd"),me=M(oe),Y=D(),re=v("dt"),re.textContent=y,F=D(),_=v("dd"),le=M(w),this.h()},l(h){e=p(h,"DT",{"data-svelte-h":!0}),U(e)!=="svelte-5le7jf"&&(e.textContent=f),t=E(h),s=p(h,"DD",{});var j=I(s);n=q(j,l),j.forEach(a),i=E(h),o=p(h,"DT",{"data-svelte-h":!0}),U(o)!=="svelte-rw0fwr"&&(o.textContent=m),d=E(h),N=p(h,"DD",{class:!0});var $e=I(N);T=q($e,P),$e.forEach(a),C=E(h),g=p(h,"DT",{"data-svelte-h":!0}),U(g)!=="svelte-1m44qlm"&&(g.innerHTML=A),$=E(h),c=p(h,"DD",{});var _e=I(c);x=q(_e,b),_e.forEach(a),ie=E(h),Z=p(h,"DT",{"data-svelte-h":!0}),U(Z)!=="svelte-a24ssk"&&(Z.textContent=ue),B=E(h),ee=p(h,"DD",{class:!0});var ce=I(ee);V=q(ce,G),ce.forEach(a),k=E(h),O=p(h,"DT",{"data-svelte-h":!0}),U(O)!=="svelte-1c84uxc"&&(O.textContent=H),te=E(h),fe=p(h,"DD",{});var de=I(fe);me=q(de,oe),de.forEach(a),Y=E(h),re=p(h,"DT",{"data-svelte-h":!0}),U(re)!=="svelte-ae5mer"&&(re.textContent=y),F=E(h),_=p(h,"DD",{class:!0});var se=I(_);le=q(se,w),se.forEach(a),this.h()},h(){R(N,"class","cap svelte-rf7miu"),R(ee,"class","cap svelte-rf7miu"),R(_,"class","cap svelte-rf7miu")},m(h,j){u(h,e,j),u(h,t,j),u(h,s,j),L(s,n),u(h,i,j),u(h,o,j),u(h,d,j),u(h,N,j),L(N,T),u(h,C,j),u(h,g,j),u(h,$,j),u(h,c,j),L(c,x),u(h,ie,j),u(h,Z,j),u(h,B,j),u(h,ee,j),L(ee,V),u(h,k,j),u(h,O,j),u(h,te,j),u(h,fe,j),L(fe,me),u(h,Y,j),u(h,re,j),u(h,F,j),u(h,_,j),L(_,le)},p(h,j){j&1&&l!==(l=je(h[0].number)+"")&&Q(n,l),j&1&&P!==(P=h[0].size+"")&&Q(T,P),j&1&&b!==(b=Ae(h[0].sr)+"")&&Q(x,b),j&1&&G!==(G=h[0].eggGroup.join(", ")+"")&&Q(V,G),j&1&&oe!==(oe=h[0].minLevel+"")&&Q(me,oe),j&1&&w!==(w=ze(h[0].gender)+"")&&Q(le,w)},d(h){h&&(a(e),a(t),a(s),a(i),a(o),a(d),a(N),a(C),a(g),a($),a(c),a(ie),a(Z),a(B),a(ee),a(k),a(O),a(te),a(fe),a(Y),a(re),a(F),a(_))}}}function Ze(r){let e,f=Oe(r[8])+"",t;return{c(){e=v("dd"),t=M(f)},l(s){e=p(s,"DD",{});var l=I(e);t=q(l,f),l.forEach(a)},m(s,l){u(s,e,l),L(e,t)},p(s,l){l&1&&f!==(f=Oe(s[8])+"")&&Q(t,f)},d(s){s&&a(e)}}}function ye(r){let e,f="Senses",t,s,l=ae(r[0].senses),n=[];for(let i=0;i<l.length;i+=1)n[i]=xe(Xe(r,l,i));return{c(){e=v("dt"),e.textContent=f,t=D(),s=v("div");for(let i=0;i<n.length;i+=1)n[i].c();this.h()},l(i){e=p(i,"DT",{"data-svelte-h":!0}),U(e)!=="svelte-hlstkx"&&(e.textContent=f),t=E(i),s=p(i,"DIV",{class:!0});var o=I(s);for(let m=0;m<n.length;m+=1)n[m].l(o);o.forEach(a),this.h()},h(){R(s,"class","cap svelte-rf7miu")},m(i,o){u(i,e,o),u(i,t,o),u(i,s,o);for(let m=0;m<n.length;m+=1)n[m]&&n[m].m(s,null)},p(i,o){if(o&1){l=ae(i[0].senses);let m;for(m=0;m<l.length;m+=1){const d=Xe(i,l,m);n[m]?n[m].p(d,o):(n[m]=xe(d),n[m].c(),n[m].m(s,null))}for(;m<n.length;m+=1)n[m].d(1);n.length=l.length}},d(i){i&&(a(e),a(t),a(s)),be(n,i)}}}function xe(r){let e,f=Re(r[5])+"",t;return{c(){e=v("dd"),t=M(f)},l(s){e=p(s,"DD",{});var l=I(e);t=q(l,f),l.forEach(a)},m(s,l){u(s,e,l),L(e,t)},p(s,l){l&1&&f!==(f=Re(s[5])+"")&&Q(t,f)},d(s){s&&a(e)}}}function Ft(r){let e,f="Armor Class",t,s,l=r[0].ac+"",n,i,o,m="Hit Points",d,N,P=r[0].hp+"",T,C,g=r[0].hitDice+"",A,$,c,b,x="Speed",ie,Z,ue,B,ee=ae(r[0].speed),G=[];for(let k=0;k<ee.length;k+=1)G[k]=Ze(Ye(r,ee,k));let V=r[0].senses.length>0&&ye(r);return{c(){e=v("dt"),e.textContent=f,t=D(),s=v("dd"),n=M(l),i=D(),o=v("dt"),o.textContent=m,d=D(),N=v("dd"),T=M(P),C=M(" ("),A=M(g),$=M(")"),c=D(),b=v("dt"),b.textContent=x,ie=D(),Z=v("div");for(let k=0;k<G.length;k+=1)G[k].c();ue=D(),V&&V.c(),B=ne()},l(k){e=p(k,"DT",{"data-svelte-h":!0}),U(e)!=="svelte-b6xk3"&&(e.textContent=f),t=E(k),s=p(k,"DD",{});var O=I(s);n=q(O,l),O.forEach(a),i=E(k),o=p(k,"DT",{"data-svelte-h":!0}),U(o)!=="svelte-caudbq"&&(o.textContent=m),d=E(k),N=p(k,"DD",{});var H=I(N);T=q(H,P),C=q(H," ("),A=q(H,g),$=q(H,")"),H.forEach(a),c=E(k),b=p(k,"DT",{"data-svelte-h":!0}),U(b)!=="svelte-1bqvq2b"&&(b.textContent=x),ie=E(k),Z=p(k,"DIV",{});var te=I(Z);for(let fe=0;fe<G.length;fe+=1)G[fe].l(te);te.forEach(a),ue=E(k),V&&V.l(k),B=ne()},m(k,O){u(k,e,O),u(k,t,O),u(k,s,O),L(s,n),u(k,i,O),u(k,o,O),u(k,d,O),u(k,N,O),L(N,T),L(N,C),L(N,A),L(N,$),u(k,c,O),u(k,b,O),u(k,ie,O),u(k,Z,O);for(let H=0;H<G.length;H+=1)G[H]&&G[H].m(Z,null);u(k,ue,O),V&&V.m(k,O),u(k,B,O)},p(k,O){if(O&1&&l!==(l=k[0].ac+"")&&Q(n,l),O&1&&P!==(P=k[0].hp+"")&&Q(T,P),O&1&&g!==(g=k[0].hitDice+"")&&Q(A,g),O&1){ee=ae(k[0].speed);let H;for(H=0;H<ee.length;H+=1){const te=Ye(k,ee,H);G[H]?G[H].p(te,O):(G[H]=Ze(te),G[H].c(),G[H].m(Z,null))}for(;H<G.length;H+=1)G[H].d(1);G.length=ee.length}k[0].senses.length>0?V?V.p(k,O):(V=ye(k),V.c(),V.m(B.parentNode,B)):V&&(V.d(1),V=null)},d(k){k&&(a(e),a(t),a(s),a(i),a(o),a(d),a(N),a(c),a(b),a(ie),a(Z),a(ue),a(B)),be(G,k),V&&V.d(k)}}}function Ut(r){let e,f="Proficiencies",t,s,l=we(r[0].skills)+"",n,i,o,m="Saving Throws",d,N,P=we(r[0].savingThrows)+"",T,C,g,A;return g=new gt({props:{type:r[0].type}}),{c(){e=v("dt"),e.textContent=f,t=D(),s=v("dd"),n=M(l),i=D(),o=v("dt"),o.textContent=m,d=D(),N=v("dd"),T=M(P),C=D(),W(g.$$.fragment),this.h()},l($){e=p($,"DT",{"data-svelte-h":!0}),U(e)!=="svelte-1kaob9p"&&(e.textContent=f),t=E($),s=p($,"DD",{class:!0});var c=I(s);n=q(c,l),c.forEach(a),i=E($),o=p($,"DT",{"data-svelte-h":!0}),U(o)!=="svelte-66z247"&&(o.textContent=m),d=E($),N=p($,"DD",{class:!0});var b=I(N);T=q(b,P),b.forEach(a),C=E($),J(g.$$.fragment,$),this.h()},h(){R(s,"class","cap svelte-rf7miu"),R(N,"class","upper svelte-rf7miu")},m($,c){u($,e,c),u($,t,c),u($,s,c),L(s,n),u($,i,c),u($,o,c),u($,d,c),u($,N,c),L(N,T),u($,C,c),K(g,$,c),A=!0},p($,c){(!A||c&1)&&l!==(l=we($[0].skills)+"")&&Q(n,l),(!A||c&1)&&P!==(P=we($[0].savingThrows)+"")&&Q(T,P);const b={};c&1&&(b.type=$[0].type),g.$set(b)},i($){A||(S(g.$$.fragment,$),A=!0)},o($){z(g.$$.fragment,$),A=!1},d($){$&&(a(e),a(t),a(s),a(i),a(o),a(d),a(N),a(C)),X(g,$)}}}function et(r){let e,f,t=r[0].specialAbilityText+"",s;return{c(){e=v("p"),f=v("strong"),s=M(t),this.h()},l(l){e=p(l,"P",{class:!0});var n=I(e);f=p(n,"STRONG",{});var i=I(f);s=q(i,t),i.forEach(a),n.forEach(a),this.h()},h(){R(e,"class","svelte-rf7miu")},m(l,n){u(l,e,n),L(e,f),L(f,s)},p(l,n){n&1&&t!==(t=l[0].specialAbilityText+"")&&Q(s,t)},d(l){l&&a(e)}}}function tt(r){let e,f,t=r[2].name+"",s,l,n,i=r[2].description+"",o;return{c(){e=v("p"),f=v("strong"),s=M(t),l=M(":"),n=D(),o=M(i),this.h()},l(m){e=p(m,"P",{class:!0});var d=I(e);f=p(d,"STRONG",{});var N=I(f);s=q(N,t),l=q(N,":"),N.forEach(a),n=E(d),o=q(d,i),d.forEach(a),this.h()},h(){R(e,"class","svelte-rf7miu")},m(m,d){u(m,e,d),L(e,f),L(f,s),L(f,l),L(e,n),L(e,o)},p(m,d){d&1&&t!==(t=m[2].name+"")&&Q(s,t),d&1&&i!==(i=m[2].description+"")&&Q(o,i)},d(m){m&&a(e)}}}function lt(r){let e,f,t,s;return t=new Gt({props:{pokemon:r[0]}}),{c(){e=v("hr"),f=D(),W(t.$$.fragment)},l(l){e=p(l,"HR",{}),f=E(l),J(t.$$.fragment,l)},m(l,n){u(l,e,n),u(l,f,n),K(t,l,n),s=!0},p(l,n){const i={};n&1&&(i.pokemon=l[0]),t.$set(i)},i(l){s||(S(t.$$.fragment,l),s=!0)},o(l){z(t.$$.fragment,l),s=!1},d(l){l&&(a(e),a(f)),X(t,l)}}}function nt(r){let e,f="Level 2",t,s,l,n;return l=new ge({props:{moves:r[0].moves.level2}}),{c(){e=v("dt"),e.textContent=f,t=D(),s=v("dd"),W(l.$$.fragment)},l(i){e=p(i,"DT",{"data-svelte-h":!0}),U(e)!=="svelte-1yvtfxq"&&(e.textContent=f),t=E(i),s=p(i,"DD",{});var o=I(s);J(l.$$.fragment,o),o.forEach(a)},m(i,o){u(i,e,o),u(i,t,o),u(i,s,o),K(l,s,null),n=!0},p(i,o){const m={};o&1&&(m.moves=i[0].moves.level2),l.$set(m)},i(i){n||(S(l.$$.fragment,i),n=!0)},o(i){z(l.$$.fragment,i),n=!1},d(i){i&&(a(e),a(t),a(s)),X(l)}}}function st(r){let e,f="Level 6",t,s,l,n;return l=new ge({props:{moves:r[0].moves.level6}}),{c(){e=v("dt"),e.textContent=f,t=D(),s=v("dd"),W(l.$$.fragment)},l(i){e=p(i,"DT",{"data-svelte-h":!0}),U(e)!=="svelte-1gs18ga"&&(e.textContent=f),t=E(i),s=p(i,"DD",{});var o=I(s);J(l.$$.fragment,o),o.forEach(a)},m(i,o){u(i,e,o),u(i,t,o),u(i,s,o),K(l,s,null),n=!0},p(i,o){const m={};o&1&&(m.moves=i[0].moves.level6),l.$set(m)},i(i){n||(S(l.$$.fragment,i),n=!0)},o(i){z(l.$$.fragment,i),n=!1},d(i){i&&(a(e),a(t),a(s)),X(l)}}}function it(r){let e,f="Level 10",t,s,l,n;return l=new ge({props:{moves:r[0].moves.level10}}),{c(){e=v("dt"),e.textContent=f,t=D(),s=v("dd"),W(l.$$.fragment)},l(i){e=p(i,"DT",{"data-svelte-h":!0}),U(e)!=="svelte-19d5tq9"&&(e.textContent=f),t=E(i),s=p(i,"DD",{});var o=I(s);J(l.$$.fragment,o),o.forEach(a)},m(i,o){u(i,e,o),u(i,t,o),u(i,s,o),K(l,s,null),n=!0},p(i,o){const m={};o&1&&(m.moves=i[0].moves.level10),l.$set(m)},i(i){n||(S(l.$$.fragment,i),n=!0)},o(i){z(l.$$.fragment,i),n=!1},d(i){i&&(a(e),a(t),a(s)),X(l)}}}function ft(r){let e,f="Level 14",t,s,l,n;return l=new ge({props:{moves:r[0].moves.level14}}),{c(){e=v("dt"),e.textContent=f,t=D(),s=v("dd"),W(l.$$.fragment)},l(i){e=p(i,"DT",{"data-svelte-h":!0}),U(e)!=="svelte-15oizfp"&&(e.textContent=f),t=E(i),s=p(i,"DD",{});var o=I(s);J(l.$$.fragment,o),o.forEach(a)},m(i,o){u(i,e,o),u(i,t,o),u(i,s,o),K(l,s,null),n=!0},p(i,o){const m={};o&1&&(m.moves=i[0].moves.level14),l.$set(m)},i(i){n||(S(l.$$.fragment,i),n=!0)},o(i){z(l.$$.fragment,i),n=!1},d(i){i&&(a(e),a(t),a(s)),X(l)}}}function ot(r){let e,f="Level 18",t,s,l,n;return l=new ge({props:{moves:r[0].moves.level18}}),{c(){e=v("dt"),e.textContent=f,t=D(),s=v("dd"),W(l.$$.fragment)},l(i){e=p(i,"DT",{"data-svelte-h":!0}),U(e)!=="svelte-17ok8gp"&&(e.textContent=f),t=E(i),s=p(i,"DD",{});var o=I(s);J(l.$$.fragment,o),o.forEach(a)},m(i,o){u(i,e,o),u(i,t,o),u(i,s,o),K(l,s,null),n=!0},p(i,o){const m={};o&1&&(m.moves=i[0].moves.level18),l.$set(m)},i(i){n||(S(l.$$.fragment,i),n=!0)},o(i){z(l.$$.fragment,i),n=!1},d(i){i&&(a(e),a(t),a(s)),X(l)}}}function Bt(r){let e,f="Starting",t,s,l,n,i,o,m,d,N,P;l=new ge({props:{moves:r[0].moves.start}});let T=r[0].moves.level2!==void 0&&nt(r),C=r[0].moves.level6!==void 0&&st(r),g=r[0].moves.level10!==void 0&&it(r),A=r[0].moves.level14!==void 0&&ft(r),$=r[0].moves.level18!==void 0&&ot(r);return{c(){e=v("dt"),e.textContent=f,t=D(),s=v("dd"),W(l.$$.fragment),n=D(),T&&T.c(),i=D(),C&&C.c(),o=D(),g&&g.c(),m=D(),A&&A.c(),d=D(),$&&$.c(),N=ne()},l(c){e=p(c,"DT",{"data-svelte-h":!0}),U(e)!=="svelte-l44vci"&&(e.textContent=f),t=E(c),s=p(c,"DD",{});var b=I(s);J(l.$$.fragment,b),b.forEach(a),n=E(c),T&&T.l(c),i=E(c),C&&C.l(c),o=E(c),g&&g.l(c),m=E(c),A&&A.l(c),d=E(c),$&&$.l(c),N=ne()},m(c,b){u(c,e,b),u(c,t,b),u(c,s,b),K(l,s,null),u(c,n,b),T&&T.m(c,b),u(c,i,b),C&&C.m(c,b),u(c,o,b),g&&g.m(c,b),u(c,m,b),A&&A.m(c,b),u(c,d,b),$&&$.m(c,b),u(c,N,b),P=!0},p(c,b){const x={};b&1&&(x.moves=c[0].moves.start),l.$set(x),c[0].moves.level2!==void 0?T?(T.p(c,b),b&1&&S(T,1)):(T=nt(c),T.c(),S(T,1),T.m(i.parentNode,i)):T&&(he(),z(T,1,1,()=>{T=null}),ke()),c[0].moves.level6!==void 0?C?(C.p(c,b),b&1&&S(C,1)):(C=st(c),C.c(),S(C,1),C.m(o.parentNode,o)):C&&(he(),z(C,1,1,()=>{C=null}),ke()),c[0].moves.level10!==void 0?g?(g.p(c,b),b&1&&S(g,1)):(g=it(c),g.c(),S(g,1),g.m(m.parentNode,m)):g&&(he(),z(g,1,1,()=>{g=null}),ke()),c[0].moves.level14!==void 0?A?(A.p(c,b),b&1&&S(A,1)):(A=ft(c),A.c(),S(A,1),A.m(d.parentNode,d)):A&&(he(),z(A,1,1,()=>{A=null}),ke()),c[0].moves.level18!==void 0?$?($.p(c,b),b&1&&S($,1)):($=ot(c),$.c(),S($,1),$.m(N.parentNode,N)):$&&(he(),z($,1,1,()=>{$=null}),ke())},i(c){P||(S(l.$$.fragment,c),S(T),S(C),S(g),S(A),S($),P=!0)},o(c){z(l.$$.fragment,c),z(T),z(C),z(g),z(A),z($),P=!1},d(c){c&&(a(e),a(t),a(s),a(n),a(i),a(o),a(m),a(d),a(N)),X(l),T&&T.d(c),C&&C.d(c),g&&g.d(c),A&&A.d(c),$&&$.d(c)}}}function rt(r){let e,f="Egg",t,s,l,n;return l=new ge({props:{moves:r[0].moves.egg}}),{c(){e=v("dt"),e.textContent=f,t=D(),s=v("dd"),W(l.$$.fragment)},l(i){e=p(i,"DT",{"data-svelte-h":!0}),U(e)!=="svelte-1u534j9"&&(e.textContent=f),t=E(i),s=p(i,"DD",{});var o=I(s);J(l.$$.fragment,o),o.forEach(a)},m(i,o){u(i,e,o),u(i,t,o),u(i,s,o),K(l,s,null),n=!0},p(i,o){const m={};o&1&&(m.moves=i[0].moves.egg),l.$set(m)},i(i){n||(S(l.$$.fragment,i),n=!0)},o(i){z(l.$$.fragment,i),n=!1},d(i){i&&(a(e),a(t),a(s)),X(l)}}}function at(r){let e,f="TM",t,s,l,n;return l=new Ot({props:{tms:r[0].moves.tm}}),{c(){e=v("dt"),e.textContent=f,t=D(),s=v("dd"),W(l.$$.fragment)},l(i){e=p(i,"DT",{"data-svelte-h":!0}),U(e)!=="svelte-12544et"&&(e.textContent=f),t=E(i),s=p(i,"DD",{});var o=I(s);J(l.$$.fragment,o),o.forEach(a)},m(i,o){u(i,e,o),u(i,t,o),u(i,s,o),K(l,s,null),n=!0},p(i,o){const m={};o&1&&(m.tms=i[0].moves.tm),l.$set(m)},i(i){n||(S(l.$$.fragment,i),n=!0)},o(i){z(l.$$.fragment,i),n=!1},d(i){i&&(a(e),a(t),a(s)),X(l)}}}function Qt(r){let e,f,t,s=r[0].moves.egg!==void 0&&rt(r),l=r[0].moves.tm!==void 0&&at(r);return{c(){s&&s.c(),e=D(),l&&l.c(),f=ne()},l(n){s&&s.l(n),e=E(n),l&&l.l(n),f=ne()},m(n,i){s&&s.m(n,i),u(n,e,i),l&&l.m(n,i),u(n,f,i),t=!0},p(n,i){n[0].moves.egg!==void 0?s?(s.p(n,i),i&1&&S(s,1)):(s=rt(n),s.c(),S(s,1),s.m(e.parentNode,e)):s&&(he(),z(s,1,1,()=>{s=null}),ke()),n[0].moves.tm!==void 0?l?(l.p(n,i),i&1&&S(l,1)):(l=at(n),l.c(),S(l,1),l.m(f.parentNode,f)):l&&(he(),z(l,1,1,()=>{l=null}),ke())},i(n){t||(S(s),S(l),t=!0)},o(n){z(s),z(l),t=!1},d(n){n&&(a(e),a(f)),s&&s.d(n),l&&l.d(n)}}}function Wt(r){let e,f,t,s,l,n,i,o,m=r[0].description+"",d,N,P,T,C,g,A,$,c,b,x,ie,Z,ue,B,ee,G,V,k,O,H,te,fe,oe,me;t=new Ce({props:{columns:r[1]?1:2,$$slots:{default:[Vt]},$$scope:{ctx:r}}}),l=new ht({props:{media:r[0].media,alt:""}}),g=new Ce({props:{$$slots:{default:[Ft]},$$scope:{ctx:r}}}),$=new kt({props:{attributes:r[0].attributes}}),x=new Ce({props:{$$slots:{default:[Ut]},$$scope:{ctx:r}}});let Y=r[0].specialAbilityText!==void 0&&et(r),re=ae(r[0].abilities),y=[];for(let _=0;_<re.length;_+=1)y[_]=tt(Ke(r,re,_));let F=r[0].evolution!==void 0&&lt(r);return te=new Ce({props:{$$slots:{default:[Bt]},$$scope:{ctx:r}}}),oe=new Ce({props:{$$slots:{default:[Qt]},$$scope:{ctx:r}}}),{c(){e=v("section"),f=v("div"),W(t.$$.fragment),s=D(),W(l.$$.fragment),i=D(),o=v("p"),d=M(m),N=D(),P=v("hr"),T=D(),C=v("section"),W(g.$$.fragment),A=D(),W($.$$.fragment),c=D(),b=v("section"),W(x.$$.fragment),ie=D(),Z=v("hr"),ue=D(),B=v("section"),Y&&Y.c(),ee=D();for(let _=0;_<y.length;_+=1)y[_].c();G=D(),F&&F.c(),V=D(),k=v("hr"),O=D(),H=v("section"),W(te.$$.fragment),fe=D(),W(oe.$$.fragment),this.h()},l(_){e=p(_,"SECTION",{class:!0});var w=I(e);f=p(w,"DIV",{class:!0});var le=I(f);J(t.$$.fragment,le),s=E(le),J(l.$$.fragment,le),le.forEach(a),i=E(w),o=p(w,"P",{class:!0});var h=I(o);d=q(h,m),h.forEach(a),w.forEach(a),N=E(_),P=p(_,"HR",{}),T=E(_),C=p(_,"SECTION",{class:!0});var j=I(C);J(g.$$.fragment,j),A=E(j),J($.$$.fragment,j),j.forEach(a),c=E(_),b=p(_,"SECTION",{class:!0});var $e=I(b);J(x.$$.fragment,$e),$e.forEach(a),ie=E(_),Z=p(_,"HR",{}),ue=E(_),B=p(_,"SECTION",{class:!0});var _e=I(B);Y&&Y.l(_e),ee=E(_e);for(let de=0;de<y.length;de+=1)y[de].l(_e);_e.forEach(a),G=E(_),F&&F.l(_),V=E(_),k=p(_,"HR",{}),O=E(_),H=p(_,"SECTION",{class:!0});var ce=I(H);J(te.$$.fragment,ce),fe=E(ce),J(oe.$$.fragment,ce),ce.forEach(a),this.h()},h(){R(f,"class",n=Le(r[1]?"row":"")+" svelte-rf7miu"),R(o,"class","svelte-rf7miu"),R(e,"class","info svelte-rf7miu"),R(C,"class","stats"),R(b,"class","skills"),R(B,"class","abilities"),R(H,"class","moves")},m(_,w){u(_,e,w),L(e,f),K(t,f,null),L(f,s),K(l,f,null),L(e,i),L(e,o),L(o,d),u(_,N,w),u(_,P,w),u(_,T,w),u(_,C,w),K(g,C,null),L(C,A),K($,C,null),u(_,c,w),u(_,b,w),K(x,b,null),u(_,ie,w),u(_,Z,w),u(_,ue,w),u(_,B,w),Y&&Y.m(B,null),L(B,ee);for(let le=0;le<y.length;le+=1)y[le]&&y[le].m(B,null);u(_,G,w),F&&F.m(_,w),u(_,V,w),u(_,k,w),u(_,O,w),u(_,H,w),K(te,H,null),L(H,fe),K(oe,H,null),me=!0},p(_,w){const le={};w&2&&(le.columns=_[1]?1:2),w&2049&&(le.$$scope={dirty:w,ctx:_}),t.$set(le);const h={};w&1&&(h.media=_[0].media),l.$set(h),(!me||w&2&&n!==(n=Le(_[1]?"row":"")+" svelte-rf7miu"))&&R(f,"class",n),(!me||w&1)&&m!==(m=_[0].description+"")&&Q(d,m);const j={};w&2049&&(j.$$scope={dirty:w,ctx:_}),g.$set(j);const $e={};w&1&&($e.attributes=_[0].attributes),$.$set($e);const _e={};if(w&2049&&(_e.$$scope={dirty:w,ctx:_}),x.$set(_e),_[0].specialAbilityText!==void 0?Y?Y.p(_,w):(Y=et(_),Y.c(),Y.m(B,ee)):Y&&(Y.d(1),Y=null),w&1){re=ae(_[0].abilities);let se;for(se=0;se<re.length;se+=1){const Se=Ke(_,re,se);y[se]?y[se].p(Se,w):(y[se]=tt(Se),y[se].c(),y[se].m(B,null))}for(;se<y.length;se+=1)y[se].d(1);y.length=re.length}_[0].evolution!==void 0?F?(F.p(_,w),w&1&&S(F,1)):(F=lt(_),F.c(),S(F,1),F.m(V.parentNode,V)):F&&(he(),z(F,1,1,()=>{F=null}),ke());const ce={};w&2049&&(ce.$$scope={dirty:w,ctx:_}),te.$set(ce);const de={};w&2049&&(de.$$scope={dirty:w,ctx:_}),oe.$set(de)},i(_){me||(S(t.$$.fragment,_),S(l.$$.fragment,_),S(g.$$.fragment,_),S($.$$.fragment,_),S(x.$$.fragment,_),S(F),S(te.$$.fragment,_),S(oe.$$.fragment,_),me=!0)},o(_){z(t.$$.fragment,_),z(l.$$.fragment,_),z(g.$$.fragment,_),z($.$$.fragment,_),z(x.$$.fragment,_),z(F),z(te.$$.fragment,_),z(oe.$$.fragment,_),me=!1},d(_){_&&(a(e),a(N),a(P),a(T),a(C),a(c),a(b),a(ie),a(Z),a(ue),a(B),a(G),a(V),a(k),a(O),a(H)),X(t),X(l),X(g),X($),X(x),Y&&Y.d(),be(y,_),F&&F.d(_),X(te),X(oe)}}}function Jt(r){let e,f;return e=new Ct({props:{slot:"header-extra",type:r[0].type}}),{c(){W(e.$$.fragment)},l(t){J(e.$$.fragment,t)},m(t,s){K(e,t,s),f=!0},p(t,s){const l={};s&1&&(l.type=t[0].type),e.$set(l)},i(t){f||(S(e.$$.fragment,t),f=!0)},o(t){z(e.$$.fragment,t),f=!1},d(t){X(e,t)}}}function Kt(r){let e,f;return e=new $t({props:{title:r[0].name,$$slots:{"header-extra":[Jt],default:[Wt]},$$scope:{ctx:r}}}),{c(){W(e.$$.fragment)},l(t){J(e.$$.fragment,t)},m(t,s){K(e,t,s),f=!0},p(t,[s]){const l={};s&1&&(l.title=t[0].name),s&2051&&(l.$$scope={dirty:s,ctx:t}),e.$set(l)},i(t){f||(S(e.$$.fragment,t),f=!0)},o(t){z(e.$$.fragment,t),f=!1},d(t){X(e,t)}}}function Xt(r,e,f){let t,{pokemon:s}=e;return r.$$set=l=>{"pokemon"in l&&f(0,s=l.pokemon)},r.$$.update=()=>{r.$$.dirty&1&&f(1,t=s.media!=null)},[s,t]}class Yt extends Ee{constructor(e){super(),Te(this,e,Xt,Kt,De,{pokemon:0})}}function Zt(r){let e,f;return e=new Yt({props:{pokemon:r[0]}}),{c(){W(e.$$.fragment)},l(t){J(e.$$.fragment,t)},m(t,s){K(e,t,s),f=!0},p(t,s){const l={};s&1&&(l.pokemon=t[0]),e.$set(l)},i(t){f||(S(e.$$.fragment,t),f=!0)},o(t){z(e.$$.fragment,t),f=!1},d(t){X(e,t)}}}function yt(r){let e,f,t,s;return e=new Tt({props:{value:r[0].name}}),t=new Et({props:{$$slots:{default:[Zt]},$$scope:{ctx:r}}}),{c(){W(e.$$.fragment),f=D(),W(t.$$.fragment)},l(l){J(e.$$.fragment,l),f=E(l),J(t.$$.fragment,l)},m(l,n){K(e,l,n),u(l,f,n),K(t,l,n),s=!0},p(l,[n]){const i={};n&1&&(i.value=l[0].name),e.$set(i);const o={};n&5&&(o.$$scope={dirty:n,ctx:l}),t.$set(o)},i(l){s||(S(e.$$.fragment,l),S(t.$$.fragment,l),s=!0)},o(l){z(e.$$.fragment,l),z(t.$$.fragment,l),s=!1},d(l){l&&a(f),X(e,l),X(t,l)}}}function xt(r,e,f){let t,{data:s}=e;return r.$$set=l=>{"data"in l&&f(1,s=l.data)},r.$$.update=()=>{r.$$.dirty&2&&f(0,t=s.pokemon)},[t,s]}class vl extends Ee{constructor(e){super(),Te(this,e,xt,yt,De,{data:1})}}export{vl as component,dl as universal};
