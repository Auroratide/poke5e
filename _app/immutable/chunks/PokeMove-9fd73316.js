import{S as De,i as Ee,s as we,w as x,x as g,y as ee,f as K,t as W,z as te,C as Te,k as c,a as P,e as ne,l as D,m as E,h as t,c as k,n as X,b as _,D as be,E as Pe,F as ke,g as Ce,d as Me,q as C,r as M,G as b,u as L,p as pe}from"./index-53b314aa.js";import{C as Se,F as ce,T as Ae}from"./TypeTag-f2f08b10.js";import{p as $e}from"./string-574587ae.js";import{M as Ne}from"./MoveDescription-8814e01c.js";const Fe=m=>({}),ve=m=>({});function Ie(m){let s,r,o,a,i=$e(m[0].power)+"",p,S,w,A,N,d,u=m[0].time+"",f,n,T,F,Q,R,O,y=m[0].pp+"",G,j,B,U,q,I,J=m[0].duration+"",l,$,H,h,Y,z,V=m[0].range+"",Z;return{c(){s=c("dt"),r=C("Move Power"),o=P(),a=c("dd"),p=C(i),S=P(),w=c("dt"),A=C("Move Time"),N=P(),d=c("dd"),f=C(u),n=P(),T=c("dt"),F=c("abbr"),Q=C("PP"),R=P(),O=c("dd"),G=C(y),j=P(),B=c("dt"),U=C("Duration"),q=P(),I=c("dd"),l=C(J),$=P(),H=c("dt"),h=C("Range"),Y=P(),z=c("dd"),Z=C(V),this.h()},l(e){s=D(e,"DT",{});var v=E(s);r=M(v,"Move Power"),v.forEach(t),o=k(e),a=D(e,"DD",{class:!0});var le=E(a);p=M(le,i),le.forEach(t),S=k(e),w=D(e,"DT",{});var se=E(w);A=M(se,"Move Time"),se.forEach(t),N=k(e),d=D(e,"DD",{});var fe=E(d);f=M(fe,u),fe.forEach(t),n=k(e),T=D(e,"DT",{});var oe=E(T);F=D(oe,"ABBR",{title:!0});var ie=E(F);Q=M(ie,"PP"),ie.forEach(t),oe.forEach(t),R=k(e),O=D(e,"DD",{});var ae=E(O);G=M(ae,y),ae.forEach(t),j=k(e),B=D(e,"DT",{});var _e=E(B);U=M(_e,"Duration"),_e.forEach(t),q=k(e),I=D(e,"DD",{class:!0});var re=E(I);l=M(re,J),re.forEach(t),$=k(e),H=D(e,"DT",{});var ue=E(H);h=M(ue,"Range"),ue.forEach(t),Y=k(e),z=D(e,"DD",{class:!0});var me=E(z);Z=M(me,V),me.forEach(t),this.h()},h(){X(a,"class","power svelte-u6fhbw"),X(F,"title","Power Points"),X(I,"class","duration svelte-u6fhbw"),X(z,"class","range svelte-u6fhbw")},m(e,v){_(e,s,v),b(s,r),_(e,o,v),_(e,a,v),b(a,p),_(e,S,v),_(e,w,v),b(w,A),_(e,N,v),_(e,d,v),b(d,f),_(e,n,v),_(e,T,v),b(T,F),b(F,Q),_(e,R,v),_(e,O,v),b(O,G),_(e,j,v),_(e,B,v),b(B,U),_(e,q,v),_(e,I,v),b(I,l),_(e,$,v),_(e,H,v),b(H,h),_(e,Y,v),_(e,z,v),b(z,Z)},p(e,v){v&1&&i!==(i=$e(e[0].power)+"")&&L(p,i),v&1&&u!==(u=e[0].time+"")&&L(f,u),v&1&&y!==(y=e[0].pp+"")&&L(G,y),v&1&&J!==(J=e[0].duration+"")&&L(l,J),v&1&&V!==(V=e[0].range+"")&&L(Z,V)},d(e){e&&t(s),e&&t(o),e&&t(a),e&&t(S),e&&t(w),e&&t(N),e&&t(d),e&&t(n),e&&t(T),e&&t(R),e&&t(O),e&&t(j),e&&t(B),e&&t(q),e&&t(I),e&&t($),e&&t(H),e&&t(Y),e&&t(z)}}}function de(m){let s,r,o=`var(--skin-contest-${m[0].contest.contest})`,a;return r=new ce({props:{$$slots:{default:[Oe]},$$scope:{ctx:m}}}),{c(){s=c("section"),x(r.$$.fragment),this.h()},l(i){s=D(i,"SECTION",{class:!0});var p=E(s);g(r.$$.fragment,p),p.forEach(t),this.h()},h(){X(s,"class","contest svelte-u6fhbw"),pe(s,"--contest-color",o)},m(i,p){_(i,s,p),ee(r,s,null),a=!0},p(i,p){const S={};p&5&&(S.$$scope={dirty:p,ctx:i}),r.$set(S),p&1&&o!==(o=`var(--skin-contest-${i[0].contest.contest})`)&&pe(s,"--contest-color",o)},i(i){a||(K(r.$$.fragment,i),a=!0)},o(i){W(r.$$.fragment,i),a=!1},d(i){i&&t(s),te(r)}}}function Oe(m){let s,r,o,a,i=m[0].contest.contest+"",p,S,w,A,N,d,u=m[0].contest.appeal+"",f,n,T,F,Q,R,O=m[0].contest.jam+"",y,G,j,B,U,q,I=m[0].contest.effect+"",J;return{c(){s=c("dt"),r=C("Contest"),o=P(),a=c("dd"),p=C(i),S=P(),w=c("dt"),A=C("Appeal"),N=P(),d=c("dd"),f=C(u),n=P(),T=c("dt"),F=C("Jam"),Q=P(),R=c("dd"),y=C(O),G=P(),j=c("dt"),B=C("Effect"),U=P(),q=c("dd"),J=C(I),this.h()},l(l){s=D(l,"DT",{});var $=E(s);r=M($,"Contest"),$.forEach(t),o=k(l),a=D(l,"DD",{class:!0});var H=E(a);p=M(H,i),H.forEach(t),S=k(l),w=D(l,"DT",{});var h=E(w);A=M(h,"Appeal"),h.forEach(t),N=k(l),d=D(l,"DD",{});var Y=E(d);f=M(Y,u),Y.forEach(t),n=k(l),T=D(l,"DT",{});var z=E(T);F=M(z,"Jam"),z.forEach(t),Q=k(l),R=D(l,"DD",{});var V=E(R);y=M(V,O),V.forEach(t),G=k(l),j=D(l,"DT",{});var Z=E(j);B=M(Z,"Effect"),Z.forEach(t),U=k(l),q=D(l,"DD",{});var e=E(q);J=M(e,I),e.forEach(t),this.h()},h(){X(a,"class","contest-type svelte-u6fhbw")},m(l,$){_(l,s,$),b(s,r),_(l,o,$),_(l,a,$),b(a,p),_(l,S,$),_(l,w,$),b(w,A),_(l,N,$),_(l,d,$),b(d,f),_(l,n,$),_(l,T,$),b(T,F),_(l,Q,$),_(l,R,$),b(R,y),_(l,G,$),_(l,j,$),b(j,B),_(l,U,$),_(l,q,$),b(q,J)},p(l,$){$&1&&i!==(i=l[0].contest.contest+"")&&L(p,i),$&1&&u!==(u=l[0].contest.appeal+"")&&L(f,u),$&1&&O!==(O=l[0].contest.jam+"")&&L(y,O),$&1&&I!==(I=l[0].contest.effect+"")&&L(J,I)},d(l){l&&t(s),l&&t(o),l&&t(a),l&&t(S),l&&t(w),l&&t(N),l&&t(d),l&&t(n),l&&t(T),l&&t(Q),l&&t(R),l&&t(G),l&&t(j),l&&t(U),l&&t(q)}}}function Re(m){let s,r,o,a,i,p,S,w,A;r=new ce({props:{$$slots:{default:[Ie]},$$scope:{ctx:m}}}),i=new Ne({props:{move:m[0]}});const N=m[1].extra,d=Te(N,m,m[2],ve);let u=m[0].contest&&de(m);return{c(){s=c("section"),x(r.$$.fragment),o=P(),a=c("section"),x(i.$$.fragment),p=P(),d&&d.c(),S=P(),u&&u.c(),w=ne(),this.h()},l(f){s=D(f,"SECTION",{class:!0});var n=E(s);g(r.$$.fragment,n),n.forEach(t),o=k(f),a=D(f,"SECTION",{class:!0});var T=E(a);g(i.$$.fragment,T),T.forEach(t),p=k(f),d&&d.l(f),S=k(f),u&&u.l(f),w=ne(),this.h()},h(){X(s,"class","info"),X(a,"class","description")},m(f,n){_(f,s,n),ee(r,s,null),_(f,o,n),_(f,a,n),ee(i,a,null),_(f,p,n),d&&d.m(f,n),_(f,S,n),u&&u.m(f,n),_(f,w,n),A=!0},p(f,n){const T={};n&5&&(T.$$scope={dirty:n,ctx:f}),r.$set(T);const F={};n&1&&(F.move=f[0]),i.$set(F),d&&d.p&&(!A||n&4)&&be(d,N,f,f[2],A?ke(N,f[2],n,Fe):Pe(f[2]),ve),f[0].contest?u?(u.p(f,n),n&1&&K(u,1)):(u=de(f),u.c(),K(u,1),u.m(w.parentNode,w)):u&&(Ce(),W(u,1,1,()=>{u=null}),Me())},i(f){A||(K(r.$$.fragment,f),K(i.$$.fragment,f),K(d,f),K(u),A=!0)},o(f){W(r.$$.fragment,f),W(i.$$.fragment,f),W(d,f),W(u),A=!1},d(f){f&&t(s),te(r),f&&t(o),f&&t(a),te(i),f&&t(p),d&&d.d(f),f&&t(S),u&&u.d(f),f&&t(w)}}}function je(m){let s,r;return s=new Ae({props:{slot:"header-extra",type:[m[0].type]}}),{c(){x(s.$$.fragment)},l(o){g(s.$$.fragment,o)},m(o,a){ee(s,o,a),r=!0},p(o,a){const i={};a&1&&(i.type=[o[0].type]),s.$set(i)},i(o){r||(K(s.$$.fragment,o),r=!0)},o(o){W(s.$$.fragment,o),r=!1},d(o){te(s,o)}}}function qe(m){let s,r;return s=new Se({props:{title:m[0].name,$$slots:{"header-extra":[je],default:[Re]},$$scope:{ctx:m}}}),{c(){x(s.$$.fragment)},l(o){g(s.$$.fragment,o)},m(o,a){ee(s,o,a),r=!0},p(o,[a]){const i={};a&1&&(i.title=o[0].name),a&5&&(i.$$scope={dirty:a,ctx:o}),s.$set(i)},i(o){r||(K(s.$$.fragment,o),r=!0)},o(o){W(s.$$.fragment,o),r=!1},d(o){te(s,o)}}}function ye(m,s,r){let{$$slots:o={},$$scope:a}=s,{move:i}=s;return m.$$set=p=>{"move"in p&&r(0,i=p.move),"$$scope"in p&&r(2,a=p.$$scope)},[i,o,a]}class He extends De{constructor(s){super(),Ee(this,s,ye,qe,we,{move:0})}}export{He as P};