"use strict";

const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

/**Run commands and print the result to the console
 *
 */
module.exports = async function runAndPrint(cmd) {
	try {
		// Cd to the project root and run its commands
		const cmdResult = await exec(cmd);
		if (cmdResult.stdout) {
			console.log(`out: ${cmdResult.stdout}`);
			return cmdResult.stdout;
		}
		if (cmdResult.stderr) {s
			console.log(`err: ${cmdResult.stderr}`);
			return cmdResult.stderr;
		}
	} catch (err) {
		console.error(err);
	}
};
