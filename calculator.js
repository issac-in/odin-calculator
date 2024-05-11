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
    if (globalOperand1 == null || 
        globalOperator == null || 
        globalOperand2 == null) {
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
    if (globalOperator == null) {
        if (globalIsDecimal1) {
            console.warn(messages.tryExtraDecimal1);
        } else {
            display.textContent =
                (globalOperand1 == null) ? 
                display.textContent.concat("0.") : 
                display.textContent.concat(".");
            updateDecimal(1);
            updateOperand(1);
        }
    } else if (globalOperator != null) {
        if (globalIsDecimal2) {
            console.warn(messages.tryExtraDecimal2);
        } else {
            display.textContent =
                (globalOperand2 == null) ? 
                display.textContent.concat("0.") :
                display.textContent.concat(".");
            updateDecimal(2);
            updateOperand(2);
        }
    } else {
        console.error(messages.WTF);
    }
}

function setOperand(input) {
    if (globalOperator == null) {
        if (globalOperand1 != null) {
            if (globalIsDecimal1) {
                display.textContent = display.textContent.concat(input);
                globalOperand1 = +(display.textContent);
            } else if (!(globalIsDecimal1)) {
                if (globalOperand1 === 0) {
                    display.textContent = input;
                    globalOperand1 = input;
                } else if (globalOperand1 !== 0) {
                    display.textContent = display.textContent.concat(input);
                    globalOperand1 = +(display.textContent);
                }
            }
        } else if (globalOperand1 == null) {
            display.textContent = input;
            globalOperand1 = input;
        }
    } else if (globalOperator != null) {
        if (globalOperand2 != null) {
            const operand2StartIndex = display.textContent
                .indexOf(globalOperator) + 1;
            if (globalIsDecimal2) {
                display.textContent = display.textContent.concat(input);
                globalOperand2 = +(display.textContent
                    .slice(operand2StartIndex)); 
            } else if (!(globalIsDecimal2)) { 
                if (globalOperand2 === 0) { 
                    display.textContent = display.textContent
                        .slice(0,operand2StartIndex).concat(input);
                    globalOperand2 = input; 
                } else if (globalOperand2 !== 0) {
                    display.textContent = display.textContent.concat(input);
                    globalOperand2 = +(display.textContent
                        .slice(operand2StartIndex));
                }
            }
        } else if (globalOperand2 == null) {
            display.textContent = display.textContent.concat(input);
            globalOperand2 = input;
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
    switch (num) {
        case 1:
            globalOperand1 = (display.textContent.length === 0) ? 
                null : +(display.textContent);
            break;
        case 2:
            const operand2StartIndex = display.textContent
                .indexOf(globalOperator) + 1;
            globalOperand2 = (operand2StartIndex >= display.textContent.length) 
                ? null : +(display.textContent.slice(operand2StartIndex));
            break;
        default:
            console.error(messages.tryInvalidGlobalOperandValue);
            break;
    }
}

// Call at Run-time
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