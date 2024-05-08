"use strict";

let operand1;
let operand2;
let operator;

function operate(operand1, operand2, operator) {
    let operation;
    switch (operator) {
        case "**":
        case "^":
            operation = exponent(operand1, operand2);
            break;
        case "*":
            operation = multiply(operand1, operand2);
            break;
        case "/":
            operation = divide(operand1, operand2);
            break;
        case "+":
            operation = add(operand1, operand2);
            break;
        case "-":
            operation = subtract(operand1, operand2);
            break;
    }
    return operation;
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