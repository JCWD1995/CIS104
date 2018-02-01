#!/usr/bin/nodejs

/*
	Author: Jiminy Cricket
	Class: CIS 104
	Version: 1.0
	Purpose: Find new customer's insurance premium
*/

"use strict";
const PROMPT = require('readline-sync');

let policies = [];
let policyNumber, lastName, firstName, birth, dueDate, premium;
let age, continueResponse;

const BASE = Number(100);
const AGE1530 = Number(20);
const AGE3045 = Number(10);
const AGE60 = Number(30);
const ATFAULT = Number(50);
const YES = Number(1);
const NO = Number(0);

function main() {
	setContinueResponse();
	while (continueResponse === YES) {
		initalizePremium();
		getName();
		getBirth();
		getFault();
		getPolicy();
		getDueDate();
		populateArray();
		printInfo();
		setContinueResponse();
	}
	printEnd();
}

main();

function setContinueResponse() {
	if (continueResponse === YES || continueResponse === NO) {
		continueResponse = -1;
		while (isNaN(continueResponse) || continueResponse > 1 || continueResponse < 0) {
			continueResponse = PROMPT.question(`\nDo you want to continue? [1=yes,0=no]\n`);
			if (isNaN(continueResponse) || continueResponse > 1 || continueResponse < 0) {
				console.log("INVALID INPUT");
				PROMPT.question(`\nPress enter to continue.\n`)
				process.stdout.write('\x1Bc');
			}
		}
		continueResponse = Number(continueResponse);
	} else {
		continueResponse = Number(1);
	}
}

function initalizePremium() {
	premium = BASE;
}

function getName() {
	process.stdout.write('\x1Bc');
	lastName = PROMPT.question(`\nWhat is the customer's last name?\n`);
	process.stdout.write('\x1Bc');
	firstName = PROMPT.question(`\nWhat is the customer's first name?\n`);
	process.stdout.write('\x1Bc');
	let confirmName = confirmVar("The customer's name is " + firstName + " " + lastName + ".");
	if (confirmName === NO) {
		return getName();
	}
}

function getBirth() {
	let birthDay, birthMonth, birthYear;
	birthYear = getBirthYear();
	birthMonth = getBirthMonth();
	birthDay = getBirthDay(birthYear,birthMonth);
	birth = birthYear + "/" + birthMonth + "/" + birthDay;
	let confirmBirth = confirmVar("The customer was born on " + birth + ".");
	if (confirmBirth === YES) {
		getAge(birthDay, birthMonth, birthYear);
	} else {
		return getBirth();
	}
}

function getBirthYear() {
	let year = -1;
	const MINYEAR = 1900;
	let today = new Date();
	const MAXYEAR = today.getFullYear()-15; //We don't want anyone under age 15
	process.stdout.write('\x1Bc');
	while (isNaN(year) || year < MINYEAR || year > MAXYEAR) {
		year = PROMPT.question(`\nWhat year was ` + firstName + ` born in?\n`);
		if (isNaN(year) || year < MINYEAR || year > MAXYEAR) {
			console.log("INVALID INPUT");
			PROMPT.question(`\nPress enter to continue.\n`) //Freezes screen
			process.stdout.write('\x1Bc');
		}
	}
	year = Number(year);
	let confirmBirth = confirmVar(firstName + " was born in the year " + year + ".");
	if (confirmBirth === 0) {
		return getBirthYear();
	}
	return year;
}

function getBirthMonth() {
	let monthName;
	let month = -1;
	const MINMONTH = Number(1);
	const MAXMONTH = Number(12);
	process.stdout.write('\x1Bc');
	while (isNaN(month) || month < MINMONTH || month > MAXMONTH) {
		month = PROMPT.question(`\nWhat month was ` + firstName + ` born in?\nPlease enter a number between 1 and 12.\n`);
		if (isNaN(month) || month < MINMONTH || month > MAXMONTH) {
			console.log("INVALID INPUT");
			PROMPT.question(`\nPress enter to continue.\n`)
			process.stdout.write('\x1Bc');
		}
	}
	month = Number(month);
	monthName = setMonthName(month);
	let confirmBirth = confirmVar(firstName + " was born in the month of " + monthName + ".");
	if (confirmBirth === 0) {
		return getBirthMonth();
	}
	return month;
}

function setMonthName(month) {
	let name;
	if (month === Number(1)) {
		name = "January";
	} else if (month === Number(2)) {
		name = "February";
	} else if (month === Number(3)) {
		name = "March";
	} else if (month === Number(4)) {
		name = "April";
	} else if (month === Number(5)) {
		name = "May";
	} else if (month === Number(6)) {
		name = "June";
	} else if (month === Number(7)) {
		name = "July";
	} else if (month === Number(8)) {
		name = "August";
	} else if (month === Number(9)) {
		name = "September";
	} else if (month === Number(10)) {
		name = "October";
	} else if (month === Number(11)) {
		name = "November";
	} else {
		name = "December";
	}
	return name;
}

function getBirthDay(year,month) {
	let confirmBirth;
	let monthName = setMonthName(month);
	let day = -1;
	const MINDAY = 1;
	const MAXDAY = getMaxDay(year,month);
	process.stdout.write('\x1Bc');
	while (isNaN(day) || day < MINDAY || day > MAXDAY) {
		day = PROMPT.question(`\nWhat day was ` + firstName + ` born on in ` + monthName + `?`);
		if (isNaN(day) || day < MINDAY || day > MAXDAY) {
			console.log("INVALID INPUT");
			PROMPT.question(`\nPress enter to continue.`)
			process.stdout.write('\x1Bc');
		}
	}
	day = Number(day);
	confirmBirth = confirmVar(firstName + " was born on " + day + " in " + monthName + ".");
	if (confirmBirth === 0) {
		return getBirthDay();
	}
	return day;
}

