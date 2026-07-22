import chalk from "chalk"

export const superconsole = {
	log: (message: unknown) => console.log(message),
	debug: (message: unknown) => {
		if (process.env.DEBUG)
			console.log(chalk.blue(message))
	},
	success: (message: unknown) => console.log(chalk.green(message)),
	failure: (message: unknown) => console.log(chalk.red(message)),
}
