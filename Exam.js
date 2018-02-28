#!/usr/bin/nodejs

/*
	Author: Jiminy Cricket
	Class: CIS104
	Version: 1.0
	Purpose: run an ATM machine
*/
"use strict";
const PROMPT = require('readline-sync');

let cards = [], names = [];
let continueResponse, test;
let name;
let cardNum, pin, option, wrong, n;
const INIT_BAL = Number(1000), YES = Number(1), NO = Number(0), MAX_WRONG = Number(3);

function main() {
	setContinueResponse();
	setNames();
	setCards();
	setTest();
	setWrong();
	while (test === 0 && wrong < MAX_WRONG) {
		setName();
		setCardNum();
		setPin();
		testInfo();
	}
	if (test === 1) {
		while (continueResponse === YES) {
			printOptions();
			setOption();
			directOption();
			setContinueResponse();
		}
		printGoodbye();
	} else {
		printUnauthorized();
	}
}

main();

function setContinueResponse() {
	if (continueResponse === YES || continueResponse === NO) {
		continueResponse = -1;
		while (isNaN(continueResponse) || (continueResponse !== YES && continueResponse !== NO)) {
			continueResponse = Number(PROMPT.question("Would you like to do another transaction? [1=yes,0=no]\n"));
			if (isNaN(continueResponse) || (continueResponse !== YES && continueResponse !== NO)) {
				console.log("INVALID RESPONSE");
				PROMPT.question("Press enter to continue.\n");
				process.stdout.write("\x1Bc");
			}
		}
	} else {
		continueResponse = YES;
	}
}

function setNames() {
	names[0] = "Holly Karren";
	names[1] = "George Holland";
	names[2] = "William Dole";
	names[3] = "Jiminy Cricket";
}

function setCards() {
	for (let i = 0; i < names.length; i++) {
		cards[i] = [];
		cards[i][0] = names[i];
		cards[i][1] = `123456789012345` + `${i}`;
		cards[i][2] = `123` + `${i}`;
		cards[i][3] = INIT_BAL;
		cards[i][4] = INIT_BAL;
	}
}

function setTest() {
	test = Number(0);
}

function setWrong() {
	wrong = Number(0);
}

function setName() {
	process.stdout.write("\x1Bc");
	name = PROMPT.question("What is your cardholder name?\n");
}

function setCardNum() {
	process.stdout.write("\x1Bc");
	cardNum = PROMPT.question("What is your card number?\n");
}

function setPin() {
	process.stdout.write("\x1Bc");
	pin = PROMPT.question("What is your card's PIN?\n");
}

function testInfo() {
	let check = Number(0);
	for (let i = 0; i < cards.length; i++) {
		if (cards[i][0] === name) {
			if (cards[i][1] === cardNum) {
				if (cards[i][2] === pin) {
					n = i;
					check = 1;
				}
			}
			break;
		}
	}
	if (check === 0) {
		wrong++;
	} else {
		test = Number(1);
	}
}

function printOptions() {
	process.stdout.write("\x1Bc");
	console.log("1. Withdraw");
	console.log("2. Deposit");
	console.log("3. Transfer");
	console.log("4. Inquiry");
}

function setOption() {
	option = Number(PROMPT.question("What would you like to do today?\nPlease enter a number between 1 and 4.\n"));
}

function directOption() {
	process.stdout.write("\x1Bc");
	switch (option) {
		case 1: withdraw();
			break;
		case 2: deposit();
			break;
		case 3: transfer();
			break;
		case 4: inquery();
			break;
		default: console.log("INVALID INPUT");
			 PROMPT.question("Press enter to continue.\n");
	}
}

function withdraw() {
	option = -1;
	while (isNaN(option) || (option !== 1 && option !== 0)) {
		option = Number(PROMPT.question("Which account would you like to draw from?\nPlease enter 0 for checking and 1 for savings.\n"));
		if (isNaN(option) || (option !== 1 && option !== 0)) {
			console.log("INVALID INPUT");
			PROMPT.question("Press enter to continue.\n");
			process.stdout.write("\x1Bc");
		}
	}
	if (option === 0) {
		withdrawAmount(3,"checking");
	} else {
		withdrawAmount(4,"savings");
	}
}
		
