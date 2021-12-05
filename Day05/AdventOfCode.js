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
	let floor = []
	for (let i=0; i<1000; ++i) {
		floor.push([]);
		for (let j=0; j<1000; ++j) {
			floor[i].push(0);
		}
	}
	let overlaps = 0;

	for (let line of input) {
		if (line.length === 0) continue;
		let [startx, starty, endx, endy] = RegExp(/^([0-9]*),([0-9]*) -> ([0-9]*),([0-9]*)$/).exec(line).slice(1).map(Number);
		
		if (startx !== endx && starty !== endy) { // deactivate this bloc for part 1
			for (let i=startx, j=starty; startx<endx?i<=endx:i>=endx; i+=(startx<endx?1:-1), j+=(starty<endy?1:-1)) {
				++floor[j][i];
			}
		} else {
			for (let i=Math.min(startx, endx); i<=Math.max(startx, endx); ++i) {
				for (let j=Math.min(starty, endy); j<=Math.max(starty, endy); ++j) {
					++floor[j][i];
				}
			}
		}
	}
	// console.table(floor);

	overlaps = floor.reduce((acc, val) => acc + val.reduce((acc, val) => acc + (val>=2?1:0), 0), 0);
	console.log(`overlaps: ${overlaps}`);
}