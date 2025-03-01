var g=Object.defineProperty;var p=e=>{throw TypeError(e)};var m=(e,s,t)=>s in e?g(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t;var a=(e,s,t)=>m(e,typeof s!="symbol"?s+"":s,t),E=(e,s,t)=>s.has(e)||p("Cannot "+t);var n=(e,s,t)=>(E(e,s,"read from private field"),t?t.call(e):s.get(e)),r=(e,s,t)=>s.has(e)?p("Cannot add the same private member more than once"):s instanceof WeakSet?s.add(e):s.set(e,t);const f="change",A=e=>new CustomEvent(f,{detail:{checked:e}}),v="toggle-switch:change",w=e=>new CustomEvent(v,{detail:{checked:e}}),o="checked",k="disabled";var d,h,l;const i=class i extends HTMLElement{constructor(){super();a(this,"toggle",()=>{this.disabled||(this.checked=!this.checked)});r(this,d,t=>{switch(t.key){case" ":case"Enter":t.preventDefault(),this.toggle();break}});r(this,h,(t=!1)=>{this.setAttribute("aria-checked",this.checked.toString()),t&&(this.dispatchEvent(A(this.checked)),this.dispatchEvent(w(this.checked)))});r(this,l,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),u=document.createElement("style");u.innerHTML=i.css;const b=document.createElement("template");return b.innerHTML=i.html,t.appendChild(u),t.appendChild(b.content),t});n(this,l).call(this)}static get observedAttributes(){return[o]}get checked(){return this.hasAttribute(o)}set checked(t){this.toggleAttribute(o,t)}get disabled(){return this.hasAttribute(k)}set disabled(t){this.toggleAttribute(k,t)}connectedCallback(){this.hasAttribute("role")||this.setAttribute("role","switch"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),n(this,h).call(this,!1),this.addEventListener("click",this.toggle),this.addEventListener("keydown",n(this,d))}disconnectedCallback(){this.removeEventListener("click",this.toggle),this.removeEventListener("keydown",n(this,d))}attributeChangedCallback(t){t===o&&n(this,h).call(this,!0)}};d=new WeakMap,h=new WeakMap,l=new WeakMap,a(i,"defaultElementName","toggle-switch"),a(i,"html",`
		<span part="track">
			<span part="slider"></span>
		</span>
	`),a(i,"css",`
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
	`),a(i,"formAssociated",!0);let c=i;window.customElements.get(c.defaultElementName)||window.customElements.define(c.defaultElementName,c);
