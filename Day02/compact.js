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


function ContestResponse() {
	console.log("1: "+String(input.reduce((a,v)=>a+(BigInt(v.split(" ")[1]))*(BigInt(v.split(" ")[0]==="forward")*1000000000n+BigInt(v.split(" ")[0]==="down")-BigInt(v.split(" ")[0]==="up")),0n)).split("0").filter(n=>n.length!==0).reduce((a,v)=>a*v,1));
}
