const Actions = require("./App/Actions")

module.exports = class App {
	actions = new Actions();
	
	constructor(pkg) {
		this.pkg = pkg;
		
		// Get actions
		this.actions.setActions(pkg["scripts"]);
	}
}
