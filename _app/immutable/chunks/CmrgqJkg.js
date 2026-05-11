var e=`change`,t=`commit`,n=(t,n,r)=>new CustomEvent(e,{detail:{item:t,oldIndex:n,newIndex:r}}),r=(e,n,r)=>new CustomEvent(t,{detail:{item:e,oldIndex:n,newIndex:r}}),i=class e extends HTMLElement{static defaultElementName=`reorder-handle`;static html=`
		<slot></slot>
	`;static css=`
		:host {
			display: inline-block;
			touch-action: none;
			cursor: grab;
		}
		
		:host([data-dragging]) {
			cursor: grabbing;
		}
	`;constructor(){super(),this.#t()}list=()=>this.closest(o.defaultElementName);item=()=>this.closest(a.defaultElementName);connectedCallback(){this.addEventListener(`pointerdown`,this.#e)}#e=e=>{e.target instanceof HTMLElement&&e.target.dataset.ignoreReorder!=null||(e.preventDefault(),e.stopPropagation(),this.item().startDragging())};#t=()=>{let t=this.shadowRoot??this.attachShadow({mode:`open`}),n=document.createElement(`style`);n.innerHTML=e.css;let r=document.createElement(`template`);return r.innerHTML=e.html,t.appendChild(n),t.appendChild(r.content),t}},a=class e extends HTMLElement{static defaultElementName=`reorder-item`;static html=`
		<slot></slot>
	`;static css=`
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
	`;static get observedAttributes(){return[`aria-selected`]}static START_DRAG_DELAY_MS=150;#e=!1;#t=new MutationObserver(()=>{this.#n()});constructor(){super(),this.#m()}list=()=>this.closest(o.defaultElementName);handles=()=>this.querySelectorAll(i.defaultElementName);connectedCallback(){this.setAttribute(`role`,`option`),this.hasAttribute(`aria-selected`)||this.#p(),this.#t.observe(this,{attributes:!1,childList:!0,subtree:!0}),this.#n()}disconnectedCallback(){this.#t.disconnect(),this.#e=!1}startDragging=()=>{this.list().changeFocus(this);for(let e of this.handles())e.dataset.dragging=``;let t=setTimeout(()=>this.#i(),e.START_DRAG_DELAY_MS),n=()=>{clearTimeout(t),document.removeEventListener(`pointerup`,n),document.removeEventListener(`pointercancel`,n),document.removeEventListener(`contextmenu`,n)};document.addEventListener(`pointerup`,n),document.addEventListener(`pointercancel`,n),document.addEventListener(`contextmenu`,n)};#n=()=>{let e=this.handles().length>0;(this.dataset.hasHandle||!this.#e)&&!e&&(delete this.dataset.hasHandle,this.addEventListener(`pointerdown`,this.#r)),(!this.dataset.hasHandle||!this.#e)&&e&&(this.dataset.hasHandle=``,this.removeEventListener(`pointerdown`,this.#r)),this.#e=!0};#r=e=>{e.target instanceof HTMLElement&&e.target.dataset.ignoreReorder!=null||(e.preventDefault(),e.stopPropagation(),this.startDragging())};#i=e=>{e?.preventDefault(),this.dataset.dragging=``,this.#d(),document.addEventListener(`pointermove`,this.#a),document.addEventListener(`pointerup`,this.#c),document.addEventListener(`pointercancel`,this.#c),document.addEventListener(`touchmove`,this.#l)};#a=e=>{e.preventDefault();let t=this.list(),n=t.items(),r={index:n.indexOf(this),rect:this.getBoundingClientRect()},i={index:r.index-1,rect:n[r.index-1]?.getBoundingClientRect()},a={index:r.index+1,rect:n[r.index+1]?.getBoundingClientRect()};i.rect&&this.#o(e,i.rect,r.rect)?t.reorder(r.index,i.index,n):a.rect&&this.#s(e,a.rect,r.rect)&&t.reorder(r.index,a.index,n)};#o=(e,t,n)=>this.list().orientation===`horizontal`?e.clientX<Math.min(t.left+n.width,t.right):e.clientY<Math.min(t.top+n.height,t.bottom);#s=(e,t,n)=>this.list().orientation===`horizontal`?e.clientX>Math.max(t.right-n.width,t.left):e.clientY>Math.max(t.bottom-n.height,t.top);#c=()=>{delete this.dataset.dragging;for(let e of this.handles())delete e.dataset.dragging;document.removeEventListener(`pointermove`,this.#a),document.removeEventListener(`pointerup`,this.#c),document.removeEventListener(`pointercancel`,this.#c),document.removeEventListener(`touchmove`,this.#l),this.#f()};#l=e=>{e.preventDefault()};#u;#d=()=>{this.#u=this.list().items().indexOf(this)};#f=()=>{let e=this.list(),t=e.items().indexOf(this);e.dispatchEvent(r(this,this.#u,t)),this.#u=void 0};attributeChangedCallback(){this.setAttribute(`tabindex`,this.getAttribute(`aria-selected`)===`true`?`0`:`-1`)}#p=()=>{let e=this.list().items(),t=e.find(e=>e.getAttribute(`aria-selected`)===`true`)==null;this===e[0]&&t?this.setAttribute(`aria-selected`,`true`):this.setAttribute(`aria-selected`,`false`)};#m=()=>{let t=this.shadowRoot??this.attachShadow({mode:`open`}),n=document.createElement(`style`);n.innerHTML=e.css;let r=document.createElement(`template`);return r.innerHTML=e.html,t.appendChild(n),t.appendChild(r.content),t}},o=class e extends HTMLElement{static defaultElementName=`reorder-list`;static COMMIT_DEBOUNCE_MS=1e3;static html=`
		<slot></slot>
	`;static css=`
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
	`;constructor(){super(),this.#c()}static get observedAttributes(){return[`orientation`]}get orientation(){return this.getAttribute(`orientation`)??`vertical`}set orientation(e){this.setAttribute(`orientation`,e)}attributeChangedCallback(e,t,n){this.#e[e]?.(n,t)}#e={orientation:()=>{this.#s()}};items=()=>Array.from(this.querySelectorAll(`:scope > ${a.defaultElementName}`));current=()=>this.querySelector(`:scope > ${a.defaultElementName}[tabindex="0"]`);connectedCallback(){this.setAttribute(`role`,`listbox`),this.addEventListener(`keydown`,this.#n)}reorder=(e,t,r=this.items())=>{let i=r[e];e<t?r[t].after(i):this.insertBefore(i,r[t]),this.dispatchEvent(n(i,e,t)),r[e].focus()};changeFocus=(e,t=this.items())=>{t.forEach(e=>{e.setAttribute(`aria-selected`,`false`)}),e.setAttribute(`aria-selected`,`true`),e.focus()};#t;#n=t=>{let n=this.#o();if(n.includes(t.key)){let r=this.items();r.indexOf(this.current());let i=r.indexOf(this.current());i<0&&(i=0);let a=Math.max(0,Math.min(r.length-1,i+(t.key===n[0]?-1:1)));t.altKey&&i!==a?(t.preventDefault(),t.stopPropagation(),window.clearTimeout(this.#t??-1),this.#i(),this.reorder(i,a,r),this.#t=window.setTimeout(this.#a,e.COMMIT_DEBOUNCE_MS)):i!==a&&(t.preventDefault(),t.stopPropagation(),this.changeFocus(r[a],r))}};#r=void 0;#i=()=>{this.#r??=this.items().indexOf(this.current())};#a=()=>{let e=this.current(),t=this.items().indexOf(this.current());this.dispatchEvent(r(e,this.#r,t)),this.#r=void 0};#o=()=>this.orientation===`horizontal`?[`ArrowLeft`,`ArrowRight`]:[`ArrowUp`,`ArrowDown`];#s=()=>{this.setAttribute(`aria-orientation`,this.orientation)};#c=()=>{let t=this.shadowRoot??this.attachShadow({mode:`open`}),n=document.createElement(`style`);n.innerHTML=e.css;let r=document.createElement(`template`);return r.innerHTML=e.html,t.appendChild(n),t.appendChild(r.content),t}};window.customElements.get(o.defaultElementName)||window.customElements.define(o.defaultElementName,o),window.customElements.get(a.defaultElementName)||window.customElements.define(a.defaultElementName,a),window.customElements.get(i.defaultElementName)||window.customElements.define(i.defaultElementName,i);