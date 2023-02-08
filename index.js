const App = require("./src/App");
const getParsedArguments = require("./src/lib/argumentsParser");
const fetchPackage = require("./src/lib/fetchPackage");

const arguments = getParsedArguments();
console.log(`Arguments: `, arguments);

const pkg = fetchPackage(arguments);
console.log(`App package.json: `, pkg);

const app = new App(pkg, arguments);
console.log(`Scripts order: `, Object.keys(pkg["scripts"]));

(async () => {
	// First install dependencies
	await app.actions.installDependencies();

	// Then build the app
	await app.actions.runBuild();

	// Start app
	if (arguments["start"]) {
		// And now run
		await app.actions.run();
	} else if (arguments["test"]) {
		// Run test
		await app.actions.runTest();
	}

	console.log(`The application has been installed, built and run.`);
})();
