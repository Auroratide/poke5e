import type { Client } from "pg"

export async function call(client: Client, functionName: string, args: any[]): Promise<any[][]> {
	const res = await client.query(`SELECT ${functionName}(${parameterize(args)}) AS result`, args)

	return res.rows.map((it) => parseResult(it.result))
}

function parameterize(array: any[]): string {
	return array.map((_, i) => `$${i + 1}` ).join(",")
}

function parseResult(result: string | string[]) {
	if (typeof result === "string" && !result.startsWith("(")) {
		return [result]
	} else if (typeof result === "string") {
		return result
			?.substring(1, result.length - 1)
			?.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) // https://stackoverflow.com/questions/11456850/split-a-string-by-commas-but-ignore-commas-within-double-quotes-using-javascript
			?.map((it) => it.replaceAll('"', "")) ?? [] // cheap trick to get around strings that have spaces
	} else {
		return [result]
	}
}
