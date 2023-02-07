
const numeralValues = [
    ["M", 1000],
    ["D", 500],
    ["C", 100],
    ["L", 50],
    ["X", 10],
    ["V", 5],
    ["I", 1],
];

const romanCharacters = /^[MDCLXVI]+/;

/* This pattern also allows an empty string, but the one above doesn't*/

const romanForm = /^M{0,3}(C(M|D)|D?C{0,3})?(X(C|L)|L?X{0,3})?(I(X|V)|V?I{0,3})?$/;

const numeralValueTable = new Map(numeralValues);

const decimalSymbolTable = new Map(numeralValues.map((relation) => (relation.reverse())));

export const romanToDecimal = (string) => {
    if(string === null || string.length === 0) { throw(new Error("No Input provided"))}
    else if((!string.match(romanCharacters)) ||
        !string.match(romanForm)) {
            throw(new Error("This is not a Roman numeral!")) 
        }
    else {
        const initialValues = convertLetters(string.split(""));
        const actualValues = invertValues(initialValues);
        const decimalValue = sumValue(actualValues);
        return decimalValue;
    }
}

const convertLetters = (letters) => (
    letters.map((letter) => (numeralValueTable.get(letter)))
);

/* Once you get the default values,
the quirk of the Roman notation comes down to whether next character is worth more, or not. */

const invertValues = (values) => (
    values.map((value,index,original) => (
        ((original.length - index) > 1 && value < original[(index + 1)]) ? -value : value
    )
))

const sumValue = (values) => (values.reduce((total,value) => total += value, 0));

export const decimalToRoman = (number) => {
    if(number === null) { throw(new Error("No input provided"))}
    else if(number <= 0) { throw(new Error("Apparently, the Romans did not use zero as number"))}
    else if(number >= 4000) { throw(new Error("This number is too large to convert into Roman notation"))}
    else if(!Number.isInteger(number)) { throw(new Error("Roman numeral conversion is only defined for whole numbers"))}
    else {
        const digits = String(number).split("");
        return convertDigits(digits);
    }
}

const convertDigit = (digit,multiplier) => {
    if(digit == 0) {
        return "";
    } else if (digit == 9) {
        return decimalSymbolTable.get(multiplier) + decimalSymbolTable.get(multiplier*10);
    } else if (digit == 4) {
        return decimalSymbolTable.get(multiplier) + decimalSymbolTable.get(multiplier*5);
    } else if (digit >= 5) {
        return decimalSymbolTable.get(multiplier*5) + convertDigit(digit-5, multiplier);
    } else {
        return decimalSymbolTable.get(multiplier) + convertDigit(digit-1, multiplier);
    }
}

/* If the conversion goes from the left on a reversed list, you can use the positional index to
give the power of 10 required for the multiplier (then build the string from the front). With
reduceRight, it was too difficult to work out the decimal place. */

const convertDigits = (digits) => 
    digits.reverse().reduce((numeralString, digit, index) =>
        (convertDigit(digit, 10**index) + numeralString), "")


