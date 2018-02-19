#!/usr/bin/nodejs

/*
	Author: Jiminy Cricket
	Class: CIS 104
	Version: 1.0
	Purpose: Creates Kiosk program
*/

"use strict";
const PROMPT = require('readline-sync');

let reviews = [];

const YES = Number(1);
const RATING = {
	MAX: Number(5),
	MIN: Number(1)
}

function main() {
	while (0 === 0) {
		printMenu();
	}
}

main();

function printMenu() {
	process.stdout.write('\x1Bc');
	console.log("What would you like to do?");
	console.log("1. Review Movie");
	console.log("2. Look at Reviews");
	console.log("3. List average stars on a movie");
	let choice = Number(PROMPT.question("Give your option choice:\n"));
	directChoice(choice);
}

function directChoice(choice) {
	switch (choice) {
		case 1: giveReview();
			break;
		case 2: queryReviews();
			break;
		case 3: averageReviews();
			break;
		default: console.log("Invalid Value");
	}
}

function giveReview() {
	let title, rating;
	let review = [];
	title = setTitle();
	rating = setRating(title);
	review = setReview(title);
	pushReview(title, rating, review);
}

function setTitle() {
	process.stdout.write('\x1Bc');
	let name
	name = PROMPT.question("What movie would you like to review? \nPlease enter the movie title exactly as it is given in the theatre.\n");
	return name;
}

function setRating(title) {
	process.stdout.write('\x1Bc');
	let rating;
	while (isNaN(rating) || rating < RATING.MIN || rating > RATING.MAX) {
		rating = Number(PROMPT.question("Please give the rating for " + title + " on a scale between 1 and 5 stars.\n"));
		if (isNaN(rating) || rating < RATING.MIN || rating > RATING.MAX) {
			console.log("INVALID INPUT");
			PROMPT.question("Press enter to continue");
			process.stdout.write('\x1Bc');
		}
	}
	return rating;
}

function setReview(title) {
	let continueResponse = YES;
	let completeReview = [];
	let reviewPart;
	while (continueResponse === YES) {
		reviewPart = PROMPT.question("Write the next part of your review.\n");
		completeReview.push(reviewPart);
		continueResponse = setContinueReview();
	}
	return completeReview;
}

function setContinueReview() {
	let continueResponse = -1;
	while (continueResponse !== 1 && continueResponse !== 0) {
		continueResponse = Number(PROMPT.question("Do you have more to your review?\nEnter 1 for yes and 0 for no.\n"));
		if (continueResponse !== 1 && continueResponse !== 0) {
			console.log("INVALID RESPONSE");
			PROMPT.question("Press enter to continue");
			process.stdout.write('\x1Bc');
		}
	}
	return continueResponse;
}

function pushReview(title,rating,review) {
	let reviewInfo = [title, rating, review];
	reviews.push(reviewInfo);
}

function queryReviews() {
	process.stdout.write('\x1Bc');
	let choice;
	console.log("1. By title");
	console.log("2. By rating");
	choice = Number(PROMPT.question("Which way would you like to search?\nPlease enter your choice:\n"));
	directQuery(choice);
}

function directQuery(choice) {
	switch (choice) {
		case 1: queryTitle();
			break;
		case 2: queryRating();
			break;
		default: console.log("Invalid Response");
	}
}

function queryTitle() {
	process.stdout.write('\x1Bc');
	let title;
	title = PROMPT.question("Which movie would you like to see reviews for?\nPlease enter the title exactly as we post it.\n");
	printReviewsTitle(title);
}

function printReviewsTitle(title) {
	const ALL_REVIEWS = reviews.length;
	for (let i = Number(0); i < ALL_REVIEWS; i++) {
		if (reviews[i][0] = title) {
			console.log(i + " " + reviews[i][0] + " " + reviews[i][1] + " star review");
		}
	}
	pickReview();
}

function pickReview() {
	let choice;
	choice = Number(PROMPT.question("\nPlease pick which review you would like to view."));
	printReview(choice);
}

function printReview(i) {
	const FULL_REVIEW = reviews[i][2].length;
	console.log(reviews[i][0] + ": " + reviews[i][1] + " stars:");
	for (let j = 0; j < FULL_REVIEW; j++) {
		console.log(reviews[i][2][j]);
		console.log();
	}
	PROMPT.question("Press enter to go back to the main menu.");
}

function queryRating() {
	let rating = -1;
	while (isNaN(rating) || rating > RATING.MAX || rating < RATING.MIN) {
		rating = PROMPT.question("What rating are you wanting to search for?");
		if (isNaN(rating) || rating > RATING.MAX || rating < RATING.MIN) {
			console.log("INVALID INPUT");
			PROMPT.question("Press enter to continue.");
			process.stdout.write("\x1Bc");
		}
	}
	printReviewsRating(rating);
}

function printReviewsRating(rating) {
	const ALL_REVIEWS = reviews.length;
	for (let i = 0; i < ALL_REVIEWS; i++) {
		if (reviews[i][1] = rating) {
			console.log(i + " " + reviews[i][0] + " " + reviews[i][1] + " star review");
		}
	}
	pickReview();
}

function averageReviews() {
	let title, average;
	title = PROMPT.question("Which title would you like to see the average reviews for?\nPlease enter the movie as it is posted.");
	average = setAverage(title);
	console.log("The average ratings for " + title + " is " + average + " stars out of 5.");
	PROMPT.question("Press enter to return to the main menu.");
}

function setAverage(title) {
	let average;
	let ratingSum = Number(0);
	let allRatings = Number(0);
	const ALL_REVIEWS = reviews.length;
	for (let i = 0; i < ALL_REVIEWS; i++) {
		if (title = reviews[i][0]) {
			ratingSum = ratingSum + reviews[i][1];
			allRatings++;
		}
	}
	average = ratingSum/allRatings;
	return average;
}

