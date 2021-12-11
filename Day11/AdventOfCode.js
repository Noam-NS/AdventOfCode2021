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
	input = input.filter(a => a.length !== 0);
	for (let i=0; i<input.length; ++i) input[i] = input[i].split("").map(Number);
	
	let flashes = 0;
	let memFlash = 0;

	for (let step=1; ; ++step) {
		for (let j=0; j<input.length; ++j) {
			for (let i=0; i<input[j].length; ++i) {
				++input[j][i];
			}
		}
		memFlash = flashes;
		for (let k=0; k<100; ++k) {
			for (let j=0; j<input.length; ++j) {
				for (let i=0; i<input[j].length; ++i) {
					if (input[j][i] > 9) {
						++flashes;
						input[j][i] = -1000;
						if (j !== 0 && i !== 0) ++input[j-1][i-1];
						if (j !== 0) ++input[j-1][i];
						if (j !== 0 && i !== input[j].length-1) ++input[j-1][i+1];
						if (i !== 0) ++input[j][i-1];
						if (i !== input[j].length-1) ++input[j][i+1];
						if (j !== input.length-1 && i !== 0) ++input[j+1][i-1];
						if (j !== input.length-1) ++input[j+1][i];
						if (j !== input.length-1 && i !== input[j].length-1) ++input[j+1][i+1];
					}
				}
			}
		}
		if (flashes - memFlash === 100) {
			console.log(`2: ${step}`);
			break;
		}
		for (let j=0; j<input.length; ++j) {
			for (let i=0; i<input[j].length; ++i) {
				if (input[j][i] <= 0) input[j][i] = 0;
			}
		}
		if (step === 100) console.log(`1: ${flashes}`);
	}
}
