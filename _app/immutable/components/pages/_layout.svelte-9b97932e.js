import{S as x,i as ee,s as te,C as me,k as _,l as d,m as p,h as f,n as u,b as H,D as he,E as _e,F as de,f as R,t as q,q as T,a as F,r as w,c as N,G as n,H as B,u as pe,B as Z,I as ve,w as J,x as K,y as Q,z as X,J as D,K as ge,L as U}from"../../chunks/index-072da995.js";import{c as Y}from"../../chunks/shared-23917130.js";import{f as se,c as ae}from"../../chunks/store-e5b6fee9.js";import{f as re,c as le,a as ne,b as oe}from"../../chunks/store-019afe61.js";import{e as ie,t as ce,a as fe}from"../../chunks/store-06454cff.js";function $e(a){let e,t;const l=a[1].default,s=me(l,a,a[0],null);return{c(){e=_("div"),s&&s.c(),this.h()},l(r){e=d(r,"DIV",{class:!0});var m=p(e);s&&s.l(m),m.forEach(f),this.h()},h(){u(e,"class","container svelte-wjlyy0")},m(r,m){H(r,e,m),s&&s.m(e,null),t=!0},p(r,[m]){s&&s.p&&(!t||m&1)&&he(s,l,r,r[0],t?de(l,r[0],m,null):_e(r[0]),null)},i(r){t||(R(s,r),t=!0)},o(r){q(s,r),t=!1},d(r){r&&f(e),s&&s.d(r)}}}function Ee(a,e,t){let{$$slots:l={},$$scope:s}=e;return a.$$set=r=>{"$$scope"in r&&t(0,s=r.$$scope)},[s,l]}class ue extends x{constructor(e){super(),ee(this,e,Ee,$e,te,{})}}function je(a){let e,t,l,s,r,m,h,o=a[0].message+"",S,y,v,b,g,i,c,E,$,L,P,I,k;return{c(){e=_("dialog"),t=_("section"),l=_("p"),s=_("strong"),r=T("Something went wrong..."),m=F(),h=_("p"),S=T(o),y=F(),v=_("p"),b=T("You can help by "),g=_("a"),i=T("reporting this error"),c=T("!"),E=F(),$=_("button"),L=T("×"),this.h()},l(j){e=d(j,"DIALOG",{"aria-label":!0,class:!0});var C=p(e);t=d(C,"SECTION",{});var A=p(t);l=d(A,"P",{class:!0});var G=p(l);s=d(G,"STRONG",{});var O=p(s);r=w(O,"Something went wrong..."),O.forEach(f),G.forEach(f),m=N(A),h=d(A,"P",{class:!0});var z=p(h);S=w(z,o),z.forEach(f),y=N(A),v=d(A,"P",{class:!0});var V=p(v);b=w(V,"You can help by "),g=d(V,"A",{href:!0});var M=p(g);i=w(M,"reporting this error"),M.forEach(f),c=w(V,"!"),V.forEach(f),A.forEach(f),E=N(C),$=d(C,"BUTTON",{class:!0,"aria-label":!0,title:!0});var W=p($);L=w(W,"×"),W.forEach(f),C.forEach(f),this.h()},h(){u(l,"class","svelte-1573ijj"),u(h,"class","font-sm svelte-1573ijj"),u(g,"href","https://github.com/Auroratide/poke5e/issues/new"),u(v,"class","font-sm svelte-1573ijj"),u($,"class","close svelte-1573ijj"),u($,"aria-label","close"),u($,"title","close"),e.open=P=a[0].hasError,u(e,"aria-label","Something went wrong"),u(e,"class","svelte-1573ijj")},m(j,C){H(j,e,C),n(e,t),n(t,l),n(l,s),n(s,r),n(t,m),n(t,h),n(h,S),n(t,y),n(t,v),n(v,b),n(v,g),n(g,i),n(v,c),n(e,E),n(e,$),n($,L),I||(k=B($,"click",a[1]),I=!0)},p(j,[C]){C&1&&o!==(o=j[0].message+"")&&pe(S,o),C&1&&P!==(P=j[0].hasError)&&(e.open=P)},i:Z,o:Z,d(j){j&&f(e),I=!1,k()}}}function be(a,e,t){let l;return ve(a,ie,r=>t(0,l=r)),[l,()=>ie.hide()]}class ye extends x{constructor(e){super(),ee(this,e,be,je,te,{})}}function Se(a){let e,t,l,s,r,m,h,o,S,y,v,b,g,i,c,E,$,L,P;return{c(){e=_("nav"),t=_("ul"),l=_("li"),s=_("a"),r=T("Pokemon"),m=F(),h=_("li"),o=_("a"),S=T("Moves"),y=F(),v=_("li"),b=_("a"),g=T("TMs"),i=F(),c=_("li"),E=_("a"),$=T("Trainers"),this.h()},l(I){e=d(I,"NAV",{"aria-label":!0,class:!0});var k=p(e);t=d(k,"UL",{class:!0});var j=p(t);l=d(j,"LI",{class:!0});var C=p(l);s=d(C,"A",{href:!0,class:!0});var A=p(s);r=w(A,"Pokemon"),A.forEach(f),C.forEach(f),m=N(j),h=d(j,"LI",{class:!0});var G=p(h);o=d(G,"A",{href:!0,class:!0});var O=p(o);S=w(O,"Moves"),O.forEach(f),G.forEach(f),y=N(j),v=d(j,"LI",{class:!0});var z=p(v);b=d(z,"A",{href:!0,class:!0});var V=p(b);g=w(V,"TMs"),V.forEach(f),z.forEach(f),i=N(j),c=d(j,"LI",{class:!0});var M=p(c);E=d(M,"A",{href:!0,class:!0});var W=p(E);$=w(W,"Trainers"),W.forEach(f),M.forEach(f),j.forEach(f),k.forEach(f),this.h()},h(){u(s,"href",Y+"/pokemon"),u(s,"class","svelte-umnjcf"),u(l,"class","theme-red svelte-umnjcf"),D(l,"active",a[1]==="pokemon"),u(o,"href",Y+"/moves"),u(o,"class","svelte-umnjcf"),u(h,"class","theme-blue svelte-umnjcf"),D(h,"active",a[1]==="moves"),u(b,"href",Y+"/tms"),u(b,"class","svelte-umnjcf"),u(v,"class","theme-purple svelte-umnjcf"),D(v,"active",a[1]==="tms"),u(E,"href",Y+"/trainers"),u(E,"class","svelte-umnjcf"),u(c,"class","theme-green svelte-umnjcf"),D(c,"active",a[1]==="trainers"),u(t,"class","svelte-umnjcf"),u(e,"aria-label","Site Navigation"),u(e,"class","svelte-umnjcf")},m(I,k){H(I,e,k),n(e,t),n(t,l),n(l,s),n(s,r),n(t,m),n(t,h),n(h,o),n(o,S),n(t,y),n(t,v),n(v,b),n(b,g),n(t,i),n(t,c),n(c,E),n(E,$),L||(P=[B(s,"click",function(){U(a[0](se,ae))&&a[0](se,ae).apply(this,arguments)}),B(o,"click",function(){U(a[0](re,le))&&a[0](re,le).apply(this,arguments)}),B(b,"click",function(){U(a[0](ne,oe))&&a[0](ne,oe).apply(this,arguments)}),B(E,"click",function(){U(a[0](ce,fe))&&a[0](ce,fe).apply(this,arguments)})],L=!0)},p(I,k){a=I,k&2&&D(l,"active",a[1]==="pokemon"),k&2&&D(h,"active",a[1]==="moves"),k&2&&D(v,"active",a[1]==="tms"),k&2&&D(c,"active",a[1]==="trainers")},d(I){I&&f(e),L=!1,ge(P)}}}function ke(a){let e,t,l;return{c(){e=_("p"),t=_("small"),l=T("This is unofficial Fan Content and is not approved/endorsed by © Wizards of the Coast, © Game Freak, or © Nintendo Company Inc. Portions of the material may be property of © Wizards of the Coast, © Game Freak, or © Nintendo Company Inc."),this.h()},l(s){e=d(s,"P",{class:!0});var r=p(e);t=d(r,"SMALL",{});var m=p(t);l=w(m,"This is unofficial Fan Content and is not approved/endorsed by © Wizards of the Coast, © Game Freak, or © Nintendo Company Inc. Portions of the material may be property of © Wizards of the Coast, © Game Freak, or © Nintendo Company Inc."),m.forEach(f),r.forEach(f),this.h()},h(){u(e,"class","license svelte-umnjcf")},m(s,r){H(s,e,r),n(e,t),n(t,l)},p:Z,d(s){s&&f(e)}}}function Ce(a){let e,t,l,s,r,m,h,o,S,y,v;l=new ue({props:{$$slots:{default:[Se]},$$scope:{ctx:a}}});const b=a[3].default,g=me(b,a,a[4],null);return o=new ue({props:{$$slots:{default:[ke]},$$scope:{ctx:a}}}),y=new ye({}),{c(){e=_("div"),t=_("header"),J(l.$$.fragment),s=F(),r=_("div"),g&&g.c(),m=F(),h=_("footer"),J(o.$$.fragment),S=F(),J(y.$$.fragment),this.h()},l(i){e=d(i,"DIV",{class:!0});var c=p(e);t=d(c,"HEADER",{});var E=p(t);K(l.$$.fragment,E),E.forEach(f),s=N(c),r=d(c,"DIV",{class:!0});var $=p(r);g&&g.l($),$.forEach(f),m=N(c),h=d(c,"FOOTER",{class:!0});var L=p(h);K(o.$$.fragment,L),L.forEach(f),S=N(c),K(y.$$.fragment,c),c.forEach(f),this.h()},h(){u(r,"class","content svelte-umnjcf"),u(h,"class","svelte-umnjcf"),u(e,"class","page svelte-umnjcf")},m(i,c){H(i,e,c),n(e,t),Q(l,t,null),n(e,s),n(e,r),g&&g.m(r,null),n(e,m),n(e,h),Q(o,h,null),n(e,S),Q(y,e,null),v=!0},p(i,[c]){const E={};c&19&&(E.$$scope={dirty:c,ctx:i}),l.$set(E),g&&g.p&&(!v||c&16)&&he(g,b,i,i[4],v?de(b,i[4],c,null):_e(i[4]),null);const $={};c&16&&($.$$scope={dirty:c,ctx:i}),o.$set($)},i(i){v||(R(l.$$.fragment,i),R(g,i),R(o.$$.fragment,i),R(y.$$.fragment,i),v=!0)},o(i){q(l.$$.fragment,i),q(g,i),q(o.$$.fragment,i),q(y.$$.fragment,i),v=!1},d(i){i&&f(e),X(l),g&&g.d(i),X(o),X(y)}}}function Ie(a,e,t){let l,{$$slots:s={},$$scope:r}=e,{data:m}=e,{resetStores:h=(o,S)=>()=>{o.set(""),S.set(()=>0)}}=e;return a.$$set=o=>{"data"in o&&t(2,m=o.data),"resetStores"in o&&t(0,h=o.resetStores),"$$scope"in o&&t(4,r=o.$$scope)},a.$$.update=()=>{a.$$.dirty&4&&t(1,l=m.activeSection)},[h,l,m,s,r]}class Ne extends x{constructor(e){super(),ee(this,e,Ie,Ce,te,{data:2,resetStores:0})}}export{Ne as default};