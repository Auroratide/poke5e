/* eslint-disable no-undef */
export const observe = process.env.OBSERVE === "true"

export const url = process.env.ENV === "prod"
	? "https://poke5e.app"
	: "http://localhost:3000"
