import{s as x}from"./BA5BowaZ.js";import{S as w,i as g,s as d,d as k,t as b,a as E,m as B,c as L,b as I,u as Q,f as c,g as p,l as e,v as h,o as _,w as y,x as f,y as v}from"./B-p2TLsN.js";import"./BxlXVsHr.js";import{I as S}from"./DcPBeMDN.js";function $(u,a){return async(...n)=>{try{await a(...n)}catch{}}}const j=$("create_pageview_event",async u=>{await x.rpc("create_pageview_event",{_path:u})}),z=$("create_pageview_event",async u=>{await x.rpc("create_pageview_event",{_path:`/backups/${u}`})});function q(u){let a,n,t,o,s,m,i;return{c(){a=f("path"),n=v(),t=f("rect"),o=v(),s=f("rect"),m=v(),i=f("line"),this.h()},l(r){a=h(r,"path",{class:!0,d:!0}),_(a).forEach(c),n=y(r),t=h(r,"rect",{class:!0,width:!0,height:!0,x:!0,y:!0,rx:!0,ry:!0}),_(t).forEach(c),o=y(r),s=h(r,"rect",{class:!0,width:!0,height:!0,x:!0,y:!0,rx:!0,ry:!0}),_(s).forEach(c),m=y(r),i=h(r,"line",{class:!0,x1:!0,y1:!0,x2:!0,y2:!0}),_(i).forEach(c),this.h()},h(){e(a,"class","stroke main-body"),e(a,"d",`
		M 20 15
		L 70 15
		L 85 30
		L 85 80
		Q 85 85 80 85
		L 20 85
		Q 15 85 15 80
		L 15 20
		Q 15 15 20 15
		Z
	`),e(t,"class","stroke thin top"),e(t,"width","35"),e(t,"height","28"),e(t,"x","32.5"),e(t,"y","15"),e(t,"rx","2.5"),e(t,"ry","2.5"),e(s,"class","stroke thin bottom"),e(s,"width","45"),e(s,"height","28"),e(s,"x","27.5"),e(s,"y","57"),e(s,"rx","2.5"),e(s,"ry","2.5"),e(i,"class","stroke"),e(i,"x1","58"),e(i,"y1","22"),e(i,"x2","58"),e(i,"y2","36")},m(r,l){p(r,a,l),p(r,n,l),p(r,t,l),p(r,o,l),p(r,s,l),p(r,m,l),p(r,i,l)},p:Q,d(r){r&&(c(a),c(n),c(t),c(o),c(s),c(m),c(i))}}}function C(u){let a,n;return a=new S({props:{title:"Backup",$$slots:{default:[q]},$$scope:{ctx:u}}}),{c(){I(a.$$.fragment)},l(t){L(a.$$.fragment,t)},m(t,o){B(a,t,o),n=!0},p(t,[o]){const s={};o&1&&(s.$$scope={dirty:o,ctx:t}),a.$set(s)},i(t){n||(E(a.$$.fragment,t),n=!0)},o(t){b(a.$$.fragment,t),n=!1},d(t){k(a,t)}}}class A extends w{constructor(a){super(),g(this,a,null,C,d,{})}}export{A as B,z as a,j as c};
