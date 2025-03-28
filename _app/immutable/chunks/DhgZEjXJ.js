import{s as mt,D as ut,d as e,E as ct,F as pt,G as $t,i,h as Q,b as D,j as P,c as T,y as ot,e as h,a as E,v as H,f as L,g as G,k as J,t as R,w as ft}from"./D7yIvq8v.js";import{S as vt,i as Ct,d as X,t as B,a as A,m as Y,c as Z,b as tt,g as Dt,e as ht}from"./D-31sP7R.js";import{C as Tt}from"./Cjq8BYIZ.js";import{F as dt}from"./CqkyHSGC.js";import{T as Et}from"./DQY0RtPN.js";import{p as it}from"./F4rFUBqP.js";import{M as bt}from"./_lNo0476.js";const wt=d=>({}),rt=d=>({});function gt(d){let t,r="Move Power",n,f,a=it(d[0].power)+"",c,b,v,M="Move Time",x,$,_=d[0].time+"",l,u,C,z='<abbr title="Power Points">PP</abbr>',N,k,S=d[0].pp+"",F,I,w,U="Duration",O,g,j=d[0].duration+"",y,o,m,V="Range",K,q,W=d[0].range+"",et;return{c(){t=h("dt"),t.textContent=r,n=E(),f=h("dd"),c=R(a),b=E(),v=h("dt"),v.textContent=M,x=E(),$=h("dd"),l=R(_),u=E(),C=h("dt"),C.innerHTML=z,N=E(),k=h("dd"),F=R(S),I=E(),w=h("dt"),w.textContent=U,O=E(),g=h("dd"),y=R(j),o=E(),m=h("dt"),m.textContent=V,K=E(),q=h("dd"),et=R(W),this.h()},l(s){t=D(s,"DT",{"data-svelte-h":!0}),G(t)!=="svelte-114pqca"&&(t.textContent=r),n=T(s),f=D(s,"DD",{class:!0});var p=P(f);c=J(p,a),p.forEach(e),b=T(s),v=D(s,"DT",{"data-svelte-h":!0}),G(v)!=="svelte-7hbox0"&&(v.textContent=M),x=T(s),$=D(s,"DD",{});var lt=P($);l=J(lt,_),lt.forEach(e),u=T(s),C=D(s,"DT",{"data-svelte-h":!0}),G(C)!=="svelte-ogbai0"&&(C.innerHTML=z),N=T(s),k=D(s,"DD",{});var st=P(k);F=J(st,S),st.forEach(e),I=T(s),w=D(s,"DT",{"data-svelte-h":!0}),G(w)!=="svelte-18qrpyy"&&(w.textContent=U),O=T(s),g=D(s,"DD",{class:!0});var nt=P(g);y=J(nt,j),nt.forEach(e),o=T(s),m=D(s,"DT",{"data-svelte-h":!0}),G(m)!=="svelte-jar7ex"&&(m.textContent=V),K=T(s),q=D(s,"DD",{class:!0});var at=P(q);et=J(at,W),at.forEach(e),this.h()},h(){Q(f,"class","power svelte-8g60fe"),Q(g,"class","duration svelte-8g60fe"),Q(q,"class","range svelte-8g60fe")},m(s,p){i(s,t,p),i(s,n,p),i(s,f,p),L(f,c),i(s,b,p),i(s,v,p),i(s,x,p),i(s,$,p),L($,l),i(s,u,p),i(s,C,p),i(s,N,p),i(s,k,p),L(k,F),i(s,I,p),i(s,w,p),i(s,O,p),i(s,g,p),L(g,y),i(s,o,p),i(s,m,p),i(s,K,p),i(s,q,p),L(q,et)},p(s,p){p&1&&a!==(a=it(s[0].power)+"")&&H(c,a),p&1&&_!==(_=s[0].time+"")&&H(l,_),p&1&&S!==(S=s[0].pp+"")&&H(F,S),p&1&&j!==(j=s[0].duration+"")&&H(y,j),p&1&&W!==(W=s[0].range+"")&&H(et,W)},d(s){s&&(e(t),e(n),e(f),e(b),e(v),e(x),e($),e(u),e(C),e(N),e(k),e(I),e(w),e(O),e(g),e(o),e(m),e(K),e(q))}}}function _t(d){let t,r,n=`var(--skin-contest-${d[0].contest.contest})`,f;return r=new dt({props:{$$slots:{default:[xt]},$$scope:{ctx:d}}}),{c(){t=h("section"),tt(r.$$.fragment),this.h()},l(a){t=D(a,"SECTION",{class:!0});var c=P(t);Z(r.$$.fragment,c),c.forEach(e),this.h()},h(){Q(t,"class","contest svelte-8g60fe"),ft(t,"--contest-color",n)},m(a,c){i(a,t,c),Y(r,t,null),f=!0},p(a,c){const b={};c&5&&(b.$$scope={dirty:c,ctx:a}),r.$set(b),c&1&&n!==(n=`var(--skin-contest-${a[0].contest.contest})`)&&ft(t,"--contest-color",n)},i(a){f||(A(r.$$.fragment,a),f=!0)},o(a){B(r.$$.fragment,a),f=!1},d(a){a&&e(t),X(r)}}}function xt(d){let t,r="Contest",n,f,a=d[0].contest.contest+"",c,b,v,M="Appeal",x,$,_=d[0].contest.appeal+"",l,u,C,z="Jam",N,k,S=d[0].contest.jam+"",F,I,w,U="Effect",O,g,j=d[0].contest.effect+"",y;return{c(){t=h("dt"),t.textContent=r,n=E(),f=h("dd"),c=R(a),b=E(),v=h("dt"),v.textContent=M,x=E(),$=h("dd"),l=R(_),u=E(),C=h("dt"),C.textContent=z,N=E(),k=h("dd"),F=R(S),I=E(),w=h("dt"),w.textContent=U,O=E(),g=h("dd"),y=R(j),this.h()},l(o){t=D(o,"DT",{"data-svelte-h":!0}),G(t)!=="svelte-1hraerq"&&(t.textContent=r),n=T(o),f=D(o,"DD",{class:!0});var m=P(f);c=J(m,a),m.forEach(e),b=T(o),v=D(o,"DT",{"data-svelte-h":!0}),G(v)!=="svelte-1mrsm3l"&&(v.textContent=M),x=T(o),$=D(o,"DD",{});var V=P($);l=J(V,_),V.forEach(e),u=T(o),C=D(o,"DT",{"data-svelte-h":!0}),G(C)!=="svelte-1vr10xe"&&(C.textContent=z),N=T(o),k=D(o,"DD",{});var K=P(k);F=J(K,S),K.forEach(e),I=T(o),w=D(o,"DT",{"data-svelte-h":!0}),G(w)!=="svelte-1bg1bjb"&&(w.textContent=U),O=T(o),g=D(o,"DD",{});var q=P(g);y=J(q,j),q.forEach(e),this.h()},h(){Q(f,"class","contest-type svelte-8g60fe")},m(o,m){i(o,t,m),i(o,n,m),i(o,f,m),L(f,c),i(o,b,m),i(o,v,m),i(o,x,m),i(o,$,m),L($,l),i(o,u,m),i(o,C,m),i(o,N,m),i(o,k,m),L(k,F),i(o,I,m),i(o,w,m),i(o,O,m),i(o,g,m),L(g,y)},p(o,m){m&1&&a!==(a=o[0].contest.contest+"")&&H(c,a),m&1&&_!==(_=o[0].contest.appeal+"")&&H(l,_),m&1&&S!==(S=o[0].contest.jam+"")&&H(F,S),m&1&&j!==(j=o[0].contest.effect+"")&&H(y,j)},d(o){o&&(e(t),e(n),e(f),e(b),e(v),e(x),e($),e(u),e(C),e(N),e(k),e(I),e(w),e(O),e(g))}}}function kt(d){let t,r,n,f,a,c,b,v,M;r=new dt({props:{$$slots:{default:[gt]},$$scope:{ctx:d}}}),a=new bt({props:{move:d[0]}});const x=d[1].extra,$=ut(x,d,d[2],rt);let _=d[0].contest&&_t(d);return{c(){t=h("section"),tt(r.$$.fragment),n=E(),f=h("section"),tt(a.$$.fragment),c=E(),$&&$.c(),b=E(),_&&_.c(),v=ot(),this.h()},l(l){t=D(l,"SECTION",{class:!0});var u=P(t);Z(r.$$.fragment,u),u.forEach(e),n=T(l),f=D(l,"SECTION",{class:!0});var C=P(f);Z(a.$$.fragment,C),C.forEach(e),c=T(l),$&&$.l(l),b=T(l),_&&_.l(l),v=ot(),this.h()},h(){Q(t,"class","info"),Q(f,"class","description")},m(l,u){i(l,t,u),Y(r,t,null),i(l,n,u),i(l,f,u),Y(a,f,null),i(l,c,u),$&&$.m(l,u),i(l,b,u),_&&_.m(l,u),i(l,v,u),M=!0},p(l,u){const C={};u&5&&(C.$$scope={dirty:u,ctx:l}),r.$set(C);const z={};u&1&&(z.move=l[0]),a.$set(z),$&&$.p&&(!M||u&4)&&ct($,x,l,l[2],M?$t(x,l[2],u,wt):pt(l[2]),rt),l[0].contest?_?(_.p(l,u),u&1&&A(_,1)):(_=_t(l),_.c(),A(_,1),_.m(v.parentNode,v)):_&&(Dt(),B(_,1,1,()=>{_=null}),ht())},i(l){M||(A(r.$$.fragment,l),A(a.$$.fragment,l),A($,l),A(_),M=!0)},o(l){B(r.$$.fragment,l),B(a.$$.fragment,l),B($,l),B(_),M=!1},d(l){l&&(e(t),e(n),e(f),e(c),e(b),e(v)),X(r),X(a),$&&$.d(l),_&&_.d(l)}}}function Mt(d){let t,r;return t=new Et({props:{slot:"header-extra",type:[d[0].type]}}),{c(){tt(t.$$.fragment)},l(n){Z(t.$$.fragment,n)},m(n,f){Y(t,n,f),r=!0},p(n,f){const a={};f&1&&(a.type=[n[0].type]),t.$set(a)},i(n){r||(A(t.$$.fragment,n),r=!0)},o(n){B(t.$$.fragment,n),r=!1},d(n){X(t,n)}}}function Pt(d){let t,r;return t=new Tt({props:{title:d[0].name,$$slots:{"header-extra":[Mt],default:[kt]},$$scope:{ctx:d}}}),{c(){tt(t.$$.fragment)},l(n){Z(t.$$.fragment,n)},m(n,f){Y(t,n,f),r=!0},p(n,[f]){const a={};f&1&&(a.title=n[0].name),f&5&&(a.$$scope={dirty:f,ctx:n}),t.$set(a)},i(n){r||(A(t.$$.fragment,n),r=!0)},o(n){B(t.$$.fragment,n),r=!1},d(n){X(t,n)}}}function St(d,t,r){let{$$slots:n={},$$scope:f}=t,{move:a}=t;return d.$$set=c=>{"move"in c&&r(0,a=c.move),"$$scope"in c&&r(2,f=c.$$scope)},[a,n,f]}class At extends vt{constructor(t){super(),Ct(this,t,St,Pt,mt,{move:0})}}export{At as P};
