#!/usr/bin/nodejs

/*
	Author: Jiminy Cricket
	Class: CIS104
	Version: 1.0
	Purpose:
*/
"use strict";
const PROMPT = require('readline-sync');

let purchases = [];
let genre, name;
let cost;
let continueResponse;
const GENRES = ["Classical", "Easy Listening", "Jazz", "Pop", "Rock", "Other"];
const YES = Number(1);
const NO = Number(0);

function main() {
	setContinueResponse();
	setPurchasesGenre();
	while (continueResponse === YES) {
		setName();
		setGenre();
		setCost();
		pushPurchases();
		sortPurchases();
	}
}

main();

function setContinueResponse() {
	if (continueResponse === YES || continueResponse === NO) {
		process.stdout.write("\x1Bc");
		while (isNaN(continueResponse) || (continueResponse !== YES && continueResponse !== NO)) {
			continueResponse = Number(PROMPT.question("Would you like to continue? [1=yes,0=no]"));
			if (isNaN(continueResponse) || (continueResponse !== YES && continueResponse !== NO)) {
				console.log("INVALID RESPONSE");
				PROMPT.question("Press enter to continue.");
				process.stdout.write("\x1Bc");
			}
		}
	} else {
		continueResponse = Number(1);
	}
}

function setPurchasesGenre() {
	for (let i = 0; i < GENRES.length; i++) {
		purchases[i] = [];
		purchases[i][0] = GENRES[i];
	}
}

function setName() {
	process.stdout.write("\x1Bc");
	name = PROMPT.question("What is the name of the song purchased?\n");
}

function setGenre() {
	let test;
	process.stdout.write("\x1Bc");
	console.log("Which of the following genres is this song?\n");
	for (let i = 0; i < GENRES.length; i++) {
		console.log(GENRES[i]);
	}
	genre = PROMPT.question("Please enter your selection:\n");
	test = checkGenre();
	if (test === NO) {
		console.log("INVALID RESPONSE");
		PROMPT.question("Press enter to continue.");
		return setGenre();
	}
}

function checkGenre() {
	for (let i = 0; i < GENRES.length; i++) {
		if (GENRES[i] === genre) {
			return YES;
		}
	}
	return NO;
}

function setCost() {
	process.stdout.write("\x1Bc");
	const MIN_COST = Number(.99);
	const MAX_COST = Number(20.00);
	cost = -1;
	while (isNaN(cost) || cost < MIN_COST || cost > MAX_COST) {
		cost = Number(PROMPT.question("How much did this song cost?"));
		if (isNaN(cost) || cost < MIN_COST || cost > MAX_COST) {
			console.log("INVALID RESPONSE");
			PROMPT.question("Press enter to continue.");
			process.stdout.write("\x1Bc");
		}
	}
}

function pushPurchases() {
	for (let i = 0; i < purchases.length; i++) {
		if (genre === purchases[i]) {
			purchases[i].push(name, cost);
		}
	}
}

function sortPurchases() {
	for (let i = 0; i < purchases.length; i++) {
		for (let j = purchases.length; j > i; j--) {
			if (purchases[j].length > purchases[j-1]) {
				temp = purchases[j];
				purchases[j] = purchases[j-1];
				purchases[j-1] = temp;
			}
		}
	}
	for (let i = 0; i < purchases.length; i++) {
		console.log(purchases[i].length);
	}
	process.stdout.write("\x1Bc");
}

