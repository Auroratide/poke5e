import{s as $,e as h,J as w,a as _,b as d,f as L,K as j,c as v,d as p,j as q,k as m,l as c,n as g,t as C,i as H,g as T,y as M,u as b}from"./scheduler.DHCSneAP.js";import{S as P,i as S}from"./index.1NXkYVa0.js";const D=s=>`<p>${s}</p>`,E=s=>`<table>
	<thead>
		<tr>
			${s.headers.map(e=>`<th>${e}</th>`).join("")}
		</tr>
	</thead>
	<tbody>
		${s.rows.map(e=>`<tr>
			${e.map(n=>`<td>${n}</td>`).join("")}
		</tr>`).join("")}
	</tbody>
</table>`,u=s=>s.map(e=>typeof e=="string"?D(e):typeof e=="object"&&e.type==="table"?E(e):"").join("");function k(s){let e,n,r="At Higher Levels: ",a=s[0].higherLevels+"",o;return{c(){e=h("p"),n=h("strong"),n.textContent=r,o=C(a)},l(l){e=d(l,"P",{});var t=L(e);n=d(t,"STRONG",{"data-svelte-h":!0}),H(n)!=="svelte-17klq0x"&&(n.textContent=r),o=T(t,a),t.forEach(p)},m(l,t){m(l,e,t),c(e,n),c(e,o)},p(l,t){t&1&&a!==(a=l[0].higherLevels+"")&&M(o,a)},d(l){l&&p(e)}}}function y(s){let e,n="<strong>Optional Rules:</strong>",r,a,o=u(s[0].optional)+"",l;return{c(){e=h("p"),e.innerHTML=n,r=_(),a=new w(!1),l=b(),this.h()},l(t){e=d(t,"P",{class:!0,"data-svelte-h":!0}),H(e)!=="svelte-1pn6rgc"&&(e.innerHTML=n),r=v(t),a=j(t,!1),l=b(),this.h()},h(){q(e,"class","optional-heading svelte-wqkufq"),a.a=l},m(t,i){m(t,e,i),m(t,r,i),a.m(o,t,i),m(t,l,i)},p(t,i){i&1&&o!==(o=u(t[0].optional)+"")&&a.p(o)},d(t){t&&(p(e),p(r),p(l),a.d())}}}function O(s){let e,n,r=u(s[0].description)+"",a,o,l=s[0].higherLevels!==void 0&&k(s),t=s[0].optional!==void 0&&y(s);return{c(){e=h("div"),n=new w(!1),a=_(),l&&l.c(),o=_(),t&&t.c(),this.h()},l(i){e=d(i,"DIV",{class:!0});var f=L(e);n=j(f,!1),a=v(f),l&&l.l(f),o=v(f),t&&t.l(f),f.forEach(p),this.h()},h(){n.a=a,q(e,"class","description svelte-wqkufq")},m(i,f){m(i,e,f),n.m(r,e),c(e,a),l&&l.m(e,null),c(e,o),t&&t.m(e,null)},p(i,[f]){f&1&&r!==(r=u(i[0].description)+"")&&n.p(r),i[0].higherLevels!==void 0?l?l.p(i,f):(l=k(i),l.c(),l.m(e,o)):l&&(l.d(1),l=null),i[0].optional!==void 0?t?t.p(i,f):(t=y(i),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},i:g,o:g,d(i){i&&p(e),l&&l.d(),t&&t.d()}}}function R(s,e,n){let{move:r}=e;return s.$$set=a=>{"move"in a&&n(0,r=a.move)},[r]}class I extends P{constructor(e){super(),S(this,e,R,O,$,{move:0})}}export{I as M};
