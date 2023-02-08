"use strict";

const { spawn } = require("child_process");

module.exports = class Actions {
	/**Run command and pipe the output to the console
	 *
	 */
	runAndPipeOutput(cmdName, args = []) {
		const cmd = spawn(cmdName, args ?? []);

		cmd.stdout.on("data", (data) => {
			console.log(`${data}`);
		});

		cmd.stderr.on("data", (data) => {
			console.log(`${data}`);
		});

		cmd.on("close", (code) => {
			console.log(`child process exited with code ${code}`);
		});
	}

	/**Get the command
	 *
	 */
	parseCmd(cmd) {
		return cmd.split(" ")[0];
	}

	/**Parse arguments
	 *
	 */
	parseArgs(cmd) {
		// Remove the command
		const cmdSplitted = cmd.split(" ");
		const newArguments = [];

		// Get arguments
		cmdSplitted.forEach((value, index) => {
			if (index !== 0) {
				newArguments.splice(index - 1, 0, value);
			}
		});

		return newArguments;
	}

	/**Install app dependencies
	 *
	 */
	installDependencies() {
		return this.runAndPipeOutput("npm", ["install"]);
	}

	/**Run build command
	 *
	 */
	runBuild() {
		const command = this.actions["build"];

		// Validate command
		if (!command) {
			console.warn("Command 'build' not found.");
		}

		// Parse command and arguments
		const cmd = this.parseCmd(command);
		const newArguments = this.parseArgs(command);

		return this.runAndPipeOutput(cmd, newArguments);
	}

	/**Run app
	 *
	 */
	run() {
		const command = this.actions["start"];

		// Validate command
		if (!command) {
			console.warn("Command 'start' not found.");
		}

		// Parse command and arguments
		const cmd = this.parseCmd(command);
		const newArguments = this.parseArgs(command);

		return this.runAndPipeOutput(cmd, newArguments);
	}
	
	/**Run test
	 * 
	 * @returns {undefined}
	 */
	runTest() {
		const command = this.actions["test"];
		
		// Validate command
		if (!command) {
			console.warn("Command 'test' not found.");
		}

		// Parse command and arguments
		const cmd = this.parseCmd(command);
		const newArguments = this.parseArgs(command);

		return this.runAndPipeOutput(cmd, newArguments);
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
