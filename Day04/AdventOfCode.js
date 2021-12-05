const readline = require("readline");
const fs = require("fs");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

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

function checkForWin(grid) {
	for (let i=0; i<grid.length; ++i) {
		if (
			grid[i][0] === true &&
			grid[i][1] === true &&
			grid[i][2] === true &&
			grid[i][3] === true &&
			grid[i][4] === true
		) return true;
		if (
			grid[0][i] === true &&
			grid[1][i] === true &&
			grid[2][i] === true &&
			grid[3][i] === true &&
			grid[4][i] === true
		) return true;
	}
	return false;
}

function ContestResponse() {
	let numbers = input[0].split(",").map(Number);
	let grids = [[]];
	let winner;

	for (let i=1; i<input.length; ++i) {
		if (input[i].length === 0) continue;

		if (grids[grids.length-1].length < 5) {
			grids[grids.length-1].push(input[i].split(" "));
		} else  {
			grids.push([input[i].split(" ")]);
		}
	}

	for (let k=0; k<grids.length; ++k) {
		for (let i=0; i<grids[k].length; ++i) {
			grids[k][i] = grids[k][i].filter((val) => val !== "").map(Number);
		}
	}

	for (let nb of numbers) {
		main:for (let k=0; k<grids.length; ++k) {
			for (let i=0; i<grids[k].length; ++i) {
				for (let j=0; j<grids[k][i].length; ++j) {
					if (nb === grids[k][i][j]) {
						grids[k][i][j] = true;
						if (checkForWin(grids[k])) {
							winner = grids[k].reduce((acc, val) => acc + val.reduce((acc, val) => val===true?acc:acc + val, 0), 0) * nb;
							console.log(`1: ${winner}`);
							grids.splice(k, 1);
							--k;
							continue main;
						}
					}
				}
			}
		}
	}
}
