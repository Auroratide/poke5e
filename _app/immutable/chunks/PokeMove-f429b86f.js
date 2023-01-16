import{S as ke,i as Pe,s as Ce,w as ee,x as te,y as le,f as Q,t as W,z as se,C as Se,k as w,a as S,Y as we,e as g,l as b,m as T,h as t,c as j,Z as be,n as Y,b as n,G as k,D as je,E as Oe,F as Re,g as he,d as ye,q as O,r as R,u as B,p as ve}from"./index-1bf4116b.js";import{C as Ae,F as Te,T as Le}from"./TypeTag-814ed812.js";import{p as de}from"./string-574587ae.js";const Me=_=>`<p>${_}</p>`,Ne=_=>`<table>
    <thead>
        <tr>
            ${_.headers.map(e=>`<th>${e}</th>`).join("")}
        </tr>
    </thead>
    <tbody>
        ${_.rows.map(e=>`<tr>
            ${e.map(a=>`<td>${a}</td>`).join("")}
        </tr>`).join("")}
    </tbody>
</table>`,x=_=>_.map(e=>typeof e=="string"?Me(e):typeof e=="object"&&e.type==="table"?Ne(e):"").join("");const He=_=>({}),$e=_=>({});function Fe(_){let e,a,i,f,r=de(_[0].power)+"",u,v,p,C,L,h,A=_[0].time+"",E,D,M,P,d,s,m,y=_[0].pp+"",J,H,G,Z,F,N,I=_[0].duration+"",o,$,z,X,U,q,K=_[0].range+"",V;return{c(){e=w("dt"),a=O("Move Power"),i=S(),f=w("dd"),u=O(r),v=S(),p=w("dt"),C=O("Move Time"),L=S(),h=w("dd"),E=O(A),D=S(),M=w("dt"),P=w("abbr"),d=O("PP"),s=S(),m=w("dd"),J=O(y),H=S(),G=w("dt"),Z=O("Duration"),F=S(),N=w("dd"),o=O(I),$=S(),z=w("dt"),X=O("Range"),U=S(),q=w("dd"),V=O(K),this.h()},l(l){e=b(l,"DT",{});var c=T(e);a=R(c,"Move Power"),c.forEach(t),i=j(l),f=b(l,"DD",{class:!0});var fe=T(f);u=R(fe,r),fe.forEach(t),v=j(l),p=b(l,"DT",{});var oe=T(p);C=R(oe,"Move Time"),oe.forEach(t),L=j(l),h=b(l,"DD",{});var ie=T(h);E=R(ie,A),ie.forEach(t),D=j(l),M=b(l,"DT",{});var ae=T(M);P=b(ae,"ABBR",{title:!0});var re=T(P);d=R(re,"PP"),re.forEach(t),ae.forEach(t),s=j(l),m=b(l,"DD",{});var _e=T(m);J=R(_e,y),_e.forEach(t),H=j(l),G=b(l,"DT",{});var ne=T(G);Z=R(ne,"Duration"),ne.forEach(t),F=j(l),N=b(l,"DD",{class:!0});var ue=T(N);o=R(ue,I),ue.forEach(t),$=j(l),z=b(l,"DT",{});var pe=T(z);X=R(pe,"Range"),pe.forEach(t),U=j(l),q=b(l,"DD",{class:!0});var me=T(q);V=R(me,K),me.forEach(t),this.h()},h(){Y(f,"class","power svelte-13gfvwu"),Y(P,"title","Power Points"),Y(N,"class","duration svelte-13gfvwu"),Y(q,"class","range svelte-13gfvwu")},m(l,c){n(l,e,c),k(e,a),n(l,i,c),n(l,f,c),k(f,u),n(l,v,c),n(l,p,c),k(p,C),n(l,L,c),n(l,h,c),k(h,E),n(l,D,c),n(l,M,c),k(M,P),k(P,d),n(l,s,c),n(l,m,c),k(m,J),n(l,H,c),n(l,G,c),k(G,Z),n(l,F,c),n(l,N,c),k(N,o),n(l,$,c),n(l,z,c),k(z,X),n(l,U,c),n(l,q,c),k(q,V)},p(l,c){c&1&&r!==(r=de(l[0].power)+"")&&B(u,r),c&1&&A!==(A=l[0].time+"")&&B(E,A),c&1&&y!==(y=l[0].pp+"")&&B(J,y),c&1&&I!==(I=l[0].duration+"")&&B(o,I),c&1&&K!==(K=l[0].range+"")&&B(V,K)},d(l){l&&t(e),l&&t(i),l&&t(f),l&&t(v),l&&t(p),l&&t(L),l&&t(h),l&&t(D),l&&t(M),l&&t(s),l&&t(m),l&&t(H),l&&t(G),l&&t(F),l&&t(N),l&&t($),l&&t(z),l&&t(U),l&&t(q)}}}function ce(_){let e,a,i,f=_[0].higherLevels+"",r;return{c(){e=w("p"),a=w("strong"),i=O("At Higher Levels: "),r=O(f)},l(u){e=b(u,"P",{});var v=T(e);a=b(v,"STRONG",{});var p=T(a);i=R(p,"At Higher Levels: "),p.forEach(t),r=R(v,f),v.forEach(t)},m(u,v){n(u,e,v),k(e,a),k(a,i),k(e,r)},p(u,v){v&1&&f!==(f=u[0].higherLevels+"")&&B(r,f)},d(u){u&&t(e)}}}function Ee(_){let e,a,i,f,r,u=x(_[0].optional)+"",v;return{c(){e=w("p"),a=w("strong"),i=O("Optional Rules:"),f=S(),r=new we(!1),v=g(),this.h()},l(p){e=b(p,"P",{class:!0});var C=T(e);a=b(C,"STRONG",{});var L=T(a);i=R(L,"Optional Rules:"),L.forEach(t),C.forEach(t),f=j(p),r=be(p,!1),v=g(),this.h()},h(){Y(e,"class","optional-heading svelte-13gfvwu"),r.a=v},m(p,C){n(p,e,C),k(e,a),k(a,i),n(p,f,C),r.m(u,p,C),n(p,v,C)},p(p,C){C&1&&u!==(u=x(p[0].optional)+"")&&r.p(u)},d(p){p&&t(e),p&&t(f),p&&t(v),p&&r.d()}}}function De(_){let e,a,i=`var(--skin-contest-${_[0].contest.contest})`,f;return a=new Te({props:{$$slots:{default:[Ge]},$$scope:{ctx:_}}}),{c(){e=w("section"),ee(a.$$.fragment),this.h()},l(r){e=b(r,"SECTION",{class:!0});var u=T(e);te(a.$$.fragment,u),u.forEach(t),this.h()},h(){Y(e,"class","contest svelte-13gfvwu"),ve(e,"--contest-color",i)},m(r,u){n(r,e,u),le(a,e,null),f=!0},p(r,u){const v={};u&5&&(v.$$scope={dirty:u,ctx:r}),a.$set(v),u&1&&i!==(i=`var(--skin-contest-${r[0].contest.contest})`)&&ve(e,"--contest-color",i)},i(r){f||(Q(a.$$.fragment,r),f=!0)},o(r){W(a.$$.fragment,r),f=!1},d(r){r&&t(e),se(a)}}}function Ge(_){let e,a,i,f,r=_[0].contest.contest+"",u,v,p,C,L,h,A=_[0].contest.appeal+"",E,D,M,P,d,s,m=_[0].contest.jam+"",y,J,H,G,Z,F,N=_[0].contest.effect+"",I;return{c(){e=w("dt"),a=O("Contest"),i=S(),f=w("dd"),u=O(r),v=S(),p=w("dt"),C=O("Appeal"),L=S(),h=w("dd"),E=O(A),D=S(),M=w("dt"),P=O("Jam"),d=S(),s=w("dd"),y=O(m),J=S(),H=w("dt"),G=O("Effect"),Z=S(),F=w("dd"),I=O(N),this.h()},l(o){e=b(o,"DT",{});var $=T(e);a=R($,"Contest"),$.forEach(t),i=j(o),f=b(o,"DD",{class:!0});var z=T(f);u=R(z,r),z.forEach(t),v=j(o),p=b(o,"DT",{});var X=T(p);C=R(X,"Appeal"),X.forEach(t),L=j(o),h=b(o,"DD",{});var U=T(h);E=R(U,A),U.forEach(t),D=j(o),M=b(o,"DT",{});var q=T(M);P=R(q,"Jam"),q.forEach(t),d=j(o),s=b(o,"DD",{});var K=T(s);y=R(K,m),K.forEach(t),J=j(o),H=b(o,"DT",{});var V=T(H);G=R(V,"Effect"),V.forEach(t),Z=j(o),F=b(o,"DD",{});var l=T(F);I=R(l,N),l.forEach(t),this.h()},h(){Y(f,"class","contest-type svelte-13gfvwu")},m(o,$){n(o,e,$),k(e,a),n(o,i,$),n(o,f,$),k(f,u),n(o,v,$),n(o,p,$),k(p,C),n(o,L,$),n(o,h,$),k(h,E),n(o,D,$),n(o,M,$),k(M,P),n(o,d,$),n(o,s,$),k(s,y),n(o,J,$),n(o,H,$),k(H,G),n(o,Z,$),n(o,F,$),k(F,I)},p(o,$){$&1&&r!==(r=o[0].contest.contest+"")&&B(u,r),$&1&&A!==(A=o[0].contest.appeal+"")&&B(E,A),$&1&&m!==(m=o[0].contest.jam+"")&&B(y,m),$&1&&N!==(N=o[0].contest.effect+"")&&B(I,N)},d(o){o&&t(e),o&&t(i),o&&t(f),o&&t(v),o&&t(p),o&&t(L),o&&t(h),o&&t(D),o&&t(M),o&&t(d),o&&t(s),o&&t(J),o&&t(H),o&&t(Z),o&&t(F)}}}function Ie(_){let e,a,i,f,r,u=x(_[0].description)+"",v,p,C,L,h,A;a=new Te({props:{$$slots:{default:[Fe]},$$scope:{ctx:_}}});let E=_[0].higherLevels!==void 0&&ce(_),D=_[0].optional!==void 0&&Ee(_);const M=_[1].extra,P=Se(M,_,_[2],$e);let d=_[0].contest&&De(_);return{c(){e=w("section"),ee(a.$$.fragment),i=S(),f=w("section"),r=new we(!1),v=S(),E&&E.c(),p=S(),D&&D.c(),C=S(),P&&P.c(),L=S(),d&&d.c(),h=g(),this.h()},l(s){e=b(s,"SECTION",{class:!0});var m=T(e);te(a.$$.fragment,m),m.forEach(t),i=j(s),f=b(s,"SECTION",{class:!0});var y=T(f);r=be(y,!1),v=j(y),E&&E.l(y),p=j(y),D&&D.l(y),y.forEach(t),C=j(s),P&&P.l(s),L=j(s),d&&d.l(s),h=g(),this.h()},h(){Y(e,"class","info"),r.a=v,Y(f,"class","description svelte-13gfvwu")},m(s,m){n(s,e,m),le(a,e,null),n(s,i,m),n(s,f,m),r.m(u,f),k(f,v),E&&E.m(f,null),k(f,p),D&&D.m(f,null),n(s,C,m),P&&P.m(s,m),n(s,L,m),d&&d.m(s,m),n(s,h,m),A=!0},p(s,m){const y={};m&5&&(y.$$scope={dirty:m,ctx:s}),a.$set(y),(!A||m&1)&&u!==(u=x(s[0].description)+"")&&r.p(u),s[0].higherLevels!==void 0?E?E.p(s,m):(E=ce(s),E.c(),E.m(f,p)):E&&(E.d(1),E=null),s[0].optional!==void 0?D?D.p(s,m):(D=Ee(s),D.c(),D.m(f,null)):D&&(D.d(1),D=null),P&&P.p&&(!A||m&4)&&je(P,M,s,s[2],A?Re(M,s[2],m,He):Oe(s[2]),$e),s[0].contest?d?(d.p(s,m),m&1&&Q(d,1)):(d=De(s),d.c(),Q(d,1),d.m(h.parentNode,h)):d&&(he(),W(d,1,1,()=>{d=null}),ye())},i(s){A||(Q(a.$$.fragment,s),Q(P,s),Q(d),A=!0)},o(s){W(a.$$.fragment,s),W(P,s),W(d),A=!1},d(s){s&&t(e),se(a),s&&t(i),s&&t(f),E&&E.d(),D&&D.d(),s&&t(C),P&&P.d(s),s&&t(L),d&&d.d(s),s&&t(h)}}}function qe(_){let e,a;return e=new Le({props:{slot:"header-extra",type:[_[0].type]}}),{c(){ee(e.$$.fragment)},l(i){te(e.$$.fragment,i)},m(i,f){le(e,i,f),a=!0},p(i,f){const r={};f&1&&(r.type=[i[0].type]),e.$set(r)},i(i){a||(Q(e.$$.fragment,i),a=!0)},o(i){W(e.$$.fragment,i),a=!1},d(i){se(e,i)}}}function Be(_){let e,a;return e=new Ae({props:{title:_[0].name,$$slots:{"header-extra":[qe],default:[Ie]},$$scope:{ctx:_}}}),{c(){ee(e.$$.fragment)},l(i){te(e.$$.fragment,i)},m(i,f){le(e,i,f),a=!0},p(i,[f]){const r={};f&1&&(r.title=i[0].name),f&5&&(r.$$scope={dirty:f,ctx:i}),e.$set(r)},i(i){a||(Q(e.$$.fragment,i),a=!0)},o(i){W(e.$$.fragment,i),a=!1},d(i){se(e,i)}}}function Je(_,e,a){let{$$slots:i={},$$scope:f}=e,{move:r}=e;return _.$$set=u=>{"move"in u&&a(0,r=u.move),"$$scope"in u&&a(2,f=u.$$scope)},[r,i,f]}class Ke extends ke{constructor(e){super(),Pe(this,e,Je,Be,Ce,{move:0})}}export{Ke as P};