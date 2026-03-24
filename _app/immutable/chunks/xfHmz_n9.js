var V=Object.defineProperty;var j=a=>{throw TypeError(a)};var W=(a,n,t)=>n in a?V(a,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[n]=t;var c=(a,n,t)=>W(a,typeof n!="symbol"?n+"":n,t),J=(a,n,t)=>n.has(a)||j("Cannot "+t);var s=(a,n,t)=>(J(a,n,"read from private field"),t?t.call(a):n.get(a)),o=(a,n,t)=>n.has(a)?j("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(a):n.set(a,t),u=(a,n,t,e)=>(J(a,n,"write to private field"),e?e.call(a,t):n.set(a,t),t);const Z="change",I="commit",_=(a,n,t)=>new CustomEvent(Z,{detail:{item:a,oldIndex:n,newIndex:t}}),Q=(a,n,t)=>new CustomEvent(I,{detail:{item:a,oldIndex:n,newIndex:t}});var y,D;const g=class g extends HTMLElement{constructor(){super();c(this,"list",()=>this.closest(E.defaultElementName));c(this,"item",()=>this.closest(m.defaultElementName));o(this,y,t=>{t.target instanceof HTMLElement&&t.target.dataset.ignoreReorder!=null||(t.preventDefault(),t.stopPropagation(),this.item().startDragging())});o(this,D,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=g.css;const i=document.createElement("template");return i.innerHTML=g.html,t.appendChild(e),t.appendChild(i.content),t});s(this,D).call(this)}connectedCallback(){this.addEventListener("pointerdown",s(this,y))}};y=new WeakMap,D=new WeakMap,c(g,"defaultElementName","reorder-handle"),c(g,"html",`
		<slot></slot>
	`),c(g,"css",`
		:host {
			display: inline-block;
			touch-action: none;
			cursor: grab;
		}
		
		:host([data-dragging]) {
			cursor: grabbing;
		}
	`);let b=g;var f,C,A,L,N,M,k,O,p,T,w,S,H,P,F;const h=class h extends HTMLElement{constructor(){super();o(this,f,!1);o(this,C,new MutationObserver(()=>{s(this,A).call(this)}));c(this,"list",()=>this.closest(E.defaultElementName));c(this,"handles",()=>this.querySelectorAll(b.defaultElementName));c(this,"startDragging",()=>{this.list().changeFocus(this);for(const i of this.handles())i.dataset.dragging="";const t=setTimeout(()=>s(this,N).call(this),h.START_DRAG_DELAY_MS),e=()=>{clearTimeout(t),document.removeEventListener("pointerup",e),document.removeEventListener("pointercancel",e),document.removeEventListener("contextmenu",e)};document.addEventListener("pointerup",e),document.addEventListener("pointercancel",e),document.addEventListener("contextmenu",e)});o(this,A,()=>{const t=this.handles().length>0;(this.dataset.hasHandle||!s(this,f))&&!t&&(delete this.dataset.hasHandle,this.addEventListener("pointerdown",s(this,L))),(!this.dataset.hasHandle||!s(this,f))&&t&&(this.dataset.hasHandle="",this.removeEventListener("pointerdown",s(this,L))),u(this,f,!0)});o(this,L,t=>{t.target instanceof HTMLElement&&t.target.dataset.ignoreReorder!=null||(t.preventDefault(),t.stopPropagation(),this.startDragging())});o(this,N,t=>{t==null||t.preventDefault(),this.dataset.dragging="",s(this,S).call(this),document.addEventListener("pointermove",s(this,M)),document.addEventListener("pointerup",s(this,p)),document.addEventListener("pointercancel",s(this,p)),document.addEventListener("touchmove",s(this,T))});o(this,M,t=>{var $,K;t.preventDefault();const e=this.list(),i=e.items(),r={index:i.indexOf(this),rect:this.getBoundingClientRect()},l={index:r.index-1,rect:($=i[r.index-1])==null?void 0:$.getBoundingClientRect()},X={index:r.index+1,rect:(K=i[r.index+1])==null?void 0:K.getBoundingClientRect()};l.rect&&s(this,k).call(this,t,l.rect,r.rect)?e.reorder(r.index,l.index,i):X.rect&&s(this,O).call(this,t,X.rect,r.rect)&&e.reorder(r.index,X.index,i)});o(this,k,(t,e,i)=>this.list().orientation==="horizontal"?t.clientX<Math.min(e.left+i.width,e.right):t.clientY<Math.min(e.top+i.height,e.bottom));o(this,O,(t,e,i)=>this.list().orientation==="horizontal"?t.clientX>Math.max(e.right-i.width,e.left):t.clientY>Math.max(e.bottom-i.height,e.top));o(this,p,()=>{delete this.dataset.dragging;for(const t of this.handles())delete t.dataset.dragging;document.removeEventListener("pointermove",s(this,M)),document.removeEventListener("pointerup",s(this,p)),document.removeEventListener("pointercancel",s(this,p)),document.removeEventListener("touchmove",s(this,T)),s(this,H).call(this)});o(this,T,t=>{t.preventDefault()});o(this,w);o(this,S,()=>{u(this,w,this.list().items().indexOf(this))});o(this,H,()=>{const t=this.list(),e=t.items().indexOf(this);t.dispatchEvent(Q(this,s(this,w),e)),u(this,w,void 0)});o(this,P,()=>{const t=this.list().items(),e=t.find(i=>i.getAttribute("aria-selected")==="true")==null;this===t[0]&&e?this.setAttribute("aria-selected","true"):this.setAttribute("aria-selected","false")});o(this,F,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=h.css;const i=document.createElement("template");return i.innerHTML=h.html,t.appendChild(e),t.appendChild(i.content),t});s(this,F).call(this)}static get observedAttributes(){return["aria-selected"]}connectedCallback(){this.setAttribute("role","option"),this.hasAttribute("aria-selected")||s(this,P).call(this),s(this,C).observe(this,{attributes:!1,childList:!0,subtree:!0}),s(this,A).call(this)}disconnectedCallback(){s(this,C).disconnect(),u(this,f,!1)}attributeChangedCallback(){this.setAttribute("tabindex",this.getAttribute("aria-selected")==="true"?"0":"-1")}};f=new WeakMap,C=new WeakMap,A=new WeakMap,L=new WeakMap,N=new WeakMap,M=new WeakMap,k=new WeakMap,O=new WeakMap,p=new WeakMap,T=new WeakMap,w=new WeakMap,S=new WeakMap,H=new WeakMap,P=new WeakMap,F=new WeakMap,c(h,"defaultElementName","reorder-item"),c(h,"html",`
		<slot></slot>
	`),c(h,"css",`
		:host {
			display: list-item;
			touch-action: none;
			cursor: grab;
		}

		:host([data-has-handle]) {
			cursor: auto;
			touch-action: auto;
		}
		
		:host([data-dragging]) {
			opacity: 0.5;
			cursor: grabbing;
		}
	`),c(h,"START_DRAG_DELAY_MS",150);let m=h;var B,x,z,v,Y,q,G,U,R;const d=class d extends HTMLElement{constructor(){super();o(this,B,{orientation:()=>{s(this,U).call(this)}});c(this,"items",()=>Array.from(this.querySelectorAll(`:scope > ${m.defaultElementName}`)));c(this,"current",()=>this.querySelector(`:scope > ${m.defaultElementName}[tabindex="0"]`));c(this,"reorder",(t,e,i=this.items())=>{const r=i[t];t<e?i[e].after(r):this.insertBefore(r,i[e]),this.dispatchEvent(_(r,t,e)),i[t].focus()});c(this,"changeFocus",(t,e=this.items())=>{e.forEach(i=>{i.setAttribute("aria-selected","false")}),t.setAttribute("aria-selected","true"),t.focus()});o(this,x);o(this,z,t=>{const e=s(this,G).call(this);if(e.includes(t.key)){const i=this.items();i.indexOf(this.current());let r=i.indexOf(this.current());r<0&&(r=0);const l=Math.max(0,Math.min(i.length-1,r+(t.key===e[0]?-1:1)));t.altKey&&r!==l?(t.preventDefault(),t.stopPropagation(),window.clearTimeout(s(this,x)??-1),s(this,Y).call(this),this.reorder(r,l,i),u(this,x,window.setTimeout(s(this,q),d.COMMIT_DEBOUNCE_MS))):r!==l&&(t.preventDefault(),t.stopPropagation(),this.changeFocus(i[l],i))}});o(this,v);o(this,Y,()=>{s(this,v)==null&&u(this,v,this.items().indexOf(this.current()))});o(this,q,()=>{const t=this.current(),e=this.items().indexOf(this.current());this.dispatchEvent(Q(t,s(this,v),e)),u(this,v,void 0)});o(this,G,()=>this.orientation==="horizontal"?["ArrowLeft","ArrowRight"]:["ArrowUp","ArrowDown"]);o(this,U,()=>{this.setAttribute("aria-orientation",this.orientation)});o(this,R,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=d.css;const i=document.createElement("template");return i.innerHTML=d.html,t.appendChild(e),t.appendChild(i.content),t});s(this,R).call(this)}static get observedAttributes(){return["orientation"]}get orientation(){return this.getAttribute("orientation")??"vertical"}set orientation(t){this.setAttribute("orientation",t)}attributeChangedCallback(t,e,i){var r,l;(l=(r=s(this,B))[t])==null||l.call(r,i,e)}connectedCallback(){this.setAttribute("role","listbox"),this.addEventListener("keydown",s(this,z))}};B=new WeakMap,x=new WeakMap,z=new WeakMap,v=new WeakMap,Y=new WeakMap,q=new WeakMap,G=new WeakMap,U=new WeakMap,R=new WeakMap,c(d,"defaultElementName","reorder-list"),c(d,"COMMIT_DEBOUNCE_MS",1e3),c(d,"html",`
		<slot></slot>
	`),c(d,"css",`
		:host {
			display: block;
			list-style: disc;
			padding-left: 1em;
		}

		:host([orientation="horizontal"]) {
			display: flex;
			flex-direction: row;
			list-style-position: inside;
		}
	`);let E=d;window.customElements.get(E.defaultElementName)||window.customElements.define(E.defaultElementName,E);window.customElements.get(m.defaultElementName)||window.customElements.define(m.defaultElementName,m);window.customElements.get(b.defaultElementName)||window.customElements.define(b.defaultElementName,b);
