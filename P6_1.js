#!/usr/bin/nodejs

/*
	Author: Jiminy Cricket
	Class: CIS104
	Version: 1.0
	Purpose:
*/

"use strict";
const IO = require('fs');

let clients = [], newTrans = [], rewarded = [], newClients = [];

function main() {
	clearScreen();
	readClients();
	readNewTrans();
	for (let i = 0; i < newTrans.length; i++) {
		addRecord(i);
	}
	makeCoupons();
	printCoupons();
	writeClients();
	writeError();
}

main();

function clearScreen() {
	process.stdout.write('\x1Bc');
}

function readClients() {
	let file = IO.readFileSync("data1/clients.csv", "utf8");
	let lines = file.toString().split(/\r?\n/);
	lines.pop(); //https://stackoverflow.com/questions/19544452/remove-last-item-from-array
	//Remove extra line that seems to be coming up
	for (let i = 0; i < lines.length; i++) {
		clients.push(lines[i].toString().split(/,/));
	}
}

function readNewTrans() {
	let file = IO.readFileSync("data1/trans.csv", "utf8");
	let lines = file.toString().split(/\r?\n/);
	for (let i = 0; i < lines.length; i++) {
		newTrans.push(lines[i].toString().split(/,/));
	}
}

function addRecord(i) {
	const LENGTH_TO_MAX_ARRAY = Number(1);
	for (let j = 0; j < clients.length; j++) {
		if (clients[j][0] === newTrans[i][0]) {
			clients[j][3] = Number(clients[j][3]) + Number(newTrans[i][2]);
			break;
		}
		if (j === clients.length - LENGTH_TO_MAX_ARRAY) {
			addNewCustomer(newTrans[i][0]);
		}
	}
}

function addNewCustomer(newClient) {
	const LENGTH_TO_MAX_ARRAY = Number(1);
	if (newClients.length !== 0) {
		for (let i = 0; i < newClients.length; i++) {
			if (newClients[i] === newClient) {
				break;
			}
			if (i === newClients.length - LENGTH_TO_MAX_ARRAY) {
				newClients.push(newClient);
			}
		}
	} else {
		newClients.push(newClient);
	}
}

function makeCoupons() {
	const REWARD = Number(750);
	for (let i = 0; i < clients.length; i++) {
		if (Number(clients[i][3]) >= REWARD) {
			rewarded.push([clients[i][0], clients[i][1], clients[i][2]]);
		}
	}
}

function printCoupons() {
	for (let i = 0; i < rewarded.length; i++) {
		console.log(`Customer #${rewarded[i][0]} ${rewarded[i][1]} ${rewarded[i][2]} has received a coupon!`);
	}
}

function writeClients() {
	for (let i = 0; i < clients.length; i++) {
		for (let j = 0; j < clients[i].length; j++) {
			if (clients[i]) {
				if (j < clients[i].length - 1) {
					IO.appendFileSync("data1/dataX.csv", `${clients[i][j]},`);
				} else if (i < clients.length - 1) {
					IO.appendFileSync("data1/dataX.csv", `${clients[i][j]}\n`);
				} else {
					IO.appendFileSync("data1/dataX.csv", clients[i][j]);
				}
			}
		}
	}
	IO.unlinkSync("data1/clients.csv");
	IO.renameSync("data1/dataX.csv", "data1/clients.csv");
}

function writeError() {
	for (let i = 0; i < newClients.length; i++) {
		if (i < newClients.length - 1) {
			IO.appendFileSync("data1/newClients.csv", `${newClients[i]} has no customer file.\n`);
		} else {
			IO.appendFileSync("data1/newClients.csv", `${newClients[i]} has no customer file.`);
		}
	}
}


/*
The Curl Up and Dye Beauty Salon maintains a master file that contains a record for each of its clients.
Fields in the master file include the client's ID number, first name, last name, and total amount spent this year.
Every week, a transaction file is produced. It contains a customer's ID number, the service received (for example, Manicure), and the price paid. Each file is sorted in ID number order.
Write a program that matches the master and transaction file records and updates the total paid for each client by adding the current week's price paid to the cumulative total. Not all clients purchase services each week. The output is the updated master file and an error report that lists any transaction records for which no master record exists.
Output a coupon for a free haircut each time a client exceeds $750 in services. The coupon, which contains the client's name and an appropriate congratulatory message, is output during the execution of the update program when a client total surpasses $750.
 */

