<script lang="ts">
	import { goto } from "$app/navigation"
	import Card from "$lib/design/Card.svelte"
	import { Title } from "$lib/ui/layout"
	import { Url } from "$lib/url"
	import { Fakemon } from "../Fakemon"
	import { fakemonStore } from "../store"
	import FakemonAdder from "./FakemonAdder.svelte"
	import { type SubmitDetail } from "./FakemonEditor.svelte"

	const draftFakemon = new Fakemon({
		id: "",
		readKey: "",
		species: {
			id: "",
			name: "",
			number: 0,
			type: ["normal"],
			size: "small",
			sr: 1,
			minLevel: 1,
			eggGroups: ["undiscovered"],
			gender: "1:1",
			description: "",
			ac: 11,
			hp: 16,
			hitDice: "d6",
			speed: {
				walking: 30,
			},
			senses: {},
			attributes: {
				str: 10,
				dex: 10,
				con: 10,
				int: 6,
				wis: 10,
				cha: 10,
			},
			skills: {
				"athletics": 0,
				"acrobatics": 0,
				"sleight of hand": 0,
				"stealth": 0,
				"arcana": 0,
				"history": 0,
				"investigation": 0,
				"nature": 0,
				"religion": 0,
				"animal handling": 0,
				"insight": 0,
				"medicine": 0,
				"perception": 0,
				"survival": 0,
				"deception": 0,
				"intimidation": 0,
				"performance": 0,
				"persuasion": 0,
			},
			saves: [],
			abilities: {
				normal: [],
				hidden: [],
			},
			moves: {
				start: [],
				level2: [],
				level6: [],
				level10: [],
				level14: [],
				level18: [],
				egg: [],
				tm: [],
			},
			media: {
				values: {
					normalPortrait: undefined,
					normalSprite: undefined,
					shinyPortrait: undefined,
					shinySprite: undefined,
				},
				customization: {
					shinyHue: 0,
				},
				attribution: {
					portrait: {
						type: "",
						name: "",
						href: "",
					},
					sprite: {
						type: "",
						name: "",
						href: "",
					},
				},
			},
		},
	})
	let saving = false

	const onCancel = () => {
		goto(Url.fakemon())
	}

	const onSubmit = (e: CustomEvent<SubmitDetail>) => {
		saving = true
		fakemonStore.new(e.detail.fakemon.data.species).then((result) => {
			goto(Url.fakemon(result.data.readKey))
		}).catch(() => {
			saving = false
		})
	}
</script>

<Title value="Add New Fakémon" />
<Card title="Add New Fakémon">
	<FakemonAdder fakemon={draftFakemon} on:submit={onSubmit} on:cancel={onCancel} {saving} />
</Card>