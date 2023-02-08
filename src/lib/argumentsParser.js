module.exports = getParsedArguments = () => {
	const result = {};
	
	let prev = "";
	process.argv.forEach(function (val, index, array) {
		// Start app
		if (val === "--start") {
			result["start"] = true;
		} else if (val === "--test") {
			result["test"] = true;
		}
		
		// Get the path to the app
		if (prev === "--path") {
			result["path"] = val;
		}

		prev = val;
	});
	
	return result;
}
