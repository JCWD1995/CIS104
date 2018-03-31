#!/usr/bin/nodejs

/*
	Author: Jiminy Cricket
	Class: CIS104
	Version: 1.0
	Purpose: Find trends in music
*/

"use strict";
const PROMPT = require('readline-sync');

let downloads = [];
let continueResponse;
let genre, songName;
let price;

const GENRES = ["Classical", "Easy Listening", "Jazz", "Pop", "Rock", "Other"];
const PRICES = ["Under $3", "$3-$5.99", "$6-$9.99", "Over $10"];
const YES = Number(1);

function main() {
	setContinueResponse();
	initializeDownloads();
	while (continueResponse === YES) {
		setGenre();
		setSongName();
		setPrice();
		pushDownload();
		sortDownloads();
		setContinueResponse();
	}
	printInfo();
}

main();

function setContinueResponse() {
	if (continueResponse === 1 || continueResponse === 0) {
		continueResponse = -1;
		while (isNaN(continueResponse) || (continueResponse !== 1 && continueResponse !== 0)) {
			continueResponse = Number(PROMPT.question(`Would you like to continue?\nEnter 1 for yes and 0 for no.\n`));
			if (isNaN(continueResponse) || (continueResponse !== 1 && continueResponse !== 0)) {
				console.log("INVALID RESPONSE");
				PROMPT.question("Press enter to continue.");
				process.stdout.write("\x1Bc");
			}
		}
	} else {
		continueResponse = Number(1);
	}
}

function initializeDownloads() {
	for (let i = 0; i < GENRES.length; i++) {
		downloads.push([GENRES[i], []]);
		for (let j = 0; j < PRICES.length; j++) {
			downloads[i][1].push([PRICES[j]]);
		}
	}
}

function printDownloads() { //Troubleshooting Function, FUTURE ME: REMOVE THIS!
	for (let i = 0; i < downloads.length; i++) {
		console.log(`${downloads[i][0]}:`);
		console.log("PRICES:");
		for (let j = 0; j < downloads[i][1].length; j++) {
			console.log(downloads[i][1][j]);
		}
	}
}


function setGenre() {
	let i;
	while (isNaN(i) || i < 1 || i > GENRES.length) {
		printGenres();
		i = PROMPT.question("Which genre is this song?\nEnter the number next to the genre.");
		if (isNaN(i) || i < 1 || i > GENRES.length) {
			console.log("INVALID RESPONSE");
			PROMPT.question("Press enter to continue.");
			process.stdout.write("\x1Bc");
		}
	}
	genre = GENRES[i-1];
}

function printGenres() {
	for (let i = 0; i < GENRES.length; i++) {
		console.log(`${i+1}. ${GENRES[i]}`);
	}
}

function setSongName() {
	songName = PROMPT.question("What is the name of this song?");
}

function setPrice() {
	const MIN_PRICE = Number(.49);
	const MAX_PRICE = Number(15);
	price = -1;
	while (isNaN(price) || price < MIN_PRICE || price > MAX_PRICE) {
		price = Number(PROMPT.question("How much did this song cost?"));
		if (isNaN(price) || price < MIN_PRICE || price > MAX_PRICE) {
			console.log("INVALID INPUT");
			PROMPT.question("Press enter to continue.");
			process.stdout.write("\x1Bc");
		}
	}
}

function pushDownload() {
	let i = findGenreArray();
	let j = findPriceArray();
	downloads[i][1][j].push([songName, price]);
}

function findGenreArray() {
	for (let i = 0; i < downloads.length; i++) {
		if (downloads[i][0] === genre) {
			return i;
			break;
		}
	}
}

function findPriceArray() {
	if (price < 3) {
		return 0;
	} else if (price < 6) {
		return 1;
	} else if (price < 10) {
		return 2;
	} else {
		return 3;
	}
}

function sortDownloads() {
	let temp;
	let k;
	let total1;
	let total2;
	for (let i = 0; i < downloads.length; i++) {
		for (let j = 0; j < downloads.length-i-1; j++) {
			k = Number(j) + 1;
			total1 = Number(0);
			total2 = Number(0);
			for (let l = 0; l < downloads[j][1].length; l++) {
				total1 = total1 + downloads[j][1][l].length;
			}
			for (let l = 0; l < downloads[k][1].length; l++) {
				total2 = total2 + downloads[k][1][l].length;
			}
			if (total1 < total2) {
				temp = downloads[j];
				downloads[j] = downloads[k];
				downloads[k] = temp;
			}
		}
	}
}

function printInfo() {
	printDownloads();
	PROMPT.question();
	let total;
	process.stdout.write("\x1Bc");
	console.log("The most popular genres are in the following order:");
	for (let i = 0; i < downloads.length; i++) {
		total = Number(0);
		for (let j = 0; j < downloads[i][1][j].length; j++) {
			total = total + downloads[i][1][j].length-1; //Remove the extra saying which category this is in
		}
		console.log(`${i+1}. ${downloads[i][0]} with ${total} downloads`);
		console.log("The downloads were in the following categories:");
		printPriceData(i);
		console.log("********");
	}
}

function printPriceData(i) {
	for (let j = 0; j < downloads[i][1][j].length; j++) {
		console.log(`There are ${downloads[i][1][j].length-1} downloads in the ${downloads[i][1][0]} category.`);
	}
}

