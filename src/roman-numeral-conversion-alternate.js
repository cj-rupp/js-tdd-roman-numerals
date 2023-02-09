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

const romanCharacters = /^[MDCLXVI]+/;

/* This pattern also allows an empty string, but the one above doesn't*/

const romanForm = /^(M{0,3})(C(M|D)|D?C{0,3})?(X(C|L)|L?X{0,3})?(I(X|V)|V?I{0,3})?$/;

const numeralValueTable = new Map(numeralValues);

export const romanToDecimal = (string) => {
    if(string === null || string.length === 0) { throw(new Error("No Input provided"))}
    else if(!string.match(romanCharacters)) {
            throw(new Error("This is not a Roman numeral!")) 
        }
    else {
        const matchGroups = string.match(romanForm);
        if(matchGroups === null) {
            throw(new Error("This is not a Roman numeral!")) 
        }
        else {
            const romanGroups = matchGroups.slice(1).reduce((evenGroups,group,index) => {
                if(group !== undefined && (index === 0 || (index % 2) === 1)) {
                    evenGroups.push(group);
                }
                return evenGroups;
            }, []);
            return romanGroups.reduce((decimalValue,group) => {
                if(group !== undefined || group.length > 0){
                    if(group.length == 2) {
                        const leftValue = numeralValueTable.get(group[0]);
                        const rightValue = numeralValueTable.get(group[1]);
                        return decimalValue += (leftValue < rightValue) ? rightValue - leftValue : leftValue + rightValue;
                    }
                    else {
                        return decimalValue +=
                            group.split("").reduce((total,character) => {
                            return total += numeralValueTable.get(character);
                            }, 0
                        )
                    }
                }
                else {
                    return decimalValue;
                }
            }, 0)
        }
    }
}

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
