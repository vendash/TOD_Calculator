const debug = true;

const keys = document.querySelector('.keys');

keys.addEventListener('click', (e) => {
    if (!e.target.closest('button')) return;
    const dataKey = e.target.dataset.key;
    const dataType = e.target.dataset.type;
    
    if (debug) console.log(dataKey, dataType);

    switch (dataType) {
        case 'number':
            if (partSum === undefined || currNum === undefined) {
                if (currNum === '0' || currNum === undefined) {
                    currNum = dataKey;
                } else {
                    currNum = currNum + dataKey;
                }
            } else {
                if (isLastKeyEqual) {
                    currNum = dataKey;
                    partSum = undefined;
                    prevOp = '';
                } else {
                    currNum = currNum + dataKey;
                }
            }
            setDisplay(currNum);
            isLastKeyEqual = false;
            break;
        case 'operator':
            if (partSum === undefined) {
                partSum = currNum;
                currNum = undefined;
                prevOp = dataKey;
                setDisplay(partSum);
            } else {
                if (!isLastKeyEqual) partSum = calculate(partSum, currNum, prevOp);
                currNum = undefined;
                prevOp = dataKey;
                setDisplay(partSum);
            }
            break;
        case 'equal':
            if (prevOp) {
                isLastKeyEqual = true;
                partSum = calculate(partSum, currNum, prevOp);
                setDisplay(partSum);               
            }
            break;
        case 'percent':
            if (currNum === undefined) {
                partSum = partSum /100;
                setDisplay(partSum);
            } else {
                currNum = currNum / 100;
                setDisplay(currNum);
            }
            break;
        case 'clear':
            initialize();
            break;
        default:
            return;
    }

})

const calculate = function(num1, num2, op) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (op === '+') return num1 + num2;
    if (op === '-') return num1 - num2;
    if (op === '/') return num1 / num2;
    if (op === '*') return num1 * num2;
}

const setDisplay = function(num) {
    const display = document.querySelector('.display');
    display.textContent = num;
}


const initialize = function() {
    currNum = '0';
    partSum = undefined;
    prevOp = '';
    isLastKeyEqual = false;
    setDisplay(currNum);
}

let currNum = undefined;
let partSum = undefined;
let prevOp = '';
let isLastKeyEqual = false;


initialize();


