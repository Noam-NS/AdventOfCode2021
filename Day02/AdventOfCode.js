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
	let position = 0;
	let depth = 0;

	for (let comm of input) {
		let [instr, val] = comm.split(" ");
		if (instr === "up") depth -= +val;
		else if (instr === "down") depth += +val;
		else if (instr === "forward") position += +val;
	}

	console.log(`1: ${position * depth}`);

	position = 0;
	depth = 0;
	let aim = 0;

	for (let comm of input) {
		let [instr, val] = comm.split(" ");
		if (instr === "up") aim -= +val;
		else if (instr === "down") aim += +val;
		else if (instr === "forward")  {
			position += +val;
			depth += aim * +val;
		}
	}

	console.log(`2: ${position * depth}`);
}
