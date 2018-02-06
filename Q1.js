/**
 *   @author Bates, Howard (hbates@northmen.org)
 *   @version 0.0.1
 *   @summary Code demonstration: Looping logic :: created: 05.16.2017
 *   @todo Nothing
 */

"use strict"; //Enable strict mode
const PROMPT = require('readline-sync'); //create a constant so we may use a library

const MAX_GRADE = 8, MAX_MONTH = 9, MAX_CLASSROOM = 3; //sets global constant
let continueResponse; //decares a global variable without assigning a value
let currentGrade, currentClassroom, monthNum; //declares 3 global variables without assigning values

/**
 * @method
 * @desc The dispatch method for our program
 * @returns {null}
 */
function main() { //defines the method main()
    setContinueResponse(); //calls the method setContinueResponse()
    while (continueResponse === 1) { //creates a while loop, where as long as the variable continueResponse is equal to 1, it will continue to run. It loops back to the start when it reaches the end as long as the requirement is met.
        setMonthNum(); //calls the method setMonthNum()
        setCurrentGrade(); //calls the method setCurrentGrade()
        setCurrentClassroom(); //calls the method setCurrentClassroom()
        processPaymentCoupons(); //calls the method processPaymentCoupons()
        setContinueResponse(); //calls the method setContinueResponse()
    } //end of the while loop block
    for (let i = 0; i < MAX_CLASSROOM; i++) { //creates a for loop, where a variable is declared and set to 0, it tests to see if i is less than MAX_CLASSROOM constant, and then i is incremented. The loop will continue to run until the test no longer is true.
        printGoodbye(); //calls the method printGoodbye()
    } //end of the for loop block
} //end of the main method block

main(); //calls the method main()

/**
 * @method
 * @desc continueResponse mutator
 * @returns {null}
 */
function setContinueResponse() { //defines the method setContinueResponse()
    if (continueResponse === 1 || continueResponse === 0) { //creates an if statement, where it will only run if the variable continueResponse is not equal to 1 or 0.
        continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `)); //asks for input from the user to define the continueResponse variable. Also forces it to be a number.
        while (continueResponse !== 0 && continueResponse !== 1) { //creates a while loop, where if continueResponse is not equal to 0 or 1, it will continue to run. Once the end of the loop is reached, it will run again until the requirements are no longer met.
            console.log(`${continueResponse} is an incorrect value. Please try again.`); //prints to the console the value of continueResponse and says it is an incorrect value, and then says to try again.
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `)); //asks for input from the user to define the continueResponse variable. Also forces it to be a number.
        } //closes the while loop block
    } else { //ends the if block, and if the requirement for the if block was not met, it runs the else block
        continueResponse = 1; //sets the variable continueResponse to a value of 1
    } //ends the else block
} //ends the setContinueResponse() block

/**
 * @method
 * @desc monthNum mutator
 * @returns {null}
 */
function setMonthNum() { //defines the method setMonthNum()
    if (monthNum !== null && monthNum <= MAX_MONTH) { //creates an if statement, where if monthNum is not null and it is less than or equal to the MAX_MONTH constant, it runs the next block.
        monthNum++; //increments the variable monthNum
    } else { //ends the if block, and if the requirement for the if block was not met, it runs the else block.
        monthNum = 1; //sets the variable monthNum to 1
    } //ends the else block
} //ends the setMonthNum() block

/**
 * @method
 * @desc currentMonth mutator
 * @returns {string}
 */
function setCurrentMonth() { //defines the method setCurrentMonth()
    //How could you re-factor this method to eliminate the need for a local variable?
    let currentMonth = ''; //creates the variable currentMonth and sets it to an empty string
    switch (monthNum) { //creates a switch statement, where it takes the value of monthNum and performs an action based on the value
        case 1: currentMonth = 'September'; //if the value of monthNum is 1, the currentMonth variable is set to the string September
            break; //ends the case 1 block
        case 2: currentMonth = 'October'; //if the value of monthNum is 2, the currentMonth variable is set to the string October
            break; //ends the case 2 block
        case 3: currentMonth = 'November'; //if the value of monthNum is 3, the currentMonth variable is set to the string November
            break; //ends the case 3 block
        case 4: currentMonth = 'December'; //if the value of monthNum is 4, the currentMonth variable is set to the string December
            break; //ends the case 4 block
        case 5: currentMonth = 'January'; //if the value of monthNum is 5, the currentMonth variable is set to the string January
            break; //ends the case 5 block
        case 6: currentMonth = 'February'; //if the value of monthNum is 6, the currentMonth variable is set to the string February
            break; //ends the case 6 block
        case 7: currentMonth = 'March'; //if the value of monthNum is 7, the currentMonth variable is set to the string March
            break; //ends the case 7 block
        case 8: currentMonth = 'April'; //if the value of monthNum is 8, the currentMonth variable is set to the string April
            break; //ends the case 8 block
        case 9: currentMonth = 'May'; //if the value of monthNum is 9, the currentMonth variable is set to May
            break; //ends the case 9 block
        default: console.log(`Invalid Month`); //prints Invalid Month if nothing else matches requirement
    } //ends the switch block
    console.log(`\nCurrent Month: ${currentMonth} & ${typeof currentMonth}`); //prints the value of the curent month and says the type of variable currentMonth is, which should always be string
    return currentMonth; //returns the value of currentMonth to where it was called from
} //ends the setCurrentMonth block

