import{_ as Re,$ as We,R as _e,Q as Qe,s as Le,d as h,n as S,q as T,i as D,a as c,b as _,e as k,f as M,j as G,g as v,l as y,t as g,c as J,k as K,y as X,u as Ue,E as Ne,Y as $e}from"./scheduler.BW_gkbS3.js";import{g as Ve,t as Ye,e as Je,a as Ke,S as je,i as Ae}from"./index.B_7VoAXG.js";import{a as Ge}from"./paths.RI8YDnYn.js";function Pe(t,e){const l=e.token={};function s(n,i,r,u){if(e.token!==l)return;e.resolved=u;let d=e.ctx;r!==void 0&&(d=d.slice(),d[r]=u);const C=n&&(e.current=n)(d);let O=!1;e.block&&(e.blocks?e.blocks.forEach((w,L)=>{L!==i&&w&&(Ve(),Ye(w,1,1,()=>{e.blocks[L]===w&&(e.blocks[L]=null)}),Je())}):e.block.d(1),C.c(),Ke(C,1),C.m(e.mount(),e.anchor),O=!0),e.block=C,e.blocks&&(e.blocks[i]=C),O&&Qe()}if(Re(t)){const n=We();if(t.then(i=>{_e(n),s(e.then,1,e.value,i),_e(null)},i=>{if(_e(n),s(e.catch,2,e.error,i),_e(null),!e.hasCatch)throw i}),e.current!==e.pending)return s(e.pending,0),!0}else{if(e.current!==e.then)return s(e.then,1,e.value,t),!0;e.resolved=t}}function Xe(t,e,l){const s=e.slice(),{resolved:n}=t;t.current===t.then&&(s[t.value]=n),t.current===t.catch&&(s[t.error]=n),t.block.p(s,l)}const _t=[{abbr:"str",name:"strength"},{abbr:"dex",name:"dexterity"},{abbr:"con",name:"constitution"},{abbr:"int",name:"intelligence"},{abbr:"wis",name:"wisdom"},{abbr:"cha",name:"charisma"}],I=t=>Math.floor(t/2)-5;function Ze(t){let e,l,s='<abbr title="Strength">str</abbr>',n,i=t[0].str+"",r,u,d=t[1](I(t[0].str))+"",C,O,w,L='<abbr title="Dexterity">dex</abbr>',E,N=t[0].dex+"",j,Y,$=t[1](I(t[0].dex))+"",A,P,H,f='<abbr title="Constitution">con</abbr>',b,B=t[0].con+"",W,pe,Z=t[1](I(t[0].con))+"",de,ke,Q,Ie='<abbr title="Intelligence">int</abbr>',F,x=t[0].int+"",fe,ye,ee=t[1](I(t[0].int))+"",he,we,U,Se='<abbr title="Wisdom">wis</abbr>',q,te=t[0].wis+"",ve,De,le=t[1](I(t[0].wis))+"",ge,Ce,V,Oe='<abbr title="Charisma">cha</abbr>',z,se=t[0].cha+"",be,Te,ne=t[1](I(t[0].cha))+"",me,Ee;return{c(){e=y("dl"),l=y("dt"),l.innerHTML=s,n=y("dd"),r=g(i),u=g(" ("),C=g(d),O=g(")"),w=y("dt"),w.innerHTML=L,E=y("dd"),j=g(N),Y=g(" ("),A=g($),P=g(")"),H=y("dt"),H.innerHTML=f,b=y("dd"),W=g(B),pe=g(" ("),de=g(Z),ke=g(")"),Q=y("dt"),Q.innerHTML=Ie,F=y("dd"),fe=g(x),ye=g(" ("),he=g(ee),we=g(")"),U=y("dt"),U.innerHTML=Se,q=y("dd"),ve=g(te),De=g(" ("),ge=g(le),Ce=g(")"),V=y("dt"),V.innerHTML=Oe,z=y("dd"),be=g(se),Te=g(" ("),me=g(ne),Ee=g(")"),this.h()},l(p){e=k(p,"DL",{class:!0});var m=M(e);l=k(m,"DT",{class:!0,"data-svelte-h":!0}),G(l)!=="svelte-1mis3k"&&(l.innerHTML=s),n=k(m,"DD",{class:!0});var ie=M(n);r=v(ie,i),u=v(ie," ("),C=v(ie,d),O=v(ie,")"),ie.forEach(h),w=k(m,"DT",{class:!0,"data-svelte-h":!0}),G(w)!=="svelte-nwb3bz"&&(w.innerHTML=L),E=k(m,"DD",{class:!0});var ae=M(E);j=v(ae,N),Y=v(ae," ("),A=v(ae,$),P=v(ae,")"),ae.forEach(h),H=k(m,"DT",{class:!0,"data-svelte-h":!0}),G(H)!=="svelte-17hacc1"&&(H.innerHTML=f),b=k(m,"DD",{class:!0});var re=M(b);W=v(re,B),pe=v(re," ("),de=v(re,Z),ke=v(re,")"),re.forEach(h),Q=k(m,"DT",{class:!0,"data-svelte-h":!0}),G(Q)!=="svelte-1hxr0nk"&&(Q.innerHTML=Ie),F=k(m,"DD",{class:!0});var oe=M(F);fe=v(oe,x),ye=v(oe," ("),he=v(oe,ee),we=v(oe,")"),oe.forEach(h),U=k(m,"DT",{class:!0,"data-svelte-h":!0}),G(U)!=="svelte-19zsw8s"&&(U.innerHTML=Se),q=k(m,"DD",{class:!0});var ce=M(q);ve=v(ce,te),De=v(ce," ("),ge=v(ce,le),Ce=v(ce,")"),ce.forEach(h),V=k(m,"DT",{class:!0,"data-svelte-h":!0}),G(V)!=="svelte-gu464"&&(V.innerHTML=Oe),z=k(m,"DD",{class:!0});var ue=M(z);be=v(ue,se),Te=v(ue," ("),me=v(ue,ne),Ee=v(ue,")"),ue.forEach(h),m.forEach(h),this.h()},h(){_(l,"class","svelte-vsptsl"),_(n,"class","svelte-vsptsl"),_(w,"class","svelte-vsptsl"),_(E,"class","svelte-vsptsl"),_(H,"class","svelte-vsptsl"),_(b,"class","svelte-vsptsl"),_(Q,"class","svelte-vsptsl"),_(F,"class","svelte-vsptsl"),_(U,"class","svelte-vsptsl"),_(q,"class","svelte-vsptsl"),_(V,"class","svelte-vsptsl"),_(z,"class","svelte-vsptsl"),_(e,"class","svelte-vsptsl")},m(p,m){D(p,e,m),c(e,l),c(e,n),c(n,r),c(n,u),c(n,C),c(n,O),c(e,w),c(e,E),c(E,j),c(E,Y),c(E,A),c(E,P),c(e,H),c(e,b),c(b,W),c(b,pe),c(b,de),c(b,ke),c(e,Q),c(e,F),c(F,fe),c(F,ye),c(F,he),c(F,we),c(e,U),c(e,q),c(q,ve),c(q,De),c(q,ge),c(q,Ce),c(e,V),c(e,z),c(z,be),c(z,Te),c(z,me),c(z,Ee)},p(p,[m]){m&1&&i!==(i=p[0].str+"")&&T(r,i),m&1&&d!==(d=p[1](I(p[0].str))+"")&&T(C,d),m&1&&N!==(N=p[0].dex+"")&&T(j,N),m&1&&$!==($=p[1](I(p[0].dex))+"")&&T(A,$),m&1&&B!==(B=p[0].con+"")&&T(W,B),m&1&&Z!==(Z=p[1](I(p[0].con))+"")&&T(de,Z),m&1&&x!==(x=p[0].int+"")&&T(fe,x),m&1&&ee!==(ee=p[1](I(p[0].int))+"")&&T(he,ee),m&1&&te!==(te=p[0].wis+"")&&T(ve,te),m&1&&le!==(le=p[1](I(p[0].wis))+"")&&T(ge,le),m&1&&se!==(se=p[0].cha+"")&&T(be,se),m&1&&ne!==(ne=p[1](I(p[0].cha))+"")&&T(me,ne)},i:S,o:S,d(p){p&&h(e)}}}function xe(t,e,l){let{attributes:s}=e;const n=i=>i>=0?`+${i}`:`${i}`;return t.$$set=i=>{"attributes"in i&&l(0,s=i.attributes)},[s,n]}class pt extends je{constructor(e){super(),Ae(this,e,xe,Ze,Le,{attributes:0})}}const o=2,et=1,a=.5,R=0,Be=["normal","fighting","flying","poison","ground","rock","bug","ghost","steel","fire","water","grass","electric","psychic","ice","dragon","dark","fairy"],tt=t=>Object.entries(t).reduce((e,[l,s])=>({...e,[l]:Be.reduce((n,i)=>({...n,[i]:s[i]??et}),{})}),{}),lt=tt({normal:{fighting:o,ghost:R},fighting:{fairy:o,flying:o,psychic:o,bug:a,rock:a,dark:a},flying:{electric:o,ice:o,rock:o,bug:a,fighting:a,grass:a,ground:R},poison:{ground:o,psychic:o,fighting:a,poison:a,bug:a,grass:a,fairy:a},ground:{grass:o,ice:o,water:o,poison:a,rock:a,electric:R},rock:{fighting:o,grass:o,ground:o,steel:o,water:o,fire:a,flying:a,normal:a,poison:a},bug:{fire:o,flying:o,rock:o,fighting:a,grass:a,ground:a},ghost:{ghost:o,dark:o,bug:a,poison:a,normal:R,fighting:R},steel:{fire:o,fighting:o,ground:o,bug:a,dragon:a,fairy:a,flying:a,grass:a,ice:a,normal:a,psychic:a,rock:a,steel:a,poison:R},fire:{ground:o,rock:o,water:o,bug:a,fairy:a,fire:a,grass:a,ice:a,steel:a},water:{electric:o,grass:o,fire:a,ice:a,steel:a,water:a},grass:{bug:o,fire:o,flying:o,ice:o,poison:o,electric:a,grass:a,ground:a,water:a},electric:{ground:o,electric:a,flying:a,steel:a},psychic:{bug:o,ghost:o,dark:o,fighting:a,psychic:a},ice:{fighting:o,fire:o,rock:o,steel:o,ice:a},dragon:{dragon:o,fairy:o,ice:o,electric:a,fire:a,grass:a,water:a},dark:{bug:o,fairy:o,fighting:o,dark:a,ghost:a,psychic:R},fairy:{poison:o,steel:o,bug:a,dark:a,fighting:a,dragon:R}}),st=(t,e)=>Object.entries(t).reduce((l,[s,n])=>({...l,[s]:n*e[s]}),{}),He=t=>{if(t.some(e=>!Be.includes(e)))throw new Error(`Invalid Pokemon type: [${t.join(", ")}]`);return t.map(e=>lt[e]).reduce(st)},nt=t=>new Set(Object.entries(He(t)).filter(([,e])=>e>1).map(([e])=>e)),it=t=>new Set(Object.entries(He(t)).filter(([,e])=>0<e&&e<1).map(([e])=>e)),at=t=>new Set(Object.entries(He(t)).filter(([,e])=>e===0).map(([e])=>e));function rt(t){let e,l="Vulnerabilities",s,n,i=t[3](t[2])+"",r,u,d,C="Resistances",O,w,L=t[3](t[1])+"",E,N,j,Y="Immunities",$,A,P=t[3](t[0])+"",H;return{c(){e=y("dt"),e.textContent=l,s=K(),n=y("dd"),r=g(i),u=K(),d=y("dt"),d.textContent=C,O=K(),w=y("dd"),E=g(L),N=K(),j=y("dt"),j.textContent=Y,$=K(),A=y("dd"),H=g(P),this.h()},l(f){e=k(f,"DT",{"data-svelte-h":!0}),G(e)!=="svelte-erb47k"&&(e.textContent=l),s=J(f),n=k(f,"DD",{class:!0});var b=M(n);r=v(b,i),b.forEach(h),u=J(f),d=k(f,"DT",{"data-svelte-h":!0}),G(d)!=="svelte-8bpo88"&&(d.textContent=C),O=J(f),w=k(f,"DD",{class:!0});var B=M(w);E=v(B,L),B.forEach(h),N=J(f),j=k(f,"DT",{"data-svelte-h":!0}),G(j)!=="svelte-rf7wzg"&&(j.textContent=Y),$=J(f),A=k(f,"DD",{class:!0});var W=M(A);H=v(W,P),W.forEach(h),this.h()},h(){_(n,"class","svelte-9bj5l8"),_(w,"class","svelte-9bj5l8"),_(A,"class","svelte-9bj5l8")},m(f,b){D(f,e,b),D(f,s,b),D(f,n,b),c(n,r),D(f,u,b),D(f,d,b),D(f,O,b),D(f,w,b),c(w,E),D(f,N,b),D(f,j,b),D(f,$,b),D(f,A,b),c(A,H)},p(f,[b]){b&4&&i!==(i=f[3](f[2])+"")&&T(r,i),b&2&&L!==(L=f[3](f[1])+"")&&T(E,L),b&1&&P!==(P=f[3](f[0])+"")&&T(H,P)},i:S,o:S,d(f){f&&(h(e),h(s),h(n),h(u),h(d),h(O),h(w),h(N),h(j),h($),h(A))}}}function ot(t,e,l){let s,n,i,{type:r}=e;const u=d=>d.length===0?"none":d.join(", ");return t.$$set=d=>{"type"in d&&l(4,r=d.type)},t.$$.update=()=>{t.$$.dirty&16&&l(2,s=Array.from(nt(r))),t.$$.dirty&16&&l(1,n=Array.from(it(r))),t.$$.dirty&16&&l(0,i=Array.from(at(r)))},[i,n,s,u,r]}class kt extends je{constructor(e){super(),Ae(this,e,ot,rt,Le,{type:4})}}const Me=t=>{switch(t.type){case"gender":return`A ${t.value}`;case"level":return`at level ${t.value} or above`;case"item":return`using a ${t.value}`;case"loyalty":return`with a loyalty of +${t.value} or higher`;case"move":return`while knowing {{move:${t.value}}}`;case"move-type":return`while knowing a ${t.value}-type move`;case"time":return`during the ${t.value}`;case"special":return t.value}},ct=t=>{switch(t.type){case"asi":return`its health increases by double its level, and it gains ${t.value} points to add to its ability scores`;case"special":return t.value}},yt=(t,e,l)=>{const s=e.conditions.find(r=>r.type==="gender"),n=e.conditions.find(r=>r.type==="level"),i=e.conditions.filter(r=>r.type!=="gender"&&r.type!=="level");return`${s?`${Me(s)} `:""}${t} can evolve into {{pokemon:${e.id}}} ${n?Me(n):""}${i.length>0?" ":""}${i.map(r=>Me(r)).join(", ")}. When it evolves, ${e.effects.map(r=>ct(r)).join(", ")}.`.replaceAll(/{{pokemon:(.*?)}}/g,(r,u)=>l?l("pokemon",u):r).replaceAll(/{{move:(.*?)}}/g,(r,u)=>l?l("move",u):r)};function Fe(t){let e,l,s,n,i=t[3]&&qe(t);return{c(){e=y("figure"),l=y("img"),n=K(),i&&i.c(),this.h()},l(r){e=k(r,"FIGURE",{class:!0});var u=M(e);l=k(u,"IMG",{src:!0,alt:!0,class:!0}),n=J(u),i&&i.l(u),u.forEach(h),this.h()},h(){Ne(l.src,s=t[2])||_(l,"src",s),_(l,"alt",t[1]),_(l,"class","svelte-1x63awe"),$e(l,"smaller",t[3]!=null),_(e,"class","svelte-1x63awe")},m(r,u){D(r,e,u),c(e,l),c(e,n),i&&i.m(e,null)},p(r,u){u&4&&!Ne(l.src,s=r[2])&&_(l,"src",s),u&2&&_(l,"alt",r[1]),u&8&&$e(l,"smaller",r[3]!=null),r[3]?i?i.p(r,u):(i=qe(r),i.c(),i.m(e,null)):i&&(i.d(1),i=null)},d(r){r&&h(e),i&&i.d()}}}function qe(t){let e,l,s={ctx:t,current:null,token:null,hasCatch:!1,pending:ft,then:dt,catch:ut,value:3};return Pe(l=t[3],s),{c(){e=X(),s.block.c()},l(n){e=X(),s.block.l(n)},m(n,i){D(n,e,i),s.block.m(n,s.anchor=i),s.mount=()=>e.parentNode,s.anchor=e},p(n,i){t=n,s.ctx=t,i&8&&l!==(l=t[3])&&Pe(l,s)||Xe(s,t,i)},d(n){n&&h(e),s.block.d(n),s.token=null,s=null}}}function ut(t){return{c:S,l:S,m:S,p:S,d:S}}function dt(t){let e,l=t[3].main&&ze(t);return{c(){l&&l.c(),e=X()},l(s){l&&l.l(s),e=X()},m(s,n){l&&l.m(s,n),D(s,e,n)},p(s,n){s[3].main?l?l.p(s,n):(l=ze(s),l.c(),l.m(e.parentNode,e)):l&&(l.d(1),l=null)},d(s){s&&h(e),l&&l.d(s)}}}function ze(t){let e,l,s,n=t[3].main.author+"",i,r;return{c(){e=y("figcaption"),l=g("By "),s=y("a"),i=g(n),this.h()},l(u){e=k(u,"FIGCAPTION",{class:!0});var d=M(e);l=v(d,"By "),s=k(d,"A",{href:!0});var C=M(s);i=v(C,n),C.forEach(h),d.forEach(h),this.h()},h(){_(s,"href",r=t[3].main.link),_(e,"class","svelte-1x63awe")},m(u,d){D(u,e,d),c(e,l),c(e,s),c(s,i)},p(u,d){d&8&&n!==(n=u[3].main.author+"")&&T(i,n),d&8&&r!==(r=u[3].main.link)&&_(s,"href",r)},d(u){u&&h(e)}}}function ft(t){let e,l="Getting attribution...";return{c(){e=y("figcaption"),e.textContent=l,this.h()},l(s){e=k(s,"FIGCAPTION",{class:!0,"data-svelte-h":!0}),G(e)!=="svelte-1m345tn"&&(e.textContent=l),this.h()},h(){_(e,"class","svelte-1x63awe"),Ue(e,"visibility","hidden")},m(s,n){D(s,e,n)},p:S,d(s){s&&h(e)}}}function ht(t){let e,l=t[0].main&&Fe(t);return{c(){l&&l.c(),e=X()},l(s){l&&l.l(s),e=X()},m(s,n){l&&l.m(s,n),D(s,e,n)},p(s,[n]){s[0].main?l?l.p(s,n):(l=Fe(s),l.c(),l.m(e.parentNode,e)):l&&(l.d(1),l=null)},i:S,o:S,d(s){s&&h(e),l&&l.d(s)}}}function vt(t,e,l){let s,n,{media:i}=e,{alt:r}=e,u;return t.$$set=d=>{"media"in d&&l(0,i=d.media),"alt"in d&&l(1,r=d.alt)},t.$$.update=()=>{t.$$.dirty&1&&l(4,s=/^http/.test(i.main)),t.$$.dirty&17&&l(2,n=s?i.main:`${Ge}${i.main}`),t.$$.dirty&1&&(i.attribution?l(3,u=fetch(`${Ge}${i.attribution}`).then(d=>d.json())):l(3,u=void 0))},[i,r,n,u,s]}class wt extends je{constructor(e){super(),Ae(this,e,vt,ht,Le,{media:0,alt:1})}}export{pt as A,wt as P,kt as T,_t as a,yt as e,Pe as h,I as m,Xe as u};
