import type { SpeciesIdentifier } from "$lib/creatures/species"
import type { Evolution } from "./Evolution"
import type { EvolutionConditionType } from "./EvolutionCondition"

type TreeNode = {
	id: SpeciesIdentifier,
	edges: {
		from: TreeNode[],
		to: TreeNode[],
	}
}

/**
 * Represents every known evolutionary path as a set of trees. Given an
 * arbitrary species in the forest, you can get that species's entire
 * line.
 */
export class EvolutionForest {
	private readonly evolutions: Evolution[] = []
	private readonly nodes: Map<string, TreeNode>

	constructor(evolutions: Evolution[]) {
		this.nodes = new Map<string, TreeNode>()
		this.addAll(evolutions)
	}

	hasEvolutionTree(species: SpeciesIdentifier): boolean {
		return this.maxStage(species) > 1
	}

	evolvesFrom(species: SpeciesIdentifier): Evolution[] {
		return this.evolutions.filter((evolution) => evolution.to.data === species.data)
	}

	evolvesTo(species: SpeciesIdentifier): Evolution[] {
		return this.evolutions.filter((evolution) => evolution.from.data === species.data)
	}

	allEvolutions(species: SpeciesIdentifier): Evolution[] {
		return this.evolvesFrom(species).concat(this.evolvesTo(species))
	}

	hasCondition(species: SpeciesIdentifier, condition: EvolutionConditionType): boolean {
		return this.evolvesTo(species).some((it) => it.hasCondition(condition))
	}

	currentStage(species: SpeciesIdentifier): number {
		const speciesNode = this.nodes.get(species.data)
		
		let maxDepth = 0

		if (speciesNode != null) {
			const stats: DfsStats = {}
			this.dfs(speciesNode, "from", (_, depth) => {
				maxDepth = Math.max(maxDepth, depth)
			}, stats)

			if (stats.cycle) {
				return 0
			}
		}


		return maxDepth + 1
	}
	
	maxStage(species: SpeciesIdentifier): number {
		const currentStage = this.currentStage(species)
		const speciesNode = this.nodes.get(species.data)
		let maxDepth = 0

		if (speciesNode != null) {
			const stats: DfsStats = {}
			this.dfs(speciesNode, "to", (_, depth) => {
				maxDepth = Math.max(maxDepth, depth)
			}, stats)

			if (stats.cycle) {
				return Infinity
			}
		}

		return currentStage + maxDepth
	}

	addAll(evolutions: Evolution[]) {
		const nonDuplicates = evolutions.filter((toAdd) => !this.evolutions.find((alreadyIn) => alreadyIn.isSame(toAdd)))
		this.evolutions.push(...nonDuplicates)

		const nodes = this.nodes
		for (const evolution of nonDuplicates) {
			if (!nodes.has(evolution.data.from)) nodes.set(evolution.data.from, {
				id: evolution.from,
				edges: {
					from: [],
					to: [],
				},
			})

			if (!nodes.has(evolution.data.to)) nodes.set(evolution.data.to, {
				id: evolution.to,
				edges: {
					from: [],
					to: [],
				},
			})

			const from = nodes.get(evolution.data.from)
			const to = nodes.get(evolution.data.to)
			from.edges.to.push(to)
			to.edges.from.push(from)
		}
	}

	update(evolution: Evolution) {
		const exists = this.evolutions.findIndex((it) => it.id === evolution.id)
		if (exists >= 0) {
			const removed = this.evolutions.splice(exists, 1)
			removed.forEach((it) => this.removeNode(it))
		}

		this.remove(evolution)
		this.addAll([evolution])
	}

	remove(evolution: Evolution) {
		const exists = this.evolutions.findIndex((it) => it.isSame(evolution))
		if (exists < 0) return

		this.evolutions.splice(exists, 1)
		this.removeNode(evolution)
	}

	private removeNode(evolution: Evolution) {
		const from = this.nodes.get(evolution.data.from)
		const to = this.nodes.get(evolution.data.to)

		if (from) {
			from.edges.to = from.edges.to.filter((it) => it.id.data !== evolution.data.to)
		}

		if (to) {
			to.edges.from = to.edges.from.filter((it) => it.id.data !== evolution.data.from)
		}
	}

	private dfs(node: TreeNode, direction: keyof TreeNode["edges"], action: (node: TreeNode, depth: number) => void, stats: DfsStats, depth: number = 0, seenNodes: TreeNode[] = []) {
		if (seenNodes.includes(node)) {
			stats.cycle = true
			return
		}

		action(node, depth)
		seenNodes.push(node)

		for (const child of node.edges[direction]) {
			this.dfs(child, direction, action, stats, depth + 1, seenNodes)
		}
	}
}

type DfsStats = {
	cycle?: boolean,
}
