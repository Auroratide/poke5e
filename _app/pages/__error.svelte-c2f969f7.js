import{S as G,i as H,s as J,w as L,k as b,e as g,t as k,x as W,m as E,c as d,a as v,h as T,d as p,b as o,P as z,y as D,g as B,J as r,j as C,q as F,o as K,B as O}from"../chunks/vendor-10d0c3ca.js";import{a as Q,b as R}from"../chunks/paths-396f020f.js";import{T as U}from"../chunks/Title-9a8b162d.js";function V(l){let a,m,t,n,i,q,u,y,A,c,I,M,_,P,f,w,h;return a=new U({}),{c(){L(a.$$.fragment),m=b(),t=g("main"),n=g("h1"),i=k(l[0]),q=b(),u=g("p"),y=k(l[1]),A=b(),c=g("img"),M=b(),_=g("p"),P=k("Try "),f=g("a"),w=k("returning to the home page."),this.h()},l(e){W(a.$$.fragment,e),m=E(e),t=d(e,"MAIN",{class:!0});var s=v(t);n=d(s,"H1",{class:!0});var N=v(n);i=T(N,l[0]),N.forEach(p),q=E(s),u=d(s,"P",{class:!0});var S=v(u);y=T(S,l[1]),S.forEach(p),A=E(s),c=d(s,"IMG",{class:!0,src:!0,alt:!0}),M=E(s),_=d(s,"P",{class:!0});var x=v(_);P=T(x,"Try "),f=d(x,"A",{href:!0});var j=v(f);w=T(j,"returning to the home page."),j.forEach(p),x.forEach(p),s.forEach(p),this.h()},h(){o(n,"class","svelte-15dem8p"),o(u,"class","svelte-15dem8p"),o(c,"class","missingno svelte-15dem8p"),z(c.src,I=Q+"/missingno.png")||o(c,"src",I),o(c,"alt","a nearly random assortment of purple, pink, and black pixels"),o(f,"href",R),o(_,"class","svelte-15dem8p"),o(t,"class","svelte-15dem8p")},m(e,s){D(a,e,s),B(e,m,s),B(e,t,s),r(t,n),r(n,i),r(t,q),r(t,u),r(u,y),r(t,A),r(t,c),r(t,M),r(t,_),r(_,P),r(_,f),r(f,w),h=!0},p(e,[s]){(!h||s&1)&&C(i,e[0]),(!h||s&2)&&C(y,e[1])},i(e){h||(F(a.$$.fragment,e),h=!0)},o(e){K(a.$$.fragment,e),h=!1},d(e){O(a,e),e&&p(m),e&&p(t)}}}const ee=async({status:l})=>l===404?{props:{title:"MissingNo.",message:"Looks like there's nothing here!"}}:{props:{title:"We're sorry!",message:"A problem seems to have occurred."}};function X(l,a,m){let{title:t}=a,{message:n}=a;return l.$$set=i=>{"title"in i&&m(0,t=i.title),"message"in i&&m(1,n=i.message)},[t,n]}class te extends G{constructor(a){super();H(this,a,X,V,J,{title:0,message:1})}}export{te as default,ee as load};