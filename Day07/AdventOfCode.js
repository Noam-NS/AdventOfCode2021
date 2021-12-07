const readline = require("readline");
const fs = require("fs");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const { exit } = require("process");
const { start } = require("repl");
const { count } = require("console");

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
	let crabs = input[0].split(",").map(Number);

	let minFuel = Infinity;
	for (let i=Math.min(...crabs); i<=Math.max(...crabs); ++i) {
		let fuel = crabs.reduce((acc, val) => acc + Math.abs(i-val), 0);
		if (fuel < minFuel) minFuel = fuel;
	}
	console.log(`1: ${minFuel}`);

	minFuel = Infinity;
	for (let i=Math.min(...crabs); i<=Math.max(...crabs); ++i) {
		let fuel = crabs.reduce((acc, val) => acc + sumToZero(Math.abs(i-val)), 0);
		if (fuel < minFuel) minFuel = fuel;
	}
	console.log(`2: ${minFuel}`);
}
