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
    P.E.M.D.A.S. functions
*/

function exponent(base, power) {
    return base ** power;
}

function multiply(operand1, operand2) {
    return operand1 * operand2;
}

function divide(operand1, operand2) {
    return operand1 / operand2;
}

function add(operand1, operand2) {
    return operand1 + operand2;
}

function subtract(operand1, operand2) {
    return operand1 - operand2;
}