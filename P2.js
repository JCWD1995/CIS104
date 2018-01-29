#!/usr/bin/nodejs

/*
	Author: Jiminy Cricket
	Class: CIS 104
	Version: 1.0
	Purpose: Find new customer's insurance premium
*/

"use strict";
const PROMPT = require('readline-sync');

let policies;
let policyNumber, lastName, firstName, birth, dueDate, premium;
let age, continueResponse;

const BASE = 100;
const AGE1530 = 20;
const AGE3045 = 10;
const AGE60 = 30;
const ATFAULT = 50;
const YES = 1;
const NO = 0;

function main() {
	setContinue();
	while (continueResponse === YES) {
		initalizePremium();
		getName();
		getBirth();
		getFault();
		getPolicy();
		getDueDate();
		populateArray();
		printInfo();
		setContinue();
	}
}

main();

function setContinue() {
	if (continueResponse === YES || continueResponse === NO) {
		continueResponse = -1;
		while (continueResponse > 1 || continueResponse < 0) {
			continueResponse = PROMPT.question(`\nDo you want to continue? [1=yes,0=no]`);
			if (continueResponse > 1 || continueResponse < 0) {
				console.log("INVALID INPUT");
				PROMPT.question(`\nPress enter to continue.`)
				console.stdout.write('\x1Bc');
			}
		}
	} else {
		continueResponse = 1;
	}
}

function initalizePremium() {
	premium = BASE;
}

function getName() {
	lastName = PROMPT.question(`\nWhat is the customer's last name?`);
	console.stdout.write('\x1Bc');
	firstName = PROMPT.question(`\nWhat is the customer's first name?`);
	console.stdout.write('\x1Bc');
	let name = "The customer's name is " + firstname + " " + lastname + ".";
	let confirmName = confirmVar(name);
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
	let bd = "The customer was born on " + birth + ".";
	let confirmBirth = confirmVar(bd);
	if (confirmBirth === YES) {
		getAge(birthDay, birthMonth, birthYear);
	} else {
		return getBirth();
	}
}

function getBirthYear() {
	let year = -1;
	const MINYEAR = 1900;
	let today = Date();
	const MAXYEAR = today.getFullYear();
	console.stdout.write('\x1Bc');
	while (year < MINYEAR || year > MAXYEAR) {
		year = PROMPT.question(`\nWhat year was ` + firstname + ` born in?`);
		if (year < MINYEAR || year > MAXYEAR) {
			console.log("INVALID INPUT");
			PROMPT.question(`\nPress enter to continue.`)
			console.stdout.write('\x1Bc');
		}
	}
	let birth = firstName + " was born in the year " + year + ".";
	let confirmBirth = confirmVar(birth);
	if (confirmBirth === 0) {
		return getBirthYear();
	}
	return year;
}

function getBirthMonth() {
	let month = -1;
	const MINMONTH = 1;
	const MAXMONTH = 12;
	console.stdout.write('\x1Bc');
	while (isNaN(month) || month < MINMONTH || month > MAXMONTH) {
		month = PROMPT.question(`\nWhat month was ` + firstname + ` born in?\nPlease enter a number between 1 and 12.`);
		if (isNan(month) || month < MINMONTH || month > MAXMONTH) {
			console.log("INVALID INPUT");
			PROMPT.question(`\nPress enter to continue.`)
			console.stdout.write('\x1Bc');
		}
	}
	let birth = firstName + "was born in the month of " + month + ".";
	let confirmBirth = confirmVar(birth);
	if (confirmBirth === 0) {
		return getBirthMonth();
	}
}

