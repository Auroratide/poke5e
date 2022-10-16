import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'
import { base } from '$app/paths'

export const load: PageLoad = async ({ fetch, params }) => {
    return fetch(`${base}/tms/${params.id}.json`).then(async res => {
        if (res.status === 404)
            throw error(404)
        else
            return {
                tm: await res.json()
            }
        })
}
