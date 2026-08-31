/**
 * @usage someFunction(randomStub.next)
 */
export class RandomStub {
	private i: number = 0
	constructor(private readonly generator: (i: number) => number) {}

	next = () => this.generator(this.i++)
}
