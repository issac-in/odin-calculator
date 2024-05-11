"use strict";

const EXPONENT = "^";
const MULTIPLY = "*";
const DIVIDE = "/";
const ADD = "+";
const SUBTRACT = "-"; 

const display = document.querySelector(".display");
const messages = {
    tryBackspace: "Cannot backspace when there's nothing to backspace.",
    tryDivideByZero: "Can't divide an operand by zero.",
    tryExtraDecimal1: "globalOperand1 is already flagged as a float.",
    tryExtraDecimal2: "globalOperand2 is already flagged as a float.",
    tryInvalidGlobalOperandValue: "updateOperand() argument must be 1 or 2.",
    tryOperationWhenMissing: "Can't calculate without 2 operands & 1 operator.",
    tryOperatorWhenMissingOperand: "Missing an operand before the operator.",
    trySetSignWithNoOperand: "Can't set a sign without an operand.",
    WTF: "LOGIC ERROR - You shouldn't be able to trigger this message.",
}

let globalIsDecimal1;
let globalIsDecimal2;
let globalOperand1;
let globalOperand2;
let globalOperator;

function operate(operand1, operand2, operator) {
    if (checkCompleteOperation() && checkDivideByZero()) {
        let operation;
        switch (operator) {
            case EXPONENT:
                operation = exponent(operand1, operand2);
                break;
            case MULTIPLY:
                operation = multiply(operand1, operand2);
                break;
            case DIVIDE:
                operation = divide(operand1, operand2);
                break;
            case ADD:
                operation = add(operand1, operand2);
                break;
            case SUBTRACT:
                operation = subtract(operand1, operand2);
                break;
        }
        return operation;
    }
}

/*
    PEMDAS core functions
    - Calculated numbers restricted to 10 decimal places for sake of TDD.
*/

function exponent(base, power) {
    return +((base ** power).toFixed(10));
}

function multiply(operand1, operand2) {
    return +((operand1 * operand2).toFixed(10));
}

function divide(operand1, operand2) {
    return +((operand1 / operand2).toFixed(10));
}

function add(operand1, operand2) {
    return +((operand1 + operand2).toFixed(10));
}

function subtract(operand1, operand2) {
    return +((operand1 - operand2).toFixed(10));
}

/*
    Other logic functions
*/

function checkCompleteOperation() {
    let noError = true;
    if (globalOperand1 == null || globalOperator == null || globalOperand2 == null) {
        noError = false;
        console.error(messages.tryOperationWhenMissing);
    }
    return noError;
}

function checkDivideByZero() {
    let noError = true;
    if (globalOperator === DIVIDE && globalOperand2 === 0) {
        noError = false;
        console.error(messages.tryDivideByZero);
    }
    return noError;
}

function runBackspace() {
    // Presumptions:
    // [UNTESTED] 1. globalIsDecimal1 & globalIsDecimal2 are up to date.
    // [UNTESTED] 2. display.textContent is always up to date.
    // [UNTESTED] 3. Cannot assume globalOperand1 / globalOperand2 are precisely equal to what the display.textContent is for them, due to implicit type coercion.
    // Approach:
    // 1. Figure out what part of the operation we are backspacing on.
    // 2. if globalOperand2 does exist, it's globalOperand2 still. 
    // 3. else if globalOperator does exist, it's globalOperator.
    // 4. else if globalOperand1 does exist, it's globalOperand1 still.
    // 5. else, console.error("can't backspace no more bro")
    const operationStr = display.textContent;
    if (operationStr.length !== 0) {
        if (operationStr.at(-1) === ".") { updateDecimal(0); }
        display.textContent = operationStr.slice(0, operationStr.length-1);

        if (globalOperand2 != null) {
            updateOperand(2);
        } else if (globalOperator != null) {
            globalOperator = null;
        } else if (globalOperand1 != null) {
            updateOperand(1);
        }
    } else {
        console.error(messages.tryBackspace);
    }
}

function runClearAll() {
    globalIsDecimal1 = null;
    globalIsDecimal2 = null;
    globalOperand1 = null;
    globalOperand2 = null;
    globalOperator = null;
    display.textContent = "";
}

function runEquals() {
    globalOperand1 = operate(globalOperand1, globalOperand2, globalOperator);
    globalIsDecimal1 = (globalOperand1 == null) ? 
        null : !(Number.isSafeInteger(globalOperand1));
    globalIsDecimal2 = null;
    globalOperand2 = null;
    globalOperator = null;
    display.textContent = globalOperand1;
}

