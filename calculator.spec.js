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
            expect(calculator.multiply(81,3)).toBe(243);
            expect(calculator.multiply(2,1500)).toBe(3000);
            expect(calculator.multiply(1300,95)).toBe(123500);
        });

        test("when given negative operands", () => {
            expect(calculator.multiply(-50,-14)).toBe(700);
            expect(calculator.multiply(-33,-80)).toBe(2640);
            expect(calculator.multiply(-2,-15)).toBe(30);
        });

        test("when given mixed operands", () => {
            expect(calculator.multiply(951,-3)).toBe(-2853);
            expect(calculator.multiply(-5614,39)).toBe(-218946);
            expect(calculator.multiply(7,-14)).toBe(-98);
        });
    });

    describe("testing divide()", () => {
        test("when given positive operands", () => {
            expect(calculator.divide(81,3)).toBe(27);
            expect(calculator.divide(2,1500)).toBe(0.0013333333);
            expect(calculator.divide(1300,95)).toBe(13.6842105263);
        });

        test("when given negative operands", () => {
            expect(calculator.divide(-50,-14)).toBe(3.5714285714);
            expect(calculator.divide(-33,-80)).toBe(0.4125);
            expect(calculator.divide(-2,-15)).toBe(0.1333333333);
        });

        test("when given mixed operands", () => {
            expect(calculator.divide(951,-3)).toBe(-317);
            expect(calculator.divide(-5614,39)).toBe(-143.9487179487);
            expect(calculator.divide(7,-14)).toBe(-0.5);
        });
    });

    describe("testing add()", () => {
        test("when given positive operands", () => {
            expect(calculator.add(4588,5550)).toBe(10138);
            expect(calculator.add(7320,180)).toBe(7500);
            expect(calculator.add(9117,9033)).toBe(18150);
        });

        test("when given negative operands", () => {
            expect(calculator.add(-6705,-2904)).toBe(-9609);
            expect(calculator.add(-9219,-6276)).toBe(-15495);
            expect(calculator.add(-35,-9946)).toBe(-9981);
        });

        test("when given mixed operands", () => {
            expect(calculator.add(3694,-4530)).toBe(-836);
            expect(calculator.add(-7800,8842)).toBe(1042);
            expect(calculator.add(-5677,1043)).toBe(-4634);
        });
    });

    describe("testing subtract()", () => {
        test("when given positive operands", () => {
            expect(calculator.subtract(1027156,3101176)).toBe(-2074020);
            expect(calculator.subtract(3227733,1446939)).toBe(1780794);
            expect(calculator.subtract(1688151,3370533)).toBe(-1682382);
        });

        test("when given negative operands", () => {
            expect(calculator.subtract(-5674856,-4451071)).toBe(-1223785);
            expect(calculator.subtract(-1082658,-7749133)).toBe(6666475);
            expect(calculator.subtract(-8777632,-98692)).toBe(-8678940);
        });

        test("when given mixed operands", () => {
            expect(calculator.subtract(5411762,-8308854)).toBe(13720616);
            expect(calculator.subtract(-464026,1394319)).toBe(-1858345);
            expect(calculator.subtract(4437122,-1538303)).toBe(5975425);
        });
    });
});