const readline = require("readline");
const fs = require("fs");

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


function bassinSize(input, j, i) {
	let size = 1;
	input[j][i] = - 1 - input[j][i];

	if (input[j][i] === -10)
		return 0;
	if (j !== 0) if (input[j-1][i] >= 0)
		size += bassinSize(input, j-1, i);
	if (j !== input.length-1) if (input[j+1][i] >= 0)
		size += bassinSize(input, j+1, i);
	if (i !== 0) if (input[j][i-1] >= 0)
		size += bassinSize(input, j, i-1);
	if (i !== input.length-1) if (input[j][i+1] >= 0)
		size += bassinSize(input, j, i+1);

	return size;
}

function ContestResponse() {
	input = input.filter(line => line.length !== 0);
	for (let j in input) input[j] = input[j].split("").map(Number);

	let riskLevel = 0;
	let lowPoints = [];
	for (let j=0; j<input.length; ++j) {
		for (let i=0; i<input[j].length; ++i) {
			let checks = 0;

			if (j === 0) checks++;
			else if (input[j][i] < input[j-1][i]) checks++;

			if (j === input.length-1) checks++;
			else if (input[j][i] < input[j+1][i]) checks++;

			if (i === 0) checks++;
			else if (input[j][i] < input[j][i-1]) checks++;

			if (i === input[j].length-1) checks++;
			else if (input[j][i] < input[j][i+1]) checks++;

			if (checks === 4) {
				riskLevel += input[j][i] + 1;
				lowPoints.push([j, i]);
			}
		}
	}
	console.log(`1: ${riskLevel}`);


	let bassinSizes = Array(lowPoints.length).fill(0);
	for (let i in lowPoints) {
		bassinSizes.push(bassinSize(input, lowPoints[i][0], lowPoints[i][1]));
	}
	let maxBassinsRisk = bassinSizes.sort((a, b) => b - a).slice(0, 3).reduce((acc, val) => acc * val);
	console.log(`2: ${maxBassinsRisk}`);
}
