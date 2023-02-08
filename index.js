const App = require("./src/App");
const getParsedArguments = require("./src/lib/argumentsParser");
const fetchPackage = require("./src/lib/fetchPackage");

const arguments = getParsedArguments();
console.log(`Arguments: `, arguments);

const pkg = fetchPackage(arguments);
console.log(`App package.json: `, pkg);

const app = new App(pkg);

// First install dependencies
app.actions.installDependencies();

// Then build the app
app.actions.runBuild();

// Start app
if (arguments["start"]) {
	// And now run
	app.actions.run();
} else if (arguments["test"]) {
	// Run test
	app.actions.runTest();
}
