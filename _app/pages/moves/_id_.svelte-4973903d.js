import{S as ce,i as he,s as be,w as A,x as B,y as N,q,o as F,B as G,e as b,t as P,c as w,a as D,h as g,d as o,g as u,J as c,j as H,k as T,a2 as we,l as $e,m as y,a3 as De,b as L}from"../../chunks/vendor-b1fd20b3.js";import{b as Ee}from"../../chunks/paths-396f020f.js";import{p as _e,L as Te}from"../../chunks/_layout-1f8cd55a.js";import{C as ye,F as Pe,T as ge}from"../../chunks/TypeTag-2ba56d68.js";import{T as ke}from"../../chunks/Title-e8ba48f7.js";import"../../chunks/Loader-b7c556d3.js";import"../../chunks/Pokeball-0928c1c8.js";import"../../chunks/SearchField-9c4c59b3.js";import"../../chunks/store-59420209.js";const je=f=>`<p>${f}</p>`,Le=f=>`<table>
    <thead>
        <tr>
            ${f.headers.map(e=>`<th>${e}</th>`).join("")}
        </tr>
    </thead>
    <tbody>
        ${f.rows.map(e=>`<tr>
            ${e.map(a=>`<td>${a}</td>`).join("")}
        </tr>`).join("")}
    </tbody>
</table>`,x=f=>f.map(e=>typeof e=="string"?je(e):typeof e=="object"&&e.type==="table"?Le(e):"").join("");function Re(f){let e,a,t,s,r=_e(f[0].power)+"",n,$,i,d,_,v,m=f[0].time+"",h,E,R,S,ee,z,M,I=f[0].pp+"",K,Q,O,te,V,k,J=f[0].duration+"",W,X,C,le,Y,j,U=f[0].range+"",Z;return{c(){e=b("dt"),a=P("Move Power"),t=T(),s=b("dd"),n=P(r),$=T(),i=b("dt"),d=P("Move Time"),_=T(),v=b("dd"),h=P(m),E=T(),R=b("dt"),S=b("abbr"),ee=P("PP"),z=T(),M=b("dd"),K=P(I),Q=T(),O=b("dt"),te=P("Duration"),V=T(),k=b("dd"),W=P(J),X=T(),C=b("dt"),le=P("Range"),Y=T(),j=b("dd"),Z=P(U),this.h()},l(l){e=w(l,"DT",{});var p=D(e);a=g(p,"Move Power"),p.forEach(o),t=y(l),s=w(l,"DD",{class:!0});var se=D(s);n=g(se,r),se.forEach(o),$=y(l),i=w(l,"DT",{});var re=D(i);d=g(re,"Move Time"),re.forEach(o),_=y(l),v=w(l,"DD",{});var ae=D(v);h=g(ae,m),ae.forEach(o),E=y(l),R=w(l,"DT",{});var oe=D(R);S=w(oe,"ABBR",{title:!0});var fe=D(S);ee=g(fe,"PP"),fe.forEach(o),oe.forEach(o),z=y(l),M=w(l,"DD",{});var ie=D(M);K=g(ie,I),ie.forEach(o),Q=y(l),O=w(l,"DT",{});var ne=D(O);te=g(ne,"Duration"),ne.forEach(o),V=y(l),k=w(l,"DD",{class:!0});var me=D(k);W=g(me,J),me.forEach(o),X=y(l),C=w(l,"DT",{});var pe=D(C);le=g(pe,"Range"),pe.forEach(o),Y=y(l),j=w(l,"DD",{class:!0});var ue=D(j);Z=g(ue,U),ue.forEach(o),this.h()},h(){L(s,"class","power svelte-1r7lpov"),L(S,"title","Power Points"),L(k,"class","duration svelte-1r7lpov"),L(j,"class","range svelte-1r7lpov")},m(l,p){u(l,e,p),c(e,a),u(l,t,p),u(l,s,p),c(s,n),u(l,$,p),u(l,i,p),c(i,d),u(l,_,p),u(l,v,p),c(v,h),u(l,E,p),u(l,R,p),c(R,S),c(S,ee),u(l,z,p),u(l,M,p),c(M,K),u(l,Q,p),u(l,O,p),c(O,te),u(l,V,p),u(l,k,p),c(k,W),u(l,X,p),u(l,C,p),c(C,le),u(l,Y,p),u(l,j,p),c(j,Z)},p(l,p){p&1&&r!==(r=_e(l[0].power)+"")&&H(n,r),p&1&&m!==(m=l[0].time+"")&&H(h,m),p&1&&I!==(I=l[0].pp+"")&&H(K,I),p&1&&J!==(J=l[0].duration+"")&&H(W,J),p&1&&U!==(U=l[0].range+"")&&H(Z,U)},d(l){l&&o(e),l&&o(t),l&&o(s),l&&o($),l&&o(i),l&&o(_),l&&o(v),l&&o(E),l&&o(R),l&&o(z),l&&o(M),l&&o(Q),l&&o(O),l&&o(V),l&&o(k),l&&o(X),l&&o(C),l&&o(Y),l&&o(j)}}}function ve(f){let e,a,t,s=f[0].higherLevels+"",r;return{c(){e=b("p"),a=b("strong"),t=P("At Higher Levels: "),r=P(s)},l(n){e=w(n,"P",{});var $=D(e);a=w($,"STRONG",{});var i=D(a);t=g(i,"At Higher Levels: "),i.forEach(o),r=g($,s),$.forEach(o)},m(n,$){u(n,e,$),c(e,a),c(a,t),c(e,r)},p(n,$){$&1&&s!==(s=n[0].higherLevels+"")&&H(r,s)},d(n){n&&o(e)}}}function de(f){let e,a,t,s,r,n=x(f[0].optional)+"",$;return{c(){e=b("p"),a=b("strong"),t=P("Optional Rules:"),s=T(),r=new we,$=$e(),this.h()},l(i){e=w(i,"P",{class:!0});var d=D(e);a=w(d,"STRONG",{});var _=D(a);t=g(_,"Optional Rules:"),_.forEach(o),d.forEach(o),s=y(i),r=De(i),$=$e(),this.h()},h(){L(e,"class","optional-heading svelte-1r7lpov"),r.a=$},m(i,d){u(i,e,d),c(e,a),c(a,t),u(i,s,d),r.m(n,i,d),u(i,$,d)},p(i,d){d&1&&n!==(n=x(i[0].optional)+"")&&r.p(n)},d(i){i&&o(e),i&&o(s),i&&o($),i&&r.d()}}}function Se(f){let e,a,t,s,r,n=x(f[0].description)+"",$,i,d;a=new Pe({props:{$$slots:{default:[Re]},$$scope:{ctx:f}}});let _=f[0].higherLevels!==void 0&&ve(f),v=f[0].optional!==void 0&&de(f);return{c(){e=b("section"),A(a.$$.fragment),t=T(),s=b("section"),r=new we,$=T(),_&&_.c(),i=T(),v&&v.c(),this.h()},l(m){e=w(m,"SECTION",{class:!0});var h=D(e);B(a.$$.fragment,h),h.forEach(o),t=y(m),s=w(m,"SECTION",{class:!0});var E=D(s);r=De(E),$=y(E),_&&_.l(E),i=y(E),v&&v.l(E),E.forEach(o),this.h()},h(){L(e,"class","info"),r.a=$,L(s,"class","description svelte-1r7lpov")},m(m,h){u(m,e,h),N(a,e,null),u(m,t,h),u(m,s,h),r.m(n,s),c(s,$),_&&_.m(s,null),c(s,i),v&&v.m(s,null),d=!0},p(m,h){const E={};h&3&&(E.$$scope={dirty:h,ctx:m}),a.$set(E),(!d||h&1)&&n!==(n=x(m[0].description)+"")&&r.p(n),m[0].higherLevels!==void 0?_?_.p(m,h):(_=ve(m),_.c(),_.m(s,i)):_&&(_.d(1),_=null),m[0].optional!==void 0?v?v.p(m,h):(v=de(m),v.c(),v.m(s,null)):v&&(v.d(1),v=null)},i(m){d||(q(a.$$.fragment,m),d=!0)},o(m){F(a.$$.fragment,m),d=!1},d(m){m&&o(e),G(a),m&&o(t),m&&o(s),_&&_.d(),v&&v.d()}}}function Me(f){let e,a;return e=new ge({props:{slot:"header-extra",type:[f[0].type]}}),{c(){A(e.$$.fragment)},l(t){B(e.$$.fragment,t)},m(t,s){N(e,t,s),a=!0},p(t,s){const r={};s&1&&(r.type=[t[0].type]),e.$set(r)},i(t){a||(q(e.$$.fragment,t),a=!0)},o(t){F(e.$$.fragment,t),a=!1},d(t){G(e,t)}}}function Oe(f){let e,a;return e=new ye({props:{title:f[0].name,$$slots:{"header-extra":[Me],default:[Se]},$$scope:{ctx:f}}}),{c(){A(e.$$.fragment)},l(t){B(e.$$.fragment,t)},m(t,s){N(e,t,s),a=!0},p(t,[s]){const r={};s&1&&(r.title=t[0].name),s&3&&(r.$$scope={dirty:s,ctx:t}),e.$set(r)},i(t){a||(q(e.$$.fragment,t),a=!0)},o(t){F(e.$$.fragment,t),a=!1},d(t){G(e,t)}}}function Ce(f,e,a){let{move:t}=e;return f.$$set=s=>{"move"in s&&a(0,t=s.move)},[t]}class He extends ce{constructor(e){super();he(this,e,Ce,Oe,be,{move:0})}}function Ae(f){let e,a;return e=new He({props:{move:f[0]}}),{c(){A(e.$$.fragment)},l(t){B(e.$$.fragment,t)},m(t,s){N(e,t,s),a=!0},p(t,s){const r={};s&1&&(r.move=t[0]),e.$set(r)},i(t){a||(q(e.$$.fragment,t),a=!0)},o(t){F(e.$$.fragment,t),a=!1},d(t){G(e,t)}}}function Be(f){let e,a,t,s;return e=new ke({props:{value:f[0].name}}),t=new Te({props:{$$slots:{default:[Ae]},$$scope:{ctx:f}}}),{c(){A(e.$$.fragment),a=T(),A(t.$$.fragment)},l(r){B(e.$$.fragment,r),a=y(r),B(t.$$.fragment,r)},m(r,n){N(e,r,n),u(r,a,n),N(t,r,n),s=!0},p(r,[n]){const $={};n&1&&($.value=r[0].name),e.$set($);const i={};n&3&&(i.$$scope={dirty:n,ctx:r}),t.$set(i)},i(r){s||(q(e.$$.fragment,r),q(t.$$.fragment,r),s=!0)},o(r){F(e.$$.fragment,r),F(t.$$.fragment,r),s=!1},d(r){G(e,r),r&&o(a),G(t,r)}}}const Ve=async({fetch:f,params:e})=>f(`${Ee}/moves/${e.id}.json`).then(async a=>a.status===404?{status:404}:{props:{move:await a.json()}});function Ne(f,e,a){let{move:t}=e;return f.$$set=s=>{"move"in s&&a(0,t=s.move)},[t]}class We extends ce{constructor(e){super();he(this,e,Ne,Be,be,{move:0})}}export{We as default,Ve as load};
