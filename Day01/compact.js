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


function ContestResponse() {
	input = input.map(Number);
	console.log("1: " + input.reduce((ac, val, i, arr) => {return ac + (val > arr[i-1]);}, 0));
	console.log("2: " + input.reduce((ac, val, i, arr) => {return ac + (val > arr[i-3]);}, 0));
}
