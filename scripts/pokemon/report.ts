export class Report {
	private sections = new Map<string, string[]>()

	add(section: string, line: string) {
		if (!this.sections.has(section)) this.sections.set(section, [])
		this.sections.get(section)!.push(line)
	}

	count(section: string) {
		return this.sections.get(section)?.length ?? 0
	}

	toMarkdown(order: string[]) {
		return order.map((section) => {
			const lines = this.sections.get(section) ?? []
			const body = lines.length > 0 ? lines.map((line) => `- ${line}`).join("\n") : "_None_"
			return `## ${section} (${lines.length})\n\n${body}\n`
		}).join("\n")
	}
}