function setButtonsListener() {
    const buttons = document.querySelector(".buttons");

    buttons.addEventListener("click", (event) => {
        let target = event.target;

        switch(target.id) {
            case "clear-all":
                runClearAll();
                break;
            case "backspace":
                runBackspace();
                break;
            case "equals":
                runEquals();
                break;
            case "exponent":
                setOperator(EXPONENT);
                break;
            case "multiply":
                setOperator(MULTIPLY);
                break;
            case "divide":
                setOperator(DIVIDE);
                break; 
            case "add":
                setOperator(ADD);
                break;
            case "subtract":
                setOperator(SUBTRACT);
                break;
            case "unary-plus-and-minus":
                setSign();
                break;
            case "decimal-point":
                setDecimal();
                break;
            case "zero":
                setOperand(0);
                break;
            case "one":
                setOperand(1);
                break;
            case "two":
                setOperand(2);
                break;
            case "three":
                setOperand(3);
                break; 
            case "four":
                setOperand(4);
                break;
            case "five":
                setOperand(5);
                break;
            case "six":
                setOperand(6);
                break;
            case "seven":
                setOperand(7);
                break;
            case "eight":
                setOperand(8);
                break;
            case "nine":
                setOperand(9);
                break;      
        }
    });
}

function setDecimal() {
    // 1. Figure out which operand we are attempting to add a decimal to.
    // 1-1. If globalOperator doesn't exist, it's globalOperand1.
    // 1-2. If globalOperator does exist, it's globalOperand2.
    // 2. Check if that operand already has a decimal.
    // 2A. Check via globalIsDecimal1 or globalIsDecimal2, NOT via globalOperand1 or globalOperand2
    // 2B. If it does, send out a console.warn("Operand already has a decimal.")
    // 2C. If it doesn't, update display.textContent to reflect the change
    // 2D1. If globalOperand1 does not exist, set globalOperand1 to 0. in display. If it does exist, just concat the . directly in display
    // 2D2. If globalOperand2 does not exist, set globalOperand2 to 0. in display If it does exist, just concat the . directly in display.
    // 3. Then set either globalIsDecimal1 or globalIsDecimal2 to true.
    // 4. Then update globalOperand1 or globalOperand2 accordingly based on the display.
    if (globalOperator == null) { // 1-1
        if (globalIsDecimal1) { // 2 / 2A1
            console.warn(messages.tryExtraDecimal1); // 2B1
        } else { // 2C1
            display.textContent = // 2D1
                (globalOperand1 == null) ? 
                display.textContent.concat("0.") : 
                display.textContent.concat(".");
            updateDecimal(1); // 3-1
            updateOperand(1); // 4-1
        }
    } else if (globalOperator != null) { // 1-2
        if (globalIsDecimal2) { // 2 // 2A2
            console.warn(messages.tryExtraDecimal2); // 2B2
        } else { // 2C2
            display.textContent = // 2D2
                (globalOperand2 == null) ? 
                display.textContent.concat("0.") :
                display.textContent.concat(".");
            updateDecimal(2); // 3-2
            updateOperand(2); // 4-2    
        }
    } else {
        console.error(messages.WTF);
    }
}

function setOperand(input) {
    // Presumptions
    // [UNSURE] 1. Assume globalIsDecimal1 & globalIsDecimal2 is up to date.
    // [UNSURE] 2. Assume you cannot have an globalOperator existing w/o globalOperand1 existing as well
    // Approach
    // 1-1. If globalOperator does not exist, target globalOperand1
    // 2A1.     If globalOperand1 does exist
    // 2B1.         If globalIsDecimal1 is true, do display.textContent.concat(input)
    // 2C1.             Then, set globalOperand1 to +(display.textContent);
    // 2D1.         If globalIsDecimal1 is false, 
    // 2E1.             If globalOperand1 === 0
    // 2F1.                 THen, set globalOperand1 & display.textContent to input.
    // 2G1.             If globalOperand1 !== 0
    // 2H1.                 Then do display.textContent.concat(input)
    // 2I1.                 Then set globalOperand1 to +(display.textContent);
    // 3A1.     If globalOperand1 doesn't exist
    // 3B1.         Then, set globalOperand1 & display.textContent to input.
    if (globalOperator == null) { // 1-1
        if (globalOperand1 != null) { // 2A1
            if (globalIsDecimal1) {
                display.textContent = display.textContent.concat(input); // 2B1
                globalOperand1 = +(display.textContent); // 2C1
            } else if (!(globalIsDecimal1)) { // 2D1
                if (globalOperand1 === 0) { // 2E1
                    globalOperand1 = display.textContent = input; // 2F1
                } else if (globalOperand1 !== 0) { // 2G1
                    display.textContent = display.textContent.concat(input); // 2H1
                    globalOperand1 = +(display.textContent); // 2I1
                }
            }
        } else if (globalOperand1 == null) { // 3A1
            globalOperand1 = display.textContent = input; // 3B1
        }
    } 
    // 1-2. If globalOperator does exist, target globalOperand2
    // 2A2.     If globalOperand2 does exist
    // 2B2.         If globalIsDecimal2 is true, do display.textContent.concat(input)
    // 2C2.             Then, set globalOperand2 to +(display.textContent.slice(display.textContent.indexOf(globalOperator)+1));
    // 2D2.         If globalIsDecimal2 is false,
    // 2E2.             If globalOperand2 === 0
    // 2F2.                 Then, set globalOperand2 to input.
    // 2G2.                 Then set display.textContent to the slice of everything including the globalOperator, then concat input to that.
    // 2H2.             If globalOperand2 !== 0
    // 2I2.                 Then display.textContent.concat(input)
    // 2J2.                 Then set globalOperand2 to +(display.textContent.slice(display.textContent.indexOf(globalOperator)+1));            
    // 3A2.     If globalOperand2 doesn't exist
    // 3B2.         Then do display.textContent.concat(input)
    // 3C2.         Then set globalOperand2 to input
    else if (globalOperator != null) { // 1-2
        if (globalOperand2 != null) { // 2A2
            const operand2StartIndex = display.textContent.indexOf(globalOperator)+1;
            if (globalIsDecimal2) {
                display.textContent = display.textContent.concat(input); // 2B2
                globalOperand2 = +(display.textContent.slice(operand2StartIndex)); // 2C2
            } else if (!(globalIsDecimal2)) { // 2D2
                if (globalOperand2 === 0) { // 2E2
                    globalOperand2 = input; // 2F2
                    display.textContent = display.textContent.slice(0,operand2StartIndex).concat(input); // 2G2
                } else if (globalOperand2 !== 0) { // 2H2
                    display.textContent = display.textContent.concat(input); // 2I2
                    globalOperand2 = +(display.textContent.slice(operand2StartIndex)); // 2J2
                }
            }
        } else if (globalOperand2 == null) { // 3A2
            display.textContent = display.textContent.concat(input); // 3B2
            globalOperand2 = input; // 3C2
        }
    } else {
        console.error(messages.WTF);
    }
}

