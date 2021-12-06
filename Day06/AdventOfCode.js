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
		fishs[0] = fishs[1];
		fishs[1] = fishs[2];
		fishs[2] = fishs[3];
		fishs[3] = fishs[4];
		fishs[4] = fishs[5];
		fishs[5] = fishs[6];
		fishs[6] = fishs[7] + temp;
		fishs[7] = fishs[8];
		fishs[8] = temp;

		if (i === 80 - 1) {
			fishcount = fishs.reduce((acc, val) => acc + val, 0);
			console.log(`1: ${fishcount}`);
		}
	}

	fishcount = fishs.reduce((acc, val) => acc + val, 0);
	console.log(`2: ${fishcount}`);
}
