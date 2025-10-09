import js from "@eslint/js"
import typescript from "typescript-eslint"
import globals from "globals"
import svelte from "eslint-plugin-svelte"
import svelteConfig from "./svelte.config.js"

export default [
	js.configs.recommended,
	...typescript.configs.recommended,
	...svelte.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
	{
		files: ["**/*.svelte", "**/*.svelte.js", "**/*.svelte.ts"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: [".svelte"],
				parser: typescript.parser,
				svelteConfig,
			},
		},
	},
	{
		rules: {
			"comma-dangle": ["error", "always-multiline"],
			"quotes": ["error", "double"],
			"semi": ["error", "never"],
			"indent": ["error", "tab"],
			"svelte/no-at-html-tags": "off",
			"svelte/require-each-key": "off",
			"svelte/require-event-dispatcher-types": "off",
			"svelte/valid-prop-names-in-kit-pages": "off",
			"svelte/no-reactive-reassign": "off",
			"svelte/no-navigation-without-resolve": "off",
		},
	},
]
