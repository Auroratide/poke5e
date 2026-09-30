import { redirect } from "@sveltejs/kit"
import type { EntryGenerator, PageLoad } from "./$types"

export const prerender = true

const rulePages = Object.keys(import.meta.glob("/src/routes/rules/*/meta.ts"))
	.map((file) => file.split("/").at(-2)!)

export const entries: EntryGenerator = () => [
	{ path: "" },
	...rulePages.map((path) => ({ path })),
]

export const load: PageLoad = ({ params }) => {
	redirect(308, params.path ? `/rules/${params.path}` : "/rules")
}
