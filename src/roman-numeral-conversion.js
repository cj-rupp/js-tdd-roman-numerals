
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

const convertLetters = (letters) => { 
    return letters.map((letter) => (numeralValueTable.get(letter)))
};

const invertValues = (values) => { 
    return values.map((value,index,original) => {
        return (((original.length - index) > 1 && value < original[(index + 1)]) ? -value : value);
    }
)}

const sumValue = (values) => { 
    return values.reduce((total,value) => total += value, 0)
};

export const decimalToRoman = (number) => {
    if(number === null) { throw(new Error("No input provided"))}
    else if(number <= 0) { throw(new Error("Apparently, the Romans did not use zero as number"))}
    else if(number >= 4000) { throw(new Error("This number is too large to convert into Roman notation"))}
    else if(!Number.isInteger(number)) { throw(new Error("Roman numeral conversion is only defined for whole numbers"))}
    else {
        const digits = String(number).split("");
        return convertDigits(digits.reverse());
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

const convertDigits = (digits) => { 
    return digits.reduce((numeralString, digit, index) => {
        return convertDigit(digit, 10**index) + numeralString;
    }, "")
}

