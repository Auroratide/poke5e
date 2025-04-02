const a=e=>`<p>${e}</p>`,p=e=>`<table>
	<thead>
		<tr>
			${e.headers.map(t=>`<th>${t}</th>`).join("")}
		</tr>
	</thead>
	<tbody>
		${e.rows.map(t=>`<tr>
			${t.map(r=>`<td>${r}</td>`).join("")}
		</tr>`).join("")}
	</tbody>
</table>`,o=e=>e.map(t=>typeof t=="string"?a(t):typeof t=="object"&&t.type==="table"?p(t):"").join("");export{o as r};
