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


function fold(paper, instruction) {
	if (instruction[0] === "x") {
		let toFold = [];
		for (let j in paper) {
			toFold.push([]);
			toFold[j] = paper[j].slice(+instruction[1]+1);
		}
		let reversedToFold = [];
		for (let j in toFold) {
			reversedToFold.push([]);
			for (let i in toFold[j]) {
				reversedToFold[j].unshift(toFold[j][i]);
			}
		}
		for (let j in paper) {
			paper[j] = paper[j].slice(0, +instruction[1]);
		}
		while (paper[0].length > reversedToFold[0].length) {
			for (let j in reversedToFold) {
				reversedToFold[j].unshift(0);
			}
		}
		while (paper[0].length < reversedToFold[0].length) {
			for (let j in paper) {
				paper[j].unshift(0);
			}
		}
		for (let j in paper) {
			for (let i in paper[j]) {
				paper[j][i] = paper[j][i] | reversedToFold[j][i];
			}
		}
	} else if (instruction[0] === "y") {
		let toFold = paper.slice(+instruction[1]+1);
		let reversedToFold = [];
		for (let i in toFold) reversedToFold.unshift(toFold[i]);
		paper = paper.slice(0, +instruction[1])
		while (paper.length > reversedToFold.length) {
			reversedToFold.unshift(Array(reversedToFold[0].length).fill(0));
		}
		while (paper.length < reversedToFold.length) {
			paper.unshift(Array(paper[0].length).fill(0));
		}
		for (let j in paper) {
			for (let i in paper[j]) {
				paper[j][i] = paper[j][i] | reversedToFold[j][i];
			}
		}
	} else {
		console.log(`Error in instructions: ${instruction[0]}`);
	}
	return paper;
}

function ContestResponse() {
	input = input.filter(a => a.length !== 0);
	let xs = [];
	let ys = [];
	let instructions = [];
	for (let line of input) {
		if (RegExp(/^fold along (x|y)=([0-9]+)$/).exec(line)) {
			instructions.push(RegExp(/^fold along (x|y)=([0-9]+)$/).exec(line).slice(1));
		} else {
			let [x, y] = line.split(",").map(Number);
			xs.push(x);
			ys.push(y);
		}
	}
	let paper = [];
	for (let j=0; j<=Math.max(...ys); ++j) {
		paper.push([]);
		for (let i=0; i<=Math.max(...xs); ++i) {
			paper[j].push(0);
		}
	}
	console.log({"xMax": Math.max(...xs), "yMax": Math.max(...ys)});
	for (let line of input) {
		if (RegExp(/^fold along (x|y)=([0-9]+)$/).test(line)) continue;
		let [x, y] = line.split(",").map(Number);
		paper[y][x] = 1;
	}

	for (let k=0; k<1; ++k) {
		paper = fold(paper, instructions[k]);
	}

	let dotCount = paper.reduce((acc, val) => acc + val.reduce((acc, val) => acc + val, 0), 0);
	console.log(`1: ${dotCount}`);

	for (let k=1; k<instructions.length; ++k) {
		paper = fold(paper, instructions[k]);
	}

	console.log("2:");
	for (let line of paper) {
		for (let char of line) {
			process.stdout.write(char===1?"#":" ");
		}
		process.stdout.write("\n");
	}
}
