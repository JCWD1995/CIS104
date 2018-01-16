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
	lot = PROMPT.question(`\nWhat lot will this be built on? `);
}

function getBed() {
	const BED_VALUE = 17000;
	process.stdout.write('\x1Bc');
	let bed = PROMPT.question(`\nHow many bedrooms are in this house? `);
	value = value+(bed*BED_VALUE);
}

function getBath() {
	const BATH_VALUE = 12500;
	process.stdout.write('\x1Bc');
	let bath = PROMPT.question(`\nHow many bathrooms are in this house? `);
	value = value+(bath*BATH_VALUE);
}

function getGarage() {
	const GARAGE_VALUE = 6000;
	process.stdout.write('\x1Bc');
	let garage = PROMPT.question(`\nHow many cars can fit in the garage? `);
	value = value+(garage*GARAGE_VALUE);
}

function displayValues() {
	process.stdout.write('\x1Bc');
	console.log("\nThe house being buit on lot " + lot + " will cost $" + value + ".");
}

