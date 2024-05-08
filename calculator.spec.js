const calculator = require("./calculator");

describe("PEMDAS core functions", () => {
    describe("testing exponent()", () => {
        test("when given positive operands", () => {
            expect(calculator.exponent(8,3)).toBe(512);
            expect(calculator.exponent(2,15)).toBe(32768);
            expect(calculator.exponent(13,9)).toBe(10604499373);
        });

        test("when given negative operands", () => {
            expect(calculator.exponent(-5,-1)).toBe(-0.2);
            expect(calculator.exponent(-8,-3)).toBe(-0.001953125);
            expect(calculator.exponent(-2,-15)).toBe(-0.0000305176);
        });

        test("when given mixed operands", () => {
            expect(calculator.exponent(-8,3)).toBe(-512);
            expect(calculator.exponent(5,-1)).toBe(0.2);
            expect(calculator.exponent(-2,15)).toBe(-32768);
        });
    });

    describe("testing multiply()", () => {
        test("when given positive operands", () => {

        });

        test("when given negative operands", () => {
            
        });

        test("when given mixed operands", () => {
            
        });
    });

    describe("testing divide()", () => {
        test("when given positive operands", () => {

        });

        test("when given negative operands", () => {
            
        });

        test("when given mixed operands", () => {
            
        });
    });

    describe("testing add()", () => {
        test("when given positive operands", () => {

        });

        test("when given negative operands", () => {
            
        });

        test("when given mixed operands", () => {
            
        });
    });

    describe("testing subtract()", () => {
        test("when given positive operands", () => {

        });

        test("when given negative operands", () => {
            
        });

        test("when given mixed operands", () => {
            
        });
    });
});