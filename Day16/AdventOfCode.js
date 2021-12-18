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

function operate(acc, val, typeID) {
	switch (typeID) {
		case 0:
			return acc + val;
		case 1:
			return acc * val;
		case 2:
			return Math.min(acc, val);
		case 3:
			return Math.max(acc, val);
		case 5:
			return acc > val ? 1 : 0;
		case 6:
			return acc < val ? 1 : 0;
		case 7:
			return acc === val ? 1 : 0;
		default:
			return null;
	}
}

function zeroLead(bit4) {
	let nb = 4 - bit4.length;
	for (let i=0; i<nb; ++i) bit4 = "0" + bit4;
	return bit4;
}

function recursePackets(packet) {
	if (packet.filter(a => a !== "0").length === 0) return [0, []];
	let version = parseInt(packet.splice(0, 3).join(""), 2);
	let typeID = parseInt(packet.splice(0, 3).join(""), 2);
	let lengthTypeID;
	
	if (typeID === 4) {
		let last = "";
		let number = [];
		let sumver = version;
		do {
			last = packet.splice(0, 5);
			number.push(...last.slice(-4));
		} while (last[0] === "1");
		let value = parseInt(number.join(""), 2);
		return [sumver, packet, value];
	} else {
		lengthTypeID = parseInt(packet.splice(0, 1).join(""), 2);
	}
	
	if (lengthTypeID === 0) {
		let length = parseInt(packet.splice(0, 15).join(""), 2);
		let subpackets = packet.splice(0, length);
		let sumver = version;
		let value = undefined;
		while (subpackets.length !== 0) {
			[ver, subpackets, val] = recursePackets(subpackets);
			sumver += ver;
			value = value === undefined ? val : operate(value, val, typeID);
		}
		return [sumver, packet, value];

	} else if (lengthTypeID === 1) {
		let subpacketsNb = parseInt(packet.splice(0, 11).join(""), 2);
		let sumver = version;
		let value = undefined;
		while (subpacketsNb --> 0) {
			[ver, packet, val] = recursePackets(packet);
			sumver += ver;
			value = value === undefined ? val : operate(value, val, typeID);
		}
		return [sumver, packet, value];
	}

	return null;
}

function ContestResponse() {
	input = input.filter(a => a.length !== 0);
	input = input[0].split("").reduce((a, v) => a.concat(...zeroLead(parseInt(v, 16).toString(2)).split("")), []);

	let [sumver, garbage, value] = recursePackets(input);

	console.log(`1: ${sumver}`);
	console.log(`2: ${value}`);
}
