import{s as ut,q as ct,e as D,a as T,r as ot,b as h,f as P,d as e,c as E,j as Q,k as i,u as mt,v as pt,w as $t,t as H,i as L,g as J,l as R,x as z,y as ft}from"./scheduler.DAF4hTao.js";import{S as vt,i as Ct,c as X,a as Y,m as Z,t as F,b as G,d as tt,g as Dt,e as ht}from"./index.Dy0pSeyo.js";import{C as Tt,F as dt,T as Et}from"./TypeTag.QeG2oRsd.js";import{p as it}from"./string.F4rFUBqP.js";import{M as bt}from"./MoveDescription.DqDzPC18.js";const wt=d=>({}),rt=d=>({});function xt(d){let t,r="Move Power",n,f,a=it(d[0].power)+"",m,b,v,M="Move Time",g,$,_=d[0].time+"",l,c,C,B='<abbr title="Power Points">PP</abbr>',N,k,S=d[0].pp+"",I,O,w,U="Duration",y,x,j=d[0].duration+"",A,o,u,V="Range",K,q,W=d[0].range+"",et;return{c(){t=D("dt"),t.textContent=r,n=T(),f=D("dd"),m=H(a),b=T(),v=D("dt"),v.textContent=M,g=T(),$=D("dd"),l=H(_),c=T(),C=D("dt"),C.innerHTML=B,N=T(),k=D("dd"),I=H(S),O=T(),w=D("dt"),w.textContent=U,y=T(),x=D("dd"),A=H(j),o=T(),u=D("dt"),u.textContent=V,K=T(),q=D("dd"),et=H(W),this.h()},l(s){t=h(s,"DT",{"data-svelte-h":!0}),L(t)!=="svelte-114pqca"&&(t.textContent=r),n=E(s),f=h(s,"DD",{class:!0});var p=P(f);m=J(p,a),p.forEach(e),b=E(s),v=h(s,"DT",{"data-svelte-h":!0}),L(v)!=="svelte-7hbox0"&&(v.textContent=M),g=E(s),$=h(s,"DD",{});var lt=P($);l=J(lt,_),lt.forEach(e),c=E(s),C=h(s,"DT",{"data-svelte-h":!0}),L(C)!=="svelte-ogbai0"&&(C.innerHTML=B),N=E(s),k=h(s,"DD",{});var st=P(k);I=J(st,S),st.forEach(e),O=E(s),w=h(s,"DT",{"data-svelte-h":!0}),L(w)!=="svelte-18qrpyy"&&(w.textContent=U),y=E(s),x=h(s,"DD",{class:!0});var nt=P(x);A=J(nt,j),nt.forEach(e),o=E(s),u=h(s,"DT",{"data-svelte-h":!0}),L(u)!=="svelte-jar7ex"&&(u.textContent=V),K=E(s),q=h(s,"DD",{class:!0});var at=P(q);et=J(at,W),at.forEach(e),this.h()},h(){Q(f,"class","power svelte-8g60fe"),Q(x,"class","duration svelte-8g60fe"),Q(q,"class","range svelte-8g60fe")},m(s,p){i(s,t,p),i(s,n,p),i(s,f,p),R(f,m),i(s,b,p),i(s,v,p),i(s,g,p),i(s,$,p),R($,l),i(s,c,p),i(s,C,p),i(s,N,p),i(s,k,p),R(k,I),i(s,O,p),i(s,w,p),i(s,y,p),i(s,x,p),R(x,A),i(s,o,p),i(s,u,p),i(s,K,p),i(s,q,p),R(q,et)},p(s,p){p&1&&a!==(a=it(s[0].power)+"")&&z(m,a),p&1&&_!==(_=s[0].time+"")&&z(l,_),p&1&&S!==(S=s[0].pp+"")&&z(I,S),p&1&&j!==(j=s[0].duration+"")&&z(A,j),p&1&&W!==(W=s[0].range+"")&&z(et,W)},d(s){s&&(e(t),e(n),e(f),e(b),e(v),e(g),e($),e(c),e(C),e(N),e(k),e(O),e(w),e(y),e(x),e(o),e(u),e(K),e(q))}}}function _t(d){let t,r,n=`var(--skin-contest-${d[0].contest.contest})`,f;return r=new dt({props:{$$slots:{default:[gt]},$$scope:{ctx:d}}}),{c(){t=D("section"),X(r.$$.fragment),this.h()},l(a){t=h(a,"SECTION",{class:!0});var m=P(t);Y(r.$$.fragment,m),m.forEach(e),this.h()},h(){Q(t,"class","contest svelte-8g60fe"),ft(t,"--contest-color",n)},m(a,m){i(a,t,m),Z(r,t,null),f=!0},p(a,m){const b={};m&5&&(b.$$scope={dirty:m,ctx:a}),r.$set(b),m&1&&n!==(n=`var(--skin-contest-${a[0].contest.contest})`)&&ft(t,"--contest-color",n)},i(a){f||(F(r.$$.fragment,a),f=!0)},o(a){G(r.$$.fragment,a),f=!1},d(a){a&&e(t),tt(r)}}}function gt(d){let t,r="Contest",n,f,a=d[0].contest.contest+"",m,b,v,M="Appeal",g,$,_=d[0].contest.appeal+"",l,c,C,B="Jam",N,k,S=d[0].contest.jam+"",I,O,w,U="Effect",y,x,j=d[0].contest.effect+"",A;return{c(){t=D("dt"),t.textContent=r,n=T(),f=D("dd"),m=H(a),b=T(),v=D("dt"),v.textContent=M,g=T(),$=D("dd"),l=H(_),c=T(),C=D("dt"),C.textContent=B,N=T(),k=D("dd"),I=H(S),O=T(),w=D("dt"),w.textContent=U,y=T(),x=D("dd"),A=H(j),this.h()},l(o){t=h(o,"DT",{"data-svelte-h":!0}),L(t)!=="svelte-1hraerq"&&(t.textContent=r),n=E(o),f=h(o,"DD",{class:!0});var u=P(f);m=J(u,a),u.forEach(e),b=E(o),v=h(o,"DT",{"data-svelte-h":!0}),L(v)!=="svelte-1mrsm3l"&&(v.textContent=M),g=E(o),$=h(o,"DD",{});var V=P($);l=J(V,_),V.forEach(e),c=E(o),C=h(o,"DT",{"data-svelte-h":!0}),L(C)!=="svelte-1vr10xe"&&(C.textContent=B),N=E(o),k=h(o,"DD",{});var K=P(k);I=J(K,S),K.forEach(e),O=E(o),w=h(o,"DT",{"data-svelte-h":!0}),L(w)!=="svelte-1bg1bjb"&&(w.textContent=U),y=E(o),x=h(o,"DD",{});var q=P(x);A=J(q,j),q.forEach(e),this.h()},h(){Q(f,"class","contest-type svelte-8g60fe")},m(o,u){i(o,t,u),i(o,n,u),i(o,f,u),R(f,m),i(o,b,u),i(o,v,u),i(o,g,u),i(o,$,u),R($,l),i(o,c,u),i(o,C,u),i(o,N,u),i(o,k,u),R(k,I),i(o,O,u),i(o,w,u),i(o,y,u),i(o,x,u),R(x,A)},p(o,u){u&1&&a!==(a=o[0].contest.contest+"")&&z(m,a),u&1&&_!==(_=o[0].contest.appeal+"")&&z(l,_),u&1&&S!==(S=o[0].contest.jam+"")&&z(I,S),u&1&&j!==(j=o[0].contest.effect+"")&&z(A,j)},d(o){o&&(e(t),e(n),e(f),e(b),e(v),e(g),e($),e(c),e(C),e(N),e(k),e(O),e(w),e(y),e(x))}}}function kt(d){let t,r,n,f,a,m,b,v,M;r=new dt({props:{$$slots:{default:[xt]},$$scope:{ctx:d}}}),a=new bt({props:{move:d[0]}});const g=d[1].extra,$=ct(g,d,d[2],rt);let _=d[0].contest&&_t(d);return{c(){t=D("section"),X(r.$$.fragment),n=T(),f=D("section"),X(a.$$.fragment),m=T(),$&&$.c(),b=T(),_&&_.c(),v=ot(),this.h()},l(l){t=h(l,"SECTION",{class:!0});var c=P(t);Y(r.$$.fragment,c),c.forEach(e),n=E(l),f=h(l,"SECTION",{class:!0});var C=P(f);Y(a.$$.fragment,C),C.forEach(e),m=E(l),$&&$.l(l),b=E(l),_&&_.l(l),v=ot(),this.h()},h(){Q(t,"class","info"),Q(f,"class","description")},m(l,c){i(l,t,c),Z(r,t,null),i(l,n,c),i(l,f,c),Z(a,f,null),i(l,m,c),$&&$.m(l,c),i(l,b,c),_&&_.m(l,c),i(l,v,c),M=!0},p(l,c){const C={};c&5&&(C.$$scope={dirty:c,ctx:l}),r.$set(C);const B={};c&1&&(B.move=l[0]),a.$set(B),$&&$.p&&(!M||c&4)&&mt($,g,l,l[2],M?$t(g,l[2],c,wt):pt(l[2]),rt),l[0].contest?_?(_.p(l,c),c&1&&F(_,1)):(_=_t(l),_.c(),F(_,1),_.m(v.parentNode,v)):_&&(Dt(),G(_,1,1,()=>{_=null}),ht())},i(l){M||(F(r.$$.fragment,l),F(a.$$.fragment,l),F($,l),F(_),M=!0)},o(l){G(r.$$.fragment,l),G(a.$$.fragment,l),G($,l),G(_),M=!1},d(l){l&&(e(t),e(n),e(f),e(m),e(b),e(v)),tt(r),tt(a),$&&$.d(l),_&&_.d(l)}}}function Mt(d){let t,r;return t=new Et({props:{slot:"header-extra",type:[d[0].type]}}),{c(){X(t.$$.fragment)},l(n){Y(t.$$.fragment,n)},m(n,f){Z(t,n,f),r=!0},p(n,f){const a={};f&1&&(a.type=[n[0].type]),t.$set(a)},i(n){r||(F(t.$$.fragment,n),r=!0)},o(n){G(t.$$.fragment,n),r=!1},d(n){tt(t,n)}}}function Pt(d){let t,r;return t=new Tt({props:{title:d[0].name,$$slots:{"header-extra":[Mt],default:[kt]},$$scope:{ctx:d}}}),{c(){X(t.$$.fragment)},l(n){Y(t.$$.fragment,n)},m(n,f){Z(t,n,f),r=!0},p(n,[f]){const a={};f&1&&(a.title=n[0].name),f&5&&(a.$$scope={dirty:f,ctx:n}),t.$set(a)},i(n){r||(F(t.$$.fragment,n),r=!0)},o(n){G(t.$$.fragment,n),r=!1},d(n){tt(t,n)}}}function St(d,t,r){let{$$slots:n={},$$scope:f}=t,{move:a}=t;return d.$$set=m=>{"move"in m&&r(0,a=m.move),"$$scope"in m&&r(2,f=m.$$scope)},[a,n,f]}class yt extends vt{constructor(t){super(),Ct(this,t,St,Pt,ut,{move:0})}}export{yt as P};
