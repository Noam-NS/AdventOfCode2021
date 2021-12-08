const readline = require("readline");
const fs = require("fs");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const { exit } = require("process");
const { start } = require("repl");
const { count } = require("console");
const { sign } = require("crypto");

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

function sumToZero(nb) {
	let res = 0;
	for (nb=nb; nb>0; --nb) res += nb;
	return res;
}

function ContestResponse() {
	let patterns = [];
	let outputs = [];
	for (let line of input) {
		if (line.length === 0) continue;
		let [pattern, output] = line.split(" | ");
		patterns.push(pattern.split(" "));
		outputs.push(output.split(" "));
	}

	let oneAppearance = outputs.reduce((acc, val) => acc + (val.reduce((acc, val) => acc + (val.length === 7 || val.length === 4 || val.length === 3 || val.length === 2), 0)), 0);
	console.log(`1: ${oneAppearance}`);



	let decodeds = [];
	for (let line of patterns) {
		let corresp = {};
		let decoded = {};
		decoded[8] = "abcdefg"; // 8 is the full set
		for (let signal of line) { // 4,7,1 are determined from their unique length
			if (signal.length === 4) decoded[4] = signal.split("").sort().join("");
			else if (signal.length === 3) decoded[7] = signal.split("").sort().join("");
			else if (signal.length === 2) decoded[1] = signal.split("").sort().join("");
		}
		corresp["a"] = decoded[7].split("").filter(a => !decoded[1].includes(a)).join(""); // top is 7 - 1
		for (let signal of line) { // 9 is the only 6 lengther that includes 4
			if (signal.length === 6 && decoded[4].split("").reduce((acc, val) => acc && (signal.includes(val)), true)) decoded[9] = signal.split("").sort().join("");
		}
		corresp["e"] = decoded[8].split("").filter(a => !decoded[9].includes(a)).join("");
		for (let signal of line) { // 0,6 are 6 lengthers that aren't 9. 0 includes 1. 6 doesn't
			if (signal.length === 6 && signal.split("").sort().join("") !== decoded[9] && decoded[1].split("").reduce((acc, val) => acc && (signal.includes(val)), true)) decoded[0] = signal.split("").sort().join("");
			if (signal.length === 6 && signal.split("").sort().join("") !== decoded[9] && !decoded[1].split("").reduce((acc, val) => acc && (signal.includes(val)), true)) decoded[6] = signal.split("").sort().join("");
		}
		corresp["c"] = decoded[8].split("").filter(a => !decoded[6].includes(a)).join(""); // top-right is 8 - 6
		corresp["d"] = decoded[8].split("").filter(a => !decoded[0].includes(a)).join(""); // middle is 8 - 0
		for (let signal of line) { // 2,5 are 5 lengthers. 2 includes every discovered segment. 5 is included in 6
			if (signal.length === 5 && signal.includes(corresp["a"]) && signal.includes(corresp["c"]) && signal.includes(corresp["d"]) && signal.includes(corresp["e"])) decoded[2] = signal.split("").sort().join("");
			if (signal.length === 5 && signal.split("").reduce((acc, val) => acc && (decoded[6].includes(val)), true)) decoded[5] = signal.split("").sort().join("");;
		}
		decoded[3] = ""; // No need to figure the last one out
		decodeds.push(decoded);
	}

	let sum = 0;
	for (let i=0; i<outputs.length; ++i) {
		let trueOutput = "";
		for (let digit of outputs[i]) {
			for (let j=0; j<=9; ++j) {
				if (digit.split("").sort().join("") === decodeds[i][j]) {
					trueOutput += j.toString();
					break;
				}
				if (j === 9) trueOutput += "3"; // If nothing matches, it's the undiscovered one
			}
		}
		sum += parseInt(trueOutput, 10);
	}
	console.log(`2: ${sum}`);
}
