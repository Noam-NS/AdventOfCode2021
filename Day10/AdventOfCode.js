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
	let errorScore = 0;
	let scoreTable = {
		"(": 3,
		"[": 57,
		"{": 1197,
		"<": 25137,
	};
	let corresp = {
		")": "(",
		"]": "[",
		"}": "{",
		">": "<",
	};
	
	mainloopP1: for (let i=0; i<input.length; ++i) {
		if (input[i].length === 0) continue;

		let depthTracker = "";
		
		for (let char of input[i]) {
			if ("([{<".includes(char)) {
				depthTracker += char;
			} else if (depthTracker[depthTracker.length-1] === corresp[char]) {
				depthTracker = depthTracker.slice(0, -1);
			} else {
				errorScore += scoreTable[corresp[char]];
				input.splice(i, 1);
				--i;
				continue mainloopP1;
			}
		}
	}
	console.log(`1: ${errorScore}`);


	let completeScores = [];
	scoreTable = {
		"(": 1,
		"[": 2,
		"{": 3,
		"<": 4,
	};

	mainloopP2: for (let i=0; i<input.length; ++i) {
		if (input[i].length === 0) continue;

		let depthTracker = "";
		
		for (let char of input[i]) {
			if ("([{<".includes(char)) {
				depthTracker += char;
			} else if (depthTracker[depthTracker.length-1] === corresp[char]) {
				depthTracker = depthTracker.slice(0, -1);
			} else {
				errorScore += scoreTable[corresp[char]];
				input.splice(i, 1);
				--i;
				continue mainloopP2;
			}
		}
		completeScores[i] = 0;
		for (let j=depthTracker.length-1; j>=0; --j) {
			completeScores[i] = completeScores[i]*5 + scoreTable[depthTracker[j]];
		}
	}
	completeScores = completeScores.sort((a,b)=>a-b);
	console.log(`2: ${completeScores[Math.floor(completeScores.length/2)]}`);
}
