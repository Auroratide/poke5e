var L=Object.defineProperty;var N=n=>{throw TypeError(n)};var M=(n,i,t)=>i in n?L(n,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[i]=t;var o=(n,i,t)=>M(n,typeof i!="symbol"?i+"":i,t),R=(n,i,t)=>i.has(n)||N("Cannot "+t);var r=(n,i,t)=>(R(n,i,"read from private field"),t?t.call(n):i.get(n)),a=(n,i,t)=>i.has(n)?N("Cannot add the same private member more than once"):i instanceof WeakSet?i.add(n):i.set(n,t);const D="tab-list:change",K=(n,i)=>new CustomEvent(D,{detail:{from:n,to:i}});var p,b,w,A;const d=class d extends HTMLElement{constructor(){super();a(this,p,()=>{this.selected=!0});a(this,b,t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.selected=!0)});a(this,w,()=>{var t;((t=this.list)==null?void 0:t.activation)==="automatic"&&(this.selected=!0)});a(this,A,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=d.css;const s=document.createElement("template");return s.innerHTML=d.html,t.appendChild(e),t.appendChild(s.content),t});r(this,A).call(this)}static get observedAttributes(){return["for","selected"]}get for(){return this.getAttribute("for")}set for(t){this.setAttribute("for",t)}get panel(){return document.querySelector(`#${this.for}`)}get list(){return this.closest("tab-list")}get selected(){return this.hasAttribute("selected")}set selected(t){this.toggleAttribute("selected",t)}connectedCallback(){this.setAttribute("role","tab"),this.addEventListener("click",r(this,p)),this.addEventListener("keydown",r(this,b)),this.addEventListener("focus",r(this,w))}attributeChangedCallback(t){var e;this.setAttribute("aria-controls",this.for),this.setAttribute("aria-selected",this.selected.toString()),this.setAttribute("tabindex",this.selected?"0":"-1"),t==="selected"&&((e=this.list)==null||e.updateSelected(this.selected?this:void 0))}};p=new WeakMap,b=new WeakMap,w=new WeakMap,A=new WeakMap,o(d,"defaultElementName","tab-item"),o(d,"html",`
        <slot></slot>
    `),o(d,"css",`
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
    `);let h=d;var g,v,E,y,k,x;const c=class c extends HTMLElement{constructor(){super();o(this,"tabs",()=>Array.from(this.querySelectorAll(h.defaultElementName)));o(this,"panels",()=>this.tabs().map(t=>t.panel));o(this,"selected",()=>this.tabs().find(t=>t.hasAttribute("selected")));o(this,"updateSelected",t=>{const e=this.tabs().find(s=>s.hasAttribute("selected")&&s!==t);t=t??e,this.tabs().forEach(s=>{s!==t&&s.removeAttribute("selected")}),this.panels().forEach(s=>{s!==void 0&&(s.hidden=!0)}),(t==null?void 0:t.panel)!==void 0&&(t.panel.hidden=!1),t!==e&&this.dispatchEvent(K(e,t))});a(this,g,t=>{const e=r(this,v).call(this);if(e.includes(t.key)){t.preventDefault();const s=this.tabs(),{index:H}=r(this,E).call(this,s);let f=0;t.key==="Home"?f=0:t.key==="End"?f=s.length-1:f=r(this,k).call(this,H+(t.key===e[0]?-1:1),s.length),r(this,y).call(this,s[f])}});a(this,v,()=>[...this.orientation==="vertical"?["ArrowUp","ArrowDown"]:["ArrowLeft","ArrowRight"],"Home","End"]);a(this,E,t=>{if(t.includes(document.activeElement)){const e=document.activeElement,s=t.indexOf(e);return e.setAttribute("tabindex","-1"),{tab:e,index:s}}});a(this,y,t=>{t==null||t.setAttribute("tabindex","0"),t==null||t.focus()});a(this,k,(t,e)=>(t%e+e)%e);a(this,x,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=c.css;const s=document.createElement("template");return s.innerHTML=c.html,t.appendChild(e),t.appendChild(s.content),t});r(this,x).call(this)}static get observedAttributes(){return["orientation"]}get orientation(){return this.getAttribute("orientation")??"horizontal"}set orientation(t){this.setAttribute("orientation",t)}get activation(){return this.getAttribute("activation")??"manual"}set activation(t){this.setAttribute("activation",t)}connectedCallback(){this.setAttribute("role","tablist"),this.addEventListener("keydown",r(this,g)),window.customElements.whenDefined(h.defaultElementName).then(()=>{this.updateSelected()})}attributeChangedCallback(){this.orientation==="vertical"?this.setAttribute("aria-orientation","vertical"):this.removeAttribute("aria-orientation")}};g=new WeakMap,v=new WeakMap,E=new WeakMap,y=new WeakMap,k=new WeakMap,x=new WeakMap,o(c,"defaultElementName","tab-list"),o(c,"html",`
        <slot></slot>
    `),o(c,"css",`
        :host {
            display: flex;
            flex-wrap: wrap;
        }

        :host([orientation="vertical"]) {
            flex-direction: column;
            width: 50%;
        }
    `);let u=c;var C;const l=class l extends HTMLElement{constructor(){super();a(this,C,()=>{const t=this.shadowRoot??this.attachShadow({mode:"open"}),e=document.createElement("style");e.innerHTML=l.css;const s=document.createElement("template");return s.innerHTML=l.html,t.appendChild(e),t.appendChild(s.content),t});r(this,C).call(this)}static get observedAttributes(){return[]}connectedCallback(){this.setAttribute("role","tabpanel"),this.setAttribute("tabindex","0")}};C=new WeakMap,o(l,"defaultElementName","tab-panel"),o(l,"html",`
        <slot></slot>
    `),o(l,"css",`
        :host {
            border: 1px solid black;
            padding: 4px;
        }

        :host(:not([hidden])) {
            display: block;
        }
    `);let m=l;window.customElements.get(u.defaultElementName)||window.customElements.define(u.defaultElementName,u);window.customElements.get(h.defaultElementName)||window.customElements.define(h.defaultElementName,h);window.customElements.get(m.defaultElementName)||window.customElements.define(m.defaultElementName,m);
