import type { SpeciesIdentifier } from "$lib/creatures/species"
import type { Evolution } from "./Evolution"

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
	private readonly nodes: Map<string, TreeNode>

	constructor(private readonly evolutions: Evolution[]) {
		const nodes = new Map<string, TreeNode>()
		for (const evolution of evolutions) {
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
		
		this.nodes = nodes
	}

	evolvesFrom(species: SpeciesIdentifier): Evolution[] {
		return this.evolutions.filter((evolution) => evolution.to.data === species.data)
	}

	evolvesTo(species: SpeciesIdentifier): Evolution[] {
		return this.evolutions.filter((evolution) => evolution.from.data === species.data)
	}

	currentStage(species: SpeciesIdentifier): number {
		const speciesNode = this.nodes.get(species.data)
		
		let maxDepth = 0

		if (speciesNode != null) {
			this.dfs(speciesNode, "from", (_, depth) => {
				maxDepth = Math.max(maxDepth, depth)
			})
		}

		return maxDepth + 1
	}
	
	maxStage(species: SpeciesIdentifier): number {
		const currentStage = this.currentStage(species)
		const speciesNode = this.nodes.get(species.data)
		let maxDepth = 0

		if (speciesNode != null) {
			this.dfs(speciesNode, "to", (_, depth) => {
				maxDepth = Math.max(maxDepth, depth)
			})
		}

		return currentStage + maxDepth
	}

	private dfs(node: TreeNode, direction: keyof TreeNode["edges"], action: (node: TreeNode, depth: number) => void, depth: number = 0) {
		action(node, depth)

		for (const child of node.edges[direction]) {
			this.dfs(child, direction, action, depth + 1)
		}
	}
}