function getBirthDay(year,month) {
	let day = -1;
	const MINDAY = 1;
	const MAXDAY = getMaxDay(year,month);
	console.stdout.write('\x1Bc');
	while (isNaN(day) || day < MINDAY || day > MAXDAY) {
		day = PROMPT.question(`\nWhat day was ` + firstname + ` born on in ` + month + `?`);
		if (isNaN(day) || day < MINDAY || day > MAXDAY) {
			console.log("INVALID INPUT");
			PROMPT.question(`\nPress enter to continue.`)
			console.stdout.write('\x1Bc');
		}
	}
	birth = firstName + " was born on " + day + " in " + month + ".";
	confirmBirth = confirmVar(birth);
	if (confirmBirth === 0) {
		return getBirthDay();
	}
}

function getMaxDay(year,month) {
	if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
		let day = 31;
	} else if (month === 4 || month === 6 || month === 9 || month === 11) {
		let day = 30;
	} else if (month === 2) {
		if (year%4 !== 0 || year === 1900) {
			let day = 28;
		} else {
			let day = 29;
		}
	}
	return day;
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
			console.stdout.write('\x1Bc');
			console.log("Happy Birthday " + firstName + " " + lastName + "!");
		}
	}
	getAddition(age);
}

function getAddition(age) {
	if (age > 15 && age < 30) {
		premium = premium + AGE1530;
	} else if (age === 30 || (age > 30 && age < 45)) {
		premium = premium + AGE3045;
	} else if (age === 60 || age > 60) {
		premium = premium + AGE60;
	}
}

function getFault() {
	console.stdout.write('\x1Bc');
	let atFault = PROMPT.question(`\nHow many at fault accidents has ` + firstName + ` had in the past three years?`);
	fault = firstname + " has had " + atFault + " at fault accidents in the past 3 years.";
	confirmFault = confirmVar(fault);
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
	policyNumber = policies.length+1; //gets length of policies array
}

function getDueDate() {
	let confirmDate;
	let today = Date();
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
			console.stdout.write('\x1Bc');
		}
	}
	if (confirmDate === NO) {
		pickDue();
	}
}

function pickDue() {
	dueDate = -1;
	const MINDAY = 1;
	const MAXDAY = 31;
	console.stdout.write('\x1Bc');
	while (isNaN(dueDate) || dueDate > MAXDAY || dueDate < MINDAY) {
		dueDate = PROMPT.question(`What due date would ` + firstName + ` like?`);
		if (isNaN(dueDate) || dueDate > MAXDAY || dueDate < MINDAY) {
			console.log("INVALID INPUT");
			PROMPT.question(`\nPress enter to continue.`)
			console.stdout.write('\x1Bc');
		}
	}
	due = firstName + "'s due date will be the " + dueDate + " of every month.";
	confirmDate = confirmVar(due);
	if (confirmDate === NO) {
		return pickDue();
	}
	if (dueDate > 28) {
		console.log("On months with less than " + dueDate + "days, the last day of the month");
		console.log("will be the due date.");
	}
}

function populateArray() {
	i = policies.length;
	policies[i][0] = policyNumber;
	policies[i][1] = lastName;
	policies[i][2] = firstName;
	policies[i][3] = birth;
	policies[i][4] = premium;
	policies[i][5] = dueDate;
}

function printInfo() {
	console.stdout.write('\x1Bc');
	console.log("The customer's name is " + firstName + " " + lastName + ".");
	console.log(firstName + "'s birthday is " + birth + ".");
	console.log(firstName + "'s policy number is " + policyNumber + ".");
	console.log(firstName + "'s premium is $" + premium + " per month.");
	console.log(firstName + "'s due date is " + dueDate + " of each month");
}

function confirmVar(statement) {
	let confirmVar = -1;
	console.stdout.write('\x1Bc');
	while (confirmVar > 1 || confirmVar < 0) {
		console.log(statement);
		confirmVar = PROMPT.question(`\nIs this correct? [1=yes,0=no]`);
		if (confirmName !== YES && confirmName !== NO) {
			console.log("INVALID INPUT");
			PROMPT.question(`\nPress enter to continue.`)
			console.stdout.write('\x1Bc');
		}
	}
	return confirmVar;
}

