import{s as ut,B as mt,d as e,C as ct,D as pt,E as $t,i,h as Q,b as D,j as P,c as T,w as ot,e as h,a as E,q as L,f as y,g as B,k as J,t as R,u as ft}from"./CUP6ykR2.js";import{S as vt,i as Ct,d as X,t as G,a as H,m as Y,c as Z,b as tt,g as Dt,e as ht}from"./BnQR6DiB.js";import{C as Tt}from"./BBB4S3wF.js";import{F as dt}from"./DQJnZM_2.js";import{T as Et}from"./Bp_DSrui.js";import{p as it}from"./F4rFUBqP.js";import{M as bt}from"./CAIs6tw4.js";const wt=d=>({}),rt=d=>({});function gt(d){let t,r="Move Power",n,f,a=it(d[0].power)+"",c,b,v,M="Move Time",x,$,_=d[0].time+"",l,m,C,z='<abbr title="Power Points">PP</abbr>',N,k,S=d[0].pp+"",I,O,w,U="Duration",A,g,j=d[0].duration+"",F,o,u,V="Range",K,q,W=d[0].range+"",et;return{c(){t=h("dt"),t.textContent=r,n=E(),f=h("dd"),c=R(a),b=E(),v=h("dt"),v.textContent=M,x=E(),$=h("dd"),l=R(_),m=E(),C=h("dt"),C.innerHTML=z,N=E(),k=h("dd"),I=R(S),O=E(),w=h("dt"),w.textContent=U,A=E(),g=h("dd"),F=R(j),o=E(),u=h("dt"),u.textContent=V,K=E(),q=h("dd"),et=R(W),this.h()},l(s){t=D(s,"DT",{"data-svelte-h":!0}),B(t)!=="svelte-114pqca"&&(t.textContent=r),n=T(s),f=D(s,"DD",{class:!0});var p=P(f);c=J(p,a),p.forEach(e),b=T(s),v=D(s,"DT",{"data-svelte-h":!0}),B(v)!=="svelte-7hbox0"&&(v.textContent=M),x=T(s),$=D(s,"DD",{});var lt=P($);l=J(lt,_),lt.forEach(e),m=T(s),C=D(s,"DT",{"data-svelte-h":!0}),B(C)!=="svelte-ogbai0"&&(C.innerHTML=z),N=T(s),k=D(s,"DD",{});var st=P(k);I=J(st,S),st.forEach(e),O=T(s),w=D(s,"DT",{"data-svelte-h":!0}),B(w)!=="svelte-18qrpyy"&&(w.textContent=U),A=T(s),g=D(s,"DD",{class:!0});var nt=P(g);F=J(nt,j),nt.forEach(e),o=T(s),u=D(s,"DT",{"data-svelte-h":!0}),B(u)!=="svelte-jar7ex"&&(u.textContent=V),K=T(s),q=D(s,"DD",{class:!0});var at=P(q);et=J(at,W),at.forEach(e),this.h()},h(){Q(f,"class","power svelte-8g60fe"),Q(g,"class","duration svelte-8g60fe"),Q(q,"class","range svelte-8g60fe")},m(s,p){i(s,t,p),i(s,n,p),i(s,f,p),y(f,c),i(s,b,p),i(s,v,p),i(s,x,p),i(s,$,p),y($,l),i(s,m,p),i(s,C,p),i(s,N,p),i(s,k,p),y(k,I),i(s,O,p),i(s,w,p),i(s,A,p),i(s,g,p),y(g,F),i(s,o,p),i(s,u,p),i(s,K,p),i(s,q,p),y(q,et)},p(s,p){p&1&&a!==(a=it(s[0].power)+"")&&L(c,a),p&1&&_!==(_=s[0].time+"")&&L(l,_),p&1&&S!==(S=s[0].pp+"")&&L(I,S),p&1&&j!==(j=s[0].duration+"")&&L(F,j),p&1&&W!==(W=s[0].range+"")&&L(et,W)},d(s){s&&(e(t),e(n),e(f),e(b),e(v),e(x),e($),e(m),e(C),e(N),e(k),e(O),e(w),e(A),e(g),e(o),e(u),e(K),e(q))}}}function _t(d){let t,r,n=`var(--skin-contest-${d[0].contest.contest})`,f;return r=new dt({props:{$$slots:{default:[xt]},$$scope:{ctx:d}}}),{c(){t=h("section"),tt(r.$$.fragment),this.h()},l(a){t=D(a,"SECTION",{class:!0});var c=P(t);Z(r.$$.fragment,c),c.forEach(e),this.h()},h(){Q(t,"class","contest svelte-8g60fe"),ft(t,"--contest-color",n)},m(a,c){i(a,t,c),Y(r,t,null),f=!0},p(a,c){const b={};c&5&&(b.$$scope={dirty:c,ctx:a}),r.$set(b),c&1&&n!==(n=`var(--skin-contest-${a[0].contest.contest})`)&&ft(t,"--contest-color",n)},i(a){f||(H(r.$$.fragment,a),f=!0)},o(a){G(r.$$.fragment,a),f=!1},d(a){a&&e(t),X(r)}}}function xt(d){let t,r="Contest",n,f,a=d[0].contest.contest+"",c,b,v,M="Appeal",x,$,_=d[0].contest.appeal+"",l,m,C,z="Jam",N,k,S=d[0].contest.jam+"",I,O,w,U="Effect",A,g,j=d[0].contest.effect+"",F;return{c(){t=h("dt"),t.textContent=r,n=E(),f=h("dd"),c=R(a),b=E(),v=h("dt"),v.textContent=M,x=E(),$=h("dd"),l=R(_),m=E(),C=h("dt"),C.textContent=z,N=E(),k=h("dd"),I=R(S),O=E(),w=h("dt"),w.textContent=U,A=E(),g=h("dd"),F=R(j),this.h()},l(o){t=D(o,"DT",{"data-svelte-h":!0}),B(t)!=="svelte-1hraerq"&&(t.textContent=r),n=T(o),f=D(o,"DD",{class:!0});var u=P(f);c=J(u,a),u.forEach(e),b=T(o),v=D(o,"DT",{"data-svelte-h":!0}),B(v)!=="svelte-1mrsm3l"&&(v.textContent=M),x=T(o),$=D(o,"DD",{});var V=P($);l=J(V,_),V.forEach(e),m=T(o),C=D(o,"DT",{"data-svelte-h":!0}),B(C)!=="svelte-1vr10xe"&&(C.textContent=z),N=T(o),k=D(o,"DD",{});var K=P(k);I=J(K,S),K.forEach(e),O=T(o),w=D(o,"DT",{"data-svelte-h":!0}),B(w)!=="svelte-1bg1bjb"&&(w.textContent=U),A=T(o),g=D(o,"DD",{});var q=P(g);F=J(q,j),q.forEach(e),this.h()},h(){Q(f,"class","contest-type svelte-8g60fe")},m(o,u){i(o,t,u),i(o,n,u),i(o,f,u),y(f,c),i(o,b,u),i(o,v,u),i(o,x,u),i(o,$,u),y($,l),i(o,m,u),i(o,C,u),i(o,N,u),i(o,k,u),y(k,I),i(o,O,u),i(o,w,u),i(o,A,u),i(o,g,u),y(g,F)},p(o,u){u&1&&a!==(a=o[0].contest.contest+"")&&L(c,a),u&1&&_!==(_=o[0].contest.appeal+"")&&L(l,_),u&1&&S!==(S=o[0].contest.jam+"")&&L(I,S),u&1&&j!==(j=o[0].contest.effect+"")&&L(F,j)},d(o){o&&(e(t),e(n),e(f),e(b),e(v),e(x),e($),e(m),e(C),e(N),e(k),e(O),e(w),e(A),e(g))}}}function kt(d){let t,r,n,f,a,c,b,v,M;r=new dt({props:{$$slots:{default:[gt]},$$scope:{ctx:d}}}),a=new bt({props:{move:d[0]}});const x=d[1].extra,$=mt(x,d,d[2],rt);let _=d[0].contest&&_t(d);return{c(){t=h("section"),tt(r.$$.fragment),n=E(),f=h("section"),tt(a.$$.fragment),c=E(),$&&$.c(),b=E(),_&&_.c(),v=ot(),this.h()},l(l){t=D(l,"SECTION",{class:!0});var m=P(t);Z(r.$$.fragment,m),m.forEach(e),n=T(l),f=D(l,"SECTION",{class:!0});var C=P(f);Z(a.$$.fragment,C),C.forEach(e),c=T(l),$&&$.l(l),b=T(l),_&&_.l(l),v=ot(),this.h()},h(){Q(t,"class","info"),Q(f,"class","description")},m(l,m){i(l,t,m),Y(r,t,null),i(l,n,m),i(l,f,m),Y(a,f,null),i(l,c,m),$&&$.m(l,m),i(l,b,m),_&&_.m(l,m),i(l,v,m),M=!0},p(l,m){const C={};m&5&&(C.$$scope={dirty:m,ctx:l}),r.$set(C);const z={};m&1&&(z.move=l[0]),a.$set(z),$&&$.p&&(!M||m&4)&&ct($,x,l,l[2],M?$t(x,l[2],m,wt):pt(l[2]),rt),l[0].contest?_?(_.p(l,m),m&1&&H(_,1)):(_=_t(l),_.c(),H(_,1),_.m(v.parentNode,v)):_&&(Dt(),G(_,1,1,()=>{_=null}),ht())},i(l){M||(H(r.$$.fragment,l),H(a.$$.fragment,l),H($,l),H(_),M=!0)},o(l){G(r.$$.fragment,l),G(a.$$.fragment,l),G($,l),G(_),M=!1},d(l){l&&(e(t),e(n),e(f),e(c),e(b),e(v)),X(r),X(a),$&&$.d(l),_&&_.d(l)}}}function Mt(d){let t,r;return t=new Et({props:{slot:"header-extra",type:[d[0].type]}}),{c(){tt(t.$$.fragment)},l(n){Z(t.$$.fragment,n)},m(n,f){Y(t,n,f),r=!0},p(n,f){const a={};f&1&&(a.type=[n[0].type]),t.$set(a)},i(n){r||(H(t.$$.fragment,n),r=!0)},o(n){G(t.$$.fragment,n),r=!1},d(n){X(t,n)}}}function Pt(d){let t,r;return t=new Tt({props:{title:d[0].name,$$slots:{"header-extra":[Mt],default:[kt]},$$scope:{ctx:d}}}),{c(){tt(t.$$.fragment)},l(n){Z(t.$$.fragment,n)},m(n,f){Y(t,n,f),r=!0},p(n,[f]){const a={};f&1&&(a.title=n[0].name),f&5&&(a.$$scope={dirty:f,ctx:n}),t.$set(a)},i(n){r||(H(t.$$.fragment,n),r=!0)},o(n){G(t.$$.fragment,n),r=!1},d(n){X(t,n)}}}function St(d,t,r){let{$$slots:n={},$$scope:f}=t,{move:a}=t;return d.$$set=c=>{"move"in c&&r(0,a=c.move),"$$scope"in c&&r(2,f=c.$$scope)},[a,n,f]}class Ht extends vt{constructor(t){super(),Ct(this,t,St,Pt,ut,{move:0})}}export{Ht as P};
