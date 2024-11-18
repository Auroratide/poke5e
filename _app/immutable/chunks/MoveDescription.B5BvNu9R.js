import{s as $,d as p,q as C,i as m,a as h,e as d,f as q,j as w,g as T,l as c,t as M,b as H,c as _,F as L,y as g,k as v,H as j,n as b}from"./scheduler.BW_gkbS3.js";import{S as P,i as S}from"./index.B_7VoAXG.js";const D=s=>`<p>${s}</p>`,E=s=>`<table>
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
</table>`,u=s=>s.map(e=>typeof e=="string"?D(e):typeof e=="object"&&e.type==="table"?E(e):"").join("");function k(s){let e,n,r="At Higher Levels: ",a=s[0].higherLevels+"",o;return{c(){e=c("p"),n=c("strong"),n.textContent=r,o=M(a)},l(l){e=d(l,"P",{});var t=q(e);n=d(t,"STRONG",{"data-svelte-h":!0}),w(n)!=="svelte-17klq0x"&&(n.textContent=r),o=T(t,a),t.forEach(p)},m(l,t){m(l,e,t),h(e,n),h(e,o)},p(l,t){t&1&&a!==(a=l[0].higherLevels+"")&&C(o,a)},d(l){l&&p(e)}}}function y(s){let e,n="<strong>Optional Rules:</strong>",r,a,o=u(s[0].optional)+"",l;return{c(){e=c("p"),e.innerHTML=n,r=v(),a=new j(!1),l=g(),this.h()},l(t){e=d(t,"P",{class:!0,"data-svelte-h":!0}),w(e)!=="svelte-1pn6rgc"&&(e.innerHTML=n),r=_(t),a=L(t,!1),l=g(),this.h()},h(){H(e,"class","optional-heading svelte-wqkufq"),a.a=l},m(t,i){m(t,e,i),m(t,r,i),a.m(o,t,i),m(t,l,i)},p(t,i){i&1&&o!==(o=u(t[0].optional)+"")&&a.p(o)},d(t){t&&(p(e),p(r),p(l),a.d())}}}function O(s){let e,n,r=u(s[0].description)+"",a,o,l=s[0].higherLevels!==void 0&&k(s),t=s[0].optional!==void 0&&y(s);return{c(){e=c("div"),n=new j(!1),a=v(),l&&l.c(),o=v(),t&&t.c(),this.h()},l(i){e=d(i,"DIV",{class:!0});var f=q(e);n=L(f,!1),a=_(f),l&&l.l(f),o=_(f),t&&t.l(f),f.forEach(p),this.h()},h(){n.a=a,H(e,"class","description svelte-wqkufq")},m(i,f){m(i,e,f),n.m(r,e),h(e,a),l&&l.m(e,null),h(e,o),t&&t.m(e,null)},p(i,[f]){f&1&&r!==(r=u(i[0].description)+"")&&n.p(r),i[0].higherLevels!==void 0?l?l.p(i,f):(l=k(i),l.c(),l.m(e,o)):l&&(l.d(1),l=null),i[0].optional!==void 0?t?t.p(i,f):(t=y(i),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},i:b,o:b,d(i){i&&p(e),l&&l.d(),t&&t.d()}}}function R(s,e,n){let{move:r}=e;return s.$$set=a=>{"move"in a&&n(0,r=a.move)},[r]}class G extends P{constructor(e){super(),S(this,e,R,O,$,{move:0})}}export{G as M};
