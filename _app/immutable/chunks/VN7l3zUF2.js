var e=`tab-list:change`,t=(t,n)=>new CustomEvent(e,{detail:{from:t,to:n}}),n=class e extends HTMLElement{static defaultElementName=`tab-item`;static html=`
        <slot></slot>
    `;static css=`
        :host {
            border: 1px solid black;
            border-bottom: 0;
            padding: 1px 4px;
            cursor: pointer;
        }

        :host([selected]) {
            background-color: yellow;
        }

        :host(:hover),
        :host(:focus) {
            background-color: lightgray;
        }
    `;static get observedAttributes(){return[`for`,`selected`]}constructor(){super(),this.#r()}get for(){return this.getAttribute(`for`)}set for(e){this.setAttribute(`for`,e)}get panel(){return document.querySelector(`#${this.for}`)}get list(){return this.closest(`tab-list`)}get selected(){return this.hasAttribute(`selected`)}set selected(e){this.toggleAttribute(`selected`,e)}connectedCallback(){this.setAttribute(`role`,`tab`),this.addEventListener(`click`,this.#e),this.addEventListener(`keydown`,this.#t),this.addEventListener(`focus`,this.#n)}attributeChangedCallback(e){this.setAttribute(`aria-controls`,this.for),this.setAttribute(`aria-selected`,this.selected.toString()),this.setAttribute(`tabindex`,this.selected?`0`:`-1`),e===`selected`&&this.list?.updateSelected(this.selected?this:void 0)}#e=()=>{this.selected=!0};#t=e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this.selected=!0)};#n=()=>{this.list?.activation===`automatic`&&(this.selected=!0)};#r=()=>{let t=this.shadowRoot??this.attachShadow({mode:`open`}),n=document.createElement(`style`);n.innerHTML=e.css;let r=document.createElement(`template`);return r.innerHTML=e.html,t.appendChild(n),t.appendChild(r.content),t}},r=class e extends HTMLElement{static defaultElementName=`tab-list`;static html=`
        <slot></slot>
    `;static css=`
        :host {
            display: flex;
            flex-wrap: wrap;
        }

        :host([orientation="vertical"]) {
            flex-direction: column;
            width: 50%;
        }
    `;static get observedAttributes(){return[`orientation`]}constructor(){super(),this.#a()}get orientation(){return this.getAttribute(`orientation`)??`horizontal`}set orientation(e){this.setAttribute(`orientation`,e)}get activation(){return this.getAttribute(`activation`)??`manual`}set activation(e){this.setAttribute(`activation`,e)}tabs=()=>Array.from(this.querySelectorAll(n.defaultElementName));panels=()=>this.tabs().map(e=>e.panel);selected=()=>this.tabs().find(e=>e.hasAttribute(`selected`));updateSelected=e=>{let n=this.tabs().find(t=>t.hasAttribute(`selected`)&&t!==e);e??=n,this.tabs().forEach(t=>{t!==e&&t.removeAttribute(`selected`)}),this.panels().forEach(e=>{e!==void 0&&(e.hidden=!0)}),e?.panel!==void 0&&(e.panel.hidden=!1),e!==n&&this.dispatchEvent(t(n,e))};connectedCallback(){this.setAttribute(`role`,`tablist`),this.addEventListener(`keydown`,this.#e),window.customElements.whenDefined(n.defaultElementName).then(()=>{this.updateSelected()})}attributeChangedCallback(){this.orientation===`vertical`?this.setAttribute(`aria-orientation`,`vertical`):this.removeAttribute(`aria-orientation`)}#e=e=>{let t=this.#t();if(t.includes(e.key)){e.preventDefault();let n=this.tabs(),{index:r}=this.#n(n),i=0;i=e.key===`Home`?0:e.key===`End`?n.length-1:this.#i(r+(e.key===t[0]?-1:1),n.length),this.#r(n[i])}};#t=()=>[...this.orientation===`vertical`?[`ArrowUp`,`ArrowDown`]:[`ArrowLeft`,`ArrowRight`],`Home`,`End`];#n=e=>{if(e.includes(document.activeElement)){let t=document.activeElement,n=e.indexOf(t);return t.setAttribute(`tabindex`,`-1`),{tab:t,index:n}}};#r=e=>{e?.setAttribute(`tabindex`,`0`),e?.focus()};#i=(e,t)=>(e%t+t)%t;#a=()=>{let t=this.shadowRoot??this.attachShadow({mode:`open`}),n=document.createElement(`style`);n.innerHTML=e.css;let r=document.createElement(`template`);return r.innerHTML=e.html,t.appendChild(n),t.appendChild(r.content),t}},i=class e extends HTMLElement{static defaultElementName=`tab-panel`;static html=`
        <slot></slot>
    `;static css=`
        :host {
            border: 1px solid black;
            padding: 4px;
        }

        :host(:not([hidden])) {
            display: block;
        }
    `;static get observedAttributes(){return[]}constructor(){super(),this.#e()}connectedCallback(){this.setAttribute(`role`,`tabpanel`),this.setAttribute(`tabindex`,`0`)}#e=()=>{let t=this.shadowRoot??this.attachShadow({mode:`open`}),n=document.createElement(`style`);n.innerHTML=e.css;let r=document.createElement(`template`);return r.innerHTML=e.html,t.appendChild(n),t.appendChild(r.content),t}};window.customElements.get(r.defaultElementName)||window.customElements.define(r.defaultElementName,r),window.customElements.get(n.defaultElementName)||window.customElements.define(n.defaultElementName,n),window.customElements.get(i.defaultElementName)||window.customElements.define(i.defaultElementName,i);