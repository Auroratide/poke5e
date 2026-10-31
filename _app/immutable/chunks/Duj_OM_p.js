var e=e=>new CustomEvent(`change`,{detail:{checked:e}}),t=`toggle-switch:change`,n=e=>new CustomEvent(t,{detail:{checked:e}}),r=`checked`,i=`disabled`,a=class t extends HTMLElement{static defaultElementName=`toggle-switch`;static html=`
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
	`;static formAssociated=!0;static get observedAttributes(){return[r]}constructor(){super(),this.#n()}get checked(){return this.hasAttribute(r)}set checked(e){this.toggleAttribute(r,e)}get disabled(){return this.hasAttribute(i)}set disabled(e){this.toggleAttribute(i,e)}toggle=()=>{this.disabled||(this.checked=!this.checked)};connectedCallback(){this.hasAttribute(`role`)||this.setAttribute(`role`,`switch`),this.hasAttribute(`tabindex`)||this.setAttribute(`tabindex`,`0`),this.#t(!1),this.addEventListener(`click`,this.toggle),this.addEventListener(`keydown`,this.#e)}disconnectedCallback(){this.removeEventListener(`click`,this.toggle),this.removeEventListener(`keydown`,this.#e)}attributeChangedCallback(e){e===r&&this.#t(!0)}#e=e=>{switch(e.key){case` `:case`Enter`:e.preventDefault(),this.toggle()}};#t=(t=!1)=>{this.setAttribute(`aria-checked`,this.checked.toString()),t&&(this.dispatchEvent(e(this.checked)),this.dispatchEvent(n(this.checked)))};#n=()=>{let e=this.shadowRoot??this.attachShadow({mode:`open`}),n=document.createElement(`style`);n.innerHTML=t.css;let r=document.createElement(`template`);return r.innerHTML=t.html,e.appendChild(n),e.appendChild(r.content),e}};window.customElements.get(a.defaultElementName)||window.customElements.define(a.defaultElementName,a);