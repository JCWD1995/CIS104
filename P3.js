#!/usr/bin/nodejs

/*
	Author: Jiminy Cricket
	Class: CIS 104
	Version: 1.0
	Purpose: give ratings to a movie
*/

"use strict";
const PROMPT = require('readline-sync');

let ratings = [];
let newRating, invalidResponse;
const RATING = {
	MIN: 1,
	MAX: 5,
	INVALID: 3
}

function main() {
	setInvalidResponse();
	while (invalidResponse < RATING.INVALID) {
		setNewRating();
		checkNewRating();
	}
	setAverageRating();
}

main();

function setInvalidResponse() {
	invalidResponse = 0;
}

function setNewRating() {
	process.stdout.write('\x1Bc');
	console.log("Current invalid ratings are " + invalidResponse + " out of " + RATING.INVALID + " in a row.");
	newRating = Number(PROMPT.question(`\nWhat rating would you give this movie?\n`));
}

function checkNewRating() {
	if (isNaN(newRating) || newRating > RATING.MAX || newRating < RATING.MIN) {
		incrementInvalidResponse();
	} else {
		addRating();
	}
}

function incrementInvalidResponse() {
	invalidResponse = invalidResponse+1;
}

function addRating() {
	ratings.push(newRating);
	invalidResponse = 0;
}

function setAverageRating() {
	let ratingSum = Number(0);
	const ALL_RATINGS = ratings.length;
	for (let i = 0; i < ALL_RATINGS; i++) {
		ratingSum = ratingSum + ratings[i];
	}
	let averageRating = ratingSum/ALL_RATINGS;
	printAverageRating(averageRating);
}

function printAverageRating(averageRating) {
	process.stdout.write('\x1Bc');
	console.log("The average rating of this movie is " + averageRating + " out of 5.");
}

