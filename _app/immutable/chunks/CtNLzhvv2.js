function e({duration:e=400}={}){return(t,n)=>{let r=i(n,t);return[{keyframes:[{transform:`translate(${r.tx}px, ${r.ty}px) scale(${r.scale})`},{transform:`translate(0px, 0px) scale(1)`}],options:{duration:e}}]}}function t({duration:e=400}={}){return()=>[{keyframes:[{opacity:0},{opacity:1}],options:{duration:e}}]}function n(e){let t=e.naturalWidth/e.naturalHeight,n=e.clientHeight*t,r=e.clientHeight;return n>e.clientWidth&&(n=e.clientWidth,r=e.clientWidth/t),[n,r]}function r(e){let t=e.getBoundingClientRect();return[t.left+t.width/2,t.top+t.height/2]}function i(e,t){let i=e instanceof HTMLImageElement?e:e.querySelector(`img`),a=t instanceof HTMLImageElement?t:t.querySelector(`img`);if(i==null||a==null)return{scale:1,tx:0,ty:0};let[o]=n(i),[s]=n(a),[c,l]=r(i),[u,d]=r(a);return{scale:s/o,tx:u-c,ty:d-l}}var a=class n extends HTMLElement{static defaultElementName=`img-zoom`;static defaultAnimation=`cubic-bezier(0.25, 1, 0.5, 1)`;static html=`
		<button id="zoom-in">
			<slot></slot>
		</button>
		<dialog id="modal">
			<div id="content"></div>
			<form method="dialog">
				<button id="zoom-out" autofocus>
					<span class="visually-hidden">close zoom</span>
				</button>
			</form>
		</dialog>
	`;static css=`
		:host { display: inline-block; }

		:host(:focus-within) {
			outline: 2px solid Highlight;
			outline: 2px auto -webkit-focus-ring-color;
			outline-offset: 2px;
		}

		::slotted(*) {
			display: block;
			inline-size: 100%;
			block-size: auto;
		}

		button {
			all: unset;
			display: block;
			inline-size: 100%;
			block-size: 100%;
		}
		#zoom-in { cursor: zoom-in; }
		#zoom-out { cursor: zoom-out; }
		#zoom-in:disabled { cursor: auto; }

		dialog {
			position: fixed;
			inset: 0;
			max-width: none;
			max-height: none;
			inline-size: 100%;
			block-size: 100%;
			margin: 0;
			padding: 0;
			background: none;
			border: none;
			overflow: visible;
			align-items: center;
			justify-content: center;
			transition:
				display 0.4s allow-discrete,
				overlay 0.4s allow-discrete;
		}

		dialog[open] { display: flex; }

		dialog::backdrop {
			background: oklch(0% 0 0 / 0);
			transition:
				background 0.4s linear,
				display 0.4s allow-discrete,
				overlay 0.4s allow-discrete;
		}

		dialog[open]::backdrop {
			background: oklch(0% 0 0 / 0.5);
		}

		@starting-style {
			dialog[open]::backdrop {
				background: oklch(0% 0 0 / 0);
			}
		}

		#zoom-out {
			position: absolute;
			inset: 0;
			display: block;
			inline-size: 100%;
			block-size: 100%;
		}

		#content {
			inline-size: 95dvi;
			block-size: 95dvb;
		}

		#content img {
			display: block;
			inline-size: 100%;
			block-size: 100%;
			object-fit: contain;
			transform-origin: center center;
		}

		.visually-hidden {
			clip: rect(1px, 1px, 1px, 1px);
			clip-path: inset(50%);
			height: 1px;
			width: 1px;
			margin: -1px;
			overflow: hidden;
			padding: 0;
			position: absolute;
		}

		@supports not (transition-behavior: allow-discrete) {
			dialog {
				display: flex;
				opacity: 0;
				background: oklch(0% 0 0 / 0);
				pointer-events: none;
				transition:
					opacity 0.4s step-end,
					background 0.4s linear;
			}

			dialog[open] {
				opacity: 1;
				background: oklch(0% 0 0 / 0.5);
				pointer-events: auto;
				transition:
					opacity 0.4s step-start,
					background 0.4s linear;
			}

			dialog::backdrop, dialog[open]::backdrop {
				display: none;
			}
		}
	`;static get observedAttributes(){return[`disabled`]}#e=e({duration:400});#t=t({duration:400});#n=new MutationObserver(()=>{this.#l()});constructor(){super(),this.#_()}get disabled(){return this.hasAttribute(`disabled`)}set disabled(e){this.toggleAttribute(`disabled`,e)}zoomIn=()=>{this.#i().showModal(),this.#d()};zoomOut=()=>{this.#i().close()};#r=()=>this.shadowRoot.querySelector(`#zoom-in`);#i=()=>this.shadowRoot.querySelector(`#modal`);#a=()=>this.shadowRoot.querySelector(`#content`);#o=()=>this.shadowRoot.querySelector(`slot`);#s=()=>this.#o().assignedElements()[0];connectedCallback(){this.#r().addEventListener(`click`,this.zoomIn),this.#i().addEventListener(`close`,this.#f),this.#n.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.#l()}disconnectedCallback(){this.#r().removeEventListener(`click`,this.zoomIn),this.#i().removeEventListener(`close`,this.#f),this.#n.disconnect(),this.#h()}attributeChangedCallback(e,t,n){this.#c[e]?.(n,t)}#c={disabled:e=>{this.#r().disabled=e!=null}};#l=()=>{let e=this.#s()?.cloneNode(!0);e&&(`alt`in e&&(e.alt+=` (zoomed)`),e.setAttribute(`part`,`content`),this.#a().replaceChildren(e))};#u=()=>{let e=this.#g(this.#s()),t=this.#g(this.#a().firstElementChild);if(!(e==null||t==null))return o()?this.#t(e,t):this.#e(e,t)};#d=()=>{this.#m();let e=this.#u(),t=e=>this.#a().animate(e.keyframes,{easing:n.defaultAnimation,...e.options,fill:`none`,composite:`add`});Array.isArray(e)?e?.forEach(t):t(e)};#f=()=>{this.#h();let e=this.#u(),t=e=>this.#a().animate(e.keyframes,{...e.options,easing:s(e.options?.easing??n.defaultAnimation),fill:`none`,direction:`reverse`,composite:`add`});Array.isArray(e)?e?.forEach(t):t(e)};#p;#m=()=>{this.#p=document.body.style.overflow,document.body.style.overflow=`hidden`};#h=()=>document.body.style.overflow=this.#p;#g=e=>e instanceof HTMLImageElement?e:e.querySelector(`img`);#_=()=>{let e=this.shadowRoot??this.attachShadow({mode:`open`}),t=document.createElement(`style`);t.innerHTML=n.css;let r=document.createElement(`template`);return r.innerHTML=n.html,e.appendChild(t),e.appendChild(r.content),e}},o=()=>window?.matchMedia?.(`(prefers-reduced-motion: reduce)`)?.matches??!1,s=e=>{let t={linear:`linear`,ease:`cubic-bezier(0.75, 0, 0.75, 0.9)`,"ease-in":`cubic-bezier(0, 0, 0.58, 1)`,"ease-out":`cubic-bezier(0.42, 0, 1, 1)`,"ease-in-out":`ease-in-out`};if(t[e]!=null)return t[e];let n=e.match(/cubic-bezier\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/);if(n){let e=parseFloat(n[1]),t=parseFloat(n[2]),r=parseFloat(n[3]),i=parseFloat(n[4]);return`cubic-bezier(${1-r}, ${1-i}, ${1-e}, ${1-t})`}return console.warn(`inverted linear() or steps() functions not yet supported; using same function instead`),e};window.customElements.get(a.defaultElementName)||window.customElements.define(a.defaultElementName,a);