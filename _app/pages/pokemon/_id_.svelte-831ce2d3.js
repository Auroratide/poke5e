import{S as Ne,i as ye,s as Ie,e as $,t as k,c as b,a as h,h as g,d as r,b as N,g as u,J as _,j as F,Q as me,l as de,Y as It,_ as He,k as y,m as I,w as se,x as ie,y as fe,q as O,o as U,B as re,n as De,p as Te}from"../../chunks/vendor-10d0c3ca.js";import{b as Me}from"../../chunks/paths-396f020f.js";import{C as Pt,F as Oe,T as Ct}from"../../chunks/TypeTag-0be13894.js";import{m as jt,t as zt}from"../../chunks/store-b3dd6a82.js";import{p as nt,s as ot,g as at,a as ut,b as vt,L as Gt}from"../../chunks/_layout-f6187f35.js";import{T as Ot}from"../../chunks/Title-9a8b162d.js";import"../../chunks/Loader-b599d24f.js";import"../../chunks/Pokeball-adef7673.js";import"../../chunks/store-f2025faf.js";const ce=o=>Math.floor(o/2)-5;function Mt(o){let e,n,s,t,l,f=o[0].str+"",i,a,c=o[1](ce(o[0].str))+"",q,L,P,A,R,T,w=o[0].dex+"",d,v,D=o[1](ce(o[0].dex))+"",j,S,z,K,ee,W,G=o[0].con+"",H,E,C=o[1](ce(o[0].con))+"",V,Q,Z,J,Y,m,B=o[0].int+"",te,ue,ae=o[1](ce(o[0].int))+"",le,oe,ne,p,M,ve,be=o[0].wis+"",ge,Le,he=o[1](ce(o[0].wis))+"",Ee,qe,pe,$e,Ae,_e,ke=o[0].cha+"",Ve,Je,Re=o[1](ce(o[0].cha))+"",Fe,Qe;return{c(){e=$("dl"),n=$("dt"),s=$("abbr"),t=k("str"),l=$("dd"),i=k(f),a=k(" ("),q=k(c),L=k(")"),P=$("dt"),A=$("abbr"),R=k("dex"),T=$("dd"),d=k(w),v=k(" ("),j=k(D),S=k(")"),z=$("dt"),K=$("abbr"),ee=k("con"),W=$("dd"),H=k(G),E=k(" ("),V=k(C),Q=k(")"),Z=$("dt"),J=$("abbr"),Y=k("int"),m=$("dd"),te=k(B),ue=k(" ("),le=k(ae),oe=k(")"),ne=$("dt"),p=$("abbr"),M=k("wis"),ve=$("dd"),ge=k(be),Le=k(" ("),Ee=k(he),qe=k(")"),pe=$("dt"),$e=$("abbr"),Ae=k("cha"),_e=$("dd"),Ve=k(ke),Je=k(" ("),Fe=k(Re),Qe=k(")"),this.h()},l(x){e=b(x,"DL",{class:!0});var X=h(e);n=b(X,"DT",{class:!0});var Ye=h(n);s=b(Ye,"ABBR",{title:!0});var Ke=h(s);t=g(Ke,"str"),Ke.forEach(r),Ye.forEach(r),l=b(X,"DD",{class:!0});var Be=h(l);i=g(Be,f),a=g(Be," ("),q=g(Be,c),L=g(Be,")"),Be.forEach(r),P=b(X,"DT",{class:!0});var Xe=h(P);A=b(Xe,"ABBR",{title:!0});var Ze=h(A);R=g(Ze,"dex"),Ze.forEach(r),Xe.forEach(r),T=b(X,"DD",{class:!0});var Pe=h(T);d=g(Pe,w),v=g(Pe," ("),j=g(Pe,D),S=g(Pe,")"),Pe.forEach(r),z=b(X,"DT",{class:!0});var xe=h(z);K=b(xe,"ABBR",{title:!0});var et=h(K);ee=g(et,"con"),et.forEach(r),xe.forEach(r),W=b(X,"DD",{class:!0});var Ce=h(W);H=g(Ce,G),E=g(Ce," ("),V=g(Ce,C),Q=g(Ce,")"),Ce.forEach(r),Z=b(X,"DT",{class:!0});var tt=h(Z);J=b(tt,"ABBR",{title:!0});var lt=h(J);Y=g(lt,"int"),lt.forEach(r),tt.forEach(r),m=b(X,"DD",{class:!0});var je=h(m);te=g(je,B),ue=g(je," ("),le=g(je,ae),oe=g(je,")"),je.forEach(r),ne=b(X,"DT",{class:!0});var st=h(ne);p=b(st,"ABBR",{title:!0});var it=h(p);M=g(it,"wis"),it.forEach(r),st.forEach(r),ve=b(X,"DD",{class:!0});var ze=h(ve);ge=g(ze,be),Le=g(ze," ("),Ee=g(ze,he),qe=g(ze,")"),ze.forEach(r),pe=b(X,"DT",{class:!0});var ft=h(pe);$e=b(ft,"ABBR",{title:!0});var rt=h($e);Ae=g(rt,"cha"),rt.forEach(r),ft.forEach(r),_e=b(X,"DD",{class:!0});var Ge=h(_e);Ve=g(Ge,ke),Je=g(Ge," ("),Fe=g(Ge,Re),Qe=g(Ge,")"),Ge.forEach(r),X.forEach(r),this.h()},h(){N(s,"title","Strength"),N(n,"class","svelte-acg6vf"),N(l,"class","svelte-acg6vf"),N(A,"title","Dexterity"),N(P,"class","svelte-acg6vf"),N(T,"class","svelte-acg6vf"),N(K,"title","Constitution"),N(z,"class","svelte-acg6vf"),N(W,"class","svelte-acg6vf"),N(J,"title","Intelligence"),N(Z,"class","svelte-acg6vf"),N(m,"class","svelte-acg6vf"),N(p,"title","Wisdom"),N(ne,"class","svelte-acg6vf"),N(ve,"class","svelte-acg6vf"),N($e,"title","Charisma"),N(pe,"class","svelte-acg6vf"),N(_e,"class","svelte-acg6vf"),N(e,"class","svelte-acg6vf")},m(x,X){u(x,e,X),_(e,n),_(n,s),_(s,t),_(e,l),_(l,i),_(l,a),_(l,q),_(l,L),_(e,P),_(P,A),_(A,R),_(e,T),_(T,d),_(T,v),_(T,j),_(T,S),_(e,z),_(z,K),_(K,ee),_(e,W),_(W,H),_(W,E),_(W,V),_(W,Q),_(e,Z),_(Z,J),_(J,Y),_(e,m),_(m,te),_(m,ue),_(m,le),_(m,oe),_(e,ne),_(ne,p),_(p,M),_(e,ve),_(ve,ge),_(ve,Le),_(ve,Ee),_(ve,qe),_(e,pe),_(pe,$e),_($e,Ae),_(e,_e),_(_e,Ve),_(_e,Je),_(_e,Fe),_(_e,Qe)},p(x,[X]){X&1&&f!==(f=x[0].str+"")&&F(i,f),X&1&&c!==(c=x[1](ce(x[0].str))+"")&&F(q,c),X&1&&w!==(w=x[0].dex+"")&&F(d,w),X&1&&D!==(D=x[1](ce(x[0].dex))+"")&&F(j,D),X&1&&G!==(G=x[0].con+"")&&F(H,G),X&1&&C!==(C=x[1](ce(x[0].con))+"")&&F(V,C),X&1&&B!==(B=x[0].int+"")&&F(te,B),X&1&&ae!==(ae=x[1](ce(x[0].int))+"")&&F(le,ae),X&1&&be!==(be=x[0].wis+"")&&F(ge,be),X&1&&he!==(he=x[1](ce(x[0].wis))+"")&&F(Ee,he),X&1&&ke!==(ke=x[0].cha+"")&&F(Ve,ke),X&1&&Re!==(Re=x[1](ce(x[0].cha))+"")&&F(Fe,Re)},i:me,o:me,d(x){x&&r(e)}}}function Ht(o,e,n){let{attributes:s}=e;const t=l=>l>=0?`+${l}`:`${l}`;return o.$$set=l=>{"attributes"in l&&n(0,s=l.attributes)},[s,t]}class Vt extends Ne{constructor(e){super();ye(this,e,Ht,Mt,Ie,{attributes:0})}}function _t(o,e,n){const s=o.slice();return s[3]=e[n],s}function Ft(o){let e,n;return{c(){e=$("span"),n=k("..."),this.h()},l(s){e=b(s,"SPAN",{class:!0,"aria-label":!0});var t=h(e);n=g(t,"..."),t.forEach(r),this.h()},h(){N(e,"class","loading svelte-dqg77z"),N(e,"aria-label","Loading")},m(s,t){u(s,e,t),_(e,n)},p:me,d(s){s&&r(e)}}}function Ut(o){let e,n=o[0],s=[];for(let t=0;t<n.length;t+=1)s[t]=ct(_t(o,n,t));return{c(){e=$("ul");for(let t=0;t<s.length;t+=1)s[t].c();this.h()},l(t){e=b(t,"UL",{class:!0});var l=h(e);for(let f=0;f<s.length;f+=1)s[f].l(l);l.forEach(r),this.h()},h(){N(e,"class","svelte-dqg77z")},m(t,l){u(t,e,l);for(let f=0;f<s.length;f+=1)s[f].m(e,null)},p(t,l){if(l&5){n=t[0];let f;for(f=0;f<n.length;f+=1){const i=_t(t,n,f);s[f]?s[f].p(i,l):(s[f]=ct(i),s[f].c(),s[f].m(e,null))}for(;f<s.length;f+=1)s[f].d(1);s.length=n.length}},d(t){t&&r(e),He(s,t)}}}function ct(o){let e,n,s=o[2](o[3])+"",t,l;return{c(){e=$("li"),n=$("a"),t=k(s),this.h()},l(f){e=b(f,"LI",{class:!0});var i=h(e);n=b(i,"A",{href:!0});var a=h(n);t=g(a,s),a.forEach(r),i.forEach(r),this.h()},h(){N(n,"href",l=Me+"/moves/"+o[3]),N(e,"class","svelte-dqg77z")},m(f,i){u(f,e,i),_(e,n),_(n,t)},p(f,i){i&1&&s!==(s=f[2](f[3])+"")&&F(t,s),i&1&&l!==(l=Me+"/moves/"+f[3])&&N(n,"href",l)},d(f){f&&r(e)}}}function Jt(o){let e;function n(l,f){return l[1]!==void 0?Ut:Ft}let s=n(o),t=s(o);return{c(){t.c(),e=de()},l(l){t.l(l),e=de()},m(l,f){t.m(l,f),u(l,e,f)},p(l,[f]){s===(s=n(l))&&t?t.p(l,f):(t.d(1),t=s(l),t&&(t.c(),t.m(e.parentNode,e)))},i:me,o:me,d(l){t.d(l),l&&r(e)}}}function Qt(o,e,n){let s;It(o,jt,f=>n(1,s=f));let{moves:t}=e;const l=f=>{var i;return(i=s.find(a=>a.id===f))==null?void 0:i.name};return o.$$set=f=>{"moves"in f&&n(0,t=f.moves)},[t,s,l]}class Se extends Ne{constructor(e){super();ye(this,e,Qt,Jt,Ie,{moves:0})}}function mt(o,e,n){const s=o.slice();return s[3]=e[n],s}function Wt(o){let e,n;return{c(){e=$("span"),n=k("..."),this.h()},l(s){e=b(s,"SPAN",{class:!0,"aria-label":!0});var t=h(e);n=g(t,"..."),t.forEach(r),this.h()},h(){N(e,"class","loading svelte-dqg77z"),N(e,"aria-label","Loading")},m(s,t){u(s,e,t),_(e,n)},p:me,d(s){s&&r(e)}}}function Yt(o){let e,n=o[0],s=[];for(let t=0;t<n.length;t+=1)s[t]=dt(mt(o,n,t));return{c(){e=$("ul");for(let t=0;t<s.length;t+=1)s[t].c();this.h()},l(t){e=b(t,"UL",{class:!0});var l=h(e);for(let f=0;f<s.length;f+=1)s[f].l(l);l.forEach(r),this.h()},h(){N(e,"class","svelte-dqg77z")},m(t,l){u(t,e,l);for(let f=0;f<s.length;f+=1)s[f].m(e,null)},p(t,l){if(l&5){n=t[0];let f;for(f=0;f<n.length;f+=1){const i=mt(t,n,f);s[f]?s[f].p(i,l):(s[f]=dt(i),s[f].c(),s[f].m(e,null))}for(;f<s.length;f+=1)s[f].d(1);s.length=n.length}},d(t){t&&r(e),He(s,t)}}}function dt(o){let e,n,s=o[3]+"",t,l,f;return{c(){e=$("li"),n=$("a"),t=k(s),this.h()},l(i){e=b(i,"LI",{class:!0});var a=h(e);n=b(a,"A",{href:!0,title:!0});var c=h(n);t=g(c,s),c.forEach(r),a.forEach(r),this.h()},h(){N(n,"href",l=Me+"/tms/"+o[3]),N(n,"title",f=o[2](o[3])),N(e,"class","svelte-dqg77z")},m(i,a){u(i,e,a),_(e,n),_(n,t)},p(i,a){a&1&&s!==(s=i[3]+"")&&F(t,s),a&1&&l!==(l=Me+"/tms/"+i[3])&&N(n,"href",l),a&1&&f!==(f=i[2](i[3]))&&N(n,"title",f)},d(i){i&&r(e)}}}function Kt(o){let e;function n(l,f){return l[1]!==void 0?Yt:Wt}let s=n(o),t=s(o);return{c(){t.c(),e=de()},l(l){t.l(l),e=de()},m(l,f){t.m(l,f),u(l,e,f)},p(l,[f]){s===(s=n(l))&&t?t.p(l,f):(t.d(1),t=s(l),t&&(t.c(),t.m(e.parentNode,e)))},i:me,o:me,d(l){t.d(l),l&&r(e)}}}function Xt(o,e,n){let s;It(o,zt,f=>n(1,s=f));let{tms:t}=e;const l=f=>{var i,a;return(a=(i=s.find(c=>c.id===f))==null?void 0:i.moveInfo)==null?void 0:a.name};return o.$$set=f=>{"tms"in f&&n(0,t=f.tms)},[t,s,l]}class Zt extends Ne{constructor(e){super();ye(this,e,Xt,Kt,Ie,{tms:0})}}const Rt={normal:["fighting"],fighting:["fairy","flying","psychic"],flying:["electric","ice","rock"],poison:["ground","psychic"],ground:["grass","ice","water"],rock:["fighting","grass","ground","steel","water"],bug:["fire","flying","rock"],ghost:["dark","ghost"],steel:["fire","fighting","ground"],fire:["ground","rock","water"],water:["electric","grass"],grass:["bug","fire","flying","ice","poison"],electric:["ground"],psychic:["bug","dark","ghost"],ice:["fighting","fire","rock","steel"],dragon:["dragon","fairy","ice"],dark:["bug","fairy","fighting"],fairy:["poison","steel"]},Bt={normal:[],fighting:["bug","rock","dark"],flying:["bug","fighting","grass"],poison:["fighting","poison","bug","grass","fairy"],ground:["poison","rock"],rock:["fire","flying","normal","poison"],bug:["fighting","grass","ground"],ghost:["bug","poison"],steel:["bug","dragon","fairy","flying","grass","ice","normal","psychic","rock","steel"],fire:["bug","fairy","fire","grass","ice","steel"],water:["fire","ice","steel","water"],grass:["electric","grass","ground","water"],electric:["electric","flying","steel"],psychic:["fighting","psychic"],ice:["ice"],dragon:["electric","fire","grass","water"],dark:["dark","ghost"],fairy:["bug","dark","fighting"]},We={normal:["ghost"],fighting:[],flying:["ground"],poison:[],ground:["electric"],rock:[],bug:[],ghost:["normal","fighting"],steel:["poison"],fire:[],water:[],grass:[],electric:[],psychic:[],ice:[],dragon:[],dark:["psychic"],fairy:["dragon"]},we=o=>(e,n)=>e.concat(o[n]),Ue=o=>e=>!o.includes(e),xt=o=>new Set(o.reduce(we(Rt),[]).filter(Ue(o.reduce(we(Bt),[]))).filter(Ue(o.reduce(we(We),[])))),el=o=>new Set(o.reduce(we(Bt),[]).filter(Ue(o.reduce(we(Rt),[]))).filter(Ue(o.reduce(we(We),[])))),tl=o=>new Set(o.reduce(we(We),[]));function ll(o){let e,n,s,t,l=o[3](o[2])+"",f,i,a,c,q,L,P=o[3](o[1])+"",A,R,T,w,d,v,D=o[3](o[0])+"",j;return{c(){e=$("dt"),n=k("Vulnerabilities"),s=y(),t=$("dd"),f=k(l),i=y(),a=$("dt"),c=k("Resistances"),q=y(),L=$("dd"),A=k(P),R=y(),T=$("dt"),w=k("Immunities"),d=y(),v=$("dd"),j=k(D),this.h()},l(S){e=b(S,"DT",{});var z=h(e);n=g(z,"Vulnerabilities"),z.forEach(r),s=I(S),t=b(S,"DD",{class:!0});var K=h(t);f=g(K,l),K.forEach(r),i=I(S),a=b(S,"DT",{});var ee=h(a);c=g(ee,"Resistances"),ee.forEach(r),q=I(S),L=b(S,"DD",{class:!0});var W=h(L);A=g(W,P),W.forEach(r),R=I(S),T=b(S,"DT",{});var G=h(T);w=g(G,"Immunities"),G.forEach(r),d=I(S),v=b(S,"DD",{class:!0});var H=h(v);j=g(H,D),H.forEach(r),this.h()},h(){N(t,"class","svelte-1umt4iy"),N(L,"class","svelte-1umt4iy"),N(v,"class","svelte-1umt4iy")},m(S,z){u(S,e,z),_(e,n),u(S,s,z),u(S,t,z),_(t,f),u(S,i,z),u(S,a,z),_(a,c),u(S,q,z),u(S,L,z),_(L,A),u(S,R,z),u(S,T,z),_(T,w),u(S,d,z),u(S,v,z),_(v,j)},p(S,[z]){z&4&&l!==(l=S[3](S[2])+"")&&F(f,l),z&2&&P!==(P=S[3](S[1])+"")&&F(A,P),z&1&&D!==(D=S[3](S[0])+"")&&F(j,D)},i:me,o:me,d(S){S&&r(e),S&&r(s),S&&r(t),S&&r(i),S&&r(a),S&&r(q),S&&r(L),S&&r(R),S&&r(T),S&&r(d),S&&r(v)}}}function sl(o,e,n){let s,t,l,{type:f}=e;const i=a=>a.length===0?"none":a.join(", ");return o.$$set=a=>{"type"in a&&n(4,f=a.type)},o.$$.update=()=>{o.$$.dirty&16&&n(2,s=Array.from(xt(f))),o.$$.dirty&16&&n(1,t=Array.from(el(f))),o.$$.dirty&16&&n(0,l=Array.from(tl(f)))},[l,t,s,i,f]}class il extends Ne{constructor(e){super();ye(this,e,sl,ll,Ie,{type:4})}}function pt(o,e,n){const s=o.slice();return s[1]=e[n],s}function $t(o,e,n){const s=o.slice();return s[4]=e[n],s}function bt(o,e,n){const s=o.slice();return s[7]=e[n],s}function fl(o){let e,n,s,t,l=nt(o[0].number)+"",f,i,a,c,q,L,P=o[0].size+"",A,R,T,w,d,v,D,j=ot(o[0].sr)+"",S,z,K,ee,W,G,H=o[0].eggGroup.join(", ")+"",E,C,V,Q,Z,J,Y=o[0].minLevel+"",m,B,te,ue,ae,le,oe=at(o[0].gender)+"",ne;return{c(){e=$("dt"),n=k("Number"),s=y(),t=$("dd"),f=k(l),i=y(),a=$("dt"),c=k("Size"),q=y(),L=$("dd"),A=k(P),R=y(),T=$("dt"),w=$("abbr"),d=k("SR"),v=y(),D=$("dd"),S=k(j),z=y(),K=$("dt"),ee=k("Egg Group"),W=y(),G=$("dd"),E=k(H),C=y(),V=$("dt"),Q=k("Min Level"),Z=y(),J=$("dd"),m=k(Y),B=y(),te=$("dt"),ue=k("Gender"),ae=y(),le=$("dd"),ne=k(oe),this.h()},l(p){e=b(p,"DT",{});var M=h(e);n=g(M,"Number"),M.forEach(r),s=I(p),t=b(p,"DD",{});var ve=h(t);f=g(ve,l),ve.forEach(r),i=I(p),a=b(p,"DT",{});var be=h(a);c=g(be,"Size"),be.forEach(r),q=I(p),L=b(p,"DD",{class:!0});var ge=h(L);A=g(ge,P),ge.forEach(r),R=I(p),T=b(p,"DT",{});var Le=h(T);w=b(Le,"ABBR",{title:!0});var he=h(w);d=g(he,"SR"),he.forEach(r),Le.forEach(r),v=I(p),D=b(p,"DD",{});var Ee=h(D);S=g(Ee,j),Ee.forEach(r),z=I(p),K=b(p,"DT",{});var qe=h(K);ee=g(qe,"Egg Group"),qe.forEach(r),W=I(p),G=b(p,"DD",{class:!0});var pe=h(G);E=g(pe,H),pe.forEach(r),C=I(p),V=b(p,"DT",{});var $e=h(V);Q=g($e,"Min Level"),$e.forEach(r),Z=I(p),J=b(p,"DD",{});var Ae=h(J);m=g(Ae,Y),Ae.forEach(r),B=I(p),te=b(p,"DT",{});var _e=h(te);ue=g(_e,"Gender"),_e.forEach(r),ae=I(p),le=b(p,"DD",{class:!0});var ke=h(le);ne=g(ke,oe),ke.forEach(r),this.h()},h(){N(L,"class","cap svelte-3tneqv"),N(w,"title","Species Rating"),N(G,"class","cap svelte-3tneqv"),N(le,"class","cap svelte-3tneqv")},m(p,M){u(p,e,M),_(e,n),u(p,s,M),u(p,t,M),_(t,f),u(p,i,M),u(p,a,M),_(a,c),u(p,q,M),u(p,L,M),_(L,A),u(p,R,M),u(p,T,M),_(T,w),_(w,d),u(p,v,M),u(p,D,M),_(D,S),u(p,z,M),u(p,K,M),_(K,ee),u(p,W,M),u(p,G,M),_(G,E),u(p,C,M),u(p,V,M),_(V,Q),u(p,Z,M),u(p,J,M),_(J,m),u(p,B,M),u(p,te,M),_(te,ue),u(p,ae,M),u(p,le,M),_(le,ne)},p(p,M){M&1&&l!==(l=nt(p[0].number)+"")&&F(f,l),M&1&&P!==(P=p[0].size+"")&&F(A,P),M&1&&j!==(j=ot(p[0].sr)+"")&&F(S,j),M&1&&H!==(H=p[0].eggGroup.join(", ")+"")&&F(E,H),M&1&&Y!==(Y=p[0].minLevel+"")&&F(m,Y),M&1&&oe!==(oe=at(p[0].gender)+"")&&F(ne,oe)},d(p){p&&r(e),p&&r(s),p&&r(t),p&&r(i),p&&r(a),p&&r(q),p&&r(L),p&&r(R),p&&r(T),p&&r(v),p&&r(D),p&&r(z),p&&r(K),p&&r(W),p&&r(G),p&&r(C),p&&r(V),p&&r(Z),p&&r(J),p&&r(B),p&&r(te),p&&r(ae),p&&r(le)}}}function ht(o){let e,n=ut(o[7])+"",s;return{c(){e=$("dd"),s=k(n)},l(t){e=b(t,"DD",{});var l=h(e);s=g(l,n),l.forEach(r)},m(t,l){u(t,e,l),_(e,s)},p(t,l){l&1&&n!==(n=ut(t[7])+"")&&F(s,n)},d(t){t&&r(e)}}}function kt(o){let e,n,s,t,l=o[0].senses,f=[];for(let i=0;i<l.length;i+=1)f[i]=gt($t(o,l,i));return{c(){e=$("dt"),n=k("Senses"),s=y(),t=$("div");for(let i=0;i<f.length;i+=1)f[i].c();this.h()},l(i){e=b(i,"DT",{});var a=h(e);n=g(a,"Senses"),a.forEach(r),s=I(i),t=b(i,"DIV",{class:!0});var c=h(t);for(let q=0;q<f.length;q+=1)f[q].l(c);c.forEach(r),this.h()},h(){N(t,"class","cap svelte-3tneqv")},m(i,a){u(i,e,a),_(e,n),u(i,s,a),u(i,t,a);for(let c=0;c<f.length;c+=1)f[c].m(t,null)},p(i,a){if(a&1){l=i[0].senses;let c;for(c=0;c<l.length;c+=1){const q=$t(i,l,c);f[c]?f[c].p(q,a):(f[c]=gt(q),f[c].c(),f[c].m(t,null))}for(;c<f.length;c+=1)f[c].d(1);f.length=l.length}},d(i){i&&r(e),i&&r(s),i&&r(t),He(f,i)}}}function gt(o){let e,n=vt(o[4])+"",s;return{c(){e=$("dd"),s=k(n)},l(t){e=b(t,"DD",{});var l=h(e);s=g(l,n),l.forEach(r)},m(t,l){u(t,e,l),_(e,s)},p(t,l){l&1&&n!==(n=vt(t[4])+"")&&F(s,n)},d(t){t&&r(e)}}}function rl(o){let e,n,s,t,l=o[0].ac+"",f,i,a,c,q,L,P=o[0].hp+"",A,R,T=o[0].hitDice+"",w,d,v,D,j,S,z,K,ee,W=o[0].speed,G=[];for(let E=0;E<W.length;E+=1)G[E]=ht(bt(o,W,E));let H=o[0].senses.length>0&&kt(o);return{c(){e=$("dt"),n=k("Armor Class"),s=y(),t=$("dd"),f=k(l),i=y(),a=$("dt"),c=k("Hit Points"),q=y(),L=$("dd"),A=k(P),R=k(" ("),w=k(T),d=k(")"),v=y(),D=$("dt"),j=k("Speed"),S=y(),z=$("div");for(let E=0;E<G.length;E+=1)G[E].c();K=y(),H&&H.c(),ee=de()},l(E){e=b(E,"DT",{});var C=h(e);n=g(C,"Armor Class"),C.forEach(r),s=I(E),t=b(E,"DD",{});var V=h(t);f=g(V,l),V.forEach(r),i=I(E),a=b(E,"DT",{});var Q=h(a);c=g(Q,"Hit Points"),Q.forEach(r),q=I(E),L=b(E,"DD",{});var Z=h(L);A=g(Z,P),R=g(Z," ("),w=g(Z,T),d=g(Z,")"),Z.forEach(r),v=I(E),D=b(E,"DT",{});var J=h(D);j=g(J,"Speed"),J.forEach(r),S=I(E),z=b(E,"DIV",{});var Y=h(z);for(let m=0;m<G.length;m+=1)G[m].l(Y);Y.forEach(r),K=I(E),H&&H.l(E),ee=de()},m(E,C){u(E,e,C),_(e,n),u(E,s,C),u(E,t,C),_(t,f),u(E,i,C),u(E,a,C),_(a,c),u(E,q,C),u(E,L,C),_(L,A),_(L,R),_(L,w),_(L,d),u(E,v,C),u(E,D,C),_(D,j),u(E,S,C),u(E,z,C);for(let V=0;V<G.length;V+=1)G[V].m(z,null);u(E,K,C),H&&H.m(E,C),u(E,ee,C)},p(E,C){if(C&1&&l!==(l=E[0].ac+"")&&F(f,l),C&1&&P!==(P=E[0].hp+"")&&F(A,P),C&1&&T!==(T=E[0].hitDice+"")&&F(w,T),C&1){W=E[0].speed;let V;for(V=0;V<W.length;V+=1){const Q=bt(E,W,V);G[V]?G[V].p(Q,C):(G[V]=ht(Q),G[V].c(),G[V].m(z,null))}for(;V<G.length;V+=1)G[V].d(1);G.length=W.length}E[0].senses.length>0?H?H.p(E,C):(H=kt(E),H.c(),H.m(ee.parentNode,ee)):H&&(H.d(1),H=null)},d(E){E&&r(e),E&&r(s),E&&r(t),E&&r(i),E&&r(a),E&&r(q),E&&r(L),E&&r(v),E&&r(D),E&&r(S),E&&r(z),He(G,E),E&&r(K),H&&H.d(E),E&&r(ee)}}}function nl(o){let e,n,s,t,l=o[0].skills.join(", ")+"",f,i,a,c,q,L,P=o[0].savingThrows.join(", ")+"",A,R,T,w;return T=new il({props:{type:o[0].type}}),{c(){e=$("dt"),n=k("Proficiencies"),s=y(),t=$("dd"),f=k(l),i=y(),a=$("dt"),c=k("Saving Throws"),q=y(),L=$("dd"),A=k(P),R=y(),se(T.$$.fragment),this.h()},l(d){e=b(d,"DT",{});var v=h(e);n=g(v,"Proficiencies"),v.forEach(r),s=I(d),t=b(d,"DD",{class:!0});var D=h(t);f=g(D,l),D.forEach(r),i=I(d),a=b(d,"DT",{});var j=h(a);c=g(j,"Saving Throws"),j.forEach(r),q=I(d),L=b(d,"DD",{class:!0});var S=h(L);A=g(S,P),S.forEach(r),R=I(d),ie(T.$$.fragment,d),this.h()},h(){N(t,"class","cap svelte-3tneqv"),N(L,"class","upper svelte-3tneqv")},m(d,v){u(d,e,v),_(e,n),u(d,s,v),u(d,t,v),_(t,f),u(d,i,v),u(d,a,v),_(a,c),u(d,q,v),u(d,L,v),_(L,A),u(d,R,v),fe(T,d,v),w=!0},p(d,v){(!w||v&1)&&l!==(l=d[0].skills.join(", ")+"")&&F(f,l),(!w||v&1)&&P!==(P=d[0].savingThrows.join(", ")+"")&&F(A,P);const D={};v&1&&(D.type=d[0].type),T.$set(D)},i(d){w||(O(T.$$.fragment,d),w=!0)},o(d){U(T.$$.fragment,d),w=!1},d(d){d&&r(e),d&&r(s),d&&r(t),d&&r(i),d&&r(a),d&&r(q),d&&r(L),d&&r(R),re(T,d)}}}function Et(o){let e,n,s=o[0].specialAbilityText+"",t;return{c(){e=$("p"),n=$("strong"),t=k(s),this.h()},l(l){e=b(l,"P",{class:!0});var f=h(e);n=b(f,"STRONG",{});var i=h(n);t=g(i,s),i.forEach(r),f.forEach(r),this.h()},h(){N(e,"class","svelte-3tneqv")},m(l,f){u(l,e,f),_(e,n),_(n,t)},p(l,f){f&1&&s!==(s=l[0].specialAbilityText+"")&&F(t,s)},d(l){l&&r(e)}}}function Dt(o){let e,n,s=o[1].name+"",t,l,f,i=o[1].description+"",a;return{c(){e=$("p"),n=$("strong"),t=k(s),l=k(":"),f=y(),a=k(i),this.h()},l(c){e=b(c,"P",{class:!0});var q=h(e);n=b(q,"STRONG",{});var L=h(n);t=g(L,s),l=g(L,":"),L.forEach(r),f=I(q),a=g(q,i),q.forEach(r),this.h()},h(){N(e,"class","svelte-3tneqv")},m(c,q){u(c,e,q),_(e,n),_(n,t),_(n,l),_(e,f),_(e,a)},p(c,q){q&1&&s!==(s=c[1].name+"")&&F(t,s),q&1&&i!==(i=c[1].description+"")&&F(a,i)},d(c){c&&r(e)}}}function Tt(o){let e,n,s,t,l,f,i,a=o[0].evolution.stage+"",c,q,L=o[0].evolution.maxStage+"",P,A;function R(d,v){return d[0].evolution.description!==void 0?al:ol}let T=R(o),w=T(o);return{c(){e=$("hr"),n=y(),s=$("section"),t=$("p"),l=$("strong"),f=k("Evolution:"),i=y(),c=k(a),q=k(" / "),P=k(L),A=y(),w.c(),this.h()},l(d){e=b(d,"HR",{class:!0}),n=I(d),s=b(d,"SECTION",{class:!0});var v=h(s);t=b(v,"P",{class:!0});var D=h(t);l=b(D,"STRONG",{});var j=h(l);f=g(j,"Evolution:"),j.forEach(r),i=I(D),c=g(D,a),q=g(D," / "),P=g(D,L),D.forEach(r),A=I(v),w.l(v),v.forEach(r),this.h()},h(){N(e,"class","svelte-3tneqv"),N(t,"class","svelte-3tneqv"),N(s,"class","evolution svelte-3tneqv")},m(d,v){u(d,e,v),u(d,n,v),u(d,s,v),_(s,t),_(t,l),_(l,f),_(t,i),_(t,c),_(t,q),_(t,P),_(s,A),w.m(s,null)},p(d,v){v&1&&a!==(a=d[0].evolution.stage+"")&&F(c,a),v&1&&L!==(L=d[0].evolution.maxStage+"")&&F(P,L),T===(T=R(d))&&w?w.p(d,v):(w.d(1),w=T(d),w&&(w.c(),w.m(s,null)))},d(d){d&&r(e),d&&r(n),d&&r(s),w.d()}}}function ol(o){let e,n;return{c(){e=$("p"),n=k("This pokemon is at its highest evolutionary state."),this.h()},l(s){e=b(s,"P",{class:!0});var t=h(e);n=g(t,"This pokemon is at its highest evolutionary state."),t.forEach(r),this.h()},h(){N(e,"class","svelte-3tneqv")},m(s,t){u(s,e,t),_(e,n)},p:me,d(s){s&&r(e)}}}function al(o){let e,n=o[0].evolution.description+"",s;return{c(){e=$("p"),s=k(n),this.h()},l(t){e=b(t,"P",{class:!0});var l=h(e);s=g(l,n),l.forEach(r),this.h()},h(){N(e,"class","svelte-3tneqv")},m(t,l){u(t,e,l),_(e,s)},p(t,l){l&1&&n!==(n=t[0].evolution.description+"")&&F(s,n)},d(t){t&&r(e)}}}function wt(o){let e,n,s,t,l,f;return l=new Se({props:{moves:o[0].moves.level2}}),{c(){e=$("dt"),n=k("Level 2"),s=y(),t=$("dd"),se(l.$$.fragment)},l(i){e=b(i,"DT",{});var a=h(e);n=g(a,"Level 2"),a.forEach(r),s=I(i),t=b(i,"DD",{});var c=h(t);ie(l.$$.fragment,c),c.forEach(r)},m(i,a){u(i,e,a),_(e,n),u(i,s,a),u(i,t,a),fe(l,t,null),f=!0},p(i,a){const c={};a&1&&(c.moves=i[0].moves.level2),l.$set(c)},i(i){f||(O(l.$$.fragment,i),f=!0)},o(i){U(l.$$.fragment,i),f=!1},d(i){i&&r(e),i&&r(s),i&&r(t),re(l)}}}function St(o){let e,n,s,t,l,f;return l=new Se({props:{moves:o[0].moves.level6}}),{c(){e=$("dt"),n=k("Level 6"),s=y(),t=$("dd"),se(l.$$.fragment)},l(i){e=b(i,"DT",{});var a=h(e);n=g(a,"Level 6"),a.forEach(r),s=I(i),t=b(i,"DD",{});var c=h(t);ie(l.$$.fragment,c),c.forEach(r)},m(i,a){u(i,e,a),_(e,n),u(i,s,a),u(i,t,a),fe(l,t,null),f=!0},p(i,a){const c={};a&1&&(c.moves=i[0].moves.level6),l.$set(c)},i(i){f||(O(l.$$.fragment,i),f=!0)},o(i){U(l.$$.fragment,i),f=!1},d(i){i&&r(e),i&&r(s),i&&r(t),re(l)}}}function Lt(o){let e,n,s,t,l,f;return l=new Se({props:{moves:o[0].moves.level10}}),{c(){e=$("dt"),n=k("Level 10"),s=y(),t=$("dd"),se(l.$$.fragment)},l(i){e=b(i,"DT",{});var a=h(e);n=g(a,"Level 10"),a.forEach(r),s=I(i),t=b(i,"DD",{});var c=h(t);ie(l.$$.fragment,c),c.forEach(r)},m(i,a){u(i,e,a),_(e,n),u(i,s,a),u(i,t,a),fe(l,t,null),f=!0},p(i,a){const c={};a&1&&(c.moves=i[0].moves.level10),l.$set(c)},i(i){f||(O(l.$$.fragment,i),f=!0)},o(i){U(l.$$.fragment,i),f=!1},d(i){i&&r(e),i&&r(s),i&&r(t),re(l)}}}function qt(o){let e,n,s,t,l,f;return l=new Se({props:{moves:o[0].moves.level14}}),{c(){e=$("dt"),n=k("Level 14"),s=y(),t=$("dd"),se(l.$$.fragment)},l(i){e=b(i,"DT",{});var a=h(e);n=g(a,"Level 14"),a.forEach(r),s=I(i),t=b(i,"DD",{});var c=h(t);ie(l.$$.fragment,c),c.forEach(r)},m(i,a){u(i,e,a),_(e,n),u(i,s,a),u(i,t,a),fe(l,t,null),f=!0},p(i,a){const c={};a&1&&(c.moves=i[0].moves.level14),l.$set(c)},i(i){f||(O(l.$$.fragment,i),f=!0)},o(i){U(l.$$.fragment,i),f=!1},d(i){i&&r(e),i&&r(s),i&&r(t),re(l)}}}function At(o){let e,n,s,t,l,f;return l=new Se({props:{moves:o[0].moves.level18}}),{c(){e=$("dt"),n=k("Level 18"),s=y(),t=$("dd"),se(l.$$.fragment)},l(i){e=b(i,"DT",{});var a=h(e);n=g(a,"Level 18"),a.forEach(r),s=I(i),t=b(i,"DD",{});var c=h(t);ie(l.$$.fragment,c),c.forEach(r)},m(i,a){u(i,e,a),_(e,n),u(i,s,a),u(i,t,a),fe(l,t,null),f=!0},p(i,a){const c={};a&1&&(c.moves=i[0].moves.level18),l.$set(c)},i(i){f||(O(l.$$.fragment,i),f=!0)},o(i){U(l.$$.fragment,i),f=!1},d(i){i&&r(e),i&&r(s),i&&r(t),re(l)}}}function ul(o){let e,n,s,t,l,f,i,a,c,q,L,P;l=new Se({props:{moves:o[0].moves.start}});let A=o[0].moves.level2!==void 0&&wt(o),R=o[0].moves.level6!==void 0&&St(o),T=o[0].moves.level10!==void 0&&Lt(o),w=o[0].moves.level14!==void 0&&qt(o),d=o[0].moves.level18!==void 0&&At(o);return{c(){e=$("dt"),n=k("Starting"),s=y(),t=$("dd"),se(l.$$.fragment),f=y(),A&&A.c(),i=y(),R&&R.c(),a=y(),T&&T.c(),c=y(),w&&w.c(),q=y(),d&&d.c(),L=de()},l(v){e=b(v,"DT",{});var D=h(e);n=g(D,"Starting"),D.forEach(r),s=I(v),t=b(v,"DD",{});var j=h(t);ie(l.$$.fragment,j),j.forEach(r),f=I(v),A&&A.l(v),i=I(v),R&&R.l(v),a=I(v),T&&T.l(v),c=I(v),w&&w.l(v),q=I(v),d&&d.l(v),L=de()},m(v,D){u(v,e,D),_(e,n),u(v,s,D),u(v,t,D),fe(l,t,null),u(v,f,D),A&&A.m(v,D),u(v,i,D),R&&R.m(v,D),u(v,a,D),T&&T.m(v,D),u(v,c,D),w&&w.m(v,D),u(v,q,D),d&&d.m(v,D),u(v,L,D),P=!0},p(v,D){const j={};D&1&&(j.moves=v[0].moves.start),l.$set(j),v[0].moves.level2!==void 0?A?(A.p(v,D),D&1&&O(A,1)):(A=wt(v),A.c(),O(A,1),A.m(i.parentNode,i)):A&&(De(),U(A,1,1,()=>{A=null}),Te()),v[0].moves.level6!==void 0?R?(R.p(v,D),D&1&&O(R,1)):(R=St(v),R.c(),O(R,1),R.m(a.parentNode,a)):R&&(De(),U(R,1,1,()=>{R=null}),Te()),v[0].moves.level10!==void 0?T?(T.p(v,D),D&1&&O(T,1)):(T=Lt(v),T.c(),O(T,1),T.m(c.parentNode,c)):T&&(De(),U(T,1,1,()=>{T=null}),Te()),v[0].moves.level14!==void 0?w?(w.p(v,D),D&1&&O(w,1)):(w=qt(v),w.c(),O(w,1),w.m(q.parentNode,q)):w&&(De(),U(w,1,1,()=>{w=null}),Te()),v[0].moves.level18!==void 0?d?(d.p(v,D),D&1&&O(d,1)):(d=At(v),d.c(),O(d,1),d.m(L.parentNode,L)):d&&(De(),U(d,1,1,()=>{d=null}),Te())},i(v){P||(O(l.$$.fragment,v),O(A),O(R),O(T),O(w),O(d),P=!0)},o(v){U(l.$$.fragment,v),U(A),U(R),U(T),U(w),U(d),P=!1},d(v){v&&r(e),v&&r(s),v&&r(t),re(l),v&&r(f),A&&A.d(v),v&&r(i),R&&R.d(v),v&&r(a),T&&T.d(v),v&&r(c),w&&w.d(v),v&&r(q),d&&d.d(v),v&&r(L)}}}function Nt(o){let e,n,s,t,l,f;return l=new Se({props:{moves:o[0].moves.egg}}),{c(){e=$("dt"),n=k("Egg"),s=y(),t=$("dd"),se(l.$$.fragment)},l(i){e=b(i,"DT",{});var a=h(e);n=g(a,"Egg"),a.forEach(r),s=I(i),t=b(i,"DD",{});var c=h(t);ie(l.$$.fragment,c),c.forEach(r)},m(i,a){u(i,e,a),_(e,n),u(i,s,a),u(i,t,a),fe(l,t,null),f=!0},p(i,a){const c={};a&1&&(c.moves=i[0].moves.egg),l.$set(c)},i(i){f||(O(l.$$.fragment,i),f=!0)},o(i){U(l.$$.fragment,i),f=!1},d(i){i&&r(e),i&&r(s),i&&r(t),re(l)}}}function yt(o){let e,n,s,t,l,f;return l=new Zt({props:{tms:o[0].moves.tm}}),{c(){e=$("dt"),n=k("TM"),s=y(),t=$("dd"),se(l.$$.fragment)},l(i){e=b(i,"DT",{});var a=h(e);n=g(a,"TM"),a.forEach(r),s=I(i),t=b(i,"DD",{});var c=h(t);ie(l.$$.fragment,c),c.forEach(r)},m(i,a){u(i,e,a),_(e,n),u(i,s,a),u(i,t,a),fe(l,t,null),f=!0},p(i,a){const c={};a&1&&(c.tms=i[0].moves.tm),l.$set(c)},i(i){f||(O(l.$$.fragment,i),f=!0)},o(i){U(l.$$.fragment,i),f=!1},d(i){i&&r(e),i&&r(s),i&&r(t),re(l)}}}function vl(o){let e,n,s,t=o[0].moves.egg!==void 0&&Nt(o),l=o[0].moves.tm!==void 0&&yt(o);return{c(){t&&t.c(),e=y(),l&&l.c(),n=de()},l(f){t&&t.l(f),e=I(f),l&&l.l(f),n=de()},m(f,i){t&&t.m(f,i),u(f,e,i),l&&l.m(f,i),u(f,n,i),s=!0},p(f,i){f[0].moves.egg!==void 0?t?(t.p(f,i),i&1&&O(t,1)):(t=Nt(f),t.c(),O(t,1),t.m(e.parentNode,e)):t&&(De(),U(t,1,1,()=>{t=null}),Te()),f[0].moves.tm!==void 0?l?(l.p(f,i),i&1&&O(l,1)):(l=yt(f),l.c(),O(l,1),l.m(n.parentNode,n)):l&&(De(),U(l,1,1,()=>{l=null}),Te())},i(f){s||(O(t),O(l),s=!0)},o(f){U(t),U(l),s=!1},d(f){t&&t.d(f),f&&r(e),l&&l.d(f),f&&r(n)}}}function _l(o){let e,n,s,t,l=o[0].description+"",f,i,a,c,q,L,P,A,R,T,w,d,v,D,j,S,z,K,ee,W,G,H,E,C,V;n=new Oe({props:{columns:2,$$slots:{default:[fl]},$$scope:{ctx:o}}}),L=new Oe({props:{$$slots:{default:[rl]},$$scope:{ctx:o}}}),A=new Vt({props:{attributes:o[0].attributes}}),w=new Oe({props:{$$slots:{default:[nl]},$$scope:{ctx:o}}});let Q=o[0].specialAbilityText!==void 0&&Et(o),Z=o[0].abilities,J=[];for(let m=0;m<Z.length;m+=1)J[m]=Dt(pt(o,Z,m));let Y=o[0].evolution!==void 0&&Tt(o);return H=new Oe({props:{$$slots:{default:[ul]},$$scope:{ctx:o}}}),C=new Oe({props:{$$slots:{default:[vl]},$$scope:{ctx:o}}}),{c(){e=$("section"),se(n.$$.fragment),s=y(),t=$("p"),f=k(l),i=y(),a=$("hr"),c=y(),q=$("section"),se(L.$$.fragment),P=y(),se(A.$$.fragment),R=y(),T=$("section"),se(w.$$.fragment),d=y(),v=$("hr"),D=y(),j=$("section"),Q&&Q.c(),S=y();for(let m=0;m<J.length;m+=1)J[m].c();z=y(),Y&&Y.c(),K=y(),ee=$("hr"),W=y(),G=$("section"),se(H.$$.fragment),E=y(),se(C.$$.fragment),this.h()},l(m){e=b(m,"SECTION",{class:!0});var B=h(e);ie(n.$$.fragment,B),s=I(B),t=b(B,"P",{class:!0});var te=h(t);f=g(te,l),te.forEach(r),B.forEach(r),i=I(m),a=b(m,"HR",{class:!0}),c=I(m),q=b(m,"SECTION",{class:!0});var ue=h(q);ie(L.$$.fragment,ue),P=I(ue),ie(A.$$.fragment,ue),ue.forEach(r),R=I(m),T=b(m,"SECTION",{class:!0});var ae=h(T);ie(w.$$.fragment,ae),ae.forEach(r),d=I(m),v=b(m,"HR",{class:!0}),D=I(m),j=b(m,"SECTION",{class:!0});var le=h(j);Q&&Q.l(le),S=I(le);for(let ne=0;ne<J.length;ne+=1)J[ne].l(le);le.forEach(r),z=I(m),Y&&Y.l(m),K=I(m),ee=b(m,"HR",{class:!0}),W=I(m),G=b(m,"SECTION",{class:!0});var oe=h(G);ie(H.$$.fragment,oe),E=I(oe),ie(C.$$.fragment,oe),oe.forEach(r),this.h()},h(){N(t,"class","svelte-3tneqv"),N(e,"class","info"),N(a,"class","svelte-3tneqv"),N(q,"class","stats"),N(T,"class","skills"),N(v,"class","svelte-3tneqv"),N(j,"class","abilities"),N(ee,"class","svelte-3tneqv"),N(G,"class","moves")},m(m,B){u(m,e,B),fe(n,e,null),_(e,s),_(e,t),_(t,f),u(m,i,B),u(m,a,B),u(m,c,B),u(m,q,B),fe(L,q,null),_(q,P),fe(A,q,null),u(m,R,B),u(m,T,B),fe(w,T,null),u(m,d,B),u(m,v,B),u(m,D,B),u(m,j,B),Q&&Q.m(j,null),_(j,S);for(let te=0;te<J.length;te+=1)J[te].m(j,null);u(m,z,B),Y&&Y.m(m,B),u(m,K,B),u(m,ee,B),u(m,W,B),u(m,G,B),fe(H,G,null),_(G,E),fe(C,G,null),V=!0},p(m,B){const te={};B&1025&&(te.$$scope={dirty:B,ctx:m}),n.$set(te),(!V||B&1)&&l!==(l=m[0].description+"")&&F(f,l);const ue={};B&1025&&(ue.$$scope={dirty:B,ctx:m}),L.$set(ue);const ae={};B&1&&(ae.attributes=m[0].attributes),A.$set(ae);const le={};if(B&1025&&(le.$$scope={dirty:B,ctx:m}),w.$set(le),m[0].specialAbilityText!==void 0?Q?Q.p(m,B):(Q=Et(m),Q.c(),Q.m(j,S)):Q&&(Q.d(1),Q=null),B&1){Z=m[0].abilities;let p;for(p=0;p<Z.length;p+=1){const M=pt(m,Z,p);J[p]?J[p].p(M,B):(J[p]=Dt(M),J[p].c(),J[p].m(j,null))}for(;p<J.length;p+=1)J[p].d(1);J.length=Z.length}m[0].evolution!==void 0?Y?Y.p(m,B):(Y=Tt(m),Y.c(),Y.m(K.parentNode,K)):Y&&(Y.d(1),Y=null);const oe={};B&1025&&(oe.$$scope={dirty:B,ctx:m}),H.$set(oe);const ne={};B&1025&&(ne.$$scope={dirty:B,ctx:m}),C.$set(ne)},i(m){V||(O(n.$$.fragment,m),O(L.$$.fragment,m),O(A.$$.fragment,m),O(w.$$.fragment,m),O(H.$$.fragment,m),O(C.$$.fragment,m),V=!0)},o(m){U(n.$$.fragment,m),U(L.$$.fragment,m),U(A.$$.fragment,m),U(w.$$.fragment,m),U(H.$$.fragment,m),U(C.$$.fragment,m),V=!1},d(m){m&&r(e),re(n),m&&r(i),m&&r(a),m&&r(c),m&&r(q),re(L),re(A),m&&r(R),m&&r(T),re(w),m&&r(d),m&&r(v),m&&r(D),m&&r(j),Q&&Q.d(),He(J,m),m&&r(z),Y&&Y.d(m),m&&r(K),m&&r(ee),m&&r(W),m&&r(G),re(H),re(C)}}}function cl(o){let e,n;return e=new Ct({props:{slot:"header-extra",type:o[0].type}}),{c(){se(e.$$.fragment)},l(s){ie(e.$$.fragment,s)},m(s,t){fe(e,s,t),n=!0},p(s,t){const l={};t&1&&(l.type=s[0].type),e.$set(l)},i(s){n||(O(e.$$.fragment,s),n=!0)},o(s){U(e.$$.fragment,s),n=!1},d(s){re(e,s)}}}function ml(o){let e,n;return e=new Pt({props:{title:o[0].name,$$slots:{"header-extra":[cl],default:[_l]},$$scope:{ctx:o}}}),{c(){se(e.$$.fragment)},l(s){ie(e.$$.fragment,s)},m(s,t){fe(e,s,t),n=!0},p(s,[t]){const l={};t&1&&(l.title=s[0].name),t&1025&&(l.$$scope={dirty:t,ctx:s}),e.$set(l)},i(s){n||(O(e.$$.fragment,s),n=!0)},o(s){U(e.$$.fragment,s),n=!1},d(s){re(e,s)}}}function dl(o,e,n){let{pokemon:s}=e;return o.$$set=t=>{"pokemon"in t&&n(0,s=t.pokemon)},[s]}class pl extends Ne{constructor(e){super();ye(this,e,dl,ml,Ie,{pokemon:0})}}function $l(o){let e,n;return e=new pl({props:{pokemon:o[0]}}),{c(){se(e.$$.fragment)},l(s){ie(e.$$.fragment,s)},m(s,t){fe(e,s,t),n=!0},p(s,t){const l={};t&1&&(l.pokemon=s[0]),e.$set(l)},i(s){n||(O(e.$$.fragment,s),n=!0)},o(s){U(e.$$.fragment,s),n=!1},d(s){re(e,s)}}}function bl(o){let e,n,s,t;return e=new Ot({props:{value:o[0].name}}),s=new Gt({props:{$$slots:{default:[$l]},$$scope:{ctx:o}}}),{c(){se(e.$$.fragment),n=y(),se(s.$$.fragment)},l(l){ie(e.$$.fragment,l),n=I(l),ie(s.$$.fragment,l)},m(l,f){fe(e,l,f),u(l,n,f),fe(s,l,f),t=!0},p(l,[f]){const i={};f&1&&(i.value=l[0].name),e.$set(i);const a={};f&3&&(a.$$scope={dirty:f,ctx:l}),s.$set(a)},i(l){t||(O(e.$$.fragment,l),O(s.$$.fragment,l),t=!0)},o(l){U(e.$$.fragment,l),U(s.$$.fragment,l),t=!1},d(l){re(e,l),l&&r(n),re(s,l)}}}const Al=async({fetch:o,params:e})=>o(`${Me}/pokemon/${e.id}.json`).then(async n=>n.status===404?{status:404}:{props:{pokemon:await n.json()}});function hl(o,e,n){let{pokemon:s}=e;return o.$$set=t=>{"pokemon"in t&&n(0,s=t.pokemon)},[s]}class Nl extends Ne{constructor(e){super();ye(this,e,hl,bl,Ie,{pokemon:0})}}export{Nl as default,Al as load};
