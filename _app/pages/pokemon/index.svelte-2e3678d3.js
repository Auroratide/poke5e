import{M as g,S as h,i as w,s as y,w as c,k as v,x as l,m as x,y as u,g as T,q as $,o as _,B as k,d as b}from"../../chunks/paths-a68037f4.js";import{L,P as j}from"../../chunks/_layout-bc8a00f4.js";import{T as q}from"../../chunks/Title-d04f9dab.js";import"../../chunks/Loader-b8e6e374.js";import"../../chunks/Pokeball-c6cd3b66.js";import"../../chunks/store-881072a6.js";import"../../chunks/index-616296c3.js";function P(i){let e,o;return e=new j({props:{slot:"list",pokemons:i[0]}}),{c(){c(e.$$.fragment)},l(t){l(e.$$.fragment,t)},m(t,s){u(e,t,s),o=!0},p(t,s){const n={};s&1&&(n.pokemons=t[0]),e.$set(n)},i(t){o||($(e.$$.fragment,t),o=!0)},o(t){_(e.$$.fragment,t),o=!1},d(t){k(e,t)}}}function S(i){let e,o,t,s;return e=new q({props:{value:"Pokemon"}}),t=new L({props:{$$slots:{list:[P]},$$scope:{ctx:i}}}),{c(){c(e.$$.fragment),o=v(),c(t.$$.fragment)},l(n){l(e.$$.fragment,n),o=x(n),l(t.$$.fragment,n)},m(n,a){u(e,n,a),T(n,o,a),u(t,n,a),s=!0},p(n,[a]){const m={};a&3&&(m.$$scope={dirty:a,ctx:n}),t.$set(m)},i(n){s||($(e.$$.fragment,n),$(t.$$.fragment,n),s=!0)},o(n){_(e.$$.fragment,n),_(t.$$.fragment,n),s=!1},d(n){k(e,n),n&&b(o),k(t,n)}}}var B=globalThis&&globalThis.__awaiter||function(i,e,o,t){function s(n){return n instanceof o?n:new o(function(a){a(n)})}return new(o||(o=Promise))(function(n,a){function m(r){try{p(t.next(r))}catch(f){a(f)}}function d(r){try{p(t.throw(r))}catch(f){a(f)}}function p(r){r.done?n(r.value):s(r.value).then(m,d)}p((t=t.apply(i,e||[])).next())})};const H=({fetch:i})=>B(void 0,void 0,void 0,function*(){return{props:{pokemon:yield i(`${g}/pokemon.json`).then(o=>o.json()).then(o=>o.items)}}});function C(i,e,o){let{pokemon:t}=e;return i.$$set=s=>{"pokemon"in s&&o(0,t=s.pokemon)},[t]}class I extends h{constructor(e){super(),w(this,e,C,S,y,{pokemon:0})}}export{I as default,H as load};
