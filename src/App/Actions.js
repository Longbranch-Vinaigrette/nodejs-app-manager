"use strict";

const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

module.exports = class Actions {
	constructor(path) {
		// I'm gonna need the path to cd there
		this.path = path;
	}

	/**Run commands and print the result to the console
	 *
	 */
	async runAndPrint(cmd) {
		try {
			// Cd to the project root and run its commands
			const cmdResult = await exec(`cd ${this.path}; ${cmd};`);
			if (cmdResult.stdout) {
				console.log(`out: ${cmdResult.stdout}`);
				return cmdResult.stdout;
			}
			if (cmdResult.stderr) {
				console.log(`err: ${cmdResult.stderr}`);
				return cmdResult.stderr;
			}
		} catch (err) {
			console.error(err);
		}
	}

	/**Install app dependencies
	 *
	 */
	async installDependencies() {
		return await this.runAndPrint("npm install");
	}

	/**Run build command
	 *
	 */
	async runBuild() {
		const command = this.actions["build"];

		// Validate command
		if (!command) {
			console.warn("Command 'build' not found.");
			return;
		}

		return await this.runAndPrint(command);
	}

	/**Run app
	 *
	 */
	async run() {
		const command = this.actions["start"];

		// Validate command
		if (!command) {
			console.warn("Command 'start' not found.");
			return;
		}

		return await this.runAndPrint(command);
	}

	/**Run test
	 *
	 * @returns {undefined}
	 */
	async runTest() {
		const command = this.actions["test"];

		// Validate command
		if (!command) {
			console.warn("Command 'test' not found.");
			return;
		}

		return await this.runAndPrint(command);
	}

	/**Set actions
	 *
	 * The object should be the 'scripts' field on package.json
	 *
	 * @param {object} actions
	 */
	setActions(actions) {
		if (actions) {
			this.actions = actions;
		} else {
			console.warn("No actions given.");
		}
	}
};
