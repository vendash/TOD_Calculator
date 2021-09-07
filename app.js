const debug = true;

const keys = document.querySelector('.keys');

const initialize = function() {
    result = 0;
    currInput = '0';
    prevInput = undefined;
    prevOp = '';
    isLastKeyEqual = false;
    isDisplayingResult = false;
    setDisplay();
}

let result = 0;
let currInput = '';
let prevInput = '';
let prevOp = '';
let isLastKeyEqual = false;
let isDisplayingResult = false;

keys.addEventListener('click', (e) => {
    if (!e.target.closest('button')) return;
    const dataKey = e.target.dataset.key;
    const dataType = e.target.dataset.type;
    
    if (debug) console.log(dataKey, dataType);

    switch (dataType) {
        case 'number':
            if (isDisplayingResult) {
                //Currently displaying a result, new number will come
                currInput = dataKey;
                isDisplayingResult = false;
                if (isLastKeyEqual) {
                    //Number after an equal sign means new operation
                    result = 0;
                    prevInput = '';
                    isLastKeyEqual = false;
                    prevOp = '';
                }
            } else {
                if (currInput === '0') {
                    currInput = dataKey;
                } else {
                    currInput = currInput + dataKey;
                }
            }
            setDisplay();
            break;
        case 'operator':
            if (!isLastKeyEqual && currInput) {
                if (prevOp) {
                    //There was a previous operatos, we can calc
                    result = calculate(prevInput, currInput, prevOp);
                    prevInput = result;
                    displayResult();
                } else {
                    prevInput = currInput;
                    currInput = '';
                }

            }
            prevOp = dataKey;
            isLastKeyEqual = false;
            break;
        case 'equal':
            if (prevOp) {
                result = calculate(prevInput, currInput, prevOp);
                prevInput = result;
                isLastKeyEqual = true;
                displayResult();                
            }
            break;
        case 'percent':
            break;
        case 'decimal':
            break;
        case 'clear':
            initialize();
            break;
        default:
            return;
    }
    displayVariables();
})

const calculate = function(num1, num2, op) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (op === '+') return num1 + num2;
    if (op === '-') return num1 - num2;
    if (op === '/') return num1 / num2;
    if (op === '*') return num1 * num2;
}

const displayResult = function() {
    const display = document.querySelector('.display');
    display.textContent = result.toString();
    isDisplayingResult = true;
}

const setDisplay = function() {
    const display = document.querySelector('.display');
    display.textContent = currInput.toString();
}

const displayVariables = function() {
    console.log(`
        result: ${result}
        currInput: ${currInput},
        prevInput: ${prevInput},
        prevOp: ${prevOp},
        isLastKeyEqual: ${isLastKeyEqual},
        isDisplayingResult: ${isDisplayingResult}
        `)
}

initialize();