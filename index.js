const getParsedArguments = require("./src/lib/argumentsParser");
const fetchPackage = require("./src/lib/fetchPackage");

const arguments = getParsedArguments();
console.log(`Arguments: `, arguments);

const pkg = fetchPackage(arguments);
console.log(`App package.json: `, pkg);
