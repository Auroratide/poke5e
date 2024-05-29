import { supabase } from "$lib/supabase"
import { PUBLIC_ANALYTICS_ENABLED } from "$env/static/public"

function usingEnvironment<TArgs extends unknown[]>(name: string, cb: (...args: TArgs) => Promise<void>) {
	if (PUBLIC_ANALYTICS_ENABLED === "true") {
		return async (...args: TArgs) => {
			try {
				await cb(...args)
			} catch {
				// ignore error
			}
		}
	} else {
		return async (...args: TArgs) => {
			console.log(`[ANALYTICS] ${name} with: ${args.join(", ")}`)
		}
	}
}

export const createPageviewEvent = usingEnvironment("create_pageview_event", async (path: string) => {
	await supabase.rpc("create_pageview_event", {
		_path: path,
	})
})