function setOperator(input) {
    if (globalOperand1 != null) {
        display.textContent = 
            (globalOperator) ? 
            display.textContent.replace(globalOperator, input) : 
            display.textContent.concat(input); 
        globalOperator = input;
    } else {
        console.error(messages.tryOperatorWhenMissingOperand);
    }
}

function setSign() {
    if (globalOperand2 != null) { 
        const operand2StartIndex = display.textContent.indexOf(globalOperand2);
        globalOperand2 *= -1;
        display.textContent =
            display.textContent.slice(0, operand2StartIndex).concat(globalOperand2);
    } else if (globalOperand1 != null) {
        globalOperand1 *= -1;
        display.textContent = 
            (globalOperator != null) ?
            globalOperand1.toString().concat(globalOperator) :
            globalOperand1;
    } else {
        console.error(messages.trySetSignWithNoOperand);
    }
}

function updateDecimal(num = 0) {
    switch (num) {
        case 2:
            globalIsDecimal2 = true;
            break;
        case 1:
            globalIsDecimal1 = true;
            break;
        case 0:
            if (globalOperator == null) { 
                globalIsDecimal1 = false; 
            } else if (globalOperator != null) {
                globalIsDecimal2 = false; 
            }
            break;
    }
}

function updateOperand(num) {
    // Presumptions
    // -2. If num === 1, know that globalOperator is null, and globalOperand2 is null
    // -1. If num === 2, know that globalOperator exists, and globalOperand1 & 2 exist.
    // 0. When ran from setDecimal(), there is 100% data to be pulled from either globalOperand1 or globalOperand2 based on what is passed in as argument
    // 1. globalIsDecimal1 & globalIsDecimal2 are up to date when this is called
    // 2. display.textCOntent is updated to latest version when called
    // 3. There's a possibility that globalOperand1 or globalOperand2 is not up-to-date
    // 4. The argument being passed into num lets us know which operand is not up to date
    // Approach
    // 1-1. If num === 1, globalOperand1 is the target to update
    // 1-2. If num === 2, globalOperand2 is the target to update
    // 2-1. Set globalOperand1 to +(display.textContent) or null 
    // 2-2. Set globalOperand2 based on display.textContent or null
    // 2-2A. Grab the globalOperator index, add 1 to it, to get globalOperand2 start index
    // 2-2B. Set globalOperand2 to +(display.textContent.slice(operand2StartIndex))
    switch (num) {
        case 1:
            globalOperand1 = (display.textContent.length === 0) ? 
                null : +(display.textContent);
            break;
        case 2:
            const operand2StartIndex = display.textContent.indexOf(globalOperator)+1;
            if (operand2StartIndex >= display.textContent.length) {
                globalOperand2 = null;
            } else {
                globalOperand2 = +(display.textContent.slice(operand2StartIndex));
            }
            break;
        default:
            console.error(messages.tryInvalidGlobalOperandValue);
            break;
    }
}

// Call at RunTime
setButtonsListener();

// Why the if(): https://bit.ly/fix_for_referenceError_module_is_not_defined
if (typeof module === "object") { 
    module.exports = {
        operate,
        exponent,
        multiply,
        divide,
        add,
        subtract,
    };
}