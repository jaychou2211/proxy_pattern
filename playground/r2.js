const readline = require('readline');

const rl = readline.createInterface(
		process.stdin, process.stdout);

rl.setPrompt(`What is your age? `);
rl.prompt();

rl.on('line', (age) => {
	console.log(`Age received by the user: ${age}`);
	rl.close();
});
