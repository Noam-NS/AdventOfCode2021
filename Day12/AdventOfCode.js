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


function findAllPaths(caves, cave, path) {
	let sumpaths = 0;
	if (cave === "end") return 1;
	path.push(cave);
	for (let subcave of caves[cave]) {
		if (path.includes(subcave) && RegExp(/^[a-z]+$/).test(subcave)) continue;
		sumpaths += findAllPaths(caves, subcave, path);
	}
	path.pop();
	return sumpaths;
}


function findAllPaths2(caves, cave, path) {
	let sumpaths = 0;
	if (cave === "end") {
		if (path.reduce((acc, val, i, arr) => acc + !(arr.indexOf(val) === i || RegExp(/^[A-Z]+$/).test(val)), 0) <= 1) return 1;
		else return 0;
	}
	path.push(cave);
	for (let subcave of caves[cave]) {
		if ((path.reduce((acc, val) => acc + (val === subcave), 0) >= 2 && RegExp(/^[a-z]+$/).test(subcave)) || subcave === "start") continue;
		sumpaths += findAllPaths2(caves, subcave, path);
	}
	path.pop();
	return sumpaths;
}

function ContestResponse() {
	input = input.filter(a => a.length !== 0);
	let caves = {};
	for (let line of input) {
		let [cave1, cave2] = line.split("-");
		if (caves[cave1] === undefined) caves[cave1] = [cave2];
		else caves[cave1].push(cave2);
		if (caves[cave2] === undefined) caves[cave2] = [cave1];
		else caves[cave2].push(cave1);
	}

	let paths = findAllPaths(caves, "start", []);
	console.log(`1: ${paths}`);

	paths = findAllPaths2(caves, "start", []);
	console.log(`2: ${paths}`);
}
