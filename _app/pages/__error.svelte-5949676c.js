import{S as F,i as G,s as H,w as R,k,e as w,t as E,x as W,m as x,c as b,a as T,h as M,d as h,b as u,R as z,y as D,g as B,L as i,j as C,q as J,o as K,B as O,F as P,M as Q}from"../chunks/paths-a68037f4.js";import{T as U}from"../chunks/Title-d04f9dab.js";function V(o){let r,l,e,c,s,m,f,d,_,a,g,q,p,A,v,I,y;return r=new U({}),{c(){R(r.$$.fragment),l=k(),e=w("main"),c=w("h1"),s=E(o[0]),m=k(),f=w("p"),d=E(o[1]),_=k(),a=w("img"),q=k(),p=w("p"),A=E("Try "),v=w("a"),I=E("returning to the home page."),this.h()},l(t){W(r.$$.fragment,t),l=x(t),e=b(t,"MAIN",{class:!0});var n=T(e);c=b(n,"H1",{class:!0});var N=T(c);s=M(N,o[0]),N.forEach(h),m=x(n),f=b(n,"P",{class:!0});var S=T(f);d=M(S,o[1]),S.forEach(h),_=x(n),a=b(n,"IMG",{class:!0,src:!0,alt:!0}),q=x(n),p=b(n,"P",{class:!0});var L=T(p);A=M(L,"Try "),v=b(L,"A",{href:!0});var j=T(v);I=M(j,"returning to the home page."),j.forEach(h),L.forEach(h),n.forEach(h),this.h()},h(){u(c,"class","svelte-15dem8p"),u(f,"class","svelte-15dem8p"),u(a,"class","missingno svelte-15dem8p"),z(a.src,g=P+"/missingno.png")||u(a,"src",g),u(a,"alt","a nearly random assortment of purple, pink, and black pixels"),u(v,"href",Q),u(p,"class","svelte-15dem8p"),u(e,"class","svelte-15dem8p")},m(t,n){D(r,t,n),B(t,l,n),B(t,e,n),i(e,c),i(c,s),i(e,m),i(e,f),i(f,d),i(e,_),i(e,a),i(e,q),i(e,p),i(p,A),i(p,v),i(v,I),y=!0},p(t,[n]){(!y||n&1)&&C(s,t[0]),(!y||n&2)&&C(d,t[1])},i(t){y||(J(r.$$.fragment,t),y=!0)},o(t){K(r.$$.fragment,t),y=!1},d(t){O(r,t),t&&h(l),t&&h(e)}}}var X=globalThis&&globalThis.__awaiter||function(o,r,l,e){function c(s){return s instanceof l?s:new l(function(m){m(s)})}return new(l||(l=Promise))(function(s,m){function f(a){try{_(e.next(a))}catch(g){m(g)}}function d(a){try{_(e.throw(a))}catch(g){m(g)}}function _(a){a.done?s(a.value):c(a.value).then(f,d)}_((e=e.apply(o,r||[])).next())})};const ee=({status:o})=>X(void 0,void 0,void 0,function*(){return o===404?{props:{title:"MissingNo.",message:"Looks like there's nothing here!"}}:{props:{title:"We're sorry!",message:"A problem seems to have occurred."}}});function Y(o,r,l){let{title:e}=r,{message:c}=r;return o.$$set=s=>{"title"in s&&l(0,e=s.title),"message"in s&&l(1,c=s.message)},[e,c]}class te extends F{constructor(r){super(),G(this,r,Y,V,H,{title:0,message:1})}}export{te as default,ee as load};
