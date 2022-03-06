import type { Renderer, PNode, TableNode } from './types'

const makeParagraph = (node: PNode) => `<p>${node}</p>`

const makeTable = (node: TableNode) => `<table>
    <thead>
        <tr>
            ${node.headers.map(v => `<th>${v}</th>`).join('')}
        </tr>
    </thead>
    <tbody>
        ${node.rows.map(row => `<tr>
            ${row.map(v => `<td>${v}</td>`).join('')}
        </tr>`).join('')}
    </tbody>
</table>`

export const renderHtml: Renderer = (text) =>
    text.map(node => {
        if (typeof node === 'string') {
            return makeParagraph(node)
        } else if (typeof node === 'object' && node.type === 'table') {
            return makeTable(node)
        } else {
            return ''
        }
    }).join('')