const readline = require("readline");
const fs = require("fs");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const { exit } = require("process");
const { start } = require("repl");

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
	let fishcount = 0;
	let ages = input[0].split(",").map(Number);
	let fishs = [0,0,0,0,0,0,0,0,0];
	for (let age of ages) fishs[age]++;

	for (let i=0; i<256; ++i) {
		let temp = fishs[0];
		for (let age=0; age<8; ++age) {
			fishs[age] = fishs[age+1];
		}
		fishs[6] += temp;
		fishs[8] = temp;

		if (i === 80 - 1) {
			fishcount = fishs.reduce((acc, val) => acc + val, 0);
			console.log(`1: ${fishcount}`);
		}
	}

	fishcount = fishs.reduce((acc, val) => acc + val, 0);
	console.log(`2: ${fishcount}`);
}
