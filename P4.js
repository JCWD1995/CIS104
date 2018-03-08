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
let movies = [];

const YES = Number(1);
const RATING = {
	MAX: Number(5),
	MIN: Number(1)
}

function main() {
	setMovies();
	while (0 === 0) {
		printMenu();
	}
}

main();

function setMovies() {
	movies[0] = "Thor Ragnarok";
	movies[1] = "Tomb Raider";
	movies[2] = "A Wrinkle in Time";
	movies[3] = "Death Wish";
}

function printMenu() {
	process.stdout.write('\x1Bc');
	console.log("What would you like to do?");
	console.log("1. Review Movie");
	console.log("2. Look at Reviews");
	console.log("3. List average stars on a movie");
	console.log("4. Sort movies by average rating");
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
		case 4: listMovies();
		default: console.log("Invalid Value");
			 PROMPT.question("Press enter to continue.");
			 process.stdout.write("\x1Bc");
	}
}

function giveReview() {
	let title, rating;
	let review = [];
	title = setTitle();
	rating = setRating(title);
	review = setReview();
	pushReview(title, rating, review);
}

function setTitle() {
	process.stdout.write('\x1Bc');
	let askMovie = -1;
	while (askMovie !== "y" && askMovie !== "n") {
		printMovieList();
		askMovie = PROMPT.question("Do you want to review any of these movies?\nEnter y for yes and n for no.\n");
		if (askMovie !== "y" && askMovie !== "n") {
			console.log("INVALID INPUT");
			PROMPT.question("Press enter to continue.");
			process.stdout.write("\x1Bc");
		}
	}
	if (askMovie === "y") {
		let j = pickMovie();
		return movies[j];
	} else {
		let title = addMovie();
		pushMovie(title);
		return title;
	}
}

function pushMovie(title) {
	movies.push(title);
}

function addMovie() {
	let movie = PROMPT.question("Which movie would you like to add?\n");
	return movie;
}

function pickMovie() {
	process.stdout.write("\x1Bc");
	let i = -1;
	while (isNaN(i) || i < 0 || i >= movies.length) {
		printMovieList();
		i = Number(PROMPT.question("Which Movie would you like to review?\nPlease enter its ID:\n")-1);
			if ((isNaN(i) || i < 0 || i >= movies.length) && i%1 !== 0) {
				console.log("INVALID INPUT");
				PROMPT.question("Press enter to continue.");
				process.stdout.write("\x1Bc");
			}
	}
	return i;
}

function printMovieList() {
	for (let i = 0; i < movies.length; i++) {
		console.log(`${i+1}. ${movies[i]}`);
	}
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

function setReview() {
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
	reviews.push([title, rating, review]);
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
	let i = pickMovie();
	printReviewsTitle(movies[i]);
}

function printReviewsTitle(title) {
	let j = 1;
	for (let i = 0; i < reviews.length; i++) {
		if (reviews[i][0] === title) {
			console.log(j + " " + reviews[i][0] + " " + reviews[i][1] + " star review");
			j++;
		}
	}
	pickReview(j, title, "title");
}

function pickReview(i, test, type) {
	let choice;
	while (isNaN(choice) || choice < 1 || choice > i) {
		choice = Number(PROMPT.question("Which Review ID would you like to view?"));
		if (isNaN(choice) || choice < 1 || choice > i) {
			console.log("INVALID INPUT");
		}
	}
	findReview(choice, test, type);
}

function findReview(choice, test, type) {
	let j = Number(0);
	if (type === "title") {
		for (let i = 0; i < reviews.length; i++) {
			if (reviews[i][0] === test) {
				j++;
				if (j === choice) {
					printReview(i);
					break; 
				}
			}
		}
	} else {
		for (let i = 0; i < reviews.length; i++) {
			if (reviews[i][1] === test) {
				j++;
				if (j === choice) {
					printReview(i);
					break;
				}
			}
		}
	}
} 

function printReview(i) {
	const title = reviews[i][0];
	const rating = reviews[i][1];
	const FULL_REVIEW = reviews[i][2].length;
	console.log(title + ": " + rating + " stars:");
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
	let j = 1;
	for (let i = 0; i < reviews.length; i++) {
		if (reviews[i][1] === rating) {
			console.log(j + " " + reviews[i][0] + " " + reviews[i][1] + " star review");
			j++;
		}
	}
	pickReview(j, rating, "rating");
}

function averageReviews() {
	let i = pickMovie();
	let average = setAverage(movies[i]);
	console.log("The average ratings for " + movies[i] + " is " + average + " stars out of 5.");
	PROMPT.question("Press enter to return to the main menu.");
}

function setAverage(title) {
	let average;
	let ratingSum = Number(0);
	let allRatings = Number(0);
	const ALL_REVIEWS = reviews.length;
	for (let i = 0; i < ALL_REVIEWS; i++) {
		if (title === reviews[i][0]) {
			ratingSum = ratingSum + reviews[i][1];
			allRatings++;
		}
	}
	average = ratingSum/allRatings;
	return average;
}

function listMovies() {
	let sortedRatings = [];
	let average;
	for (let i = 0; i < movies.length; i++) {
		average = setAverage(movies[i]);
		sortedRatings.push([movies[i], average]);
	}
	let temp;
	let k;
	for (let i = 0; i < sortedRatings.length; i++) {
		for (let j = 0; j < sortedRatings.length-i-1; j++) {
			k = Number(j) + 1;
			if (sortedRatings[j][1] < sortedRatings[k][1]) {
				temp = sortedRatings[j];
				sortedRatings[j] = sortedRatings[k];
				sortedRatings[k] = temp;
			}
		}
	}
	printMovieAverages(sortedRatings);
}

function printMovieAverages(sortedRatings) {
	for (let i = 0; i < sortedRatings.length; i++) {
		console.log(`${sortedRatings[i][0]} has an average rating of ${sortedRatings[i][1]} stars.`);
		console.log();
	}
}

