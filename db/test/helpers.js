export async function call(client, functionName, args) {
	const res = await client.query(`SELECT ${functionName}(${parameterize(args)}) AS result`, args)

	return res.rows.map((it) => parseResult(it.result))
}

function parameterize(array) {
	return array.map((_, i) => `$${i + 1}` ).join(",")
}

function parseResult(result) {
	if (typeof result === "string") {
		return result
			.substring(1, result.length - 1)
			.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) // https://stackoverflow.com/questions/11456850/split-a-string-by-commas-but-ignore-commas-within-double-quotes-using-javascript
			.map((it) => it.replaceAll('"', "")) // cheap trick to get around strings that have spaces
	} else {
		return [result]
	}
}
