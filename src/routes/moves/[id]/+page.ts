import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'
import { base } from '$app/paths'

export const load: PageLoad = async ({ fetch, params }) => {
    return fetch(`${base}/moves/${params.id}.json`).then(async res => {
        if (res.status === 404)
            throw error(404)
        else
            return {
                move: await res.json()
            }
        })
}
