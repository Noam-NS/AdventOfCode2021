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

	let template = input.splice(0, 1)[0].split("");
	let templateCount = {};
	for (let pair=0; pair<template.length-1; ++pair) {
		if (templateCount[[template[pair], template[pair+1]].join("")] === undefined) templateCount[[template[pair], template[pair+1]].join("")] = 0;
		templateCount[[template[pair], template[pair+1]].join("")]++;
	}

	let instructions = {};
	for (let line of input) {
		let [pair, toInsert] = RegExp(/^([A-Z]{2}) -> ([A-Z])$/).exec(line).slice(1);
		instructions[pair] = toInsert;
	}

	for (let i=0; i<40; ++i) {
		let nextTemplateCount = {};
		for (let pair in templateCount) {
			nextTemplateCount[[pair[0], instructions[pair]].join("")] = nextTemplateCount[[pair[0], instructions[pair]].join("")] ? nextTemplateCount[[pair[0], instructions[pair]].join("")] + templateCount[pair] : templateCount[pair];
			nextTemplateCount[[instructions[pair], pair[1]].join("")] = nextTemplateCount[[instructions[pair], pair[1]].join("")] ? nextTemplateCount[[instructions[pair], pair[1]].join("")] + templateCount[pair] : templateCount[pair];
		}
		templateCount = nextTemplateCount;
	}

	let letterCount = {};
	for (let pair in templateCount) {
		letterCount[pair[0]] = letterCount[pair[0]] ? letterCount[pair[0]] + templateCount[pair] : templateCount[pair];
		letterCount[pair[1]] = letterCount[pair[1]] ? letterCount[pair[1]] + templateCount[pair] : templateCount[pair];
	}
	letterCount[template[0]]++;
	letterCount[template[template.length-1]]++;
	for (let letter in letterCount) {
		letterCount[letter] /= 2;
	}

	console.log(`1: ${Math.max(...Object.values(letterCount)) - Math.min(...Object.values(letterCount))}`);
}
