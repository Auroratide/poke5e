var e=`change`,t=`commit`,n=(t,n,r)=>new CustomEvent(e,{detail:{item:t,oldIndex:n,newIndex:r}}),r=(e,n,r)=>new CustomEvent(t,{detail:{item:e,oldIndex:n,newIndex:r}}),i=class e extends HTMLElement{static defaultElementName=`reorder-item`;static html=`
		<slot></slot>
	`;static css=`
		:host {
			display: list-item;
			touch-action: none;
			cursor: grab;
		}

		:host(:not([data-has-handle])) {
			position: relative;
		}

		:host([data-has-handle]) {
			cursor: auto;
			touch-action: auto;
		}

		:host([data-dragging]) {
			opacity: 0.5;
			cursor: grabbing;
		}

		/*
		 * The default handle is a keyboard affordance only: the whole item is
		 * already draggable by pointer, and an overlay that caught clicks would
		 * block any link or button inside the item. It stays invisible so that
		 * existing layouts are undisturbed, appearing only once focused.
		 */
		button[part~="handle"] {
			position: absolute;
			inset: 0;
			margin: 0;
			padding: 0;
			border: none;
			background: none;
			font: inherit;
			color: inherit;
			opacity: 0;
			pointer-events: none;
			border-radius: 0.125em;
			outline: 0.125em solid currentColor;
			outline-offset: 0.125em;
		}

		button[part~="handle"]:focus-visible {
			opacity: 1;
		}
	`;static START_DRAG_DELAY_MS=150;#e=!1;#t=new MutationObserver(()=>{this.#n()});constructor(){super(),this.#y()}list=()=>this.closest(d.defaultElementName);handles=()=>this.querySelectorAll(s.defaultElementName);defaultHandle=()=>this.#i??null;handle=()=>this.handles()[0]??this.#i??null;connectedCallback(){this.setAttribute(`role`,`listitem`),this.#t.observe(this,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),this.#n()}disconnectedCallback(){this.#t.disconnect(),this.#e=!1}startDragging=(t=this.handle())=>{t?.focus();for(let e of this.handles())e.dataset.dragging=``;let n=setTimeout(()=>this.#u(),e.START_DRAG_DELAY_MS),r=()=>{clearTimeout(n),document.removeEventListener(`pointerup`,r),document.removeEventListener(`pointercancel`,r),document.removeEventListener(`contextmenu`,r)};document.addEventListener(`pointerup`,r),document.addEventListener(`pointercancel`,r),document.addEventListener(`contextmenu`,r)};#n=()=>{this.#r();for(let e of this.handles())e.refreshLabel?.();this.#s()};#r=()=>{let e=this.handles().length>0;this.#e&&e===this.hasAttribute(`data-has-handle`)||(e?(this.dataset.hasHandle=``,this.removeEventListener(`pointerdown`,this.#l),this.#o()):(delete this.dataset.hasHandle,this.addEventListener(`pointerdown`,this.#l),this.#a()),this.#e=!0)};#i=void 0;#a=()=>{if(this.#i!=null)return;let e=document.createElement(`button`);e.type=`button`,e.setAttribute(`part`,`handle`),e.addEventListener(`keydown`,this.#c),this.shadowRoot?.insertBefore(e,this.shadowRoot.querySelector(`slot`)),this.#i=e,this.#s()};#o=()=>{this.#i?.remove(),this.#i=void 0};#s=()=>{let e=o(this);this.#i!=null&&e.length>0&&this.#i.setAttribute(`aria-label`,s.labelFor(e))};#c=e=>{e.key===` `&&e.preventDefault()};#l=e=>{e.target instanceof HTMLElement&&e.target.dataset.ignoreReorder!=null||(e.preventDefault(),e.stopPropagation(),this.startDragging())};#u=e=>{e?.preventDefault(),this.dataset.dragging=``,this.#_(),document.addEventListener(`pointermove`,this.#d),document.addEventListener(`pointerup`,this.#m),document.addEventListener(`pointercancel`,this.#m),document.addEventListener(`touchmove`,this.#h)};#d=e=>{e.preventDefault();let t=this.list(),n=t?.items()??[],r={index:n.indexOf(this),rect:this.getBoundingClientRect()},i={index:r.index-1,rect:n[r.index-1]?.getBoundingClientRect()},a={index:r.index+1,rect:n[r.index+1]?.getBoundingClientRect()};i.rect&&this.#f(e,i.rect,r.rect)?t?.reorder(r.index,i.index,n):a.rect&&this.#p(e,a.rect,r.rect)&&t?.reorder(r.index,a.index,n)};#f=(e,t,n)=>this.list()?.orientation===`horizontal`?e.clientX<Math.min(t.left+n.width,t.right):e.clientY<Math.min(t.top+n.height,t.bottom);#p=(e,t,n)=>this.list()?.orientation===`horizontal`?e.clientX>Math.max(t.right-n.width,t.left):e.clientY>Math.max(t.bottom-n.height,t.top);#m=()=>{delete this.dataset.dragging;for(let e of this.handles())delete e.dataset.dragging;document.removeEventListener(`pointermove`,this.#d),document.removeEventListener(`pointerup`,this.#m),document.removeEventListener(`pointercancel`,this.#m),document.removeEventListener(`touchmove`,this.#h),this.#v()};#h=e=>{e.preventDefault()};#g=void 0;#_=()=>{this.#g=this.list()?.items().indexOf(this)};#v=()=>{let e=this.list(),t=e?.items().indexOf(this)??-1;e?.dispatchEvent(r(this,this.#g??-1,t)),this.#g=void 0};#y=()=>{let t=this.shadowRoot??this.attachShadow({mode:`open`}),n=document.createElement(`style`);n.innerHTML=e.css;let r=document.createElement(`template`);return r.innerHTML=e.html,t.appendChild(n),t.appendChild(r.content),t}},a=e=>e instanceof HTMLElement&&(e.localName===s.defaultElementName||e.localName===d.defaultElementName)?``:e.nodeType===Node.TEXT_NODE?e.textContent??``:Array.from(e.childNodes).map(a).join(` `),o=e=>e==null?``:a(e).replace(/\s+/g,` `).trim(),s=class e extends HTMLElement{static defaultElementName=`reorder-handle`;static labelFor=e=>`Reorder ${e}`;static html=`
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
	`;constructor(){super(),this.#r()}list=()=>this.closest(d.defaultElementName);item=()=>this.closest(i.defaultElementName);#e=void 0;connectedCallback(){this.#e??=this.hasAttribute(`aria-label`)||this.hasAttribute(`aria-labelledby`),this.hasAttribute(`role`)||this.setAttribute(`role`,`button`),this.hasAttribute(`tabindex`)||this.setAttribute(`tabindex`,`0`),this.refreshLabel(),this.addEventListener(`pointerdown`,this.#t),this.addEventListener(`keydown`,this.#n)}refreshLabel=()=>{if(this.#e)return;let t=o(this.item()??this);t.length>0&&this.setAttribute(`aria-label`,e.labelFor(t))};#t=e=>{e.target instanceof HTMLElement&&e.target.dataset.ignoreReorder!=null||(e.preventDefault(),e.stopPropagation(),this.item()?.startDragging(this))};#n=e=>{e.key===` `&&e.preventDefault()};#r=()=>{let t=this.shadowRoot??this.attachShadow({mode:`open`}),n=document.createElement(`style`);n.innerHTML=e.css;let r=document.createElement(`template`);return r.innerHTML=e.html,t.appendChild(n),t.appendChild(r.content),t}},c=`data-reorder-list-announcer`,l=()=>{if(typeof document>`u`)return null;let e=document.querySelector(`[${c}]`);if(e!=null)return e;let t=document.createElement(`div`);return t.setAttribute(c,``),t.setAttribute(`aria-live`,`polite`),t.setAttribute(`aria-atomic`,`true`),t.style.cssText=[`position: absolute`,`width: 1px`,`height: 1px`,`margin: -1px`,`padding: 0`,`border: 0`,`overflow: hidden`,`white-space: nowrap`,`clip-path: inset(50%)`].join(`;`),document.body.appendChild(t),t},u=()=>{let e=document.activeElement;for(;e?.shadowRoot?.activeElement!=null;)e=e.shadowRoot.activeElement;return e},d=class e extends HTMLElement{static defaultElementName=`reorder-list`;static COMMIT_DEBOUNCE_MS=1e3;static announcementFor=(e,t,n)=>`${e}, position ${t} of ${n}`;static html=`
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
	`;constructor(){super(),this.#d()}get orientation(){return this.getAttribute(`orientation`)??`vertical`}set orientation(e){this.setAttribute(`orientation`,e)}items=()=>Array.from(this.querySelectorAll(`:scope > ${i.defaultElementName}`));current=()=>{let e=u()?.closest(i.defaultElementName);return e?.parentElement===this?e:null};connectedCallback(){this.setAttribute(`role`,`list`),l(),this.addEventListener(`keydown`,this.#n),this.addEventListener(t,this.#r)}reorder=(e,t,r=this.items())=>{let i=r[e],a=u();this.#e(i,e<t?r[t].nextSibling:r[t]),this.dispatchEvent(n(i,e,t)),a instanceof HTMLElement&&u()!==a&&a.focus()};#e=(e,t)=>{if(typeof this.moveBefore==`function`)try{this.moveBefore(e,t);return}catch{}this.insertBefore(e,t)};#t=void 0;#n=t=>{let n=this.#u();if(!n.includes(t.key))return;let r=this.#a(t);if(r==null)return;let i=this.items(),a=i.indexOf(r),o=Math.max(0,Math.min(i.length-1,a+(t.key===n[0]?-1:1)));if(!(a<0||a===o)){if(t.preventDefault(),t.stopPropagation(),!t.altKey){i[o].handle()?.focus();return}window.clearTimeout(this.#t??-1),this.#c(r),this.reorder(a,o,i),this.#t=window.setTimeout(this.#l,e.COMMIT_DEBOUNCE_MS),this.#i(r,o,i.length)}};#r=e=>{let{item:t,oldIndex:n,newIndex:r}=e.detail;n!==r&&this.#i(t,r,this.items().length)};#i=(t,n,r)=>{let i=l(),a=e.announcementFor(o(t),n+1,r);i!=null&&i.textContent!==a&&(i.textContent=a)};#a=e=>{let t=e.composedPath(),n=t.findIndex(e=>e instanceof i);if(n<0)return null;let r=t[n];return t.slice(0,n).some(e=>e instanceof s||e===r.defaultHandle())&&r.list()===this?r:null};#o=void 0;#s=void 0;#c=e=>{this.#o!=null&&this.#o!==e&&this.#l(),this.#o??(this.#o=e,this.#s=this.items().indexOf(e))};#l=()=>{let e=this.#o;if(e==null)return;let t=this.items().indexOf(e);this.dispatchEvent(r(e,this.#s??-1,t)),this.#o=void 0,this.#s=void 0};#u=()=>this.orientation===`horizontal`?[`ArrowLeft`,`ArrowRight`]:[`ArrowUp`,`ArrowDown`];#d=()=>{let t=this.shadowRoot??this.attachShadow({mode:`open`}),n=document.createElement(`style`);n.innerHTML=e.css;let r=document.createElement(`template`);return r.innerHTML=e.html,t.appendChild(n),t.appendChild(r.content),t}};window.customElements.get(d.defaultElementName)||window.customElements.define(d.defaultElementName,d),window.customElements.get(i.defaultElementName)||window.customElements.define(i.defaultElementName,i),window.customElements.get(s.defaultElementName)||window.customElements.define(s.defaultElementName,s);