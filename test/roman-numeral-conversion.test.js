import { romanToDecimal /* , decimalToRoman */ } from "../src/roman-numeral-conversion";
import { /* romanToDecimal, */ decimalToRoman } from "../src/roman-numeral-conversion-alternate";

const squares = [
    ["I",1],
	["IV",4],
	["IX",9],
	["XVI",16],
	["XXV",25],
	["XXXVI",36],
	["XLIX",49],
	["LXIV",64],
	["LXXXI",81],
	["C",100],
	["CXXI",121],
	["CXLIV",144],
	["CD",400],
	["CM",900],
	["MDC",1600],
	["MMD",2500],
	["MMMDC",3600]
];

const cubes = [
    ["VIII",8],
	["XXVII",27],
	["CXXV",125],
	["CCXVI",216],
	["CCCXLIII",343]
]

describe("romanToDecimal", () => {

test('Expect the conversion to raise an exception when there is no input', () => {
    expect(() => romanToDecimal(null)).toThrow("No Input provided");
    expect(() => romanToDecimal("")).toThrow("No Input provided");
});

test('Expect the conversion to raise an exception when the input is not a Roman numeral', () => {
    expect(() => romanToDecimal("FAB")).toThrow("This is not a Roman numeral!");
    expect(() => romanToDecimal("MMMM")).toThrow("This is not a Roman numeral!");
    expect(() => romanToDecimal("IIX")).toThrow("This is not a Roman numeral!");
    expect(() => romanToDecimal("IXX")).toThrow("This is not a Roman numeral!");
    expect(() => romanToDecimal("LIVID")).toThrow("This is not a Roman numeral!");
    expect(() => romanToDecimal("DILL")).toThrow("This is not a Roman numeral!");
    expect(() => romanToDecimal("CID")).toThrow("This is not a Roman numeral!");
});


test.each([...squares, ...cubes])('The Roman numeral %s to convert to the integer %s', (roman,decimal) => {
    expect(romanToDecimal(roman)).toBe(decimal);
});

})

describe("decimalToRoman", () => {
test('Expect the conversion to raise an exception when there is no input', () => {
    expect(() => decimalToRoman(null)).toThrow("No input provided");
    expect(() => decimalToRoman(0)).toThrow("Apparently, the Romans did not use zero as number");
    expect(() => decimalToRoman(4000)).toThrow("This number is too large to convert into Roman notation");
});

test('Expect the conversion to raise an exception when there is no input', () => {
    expect(() => decimalToRoman(5.4)).toThrow("Roman numeral conversion is only defined for whole numbers");
    expect(() => decimalToRoman(7.9)).toThrow("Roman numeral conversion is only defined for whole numbers");
});

test.each([...squares, ...cubes])('Expect the integer: %s to convert to %s in Roman numerals', (roman,decimal) => {
    expect(decimalToRoman(decimal)).toBe(roman);
})
})
