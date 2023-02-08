const Actions = require("./App/Actions");

module.exports = class App {
	constructor(pkg, args) {
		this.pkg = pkg;

		// Create actions
		this.actions = new Actions(args["path"]);

		// Add actions
		this.actions.setActions(pkg["scripts"]);
	}
};
