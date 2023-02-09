const numeralValues = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
];

// const romanCharacters = /^[MDCLXVI]+/;

/* This pattern also allows an empty string, but the one above doesn't*/

// const romanForm = /^M{0,3}(C(M|D)|D?C{0,3})?(X(C|L)|L?X{0,3})?(I(X|V)|V?I{0,3})?$/;

export const decimalToRoman = (number) => {
    if(number === null) { throw(new Error("No input provided"))}
    else if(number <= 0) { throw(new Error("Apparently, the Romans did not use zero as number"))}
    else if(number >= 4000) { throw(new Error("This number is too large to convert into Roman notation"))}
    else if(!Number.isInteger(number)) { throw(new Error("Roman numeral conversion is only defined for whole numbers"))}
    else {
        const romanNumeralObj = numeralValues.reduce((protoNumeral,numeralValuePair) => {
            const repeats = Math.floor(protoNumeral.value/numeralValuePair[1])
            return (repeats > 0) ? {numeral: (protoNumeral.numeral + numeralValuePair[0].repeat(repeats)),
                                    value: protoNumeral.value % numeralValuePair[1]} :
                                    protoNumeral;
        }, {numeral: "", value: number})
        return romanNumeralObj.numeral;
    }
}
