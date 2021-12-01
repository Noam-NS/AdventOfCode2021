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
	let increase = 0;
	
	for(let i=1; i<input.length; ++i) {
		if (input[i] > input[i-1]) increase++;
	}
	
	console.log(`1: ${increase}`);
	increase = 0;

	let windows = [];
	windows.push([input[0]]);
	for (let i=1; i<input.length; ++i) {
		if (windows.length >= 1) {
			windows.push([]);
			if (windows[windows.length-1].length < 3) windows[windows.length-1].push(input[i]);
		}

		if (windows.length >= 3) if (windows[windows.length-3].length < 3) windows[windows.length-3].push(input[i]);

		if (windows.length >= 2) if (windows[windows.length-2].length < 3) windows[windows.length-2].push(input[i]);
	}

	for (let i=1; i<windows.length; ++i) {
		if (windows[i].reduce((p,a) => p+a, 0) > windows[i-1].reduce((p,a) => p+a, 0)) {
			increase++;
		}
	}

	console.log(`2: ${increase}`);
}