/**
 * @method
 * @desc currentGrade mutator
 * @returns {null}
 */
function setCurrentGrade() { //defines the method setCurrentGrade()
    if (currentGrade !== null && currentGrade <= MAX_GRADE) { //creates an if statement, where if the currentGrade is defined and the currentGrade variable is less than or equal to the MAX_GRADE constant, it runs the block
        currentGrade++; //increments the value of the currentGrade variable
    } else { //ends the if block, and if the block didn't run, it runs the else block
        currentGrade = 0; //sets the currentGrade variable to 0
    } //ends the else block
    console.log(`\nCurrent Grade: ${currentGrade} & ${typeof currentGrade}`); //prints to the console the currentGrade variable and the type of variable it is, which should always be string since javascript classifies everything as strings by default
} //ends the setCurrentGrade block

/**
 * @method
 * @desc currentClassroom mutator
 * @returns {null}
 */
function setCurrentClassroom() { //defines the setCurrentClassroom() method
    if (currentClassroom !== null && currentClassroom <= MAX_CLASSROOM) { //creates an if statement, where if the currentClassroom variable is defined and the currentClassroom variable is less than or equal to the MAX_CLASSROOM constant, it runs the block
        currentClassroom++; //increments the variable currentClassroom
    } else { //ends the if block, and if the block didn't run, it runs the else block
        currentClassroom = 1; //sets the currentClassroom variable to 1
    } //ends the else block
    console.log(`\nCurrent Classroom: ${currentClassroom} & ${typeof currentClassroom}`); //prints to the console the currentClassroom variable, and the type of variable it is, which should always be string since javascript classifies everything as strings by default
} //ends the setCurrentClassroom block

/**
 * @method
 * @desc Upper-grade tuition calculator utility method
 * @returns {number}
 */
function setUpperTuition() { //defines the setUpperTuition() method
    const BASE_TUITION = 60; //declares a constant BASE_TUITION and sets it to 60
    return BASE_TUITION * currentGrade; //Notice: no local variable needed //returns the value of BASE_TUITION multiplied by the currentGrade variable
} //ends the setUpperTuition block

/**
 * @method
 * @desc Payment coupon utility method
 * @returns {null}
 */
function processPaymentCoupons() { //defines the processPaymentCoupons() method
    const KDG_TUITION = 80; //declares a constant KDG_TUITION and sets it to 80
    while (currentGrade <= MAX_GRADE) { //creates a while loop, where it runs the block as long as the currentGrade variable is less than or equal to the MAX_GRADE constant. It runs the while loop again when it reaches the end as long as the requirement is met
        while (currentClassroom <= MAX_CLASSROOM) { //creates a while loop, where it runs the block as long as the currentClassroom variable is less than or equal to the MAX_CLASSROOM constant. It runs the while loop again when it reaches the end as long as the requirement is met
            while (monthNum <= MAX_MONTH) { //creates a while loop, where it runs the block as long as the monthNum variable is less than or equal to the MAX_MONTH constant. It runs the while loop again when it reaches the end as long as the requirement is met
                if (currentGrade === 0) { //creates and if statement, where if the currentGrade variable is equal to 0, it runs the block
                    console.log(`\n\tThe tuition for month: ${setCurrentMonth()}, for classroom: ${currentClassroom}, of grade: ${currentGrade} is: \$${KDG_TUITION}.`); //prints to the console the value of the tuition for the month and calls the setCurrentMonth() method to give the month name as opposed to a number, then says for classroom and prints the currentClassroom variable, and says of grade and prints the currentGrade variable, then says is followed by the KDG_TUITION constant
                } else { //ends the if block, and if it didn't run, it runs the else block
                    console.log(`\n\tThe tuition for month: ${setCurrentMonth()}, for classroom: ${currentClassroom}, of grade: ${currentGrade} is: \$${setUpperTuition()}.`); //says the tuition for month, then calls the setCurrentMonth() method to give the month name as opposed to a number, then says for classroom and prints the currentClassroom variable, then says of grade and prints the currentGrade variable, the says is followed by the returned value of the setUpperTuition method
                } //ends the else block
                setMonthNum(); //calls the setMonthNum() method
            } //ends the third while block
            setCurrentClassroom(); //calls the setCurrentClassroom() method
            setMonthNum(); //calls the setMonthNum() method
        } //ends the second while block
        setCurrentGrade(); //calls the setCurrentGrade() method
        setCurrentClassroom(); //calls the setCurrentClassroom() method
    } //ends the first while block
} //ends the processPaymentCoupons block

/**
 * @method
 * @desc Print goodbye utility method
 * @returns {null}
 */
function printGoodbye() { //defines the function printGoodbye()
    console.log(`\tGoodbye.`); //prints to the console "Goodbye"
} //ends the printGoodbye block

/*
 The "Hurr Durr, Make 'em Smarter Everyday" private school has contracted you to write software that prints the monthly
 payment coupons for each month, grade, & classroom. The school is in session for 9 months (September - May), goes from
 kindergarten to  grade 8, & has 3 classrooms per grade-level. The monthly base cost for kindergarten is $80. All other
 grades are $60 monthly, multiplied by the current grade.

 Topics:  Loops (while, C-style for), nesting logic, typeof, validation++
 */