function getMaxDay(year,month) {
	let maxDay;
	if (month === Number(1) || month === Number(3) || month === Number(5) || month === Number(7) || month === Number(8) || month === Number(10) || month === Number(12)) {
		maxDay = Number(31);
	} else if (month === Number(4) || month === Number(6) || month === Number(9) || month === Number(11)) {
		maxDay = Number(30);
	} else if (month === Number(2)) {
		if (year%4 !== Number(0) || year === Number(1900)) {
			maxDay = Number(28);
		} else {
			maxDay = Number(29);
		}
	}
	return maxDay;
}

function getAge(birthDay, birthMonth, birthYear) {
	let today = new Date();
	let day = today.getDate();
	let month = today.getMonth()+1;
	let year = today.getFullYear();
	let age = year - birthYear;
	if (birthMonth > month) {
		age = age-1;
	} else if (birthMonth === month) {
		if (birthDay > day) {
			age = age-1;
		} else if (birthDay === day) {
			process.stdout.write('\x1Bc');
			console.log("Happy Birthday " + firstName + " " + lastName + "!");
		}
	}
	age = Number(age);
	getAddition(age);
}

function getAddition(age) {
	if (age > 15 && age < 30) {
		premium = premium+AGE1530;
	} else if (age === 30 || (age > 30 && age < 45)) {
		premium = premium+AGE3045;
	} else if (age === 60 || age > 60) {
		premium = premium+AGE60;
	}
}

function getFault() {
	let confirmFault;
	let atFault = -1;
	process.stdout.write('\x1Bc');
	while (isNaN(atFault) || atFault < 0) {
		atFault = PROMPT.question(`\nHow many at fault accidents has ` + firstName + ` had in the past three years?`);
		if (isNaN(atFault) || atFault < 0) {
			console.log("INVALID INPUT");
			PROMPT.question(`\nPress enter to continue.`)
			process.stdout.write('\x1Bc');
		}
	}
	confirmFault = confirmVar(firstName + " has had " + atFault + " at fault accidents in the past 3 years.");
	if (confirmFault === NO) {
		return getFault();
	}
	getAddFault(atFault);
}

function getAddFault(atFault) {
	let value = atFault * ATFAULT;
	premium = premium+value;
}

function getPolicy() {
	policyNumber = policies.length+1; //gets length of policies array and adds 1
}

function getDueDate() {
	let confirmDate;
	let today = new Date();
	dueDate = today.getDate();
	if (dueDate > 28) {
		dueDate = 28;
	}
	while (isNaN(confirmDate) || confirmDate > 1 || confirmDate < 0) {
		console.log(firstName + " has been given the due date of " + dueDate + ".");
		confirmDate = PROMPT.question(`\nIs this alright? [1=yes,0=no]`);
		if (isNaN(confirmDate) || confirmDate > 1 || confirmDate < 0) {
			console.log("INVALID INPUT");
			PROMPT.question(`\nPress enter to continue.`)
			process.stdout.write('\x1Bc');
		}
	}
	confirmDate = Number(confirmDate);
	if (confirmDate === NO) {
		pickDue();
	}
}

function pickDue() {
	let confirmDate;
	dueDate = -1;
	const MINDAY = 1;
	const MAXDAY = 31;
	process.stdout.write('\x1Bc');
	while (isNaN(dueDate) || dueDate > MAXDAY || dueDate < MINDAY) {
		dueDate = PROMPT.question(`What due date would ` + firstName + ` like?`);
		if (isNaN(dueDate) || dueDate > MAXDAY || dueDate < MINDAY) {
			console.log("INVALID INPUT");
			PROMPT.question(`\nPress enter to continue.`)
			process.stdout.write('\x1Bc');
		}
	}
	confirmDate = confirmVar(firstName + "'s due date will be the " + dueDate + " of every month.");
	if (confirmDate === NO) {
		return pickDue();
	}
	if (dueDate > 28) {
		process.stdout.write('\x1Bc');
		console.log("On months with less than " + dueDate + "days, the last day of the month");
		console.log("will be the due date.");
		PROMPT.question(`\nPress enter to continue.`)
	}
}

function populateArray() {
	let policy = [policyNumber, lastName, firstName, birth, dueDate, premium];
	policies.push(policy)
}

function printInfo() {
	process.stdout.write('\x1Bc');
	console.log("The customer's name is " + firstName + " " + lastName + ".");
	console.log(firstName + "'s birthday is " + birth + ".");
	console.log(firstName + "'s policy number is " + policyNumber + ".");
	console.log(firstName + "'s premium is $" + premium + " per month.");
	console.log(firstName + "'s due date is " + dueDate + " of each month");
}

function confirmVar(statement) {
	let checkVar = -1;
	process.stdout.write('\x1Bc');
	while (isNaN(checkVar) || checkVar > 1 || checkVar < 0) {
		console.log(statement);
		checkVar = PROMPT.question(`\nIs this correct? [1=yes,0=no]\n`);
		if (isNaN(checkVar) || checkVar > 1 || checkVar < 0) {
			console.log("INVALID INPUT");
			PROMPT.question(`\nPress enter to continue.`)
			process.stdout.write('\x1Bc');
		}
	}
	checkVar = Number(checkVar);
	return checkVar;
}

function printEnd() {
	process.stdout.write('\x1Bc');
	console.log("Thank you for using this program.");
	PROMPT.question(`Press enter to exit.`);
}
