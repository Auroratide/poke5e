import type { Component } from "svelte"

export abstract class LevelUpEffect<TProps extends object, TParams extends object, TSubject = unknown> {
	constructor(readonly props: TProps, public params: TParams) {}

	abstract get Field(): Component<{
		value: LevelUpEffect<TProps, TParams, TSubject>
	}>

	// abstract get Field(): any

	abstract apply(subject: TSubject): TSubject
}
