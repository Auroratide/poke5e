export type PNode = string
export type TableNode = {
    type: 'table',
    headers: string[],
    rows: string[][],
}

export type BodyText = (PNode | TableNode)[]

export type Renderer = (text: BodyText) => string
