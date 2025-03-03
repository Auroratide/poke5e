import{s as T,n as g,d as p,i as h,b as m,e as w,f as d,h as y,T as L,c as _,j as c,U as j,a as v,q as $,g as H,k as C,t as M,v as b}from"./H7NYa443.js";import{S as P,i as S}from"./DYRzBe43.js";const D=s=>`<p>${s}</p>`,E=s=>`<table>
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
</table>`,u=s=>s.map(e=>typeof e=="string"?D(e):typeof e=="object"&&e.type==="table"?E(e):"").join("");function k(s){let e,n,r="At Higher Levels: ",a=s[0].higherLevels+"",o;return{c(){e=c("p"),n=c("strong"),n.textContent=r,o=M(a)},l(l){e=d(l,"P",{});var t=y(e);n=d(t,"STRONG",{"data-svelte-h":!0}),H(n)!=="svelte-17klq0x"&&(n.textContent=r),o=C(t,a),t.forEach(p)},m(l,t){h(l,e,t),m(e,n),m(e,o)},p(l,t){t&1&&a!==(a=l[0].higherLevels+"")&&$(o,a)},d(l){l&&p(e)}}}function q(s){let e,n="<strong>Optional Rules:</strong>",r,a,o=u(s[0].optional)+"",l;return{c(){e=c("p"),e.innerHTML=n,r=v(),a=new j(!1),l=b(),this.h()},l(t){e=d(t,"P",{class:!0,"data-svelte-h":!0}),H(e)!=="svelte-1pn6rgc"&&(e.innerHTML=n),r=_(t),a=L(t,!1),l=b(),this.h()},h(){w(e,"class","optional-heading svelte-wqkufq"),a.a=l},m(t,i){h(t,e,i),h(t,r,i),a.m(o,t,i),h(t,l,i)},p(t,i){i&1&&o!==(o=u(t[0].optional)+"")&&a.p(o)},d(t){t&&(p(e),p(r),p(l),a.d())}}}function O(s){let e,n,r=u(s[0].description)+"",a,o,l=s[0].higherLevels!==void 0&&k(s),t=s[0].optional!==void 0&&q(s);return{c(){e=c("div"),n=new j(!1),a=v(),l&&l.c(),o=v(),t&&t.c(),this.h()},l(i){e=d(i,"DIV",{class:!0});var f=y(e);n=L(f,!1),a=_(f),l&&l.l(f),o=_(f),t&&t.l(f),f.forEach(p),this.h()},h(){n.a=a,w(e,"class","description svelte-wqkufq")},m(i,f){h(i,e,f),n.m(r,e),m(e,a),l&&l.m(e,null),m(e,o),t&&t.m(e,null)},p(i,[f]){f&1&&r!==(r=u(i[0].description)+"")&&n.p(r),i[0].higherLevels!==void 0?l?l.p(i,f):(l=k(i),l.c(),l.m(e,o)):l&&(l.d(1),l=null),i[0].optional!==void 0?t?t.p(i,f):(t=q(i),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},i:g,o:g,d(i){i&&p(e),l&&l.d(),t&&t.d()}}}function R(s,e,n){let{move:r}=e;return s.$$set=a=>{"move"in a&&n(0,r=a.move)},[r]}class I extends P{constructor(e){super(),S(this,e,R,O,T,{move:0})}}export{I as M};
