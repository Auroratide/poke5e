function S(){}function rt(t,e){for(const n in e)t[n]=e[n];return t}function lt(t){return t&&typeof t=="object"&&typeof t.then=="function"}function V(t){return t()}function J(){return Object.create(null)}function $(t){t.forEach(V)}function X(t){return typeof t=="function"}function At(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let E;function St(t,e){return E||(E=document.createElement("a")),E.href=e,t===E.href}function ut(t){return Object.keys(t).length===0}function at(t,...e){if(t==null)return S;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Mt(t,e,n){t.$$.on_destroy.push(at(e,n))}function Ct(t,e,n,i){if(t){const s=Y(t,e,n,i);return t[0](s)}}function Y(t,e,n,i){return t[1]&&i?rt(n.ctx.slice(),t[1](i(e))):n.ctx}function Ht(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const r=[],c=Math.max(e.dirty.length,s.length);for(let a=0;a<c;a+=1)r[a]=e.dirty[a]|s[a];return r}return e.dirty|s}return e.dirty}function jt(t,e,n,i,s,r){if(s){const c=Y(e,n,i,r);t.p(c,s)}}function Dt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Lt(t){return t==null?"":t}let C=!1;function ot(){C=!0}function ft(){C=!1}function _t(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function dt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let u=0;u<e.length;u++){const _=e[u];_.claim_order!==void 0&&l.push(_)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let l=0;l<e.length;l++){const u=e[l].claim_order,_=(s>0&&e[n[s]].claim_order<=u?s+1:_t(1,s,o=>e[n[o]].claim_order,u))-1;i[l]=n[_]+1;const d=_+1;n[d]=l,s=Math.max(d,s)}const r=[],c=[];let a=e.length-1;for(let l=n[s]+1;l!=0;l=i[l-1]){for(r.push(e[l-1]);a>=l;a--)c.push(e[a]);a--}for(;a>=0;a--)c.push(e[a]);r.reverse(),c.sort((l,u)=>l.claim_order-u.claim_order);for(let l=0,u=0;l<c.length;l++){for(;u<r.length&&c[l].claim_order>=r[u].claim_order;)u++;const _=u<r.length?r[u]:null;t.insertBefore(c[l],_)}}function ht(t,e){if(C){for(dt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function mt(t,e,n){t.insertBefore(e,n||null)}function pt(t,e,n){C&&!n?ht(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function M(t){t.parentNode&&t.parentNode.removeChild(t)}function qt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function Z(t){return document.createElement(t)}function tt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function R(t){return document.createTextNode(t)}function Bt(){return R(" ")}function Pt(){return R("")}function Ot(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Gt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function Rt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function zt(t,e,n){const i=new Set;for(let s=0;s<t.length;s+=1)t[s].checked&&i.add(t[s].__value);return n||i.delete(e),Array.from(i)}function Ft(t){return t===""?null:+t}function yt(t){return Array.from(t.childNodes)}function et(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function nt(t,e,n,i,s=!1){et(t);const r=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const a=t[c];if(e(a)){const l=n(a);return l===void 0?t.splice(c,1):t[c]=l,s||(t.claim_info.last_index=c),a}}for(let c=t.claim_info.last_index-1;c>=0;c--){const a=t[c];if(e(a)){const l=n(a);return l===void 0?t.splice(c,1):t[c]=l,s?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,a}}return i()})();return r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,r}function it(t,e,n,i){return nt(t,s=>s.nodeName===e,s=>{const r=[];for(let c=0;c<s.attributes.length;c++){const a=s.attributes[c];n[a.name]||r.push(a.name)}r.forEach(c=>s.removeAttribute(c))},()=>i(e))}function It(t,e,n){return it(t,e,n,Z)}function Wt(t,e,n){return it(t,e,n,tt)}function gt(t,e){return nt(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>R(e),!0)}function Jt(t){return gt(t," ")}function K(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return t.length}function Kt(t,e){const n=K(t,"HTML_TAG_START",0),i=K(t,"HTML_TAG_END",n);if(n===i)return new Q(void 0,e);et(t);const s=t.splice(n,i-n+1);M(s[0]),M(s[s.length-1]);const r=s.slice(1,s.length-1);for(const c of r)c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new Q(r,e)}function Qt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Ut(t,e){t.value=e==null?"":e}function Vt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Xt(t,e){for(let n=0;n<t.options.length;n+=1){const i=t.options[n];if(i.__value===e){i.selected=!0;return}}t.selectedIndex=-1}function Yt(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}function Zt(t,e,n){t.classList[n?"add":"remove"](e)}function bt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function te(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const r=s.textContent.trim();r===`HEAD_${t}_END`?(i-=1,n.push(s)):r===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class xt{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=tt(n.nodeName):this.e=Z(n.nodeName),this.t=n,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)mt(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(M)}}class Q extends xt{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)pt(this.t,this.n[n],e)}}function ee(t,e){return new t(e)}let w;function g(t){w=t}function H(){if(!w)throw new Error("Function called outside component initialization");return w}function ne(t){H().$$.on_mount.push(t)}function ie(t){H().$$.after_update.push(t)}function se(){const t=H();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const r=bt(e,n,{cancelable:i});return s.slice().forEach(c=>{c.call(t,r)}),!r.defaultPrevented}return!0}}function ce(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const x=[],U=[],T=[],P=[],st=Promise.resolve();let O=!1;function ct(){O||(O=!0,st.then(z))}function re(){return ct(),st}function G(t){T.push(t)}function le(t){P.push(t)}const B=new Set;let N=0;function z(){const t=w;do{for(;N<x.length;){const e=x[N];N++,g(e),wt(e.$$)}for(g(null),x.length=0,N=0;U.length;)U.pop()();for(let e=0;e<T.length;e+=1){const n=T[e];B.has(n)||(B.add(n),n())}T.length=0}while(x.length);for(;P.length;)P.pop()();O=!1,B.clear(),g(t)}function wt(t){if(t.fragment!==null){t.update(),$(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(G)}}const A=new Set;let b;function $t(){b={r:0,c:[],p:b}}function vt(){b.r||$(b.c),b=b.p}function F(t,e){t&&t.i&&(A.delete(t),t.i(e))}function kt(t,e,n,i){if(t&&t.o){if(A.has(t))return;A.add(t),b.c.push(()=>{A.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function ue(t,e){const n=e.token={};function i(s,r,c,a){if(e.token!==n)return;e.resolved=a;let l=e.ctx;c!==void 0&&(l=l.slice(),l[c]=a);const u=s&&(e.current=s)(l);let _=!1;e.block&&(e.blocks?e.blocks.forEach((d,o)=>{o!==r&&d&&($t(),kt(d,1,1,()=>{e.blocks[o]===d&&(e.blocks[o]=null)}),vt())}):e.block.d(1),u.c(),F(u,1),u.m(e.mount(),e.anchor),_=!0),e.block=u,e.blocks&&(e.blocks[r]=u),_&&z()}if(lt(t)){const s=H();if(t.then(r=>{g(s),i(e.then,1,e.value,r),g(null)},r=>{if(g(s),i(e.catch,2,e.error,r),g(null),!e.hasCatch)throw r}),e.current!==e.pending)return i(e.pending,0),!0}else{if(e.current!==e.then)return i(e.then,1,e.value,t),!0;e.resolved=t}}function ae(t,e,n){const i=e.slice(),{resolved:s}=t;t.current===t.then&&(i[t.value]=s),t.current===t.catch&&(i[t.error]=s),t.block.p(i,n)}function oe(t,e){t.d(1),e.delete(t.key)}function fe(t,e,n,i,s,r,c,a,l,u,_,d){let o=t.length,m=r.length,h=o;const j={};for(;h--;)j[t[h].key]=h;const v=[],D=new Map,L=new Map;for(h=m;h--;){const f=d(s,r,h),p=n(f);let y=c.get(p);y?i&&y.p(f,e):(y=u(p,f),y.c()),D.set(p,v[h]=y),p in j&&L.set(p,Math.abs(h-j[p]))}const I=new Set,W=new Set;function q(f){F(f,1),f.m(a,_),c.set(f.key,f),_=f.first,m--}for(;o&&m;){const f=v[m-1],p=t[o-1],y=f.key,k=p.key;f===p?(_=f.first,o--,m--):D.has(k)?!c.has(y)||I.has(y)?q(f):W.has(k)?o--:L.get(y)>L.get(k)?(W.add(y),q(f)):(I.add(k),o--):(l(p,c),o--)}for(;o--;){const f=t[o];D.has(f.key)||l(f,c)}for(;m;)q(v[m-1]);return v}function _e(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function de(t){t&&t.c()}function he(t,e){t&&t.l(e)}function Et(t,e,n,i){const{fragment:s,after_update:r}=t.$$;s&&s.m(e,n),i||G(()=>{const c=t.$$.on_mount.map(V).filter(X);t.$$.on_destroy?t.$$.on_destroy.push(...c):$(c),t.$$.on_mount=[]}),r.forEach(G)}function Nt(t,e){const n=t.$$;n.fragment!==null&&($(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Tt(t,e){t.$$.dirty[0]===-1&&(x.push(t),ct(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function me(t,e,n,i,s,r,c,a=[-1]){const l=w;g(t);const u=t.$$={fragment:null,ctx:[],props:r,update:S,not_equal:s,bound:J(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:J(),dirty:a,skip_bound:!1,root:e.target||l.$$.root};c&&c(u.root);let _=!1;if(u.ctx=n?n(t,e.props||{},(d,o,...m)=>{const h=m.length?m[0]:o;return u.ctx&&s(u.ctx[d],u.ctx[d]=h)&&(!u.skip_bound&&u.bound[d]&&u.bound[d](h),_&&Tt(t,d)),o}):[],u.update(),_=!0,$(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){ot();const d=yt(e.target);u.fragment&&u.fragment.l(d),d.forEach(M)}else u.fragment&&u.fragment.c();e.intro&&F(t.$$.fragment),Et(t,e.target,e.anchor,e.customElement),ft(),z()}g(l)}class pe{$destroy(){Nt(this,1),this.$destroy=S}$on(e,n){if(!X(n))return S;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!ut(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{ce as $,re as A,S as B,Ct as C,jt as D,Dt as E,Ht as F,ht as G,Zt as H,Ot as I,$ as J,X as K,St as L,Mt as M,te as N,tt as O,Wt as P,U as Q,_e as R,pe as S,le as T,fe as U,qt as V,oe as W,Ut as X,Q as Y,Kt as Z,Lt as _,Bt as a,Gt as a0,se as a1,at as a2,G as a3,Xt as a4,Yt as a5,Ft as a6,zt as a7,ue as a8,ae as a9,pt as b,Jt as c,vt as d,Pt as e,F as f,$t as g,M as h,me as i,ie as j,Z as k,It as l,yt as m,Rt as n,ne as o,Vt as p,R as q,gt as r,At as s,kt as t,Qt as u,ee as v,de as w,he as x,Et as y,Nt as z};
