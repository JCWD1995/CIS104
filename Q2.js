/**
 *   @author Bates, Howard (hbates@northmen.org)
 *   @version 0.0.1
 *   @summary Code demonstration: Collections (Arrays) :: created: 6.13.2017
 *   @todo Nothing
 */

"use strict"; //enable strict mode
const PROMPT = require('readline-sync'); //create a constant so we may use a library

let continueResponse; //declares a global variable without assigning a value
let numStudents; //declares a global variable without assigning a value
let students = [], rewardStudents = []; //declares 2 global arrays without assigning any values

/**
 * @method
 * @desc The dispatch method for our program
 * @returns {null}
 */
function main() { //defines the method main()
    if (continueResponse !== 0 && continueResponse !== 1) { //uses an if statement to test if continueResponse variable is equal to 0 or 1, and only runs anything in the block if continueResponse is not equal to either value.
        setContinueResponse(); //calls method setContinueResponse()
    } //end of the if block
    setNumStudents(); //calls the method setNumStudents()
    populateStudents(); //calls the method populateStudents()
    while (continueResponse === 1) { //creates a while loop, where while the variable continueResponse equals 1, it will continue to run.
        determineRewardStudent(); //calls the method determineRewardStudent()
        displayRewardStudent(); //calls the method displayRewardStudent()
        setContinueResponse(); //calls the method setContinueResponse()
    } //ends the while loop block
} //ends the main method block

main(); //calls the main method

/**
 * @method
 * @desc continueResponse mutator
 * @returns {null}
 */
function setContinueResponse() { //defines the method setContinueResponse()
    if (continueResponse === 1 || continueResponse === 0) { //uses an if statement to test if continueResponse is equal to 1 or 0, and only runs the next part if it does
        continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `)); //asks the user for input for the value of the continueResponse variable and makes it a number
        while (continueResponse !== 0 && continueResponse !== 1) { //creates a while loop where if the continueResponse variable is not equal to 1 or 0, it will continue to run
            console.log(`${continueResponse} is an incorrect value. Please try again.`); //prints a message to the console
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `)); //asks the user for input for the value of the continueResponse variable and makes it a number
        } //ends the while block
    } else { //ends the if block and creates an else block
        continueResponse = 1; //sets the value of continueResponse to 1
    } //ends the else block
} //ends the setContinueResponse method block

/**
 * @method
 * @desc numStudents mutator
 * @returns {null}
 */
function setNumStudents() { //defines the method setNumStudents()
    const MIN_STUDENTS = 1, MAX_STUDENTS = 34; //creates and defines two local constants
    while (! numStudents || numStudents < MIN_STUDENTS || numStudents > MAX_STUDENTS) { //creates a while loop where if numStudents is not defined or is less than the MIN_STUDENTS constant or the MAX_STUDENTS constant, it will continue to run
        numStudents = Number(PROMPT.question(`Please enter number of students in classroom: `)); //asks the user for input for the value of the numStudents variable and makes it a number
        if (isNaN(parseInt(numStudents)) || numStudents < MIN_STUDENTS || numStudents > MAX_STUDENTS) { //makes an if statement where if numStudents is not a number, less than the MIN_STUDENTS constant, or greater than the MAX_STUDENTS constant, it will run
            console.log(`${numStudents} is an incorrect value. Please try again.`); //prints a message to the console
        } //ends the if block
    } //ends the while block
} //ends the setNumStudents method block

/**
 * @method
 * @desc students MD array mutator
 * @returns {null}
 */
