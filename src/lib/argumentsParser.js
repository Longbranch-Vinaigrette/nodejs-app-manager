module.exports = getParsedArguments = () => {
	const result = {};
	
	let prev = "";
	process.argv.forEach(function (val, index, array) {
		// Get the path to the app
		if (prev === "--path") {
			result["path"] = val;
		}

		prev = val;
	});
	
	return result;
}
