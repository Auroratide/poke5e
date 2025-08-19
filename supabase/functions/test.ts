const functionsDir = "supabase/functions"

let anyFailed = false
for await (const entry of Deno.readDir(functionsDir)) {
	if (!entry.isDirectory) continue

	const cwd = `${functionsDir}/${entry.name}`

	const command = new Deno.Command("deno", {
		args: ["test", "--allow-all", "--config", "deno.json"],
		cwd: cwd,
	})

	const { success, stdout, stderr } = await command.output()

	if (success) {
		console.log(new TextDecoder().decode(stdout))
	} else {
		anyFailed = true
		console.log(new TextDecoder().decode(stdout))
		console.log(new TextDecoder().decode(stderr))
	}
}

if (anyFailed) {
	console.log("❌ Some tests failed.")
	Deno.exit(1)
} else {
	console.log("✅ All tests passed!")
}
