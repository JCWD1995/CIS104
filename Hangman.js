#!/usr/bin/nodejs

/*
	Author: Jiminy Cricket
	Class: CIS104
	Version: 1.0
	Purpose:
*/

"use strict";
const PROMPT = require('readline-sync');
const IO = require('fs');

let letters = [], correctLetters = [], defaultWords = [], guessedLetters = [];

let continueResponse, solve;
let wrongGuess, maxWrongGuess;
let word;
let guess;

const YES = Number(1);
const NO = Number(0);

function main() {
	clearScreen();
	setContinueResponse();
	readWords();
	while (continueResponse === YES) {
		setSolve();
		setWrongGuess();
		setDifficulty();
		setWord();
		populateCorrectLetters();
		populateLetters();
		resetGuessedLetters();
		while (solve !== YES && wrongGuess !== maxWrongGuess) {
			setGuess();
			checkGuess();
		}
		printResults();
		setContinueResponse();
	}
}

main();

function setContinueResponse() {
	if (continueResponse === 1 || continueResponse === 0) {
		continueResponse = -1;
		while (isNaN(continueResponse) || (continueResponse !== 1 && continueResponse !== 0)) {
			continueResponse = Number(PROMPT.question(`Would you like to continue?\n1=yes, 0=no\n`));
			if (isNaN(continueResponse) || (continueResponse !== 1 && continueResponse !== 0)) {
				console.log("INVALID RESPONSE");
				PROMPT.question("Press enter to continue.");
				process.stdout.write("\x1Bc");
			}
		}
	} else {
		continueResponse = YES;
	}
}

function clearScreen() {
	process.stdout.write('\x1Bc');
}

function readWords() {
	let file = IO.readFileSync("words.txt", "utf8");
	defaultWords = file.toString().split(/\r?\n/);
	defaultWords.pop(); //remove extra value
}

function setSolve() {
	solve = NO;
}

function setWrongGuess() {
	wrongGuess = Number(0);
}

function setDifficulty() {
	let difficulty;
	let MIN_DIFFICULTY = 1;
	let MAX_DIFFICULTY = 5;
	while (isNaN(difficulty) || difficulty < MIN_DIFFICULTY || difficulty > MAX_DIFFICULTY || difficulty %1 !== 0) {
		clearScreen();
		console.log("What difficulty would you like to play at?");
		difficulty = Number(PROMPT.question("1 is easiest, 5 is hardest, 3 is standard.\n"));
		if (isNaN(difficulty) || difficulty < MIN_DIFFICULTY || difficulty > MAX_DIFFICULTY || difficulty %1 !== 0) {
			console.log("INVALID INPUT");
			PROMPT.question("Press enter to continue.");
		}
	}
	setMaxWrongGuess(difficulty);
}

function setMaxWrongGuess(i) {
	switch (i) {
		case 1: maxWrongGuess = 12;
			break;
		case 2: maxWrongGuess = 8;
			break;
		case 3: maxWrongGuess = 6;
			break;
		case 4: maxWrongGuess = 3;
			break;
		case 5: maxWrongGuess = 1;
			break;
	}
	maxWrongGuess = Number(maxWrongGuess);
}

function setWord() {
	let pick;
	while (pick !== YES && pick !== NO) {
		pick = Number(PROMPT.question("Would you like to pick your own word?\n 1=yes, 0=no\n"));
		if (pick !== YES && pick !== NO) {
			console.log("INVALID RESPONSE");
			PROMPT.question("Press enter to continue.");
			clearScreen();
		}
	}
	if (pick === YES) {
		let check;
		while (check !== YES) {
			word = PROMPT.question("What word would you like to use?\nPlease write a word between 2 and 20 letters, all lowercase.\n");
			check = checkWord();
			if (check !== YES) {
				console.log("INVALID RESPONSE");
				PROMPT.question("Press enter to continue.");
				clearScreen();
			}
		}
		pushWord();
	} else {
		word = randomWord();
	}
}

function checkWord() {
	let wordLetters = word.split("");
	let test = YES;
	const MIN_WORD_LENGTH = Number(2);
	const MAX_WORD_LENGTH = Number(20);
	if (wordLetters.length < MIN_WORD_LENGTH || wordLetters.length > MAX_WORD_LENGTH) {
		test = NO;
	}
	for (let i = 0; i < wordLetters.length; i++) {
		if (! /^[a-z]$/.test(wordLetters[i])) {
			test = NO;
		}
	}
	return test;
}

function pushWord() {
	let test;
	for (let i = 0; i < defaultWords; i++) {
		if (word === defaultWords[i]) {
			test = NO;
		}
	}
	if (test !== NO) {
		defaultWords.push(word);
		writeWords();
	}
}

function writeWords() {
	IO.appendFileSync("words.txt", `\n${defaultWords[defaultWords.length - 1]}`);
}

function randomWord() {
	return defaultWords[Math.floor(Math.random()*defaultWords.length)+0]
}

function populateCorrectLetters() {
	correctLetters = word.split('');
}

function populateLetters() {
	letters = [];
	for (let i = 0; i < correctLetters.length; i++) {
		letters.push("_");
	}
}

function resetGuessedLetters() {
	guessedLetters = [];
}

function setGuess() {
	let check;
	guess = -1;
	while (check !== YES) {
		clearScreen();
		console.log(`You have made ${wrongGuess} incorrect guesses out of ${maxWrongGuess}`);
		printGuessedLetters();
		printLetters();
		guess = PROMPT.question("Please enter a lowercase letter you would like to use to guess at the word.\n");
		check = testGuess();
		if (check !== YES) {
			console.log("INVALID INPUT");
			PROMPT.question("Press enter to continue.");
		}
	}
	pushGuessedLetters();
}

function printGuessedLetters() {
	let letterString = "";
	for (let i = 0; i < guessedLetters.length; i++) {
		letterString = letterString + guessedLetters[i] + " ";
	}
	console.log(letterString);
}

function printLetters() {
	let letterString = "";
	for (let i = 0; i < letters.length; i++) {
		letterString = letterString + letters[i] + " ";
	}
	console.log(letterString);
}

function testGuess() {
	let test = YES;
	if (! /^[a-z]$/.test(guess)) {
		test = NO;
	}
	for (let i = 0; i < guessedLetters.length; i++) {
		if (guessedLetters[i] === guess) {
			test = NO;
		}
	}
	return test;
}

function pushGuessedLetters() {
	guessedLetters.push(guess);
}

function checkGuess() {
	let check;
	for (let i = 0; i < correctLetters.length; i++) {
		if (guess === correctLetters[i]) {
			letters[i] = guess;
			check = YES;
		}
	}
	if (check === YES) {
		checkSolve();
	} else {
		incrementWrongGuess();
	}
}

function checkSolve() {
	let check = Number(0);
	const MAX = Number(letters.length);
	for (let i = 0; i < MAX; i++) {
		if (letters[i] !== correctLetters[i]) {
			break;
		}
		check++;
	}
	if (check === MAX) {
		solve = YES;
	}
}

function incrementWrongGuess() {
	wrongGuess++;
}

function printResults() {
	clearScreen();
	if (solve === YES) {
		console.log("CONGRATULATIONS! YOU WIN!!!");
	} else {
		console.log("Better luck next time!");
	}
	PROMPT.question("Press enter to continue.");
}

