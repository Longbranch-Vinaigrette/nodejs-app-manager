module.exports = fetchPackage = (arguments) => {
	try {
		const path = arguments["path"];

		// Get package.json
		const appPkg = require(`${path}/package.json`);
		return appPkg;
	} catch (err) {
		throw new Error("The given project path doesn't have a package.json file.");
	}
};
