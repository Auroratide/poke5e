var e=`change`,t=t=>new CustomEvent(e,{detail:{checked:t}}),n=`toggle-switch:change`,r=e=>new CustomEvent(n,{detail:{checked:e}}),i=`checked`,a=`disabled`,o=class e extends HTMLElement{static defaultElementName=`toggle-switch`;static html=`
		<span part="track">
			<span part="slider"></span>
		</span>
	`;static css=`
		:host {
			display: inline-block;
			width: 2em;
			height: 1em;
			cursor: pointer;
		}

		span {
			box-sizing: border-box;
			display: inline-block;
			line-height: 1;
		}

		[part="track"] {
			width: 100%;
			height: 100%;
			background-color: #dddddd;
			text-align: left;
			transition: all 0.256s;
		}

		[part="slider"] {
			width: 50%;
			height: 100%;
			background-color: #777777;
			transition: all 0.256s;
			vertical-align: text-top;
		}

		:host([checked]) [part="slider"] {
			transform: translateX(100%);
		}

		:host([disabled]) {
			cursor: not-allowed;
			opacity: 0.5;
		}
	`;static formAssociated=!0;static get observedAttributes(){return[i]}constructor(){super(),this.#n()}get checked(){return this.hasAttribute(i)}set checked(e){this.toggleAttribute(i,e)}get disabled(){return this.hasAttribute(a)}set disabled(e){this.toggleAttribute(a,e)}toggle=()=>{this.disabled||(this.checked=!this.checked)};connectedCallback(){this.hasAttribute(`role`)||this.setAttribute(`role`,`switch`),this.hasAttribute(`tabindex`)||this.setAttribute(`tabindex`,`0`),this.#t(!1),this.addEventListener(`click`,this.toggle),this.addEventListener(`keydown`,this.#e)}disconnectedCallback(){this.removeEventListener(`click`,this.toggle),this.removeEventListener(`keydown`,this.#e)}attributeChangedCallback(e){e===i&&this.#t(!0)}#e=e=>{switch(e.key){case` `:case`Enter`:e.preventDefault(),this.toggle();break;default:break}};#t=(e=!1)=>{this.setAttribute(`aria-checked`,this.checked.toString()),e&&(this.dispatchEvent(t(this.checked)),this.dispatchEvent(r(this.checked)))};#n=()=>{let t=this.shadowRoot??this.attachShadow({mode:`open`}),n=document.createElement(`style`);n.innerHTML=e.css;let r=document.createElement(`template`);return r.innerHTML=e.html,t.appendChild(n),t.appendChild(r.content),t}};window.customElements.get(o.defaultElementName)||window.customElements.define(o.defaultElementName,o);