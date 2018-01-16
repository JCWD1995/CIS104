#!/usr/bin/nodejs

/*
Author: Jiminy Cricket
Class: CIS 104
Version: 1.0
Purpose: Find a value for a house
*/

"use strict";
const PROMPT = require('readline-sync');

let lot, value;

function main() {
	initialize();
	getLot();
	getBed();
	getBath();
	getGarage();
	displayValues();
}

main();

function initialize() {
	const BASE_PRICE = 50000;
	value = BASE_PRICE;
}

function getLot() {
	process.stdout.write('\x1Bc');
	while (isNaN(lot)) {
		lot = PROMPT.question(`\nWhat lot will this house be built on?`);
		if (isNaN(lot)) {
			console.log("INVALID INPUT");
		}
	}
}

function getBed() {
	const BED_VALUE = 17000;
	process.stdout.write('\x1Bc');
	let bed = "JC";
	while (isNaN(bed)) {
		bed = PROMPT.question(`\nHow many bedrooms are in this house?`);
		if (isNaN(bed)) {
			console.log("INVALID INPUT");
		}
	}
	value = value+(bed*BED_VALUE);
}

function getBath() {
	const BATH_VALUE = 12500;
	let bath = "JC"
	process.stdout.write('\x1Bc');
	while (isNaN(bath)) {
		bath = PROMPT.question(`\nHow many bathrooms are in this house?`);
		if (isNaN(bath)) {
			console.log("INVALID INPUT");
		}
	}
	value = value+(bath*BATH_VALUE);
}

function getGarage() {
	const GARAGE_VALUE = 6000;
	let garage = "JC";
	process.stdout.write('\x1Bc');
	while (isNaN(garage)) {
        	garage = PROMPT.question(`\nHow many bathrooms are in this house?`);
		if (isNaN(garage)) {
			console.log("INVALID INPUT");
		}
	}
	value = value+(garage*GARAGE_VALUE);
}

function displayValues() {
	process.stdout.write('\x1Bc');
	console.log("\nThe house being buit on lot " + lot + " will cost $" + value + ".");
}

function stopTimer() {
	timer.stop();
}
