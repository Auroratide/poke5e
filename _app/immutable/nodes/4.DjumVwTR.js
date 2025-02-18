import{s as O,u as A,z as W,A as G,B as J,C as Q,n as X,L as I,d as _,P as Y,e as d,i as C,b,f as v,h as z,c as T,j as $,a as D,D as N,x as Z,k as x,t as ee,g as K}from"../chunks/CWYpsIRk.js";import{S as te,i as ae,d as S,t as y,a as w,m as j,c as q,b as E,f as re}from"../chunks/DBKEUvF-.js";import{e as U,u as ne,d as se}from"../chunks/DMiYXCRr.js";import{P as le,S as oe,V as ie}from"../chunks/D3Rxevcp.js";import{P as ce}from"../chunks/_BG36iXy.js";import{p as ue}from"../chunks/pir_lXgj.js";import{f as H}from"../chunks/D25UTHAP.js";import{U as k}from"../chunks/DcOxn0j6.js";const P=[{name:"Pokémon Leveling",url:k.reference.pokemonLeveling(),keywords:["pokemon leveling","class","table","experience","evolution","evolve","moves","peak power"]},{name:"Pokémon Transformations",url:k.reference.transformations(),keywords:["pokemon transformations","mega evolution","z-move","z move","dynamax","gigantamax","terastallization","terastallize","stellar","tera"]},{name:"Specializations",url:k.reference.specializations(),keywords:["proficiency","skill","poke fan","black belt","bird keeper","punk","camper","hiker","bug maniac","mystic","worker","kindler","swimmer","gardener","engineer","psychic","skier","dragon tamer","delinquent","actor"]},{name:"Status Conditions",url:k.reference.status(),keywords:["asleep","burned","paralyzed","paralysis","frozen","poisoned","badly","confused","confusion","flinched"]},{name:"Trainer Class",url:k.reference.trainerClass(),keywords:["class","traits","abilities","equipment","multiclass","table","features","specializations","paths","license","pokedex","pokeslots","control upgrade","trainer's resolve","pokemon tracker","master trainer"]},{name:"Trainer Paths",url:k.reference.trainerPaths(),keywords:["ace trainer","battle master","rapid switching","tactical mastery","hobbyist","versatile","generalist","multitalented","nurse","pokechef","warning words","tip-top shape","tip top shape","researcher","analyst","evolution expert","professor","ranger","capture styler","partners","poke assist"]}];function fe(n){const e=n.trim().toLocaleLowerCase();if(e==="")return P;const a=P.filter(s=>M(s.name.toLocaleLowerCase(),e)),t=P.filter(s=>s.keywords.some(c=>M(c,e)));return[...new Set([...a,...t])]}function M(n,e){return n.includes(e)||e.includes(n)}function B(n,e,a){const t=n.slice();return t[10]=e[a],t}function me(n){let e;const a=n[6].default,t=W(a,n,n[9],null);return{c(){t&&t.c()},l(r){t&&t.l(r)},m(r,s){t&&t.m(r,s),e=!0},p(r,s){t&&t.p&&(!e||s&512)&&G(t,a,r,r[9],e?Q(a,r[9],s,null):J(r[9]),null)},i(r){e||(w(t,r),e=!0)},o(r){y(t,r),e=!1},d(r){t&&t.d(r)}}}function pe(n){let e,a;return e=new ce({props:{slot:"icon"}}),{c(){E(e.$$.fragment)},l(t){q(e.$$.fragment,t)},m(t,r){j(e,t,r),a=!0},p:X,i(t){a||(w(e.$$.fragment,t),a=!0)},o(t){y(e.$$.fragment,t),a=!1},d(t){S(e,t)}}}function he(n){let e,a="Reference";return{c(){e=$("p"),e.textContent=a,this.h()},l(t){e=v(t,"P",{class:!0,"data-svelte-h":!0}),K(e)!=="svelte-1rxq4q6"&&(e.textContent=a),this.h()},h(){d(e,"class","title svelte-eg4e4j")},m(t,r){C(t,e,r)},d(t){t&&_(e)}}}function de(n){let e,a="Reference";return{c(){e=$("h1"),e.textContent=a,this.h()},l(t){e=v(t,"H1",{class:!0,"data-svelte-h":!0}),K(e)!=="svelte-1otvw20"&&(e.textContent=a),this.h()},h(){d(e,"class","title svelte-eg4e4j")},m(t,r){C(t,e,r)},d(t){t&&_(e)}}}function _e(n){let e;function a(s,c){return s[4]?de:he}let t=a(n),r=t(n);return{c(){r.c(),e=N()},l(s){r.l(s),e=N()},m(s,c){r.m(s,c),C(s,e,c)},p(s,c){t!==(t=a(s))&&(r.d(1),r=t(s),r&&(r.c(),r.m(e.parentNode,e)))},d(s){s&&_(e),r.d(s)}}}function F(n,e){let a,t,r=e[10].name+"",s,c,f;return{key:n,first:null,c(){a=$("li"),t=$("a"),s=ee(r),this.h()},l(i){a=v(i,"LI",{class:!0});var p=z(a);t=v(p,"A",{href:!0,"data-pathname":!0,class:!0});var m=z(t);s=x(m,r),m.forEach(_),p.forEach(_),this.h()},h(){d(t,"href",c=e[10].url),d(t,"data-pathname",f=e[10].url),d(t,"class","svelte-eg4e4j"),d(a,"class","svelte-eg4e4j"),this.first=a},m(i,p){C(i,a,p),b(a,t),b(t,s)},p(i,p){e=i,p&8&&r!==(r=e[10].name+"")&&Z(s,r),p&8&&c!==(c=e[10].url)&&d(t,"href",c),p&8&&f!==(f=e[10].url)&&d(t,"data-pathname",f)},d(i){i&&_(a)}}}function ge(n){let e,a,t,r,s,c,f,i=[],p=new Map,m;function V(l){n[7](l)}let L={id:"reference-search",label:"Search",matched:n[3].length,max:P.length};n[2]!==void 0&&(L.value=n[2]),a=new oe({props:L}),I.push(()=>re(a,"value",V)),s=new ie({props:{$$slots:{default:[_e]},$$scope:{ctx:n}}});let u=U(n[3]);const R=l=>l[10].name;for(let l=0;l<u.length;l+=1){let o=B(n,u,l),h=R(o);p.set(h,i[l]=F(h,o))}return{c(){e=$("nav"),E(a.$$.fragment),r=D(),E(s.$$.fragment),c=D(),f=$("ul");for(let l=0;l<i.length;l+=1)i[l].c();this.h()},l(l){e=v(l,"NAV",{slot:!0,"aria-label":!0,"data-pathname":!0,class:!0});var o=z(e);q(a.$$.fragment,o),r=T(o),q(s.$$.fragment,o),c=T(o),f=v(o,"UL",{class:!0});var h=z(f);for(let g=0;g<i.length;g+=1)i[g].l(h);h.forEach(_),o.forEach(_),this.h()},h(){d(f,"class","svelte-eg4e4j"),d(e,"slot","side"),d(e,"aria-label","Reference"),d(e,"data-pathname",n[1]),d(e,"class","svelte-eg4e4j")},m(l,o){C(l,e,o),j(a,e,null),b(e,r),j(s,e,null),b(e,c),b(e,f);for(let h=0;h<i.length;h+=1)i[h]&&i[h].m(f,null);n[8](f),m=!0},p(l,o){const h={};o&8&&(h.matched=l[3].length),!t&&o&4&&(t=!0,h.value=l[2],Y(()=>t=!1)),a.$set(h);const g={};o&528&&(g.$$scope={dirty:o,ctx:l}),s.$set(g),o&8&&(u=U(l[3]),i=ne(i,o,R,1,l,u,p,f,se,F,null,B)),(!m||o&2)&&d(e,"data-pathname",l[1])},i(l){m||(w(a.$$.fragment,l),w(s.$$.fragment,l),m=!0)},o(l){y(a.$$.fragment,l),y(s.$$.fragment,l),m=!1},d(l){l&&_(e),S(a),S(s);for(let o=0;o<i.length;o+=1)i[o].d();n[8](null)}}}function ke(n){let e,a;return e=new le({props:{theme:"navy",$$slots:{side:[ge],icon:[pe],default:[me]},$$scope:{ctx:n}}}),{c(){E(e.$$.fragment)},l(t){q(e.$$.fragment,t)},m(t,r){j(e,t,r),a=!0},p(t,[r]){const s={};r&543&&(s.$$scope={dirty:r,ctx:t}),e.$set(s)},i(t){a||(w(e.$$.fragment,t),a=!0)},o(t){y(e.$$.fragment,t),a=!1},d(t){S(e,t)}}}function ve(n,e,a){let t,r,s,c,f;A(n,H,u=>a(2,c=u)),A(n,ue,u=>a(5,f=u));let{$$slots:i={},$$scope:p}=e,m;function V(u){c=u,H.set(c)}function L(u){I[u?"unshift":"push"](()=>{m=u,a(0,m)})}return n.$$set=u=>{"$$scope"in u&&a(9,p=u.$$scope)},n.$$.update=()=>{n.$$.dirty&32&&a(1,t=f.url.pathname),n.$$.dirty&2&&a(4,r=t==="/reference"),n.$$.dirty&3&&(m==null||m.querySelectorAll("a").forEach(u=>{u.classList.toggle("active",t.startsWith(u.dataset.pathname))})),n.$$.dirty&4&&a(3,s=fe(c))},[m,t,c,s,r,f,i,V,L,p]}class Se extends te{constructor(e){super(),ae(this,e,ve,ke,O,{})}}export{Se as component};