function populateStudents() { //defines method populateStudents()
    const MIN_GRADE = 0, MAX_GRADE = 8; //declares and defines local constants
    for (let i = 0; i < numStudents; i++) { //creates a for loop where variable i is created and set to 0 for the loop, then tested against the numStudents variable, then incremented. The loop will continue to run until the test is no longer valid
        students[i] = []; //makes students[i] an array;
        console.log(`\nStudent ${i + 1}:`); //prints a message to the console
        while (! students[i][0] || !/^[a-zA-Z -]{1,30}$/.test(students[i][0])) { //creates a while loop, where the code will continue to run until the test is no longer valid
            students[i][0] = PROMPT.question(`Please enter last name: `); //asks the user for input for the students[i][0] variable
            if (! /^[a-zA-Z -]{1,30}$/.test(students[i][0])) { //creates an if statement, where only if the test is valid, it will run
                console.log(`${students[i][0]} is invalid. Please try again.`); //prints a message to the console
            } //ends the if block
        } //ends the while block
        while (! students[i][1] || !/^[a-zA-Z -]{1,30}$/.test(students[i][1])) { //creates a while loop, where the code will continue to run until the test is no longer valid
            students[i][1] = PROMPT.question(`Please enter first name: `); //asks the user for input for the students[i][1] variable
            if (! /^[a-zA-Z -]{1,30}$/.test(students[i][1])) { //creates an if statement, where only if the test is valid, it will run
                console.log(`${students[i][1]} is invalid. Please try again.`); //prints a message to the console
            } //ends the if block
        } //ends the while block
        while (! students[i][2] || !/^\d{2}\/\d{2}\/\d{4}$/.test(students[i][2])) { //creates a while loop, where the code will continue to run until the test is no longer valid
            students[i][2] = PROMPT.question(`Please enter date of birth (xx/xx/xxxx): `); //asks the user for input for the students[i][2] variable
            if (! /^\d{2}\/\d{2}\/\d{4}$/.test(students[i][2])) { //creates an if statement, where only if the test is valid, it will run
                console.log(`${students[i][2]} is invalid. Please try again.`); //prints a message to the console
            } //ends the if block
        } //ends the while block
        while (! students[i][3] || students[i][3] < MIN_GRADE || students[i][3] > MAX_GRADE) { //creates a while loop, where the code will continue to run until the test is no longer valid
            students[i][3] = PROMPT.question(`Please enter grade level (0-8): `); //asks the user for input for the students[i][3] variable
            if (students[i][3] < MIN_GRADE || students[i][3] > MAX_GRADE) { //creates an if statement, where only if the test is valid, it will run
                console.log(`${students[i][3]} is invalid. Please try again.`); //prints a message to the console
            } //ends the if block
        } //ends the while block
        while (! students[i][4] || !/^[mMfF]$/.test(students[i][4])) { //creates a while loop, where the code will continue to run until the test is no longer valid
            students[i][4] = PROMPT.question(`Please enter gender (m or f): `).toLowerCase(); //asks the user for input for the students[i][4] variable
            if (! /^[mMfF]$/.test(students[i][4])) { //creates an if statement, where only if the test is valid, it will run
                console.log(`${students[i][4]} is invalid. Please try again.`); //prints a message to the console
            } //ends the if block
        } //ends the while block
    } //ends the for block
} //ends the populateStudents method block

/**
 * @method
 * @desc rewardedStudents SD array mutator
 * @returns {null}
 */
function determineRewardStudent() { //defines the method determineRewardStudent()
    let rewarded = false; //creates a local variable rewarded and sets it to false
    while (! rewarded) { //creates a while loop, where the code will continue to run until the test is no longer valid
        rewarded = true; //sets the rewarder variable to tru
        let randomStudent = Math.floor((Math.random() * students.length)); //creates a local variable randomStudent and sets it to a random number based on the length of the students array
        if (rewardStudents.length > 0 && rewardStudents.length < students.length) { //creates an if statement, where it only will run if the test is valid
            for (let student of rewardStudents) { //creates a for loop, where it runs a test on each part of the rewardedStudents array
                if (student === randomStudent) { //creates an if statement, where it only will run if the test is valid
                    rewarded = false; //sets the rewarded variable to false
                    break; //breaks out of the for loop
                } //ends the if block
            } //ends the for block
            if (rewarded) { //creates an if statement, where it will only run if the test is valid
                rewardStudents.push(randomStudent); //adds the randomStudent variable to the rewardStudents array
                break; //breaks out of the while loop
            } //ends the if block
        } else { //ends the if block, and creates an else statement where the code will only run if the if statement didn't
            rewardStudents = []; //makes the rewardStudents an empty array
            rewardStudents.push(randomStudent); //adds the randomStudent variable to the rewardStudents array
        } //ends the else block
    } //ends the while block
    console.log(rewardStudents); //prints a message to the console
} //ends the determineRewardStudent method block

/**
 * @method
 * @desc Utility method for outputting result
 * @returns {null}
 */
function displayRewardStudent() { //defines the method displayRewardStudent()
    console.log(`You get to reward ${students[rewardStudents[rewardStudents.length - 1]][0]} today!`); //prints a message to the console
} //ends the displayRewardStudent method block

/*
 The "Hurr Durr, Make 'em Smarter Everyday" private school has again contracted you to write software that stores the following
 information about each student: Last & first name, DoB, grade level, & gender. The software should also allow teacher to
 randomly select one (1) student per day to give a special reward. Previously selected students cannot be chosen again
 until entire class has been selected at least once.

 Topics:  Collections (single & multi-dimensional arrays), for..of loops, regular expressions (regex)
 */
