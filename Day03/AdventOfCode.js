const readline = require("readline");
const fs = require("fs");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

var readline_object = readline.createInterface({
	input: fs.createReadStream("AdventOfCodeInput.txt")//, //process.stdin,
	//output: process.stdout
});
//readline_object.prompt();

var input = [];
readline_object.on("line", (value) => {
	input.push(value);
})
readline_object.on("close", ContestResponse);


function ContestResponse() {
	let gamma = "";
	let epsilon = "";
	let temp = [];
	let o2 = "";
	let co2 = "";
	let ones = [];

	for (let i=0; i<input[0].length; ++i) {
		for (let j=0; j<input.length; ++j) {
			if (ones[i] == undefined) ones[i] = 0;
			ones[i] += (input[j][i] === "1");
		}
	}
	for (let bit of ones) {
		if ([bit].map(Number)[0]*2 >= input.length)  {
			gamma += "1";
			epsilon += "0";
		} else {
			gamma += "0";
			epsilon += "1";
		}
	}
	console.log(`1: ${parseInt(gamma, 2) * parseInt(epsilon, 2)}`);

	ones = []
	for (let nb of input) temp.push(nb);
	for (let i=0; i<input[0].length; ++i) {
		for (let j=0; j<temp.length; ++j) {
			if (ones[i] == undefined) ones[i] = 0;
			ones[i] += (temp[j][i] === "1");
		}
		temp = temp.filter((val) => val[i] === ((ones[i]*2>=temp.length)?"1":"0"));
		if (temp.length === 1) {
			o2 = temp[0];
			break;
		}
	}

	ones = []
	for (let nb of input) temp.push(nb);
	for (let i=0; i<input[0].length; ++i) {
		for (let j=0; j<temp.length; ++j) {
			if (ones[i] == undefined) ones[i] = 0;
			ones[i] += (temp[j][i] === "1");
		}
		temp = temp.filter((val) => val[i] === ((ones[i]*2>=temp.length)?"0":"1"));
		if (temp.length === 1) {
			co2 = temp[0];
			console.log(co2);
			break;
		}
	}
	console.log(`2: ${parseInt(o2, 2) * parseInt(co2, 2)}`);
}
