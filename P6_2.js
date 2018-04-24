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

let employees = [], jobs = [], payments = [], noJobs = [], employeePay = [];

function main() {
	clearScreen();
	readEmployees();
	readJobs();
	for (let i = 0; i < jobs.length; i++) {
		addJob(i);
	}
	populateNoJobs();
	populateEmployeePay();
	console.log(employeePay);
	console.log(noJobs);
//	menu();
}

main();

function clearScreen() {
	process.stdout.write('\x1Bc');
}

function readEmployees() {
	let file = IO.readFileSync("data2/employees.csv", "utf8");
	let lines = file.toString().split(/\r?\n/);
	lines.pop(); //remove extra line
	for (let i = 0; i < lines.length; i++) {
		employees.push(lines[i].toString().split(/,/));
	}
}

function readJobs() {
	let file = IO.readFileSync("data2/jobsCompleted.csv", "utf8");
	let lines = file.toString().split(/\r?\n/);
	lines.pop(); //remove extra line
	for (let i = 0; i < lines.length; i++) {
		jobs.push(lines[i].toString().split(/,/));
	}
}

function addJob(i) {
	for (let j = 0; j < employees.length; j++) {
		if (jobs[i][3] === employees[j][0]) {
			let rate = Number(employees[j][4]);
			let hours = Number(jobs[i][4]);
			let pay = rate * hours;
			payments.push([jobs[i][0], employees[j][0], hours, rate, pay]);
			break;
		}
	}
}

function populateNoJobs() {
	for (let i = 0; i < employees.length; i++) {
		for (let j = 0; j < payments.length; j++) {
			if (employees[i][0] === payments[j][1]) {
				break;
			}
			if (j === payments.length - 1) {
				noJobs.push(employees[i][0]);
			}
		}
	}
}

function populateEmployeePay() {
	const NO_PAY = 0;
	for (let i = 0; i < employees.length; i++) {
		for (let j = 0; j < payments.length; j++) {
			if (payments[j][1] === employees[i][0]) {
				employeePay.push([employees[i][0], payments[j][4]]);
				break;
			} else if (j === payments.length - 1) {
				employeePay.push([employees[i][0], NO_PAY]);
			}
		}
	}
}

function menu() {
	let choice = pickMenu();
	directMenu(choice);
}

function pickMenu() {
	let choice;
	const MIN_MENU = 1;
	const MAX_MENU = 4;
	while (isNaN(choice) || choice < MIN_MENU || choice > MAX_MENU || choice %1 !== 0) {
		printMenu();
		choice = PROMPT.question("Which menu option would you like?");
		if (isNaN(choice) || choice < MIN_MENU || choice > MAX_MENU || choice %1 !== 0) {
			console.log("INVALID INPUT");
			PROMPT.question("Press enter to continue.");
			clearScreen();
		}
	}
	return choice;
}

function printMenu() {
	console.log("1. Print all employee info");
	console.log("2. Print employee info if they completed a job");
	console.log("3. Print all job info");
	console.log("4. Print total pay per employee");
}

function directMenu(i) {
	switch(i) {
		case 1: printAllEmployeeInfo();
			break;
		case 2: printPayments();
			break;
		case 3: printJobInfo();
			break;
		case 4: printEmployeePay();
			break;
	}
}

function printJobInfo() {
	for (let i = 0; i < jobs.length; i++) {
		console.log(`Employee #${jobs[i][3]} completed job #${jobs[i][0]} for ${jobs[i][2]} this week.`);
	}
}

function printAllEmployeeInfo(){
	printPayments();
	printNoJobs();
}

function printPayments() {
	for (let i = 0; i < payments.length; i++) {
		console.log(`Job #${payments[i][0]} has been completed by employee #${payments[i][1]}, and worked ${payments[i][2]} hours at $${payments[i][3]} per hour, adding to $${payments[i][4]} total.`);
	}
}

function printNoJobs() {
	for (let i = 0; i < noJobs.length; i++) {
		console.log(`Employee #${noJobs[i]} did not complete any job this week.`);
	}
}

function printEmployeePay() {
	for (let i = 0; i < employeePay.length; i++) {
		console.log(`Employee #${employeePay[i][0]} is paid $${employeePay[i][1]} for this week.`);
	}
}

/*
The Timely Talent Temporary Help Agency maintains an employee master file that contains an employee ID number, last name, first name, address, and hourly rate for each temporary worker. The file has been sorted in employee ID number order. Each week, a transaction file is created with a job number, address, customer name, employee ID, and hours worked for every job filled by Timely Talent workers. The transaction file is also sorted in employee ID order.

a. Design the logic for a program that matches the current week's transaction file records to the master file and outputs one line for each transaction, indicating job number, employee ID number, hours worked, hourly rate, and gross pay. Assume that each temporary worker works at most one job per week. Output one line for each worker, even if the worker has completed no jobs during the current week.

b. Allow the program to output lines only for workers who have completed at least one job during the current week.

c. Ensure that any temporary worker can work any number of separate jobs during the week. Output one line for each job that week.

d. Ensure that it accumulates the worker's total pay for all jobs in a week and outputs one line per worker.
*/
