import{_ as qe,$ as We,R as _e,L as Ue,s as Me,e as k,t as v,b as y,f as L,i as G,g,d as h,j as _,k as D,l as c,x as T,n as S,a as K,c as Q,r as X,E as Ne,Y as $e,y as Ve}from"./scheduler.C3JuYxsX.js";import{g as Ye,b as Je,e as Ke,t as Qe,S as je,i as Ae}from"./index.Be-o5oGw.js";import{a as Ge}from"./paths.NKfazxyL.js";function Pe(t,e){const l=e.token={};function s(n,i,r,u){if(e.token!==l)return;e.resolved=u;let d=e.ctx;r!==void 0&&(d=d.slice(),d[r]=u);const C=n&&(e.current=n)(d);let O=!1;e.block&&(e.blocks?e.blocks.forEach((w,M)=>{M!==i&&w&&(Ye(),Je(w,1,1,()=>{e.blocks[M]===w&&(e.blocks[M]=null)}),Ke())}):e.block.d(1),C.c(),Qe(C,1),C.m(e.mount(),e.anchor),O=!0),e.block=C,e.blocks&&(e.blocks[i]=C),O&&Ue()}if(qe(t)){const n=We();if(t.then(i=>{_e(n),s(e.then,1,e.value,i),_e(null)},i=>{if(_e(n),s(e.catch,2,e.error,i),_e(null),!e.hasCatch)throw i}),e.current!==e.pending)return s(e.pending,0),!0}else{if(e.current!==e.then)return s(e.then,1,e.value,t),!0;e.resolved=t}}function Xe(t,e,l){const s=e.slice(),{resolved:n}=t;t.current===t.then&&(s[t.value]=n),t.current===t.catch&&(s[t.error]=n),t.block.p(s,l)}const _t=[{abbr:"str",name:"strength"},{abbr:"dex",name:"dexterity"},{abbr:"con",name:"constitution"},{abbr:"int",name:"intelligence"},{abbr:"wis",name:"wisdom"},{abbr:"cha",name:"charisma"}],I=t=>Math.floor(t/2)-5;function Ze(t){let e,l,s='<abbr title="Strength">str</abbr>',n,i=t[0].str+"",r,u,d=t[1](I(t[0].str))+"",C,O,w,M='<abbr title="Dexterity">dex</abbr>',E,N=t[0].dex+"",j,J,$=t[1](I(t[0].dex))+"",A,P,H,f='<abbr title="Constitution">con</abbr>',b,R=t[0].con+"",W,pe,Z=t[1](I(t[0].con))+"",de,ke,U,Ie='<abbr title="Intelligence">int</abbr>',F,x=t[0].int+"",fe,ye,ee=t[1](I(t[0].int))+"",he,we,V,Se='<abbr title="Wisdom">wis</abbr>',z,te=t[0].wis+"",ve,De,le=t[1](I(t[0].wis))+"",ge,Ce,Y,Oe='<abbr title="Charisma">cha</abbr>',B,se=t[0].cha+"",be,Te,ne=t[1](I(t[0].cha))+"",me,Ee;return{c(){e=k("dl"),l=k("dt"),l.innerHTML=s,n=k("dd"),r=v(i),u=v(" ("),C=v(d),O=v(")"),w=k("dt"),w.innerHTML=M,E=k("dd"),j=v(N),J=v(" ("),A=v($),P=v(")"),H=k("dt"),H.innerHTML=f,b=k("dd"),W=v(R),pe=v(" ("),de=v(Z),ke=v(")"),U=k("dt"),U.innerHTML=Ie,F=k("dd"),fe=v(x),ye=v(" ("),he=v(ee),we=v(")"),V=k("dt"),V.innerHTML=Se,z=k("dd"),ve=v(te),De=v(" ("),ge=v(le),Ce=v(")"),Y=k("dt"),Y.innerHTML=Oe,B=k("dd"),be=v(se),Te=v(" ("),me=v(ne),Ee=v(")"),this.h()},l(p){e=y(p,"DL",{class:!0});var m=L(e);l=y(m,"DT",{class:!0,"data-svelte-h":!0}),G(l)!=="svelte-1mis3k"&&(l.innerHTML=s),n=y(m,"DD",{class:!0});var ie=L(n);r=g(ie,i),u=g(ie," ("),C=g(ie,d),O=g(ie,")"),ie.forEach(h),w=y(m,"DT",{class:!0,"data-svelte-h":!0}),G(w)!=="svelte-nwb3bz"&&(w.innerHTML=M),E=y(m,"DD",{class:!0});var ae=L(E);j=g(ae,N),J=g(ae," ("),A=g(ae,$),P=g(ae,")"),ae.forEach(h),H=y(m,"DT",{class:!0,"data-svelte-h":!0}),G(H)!=="svelte-17hacc1"&&(H.innerHTML=f),b=y(m,"DD",{class:!0});var re=L(b);W=g(re,R),pe=g(re," ("),de=g(re,Z),ke=g(re,")"),re.forEach(h),U=y(m,"DT",{class:!0,"data-svelte-h":!0}),G(U)!=="svelte-1hxr0nk"&&(U.innerHTML=Ie),F=y(m,"DD",{class:!0});var oe=L(F);fe=g(oe,x),ye=g(oe," ("),he=g(oe,ee),we=g(oe,")"),oe.forEach(h),V=y(m,"DT",{class:!0,"data-svelte-h":!0}),G(V)!=="svelte-19zsw8s"&&(V.innerHTML=Se),z=y(m,"DD",{class:!0});var ce=L(z);ve=g(ce,te),De=g(ce," ("),ge=g(ce,le),Ce=g(ce,")"),ce.forEach(h),Y=y(m,"DT",{class:!0,"data-svelte-h":!0}),G(Y)!=="svelte-gu464"&&(Y.innerHTML=Oe),B=y(m,"DD",{class:!0});var ue=L(B);be=g(ue,se),Te=g(ue," ("),me=g(ue,ne),Ee=g(ue,")"),ue.forEach(h),m.forEach(h),this.h()},h(){_(l,"class","svelte-vsptsl"),_(n,"class","svelte-vsptsl"),_(w,"class","svelte-vsptsl"),_(E,"class","svelte-vsptsl"),_(H,"class","svelte-vsptsl"),_(b,"class","svelte-vsptsl"),_(U,"class","svelte-vsptsl"),_(F,"class","svelte-vsptsl"),_(V,"class","svelte-vsptsl"),_(z,"class","svelte-vsptsl"),_(Y,"class","svelte-vsptsl"),_(B,"class","svelte-vsptsl"),_(e,"class","svelte-vsptsl")},m(p,m){D(p,e,m),c(e,l),c(e,n),c(n,r),c(n,u),c(n,C),c(n,O),c(e,w),c(e,E),c(E,j),c(E,J),c(E,A),c(E,P),c(e,H),c(e,b),c(b,W),c(b,pe),c(b,de),c(b,ke),c(e,U),c(e,F),c(F,fe),c(F,ye),c(F,he),c(F,we),c(e,V),c(e,z),c(z,ve),c(z,De),c(z,ge),c(z,Ce),c(e,Y),c(e,B),c(B,be),c(B,Te),c(B,me),c(B,Ee)},p(p,[m]){m&1&&i!==(i=p[0].str+"")&&T(r,i),m&1&&d!==(d=p[1](I(p[0].str))+"")&&T(C,d),m&1&&N!==(N=p[0].dex+"")&&T(j,N),m&1&&$!==($=p[1](I(p[0].dex))+"")&&T(A,$),m&1&&R!==(R=p[0].con+"")&&T(W,R),m&1&&Z!==(Z=p[1](I(p[0].con))+"")&&T(de,Z),m&1&&x!==(x=p[0].int+"")&&T(fe,x),m&1&&ee!==(ee=p[1](I(p[0].int))+"")&&T(he,ee),m&1&&te!==(te=p[0].wis+"")&&T(ve,te),m&1&&le!==(le=p[1](I(p[0].wis))+"")&&T(ge,le),m&1&&se!==(se=p[0].cha+"")&&T(be,se),m&1&&ne!==(ne=p[1](I(p[0].cha))+"")&&T(me,ne)},i:S,o:S,d(p){p&&h(e)}}}function xe(t,e,l){let{attributes:s}=e;const n=i=>i>=0?`+${i}`:`${i}`;return t.$$set=i=>{"attributes"in i&&l(0,s=i.attributes)},[s,n]}class pt extends je{constructor(e){super(),Ae(this,e,xe,Ze,Me,{attributes:0})}}const o=2,et=1,a=.5,q=0,Re=["normal","fighting","flying","poison","ground","rock","bug","ghost","steel","fire","water","grass","electric","psychic","ice","dragon","dark","fairy"],tt=t=>Object.entries(t).reduce((e,[l,s])=>({...e,[l]:Re.reduce((n,i)=>({...n,[i]:s[i]??et}),{})}),{}),lt=tt({normal:{fighting:o,ghost:q},fighting:{fairy:o,flying:o,psychic:o,bug:a,rock:a,dark:a},flying:{electric:o,ice:o,rock:o,bug:a,fighting:a,grass:a,ground:q},poison:{ground:o,psychic:o,fighting:a,poison:a,bug:a,grass:a,fairy:a},ground:{grass:o,ice:o,water:o,poison:a,rock:a,electric:q},rock:{fighting:o,grass:o,ground:o,steel:o,water:o,fire:a,flying:a,normal:a,poison:a},bug:{fire:o,flying:o,rock:o,fighting:a,grass:a,ground:a},ghost:{ghost:o,dark:o,bug:a,poison:a,normal:q,fighting:q},steel:{fire:o,fighting:o,ground:o,bug:a,dragon:a,fairy:a,flying:a,grass:a,ice:a,normal:a,psychic:a,rock:a,steel:a,poison:q},fire:{ground:o,rock:o,water:o,bug:a,fairy:a,fire:a,grass:a,ice:a,steel:a},water:{electric:o,grass:o,fire:a,ice:a,steel:a,water:a},grass:{bug:o,fire:o,flying:o,ice:o,poison:o,electric:a,grass:a,ground:a,water:a},electric:{ground:o,electric:a,flying:a,steel:a},psychic:{bug:o,ghost:o,dark:o,fighting:a,psychic:a},ice:{fighting:o,fire:o,rock:o,steel:o,ice:a},dragon:{dragon:o,fairy:o,ice:o,electric:a,fire:a,grass:a,water:a},dark:{bug:o,fairy:o,fighting:o,dark:a,ghost:a,psychic:q},fairy:{poison:o,steel:o,bug:a,dark:a,fighting:a,dragon:q}}),st=(t,e)=>Object.entries(t).reduce((l,[s,n])=>({...l,[s]:n*e[s]}),{}),He=t=>{if(t.some(e=>!Re.includes(e)))throw new Error(`Invalid Pokemon type: [${t.join(", ")}]`);return t.map(e=>lt[e]).reduce(st)},nt=t=>new Set(Object.entries(He(t)).filter(([,e])=>e>1).map(([e])=>e)),it=t=>new Set(Object.entries(He(t)).filter(([,e])=>0<e&&e<1).map(([e])=>e)),at=t=>new Set(Object.entries(He(t)).filter(([,e])=>e===0).map(([e])=>e));function rt(t){let e,l="Vulnerabilities",s,n,i=t[3](t[2])+"",r,u,d,C="Resistances",O,w,M=t[3](t[1])+"",E,N,j,J="Immunities",$,A,P=t[3](t[0])+"",H;return{c(){e=k("dt"),e.textContent=l,s=K(),n=k("dd"),r=v(i),u=K(),d=k("dt"),d.textContent=C,O=K(),w=k("dd"),E=v(M),N=K(),j=k("dt"),j.textContent=J,$=K(),A=k("dd"),H=v(P),this.h()},l(f){e=y(f,"DT",{"data-svelte-h":!0}),G(e)!=="svelte-erb47k"&&(e.textContent=l),s=Q(f),n=y(f,"DD",{class:!0});var b=L(n);r=g(b,i),b.forEach(h),u=Q(f),d=y(f,"DT",{"data-svelte-h":!0}),G(d)!=="svelte-8bpo88"&&(d.textContent=C),O=Q(f),w=y(f,"DD",{class:!0});var R=L(w);E=g(R,M),R.forEach(h),N=Q(f),j=y(f,"DT",{"data-svelte-h":!0}),G(j)!=="svelte-rf7wzg"&&(j.textContent=J),$=Q(f),A=y(f,"DD",{class:!0});var W=L(A);H=g(W,P),W.forEach(h),this.h()},h(){_(n,"class","svelte-9bj5l8"),_(w,"class","svelte-9bj5l8"),_(A,"class","svelte-9bj5l8")},m(f,b){D(f,e,b),D(f,s,b),D(f,n,b),c(n,r),D(f,u,b),D(f,d,b),D(f,O,b),D(f,w,b),c(w,E),D(f,N,b),D(f,j,b),D(f,$,b),D(f,A,b),c(A,H)},p(f,[b]){b&4&&i!==(i=f[3](f[2])+"")&&T(r,i),b&2&&M!==(M=f[3](f[1])+"")&&T(E,M),b&1&&P!==(P=f[3](f[0])+"")&&T(H,P)},i:S,o:S,d(f){f&&(h(e),h(s),h(n),h(u),h(d),h(O),h(w),h(N),h(j),h($),h(A))}}}function ot(t,e,l){let s,n,i,{type:r}=e;const u=d=>d.length===0?"none":d.join(", ");return t.$$set=d=>{"type"in d&&l(4,r=d.type)},t.$$.update=()=>{t.$$.dirty&16&&l(2,s=Array.from(nt(r))),t.$$.dirty&16&&l(1,n=Array.from(it(r))),t.$$.dirty&16&&l(0,i=Array.from(at(r)))},[i,n,s,u,r]}class kt extends je{constructor(e){super(),Ae(this,e,ot,rt,Me,{type:4})}}const Le=t=>{switch(t.type){case"gender":return`A ${t.value}`;case"level":return`at level ${t.value} or above`;case"item":return`using a ${t.value}`;case"loyalty":return`with a loyalty of +${t.value} or higher`;case"move":return`while knowing {{move:${t.value}}}`;case"move-type":return`while knowing a ${t.value}-type move`;case"time":return`during the ${t.value}`;case"special":return t.value}},ct=t=>{switch(t.type){case"asi":return`its health increases by double its level, and it gains ${t.value} points to add to its ability scores`;case"special":return t.value}},yt=(t,e,l)=>{const s=e.conditions.find(r=>r.type==="gender"),n=e.conditions.find(r=>r.type==="level"),i=e.conditions.filter(r=>r.type!=="gender"&&r.type!=="level");return`${s?`${Le(s)} `:""}${t} can evolve into {{pokemon:${e.id}}} ${n?Le(n):""}${i.length>0?" ":""}${i.map(r=>Le(r)).join(", ")}. When it evolves, ${e.effects.map(r=>ct(r)).join(", ")}.`.replaceAll(/{{pokemon:(.*?)}}/g,(r,u)=>l?l("pokemon",u):r).replaceAll(/{{move:(.*?)}}/g,(r,u)=>l?l("move",u):r)};function Fe(t){let e,l,s,n,i=t[3]&&ze(t);return{c(){e=k("figure"),l=k("img"),n=K(),i&&i.c(),this.h()},l(r){e=y(r,"FIGURE",{class:!0});var u=L(e);l=y(u,"IMG",{src:!0,alt:!0,class:!0}),n=Q(u),i&&i.l(u),u.forEach(h),this.h()},h(){Ne(l.src,s=t[2])||_(l,"src",s),_(l,"alt",t[1]),_(l,"class","svelte-1x63awe"),$e(l,"smaller",t[3]!=null),_(e,"class","svelte-1x63awe")},m(r,u){D(r,e,u),c(e,l),c(e,n),i&&i.m(e,null)},p(r,u){u&4&&!Ne(l.src,s=r[2])&&_(l,"src",s),u&2&&_(l,"alt",r[1]),u&8&&$e(l,"smaller",r[3]!=null),r[3]?i?i.p(r,u):(i=ze(r),i.c(),i.m(e,null)):i&&(i.d(1),i=null)},d(r){r&&h(e),i&&i.d()}}}function ze(t){let e,l,s={ctx:t,current:null,token:null,hasCatch:!1,pending:ft,then:dt,catch:ut,value:3};return Pe(l=t[3],s),{c(){e=X(),s.block.c()},l(n){e=X(),s.block.l(n)},m(n,i){D(n,e,i),s.block.m(n,s.anchor=i),s.mount=()=>e.parentNode,s.anchor=e},p(n,i){t=n,s.ctx=t,i&8&&l!==(l=t[3])&&Pe(l,s)||Xe(s,t,i)},d(n){n&&h(e),s.block.d(n),s.token=null,s=null}}}function ut(t){return{c:S,l:S,m:S,p:S,d:S}}function dt(t){let e,l=t[3].main&&Be(t);return{c(){l&&l.c(),e=X()},l(s){l&&l.l(s),e=X()},m(s,n){l&&l.m(s,n),D(s,e,n)},p(s,n){s[3].main?l?l.p(s,n):(l=Be(s),l.c(),l.m(e.parentNode,e)):l&&(l.d(1),l=null)},d(s){s&&h(e),l&&l.d(s)}}}function Be(t){let e,l,s,n=t[3].main.author+"",i,r;return{c(){e=k("figcaption"),l=v("By "),s=k("a"),i=v(n),this.h()},l(u){e=y(u,"FIGCAPTION",{class:!0});var d=L(e);l=g(d,"By "),s=y(d,"A",{href:!0});var C=L(s);i=g(C,n),C.forEach(h),d.forEach(h),this.h()},h(){_(s,"href",r=t[3].main.link),_(e,"class","svelte-1x63awe")},m(u,d){D(u,e,d),c(e,l),c(e,s),c(s,i)},p(u,d){d&8&&n!==(n=u[3].main.author+"")&&T(i,n),d&8&&r!==(r=u[3].main.link)&&_(s,"href",r)},d(u){u&&h(e)}}}function ft(t){let e,l="Getting attribution...";return{c(){e=k("figcaption"),e.textContent=l,this.h()},l(s){e=y(s,"FIGCAPTION",{class:!0,"data-svelte-h":!0}),G(e)!=="svelte-1m345tn"&&(e.textContent=l),this.h()},h(){_(e,"class","svelte-1x63awe"),Ve(e,"visibility","hidden")},m(s,n){D(s,e,n)},p:S,d(s){s&&h(e)}}}function ht(t){let e,l=t[0].main&&Fe(t);return{c(){l&&l.c(),e=X()},l(s){l&&l.l(s),e=X()},m(s,n){l&&l.m(s,n),D(s,e,n)},p(s,[n]){s[0].main?l?l.p(s,n):(l=Fe(s),l.c(),l.m(e.parentNode,e)):l&&(l.d(1),l=null)},i:S,o:S,d(s){s&&h(e),l&&l.d(s)}}}function vt(t,e,l){let s,n,{media:i}=e,{alt:r}=e,u;return t.$$set=d=>{"media"in d&&l(0,i=d.media),"alt"in d&&l(1,r=d.alt)},t.$$.update=()=>{t.$$.dirty&1&&l(4,s=/^http/.test(i.main)),t.$$.dirty&17&&l(2,n=s?i.main:`${Ge}${i.main}`),t.$$.dirty&1&&(i.attribution?l(3,u=fetch(`${Ge}${i.attribution}`).then(d=>d.json())):l(3,u=void 0))},[i,r,n,u,s]}class wt extends je{constructor(e){super(),Ae(this,e,vt,ht,Me,{media:0,alt:1})}}export{pt as A,wt as P,kt as T,_t as a,yt as e,Pe as h,I as m,Xe as u};