function withdrawAmount(i,accountType) {
	let amount;
	const MIN_AMOUNT = 0;
	const MAX_AMOUNT = cards[n][i];
	while (isNaN(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
		amount = Number(PROMPT.question(`How much would you like to withdraw from your ${accountType} account?\n`));
		if (amount < MIN_AMOUNT) {
			console.log("Please enter a number greater than 0.");
			PROMPT.question("Press enter to continue.\n");
			process.stdout.write("\x1Bc");
		} else if (amount > MAX_AMOUNT) {
			console.log("You don't have that much money to withdraw!");
			PROMPT.question("Press enter to continue.\n");
			process.stdout.write("\x1Bc");
		} else if (isNaN(amount)) {
			console.log("Please enter a number.");
			PROMPT.question("Press enter to continue.\n");
			process.stdout.write("\x1Bc");
		}
	}
	cards[n][i] = cards[n][i] - amount;
	console.log(`You have ${cards[n][i]} left in your ${accountType} account.`);
	PROMPT.question("Press enter to continue.");
	process.stdout.write("\x1Bc");
}

function deposit() {
	option = -1;
	while (isNaN(option) || (option !== 1 && option !== 0)) {
		option = Number(PROMPT.question("Which account would you like to deposit to?\nPlease enter 0 for checking and 1 for savings.\n"));
		if (isNaN(option) || (option !== 1 && option !== 0)) {
			console.log("INVALID INPUT");
			PROMPT.question("Press enter to continue.\n");
			process.stdout.write("\x1Bc");
		}
	}
	if (option === 0) {
		depositAmount(3,"checking");
	} else {
		depositAmount(4,"savings");
	}
}

function depositAmount(i,accountType) {
	let amount;
	const MIN_AMOUNT = 0;
	const MAX_AMOUNT = 500;
	while (isNaN(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
		amount = Number(PROMPT.question(`How much would you like to deposit to your ${accountType} account?\nThere is a limit of $500 per deposit.\n`));
		if (amount < MIN_AMOUNT) {
			console.log("Please enter a number greater than 0.");
			PROMPT.question("Press enter to continue.");
			process.stdout.write("\x1Bc");
		} else if (amount > MAX_AMOUNT) {
			console.log("You cannot deposit more than $500 per transaction.\nPlease split up this deposit into multiple transactions.");
			PROMPT.question("Press enter to continue.");
			process.stdout.write("\x1Bc");
		} else if (isNaN(amount)) {
			console.log("Please enter a number.");
			PROMPT.question("Press enter to continue.");
			process.stdout.write("\x1Bc");
		}
	}
	cards[n][i] = cards[n][i] + amount;
	console.log(`You have ${cards[n][i]} left in your ${accountType} account.`);
	PROMPT.question("Press enter to continue.");
	process.stdout.write("\x1Bc");
}

function transfer() {
	option = -1;
	while (isNaN(option) || (option !== 1 && option !== 0)) {
		option = Number(PROMPT.question("Which account are you transferring from?\nPlease enter 0 for checking and 1 for savings\n"));
		if (isNaN(option) || (option !== 1 && option !== 0)) {
			console.log("INVALID INPUT");
			PROMPT.question("Press enter to continue.");
			process.stdout.write("\x1Bc");
		}
	}
	if (option === 0) {
		transferFunds(3,4,"checking","savings");
	} else {
		transferFunds(4,3,"savings","checking");
	}
}

function transferFunds(i,j,transFrom,transTo) {
	let amount;
	const MIN_AMOUNT = 0;
	const MAX_AMOUNT = cards[n][i];
	while (isNaN(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
		amount = Number(PROMPT.question(`How much would you like to transfer from your ${transFrom} account to your ${transTo} account?\n`));
		if (amount < MIN_AMOUNT) {
			console.log("Please enter a number greater than 0.");
			PROMPT.question("Press enter to continue.");
			process.stdout.write("\x1Bc");
		} else if (amount > MAX_AMOUNT) {
			console.log(`You do not have that much in your ${transFrom} account to transfer!`);
			PROMPT.question("Press enter to continue.");
			process.stdout.write("\x1Bc");
		} else if (isNaN(amount)) {
			console.log("INVALID INPUT");
			PROMPT.question("Press enter to continue.");
			process.stdout.write("\x1Bc");
		}
	}
	cards[n][i] = cards[n][i] - amount;
	cards[n][j] = cards[n][j] + amount;
	console.log(`Your ${transFrom} account now has a balance of ${cards[n][i]}`);
	console.log(`Your ${transTo} account now has a balance of ${cards[n][j]}`);
	PROMPT.question("Press enter to continue.");
	process.stdout.write("\x1Bc");
}

function inquery() {
	option = -1;
	while (isNaN(option) || (option !== 1 && option !== 0)) {
		option = Number(PROMPT.question("Which account would you like an inquiry for?\nPlease enter 0 for checking and 1 for savings\n"));
		if (isNaN(option) || (option !== 1 && option !== 0)) {
			console.log("INVALID INPUT");
			PROMPT.question("Press enter to continue.\n");
			process.stdout.write("\x1Bc");
		}
	}
	if (option === 0) {
		inqueryAccount(3,"checking");
	} else {
		inqueryAccount(4,"savings");
	}
}

function inqueryAccount(i,accountType) {
	console.log(`Your ${accountType} account has a balance of ${cards[n][i]}.`);
	PROMPT.question("Press enter to continue.");
	process.stdout.write("\x1Bc");
}

function printGoodbye() {
	console.log("Thank you for using this ATM. Goodbye.");
}

function printUnauthorized() {
	console.log("The credentials provided are do not match with any in our system. Terminating program.");
}

