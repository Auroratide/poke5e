import type { Component } from "svelte"

export abstract class LevelUpEffect<TProps extends object, TParams extends object, TSubject = unknown> {
	params = $state<TParams>()

	constructor(readonly props: TProps, params: TParams) {
		this.params = params
	}

	abstract get Field(): Component<{
		value: LevelUpEffect<TProps, TParams, TSubject>
	}>

	abstract hasError(): string | undefined

	abstract apply(subject: TSubject): TSubject
}
