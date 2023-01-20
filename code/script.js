let FIRST_NUMBER = null;
let SECOND_NUMBER = null;
let OPERATOR = null;


function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, operator, num2) {
    if (operator === '+') {
        return add(num1, num2);
    }
    else if (operator === '-') {
        return subtract(num1, num2);
    }
    else if (operator === '*') {
        return multiply(num1, num2);
    }
    else if (operator === '/') {
        return divide(num1, num2);
    }
}

function buttonClicked(symbol) {
    const output = document.querySelector('p#outputText');
    /*12 + 7 - 5 * 3 = should yield 42*/

    if (!isNaN(symbol)){
        console.log(`number ${+symbol} typed`);
        if (FIRST_NUMBER === null) {
            console.log('printing first');
            FIRST_NUMBER = symbol;
            output.textContent = FIRST_NUMBER;
        }
        else if (FIRST_NUMBER !== null && OPERATOR === null) {
            console.log('printing first');
            FIRST_NUMBER += symbol;
            output.textContent = FIRST_NUMBER;
        }
        else if (SECOND_NUMBER === null && OPERATOR !== null && FIRST_NUMBER !== null) {
            console.log('printing second');
            SECOND_NUMBER = symbol;
            output.textContent = SECOND_NUMBER;
        }
        else if (SECOND_NUMBER !== null) {
            console.log('printing second');
            SECOND_NUMBER += symbol;
            output.textContent = SECOND_NUMBER;
        }
    }
    else if (symbol === '+' || symbol === '-' || symbol === '*' || symbol === '/') {
        if (FIRST_NUMBER !== null && SECOND_NUMBER === null) {
            console.log(`Operator ${symbol} typed`)
            OPERATOR = symbol;
            output.textContent = OPERATOR;
        }
        else if (FIRST_NUMBER !== null && SECOND_NUMBER !== null) {
            console.log(`Operator ${symbol} typed CALCULATING AND CONTINUEING`)
            let result = operate(+FIRST_NUMBER, OPERATOR, +SECOND_NUMBER);
            output.textContent = result;

            FIRST_NUMBER = result;
            OPERATOR = symbol;
            SECOND_NUMBER = null;
        }
    }
    else if (symbol === '=') {
        let result = operate(+FIRST_NUMBER, OPERATOR, +SECOND_NUMBER);
        output.textContent = result;

        FIRST_NUMBER = result;
        OPERATOR = null;
        SECOND_NUMBER = null;
    }

    console.log(`first: ${FIRST_NUMBER}; second: ${SECOND_NUMBER}; operator: ${OPERATOR}`);

}

function buttonClickedAnimation(event) {
    this.classList.add('pressedButton');
}

function removeClass(event) {
    if (event.propertyName !== 'transform') return;

    this.classList.remove('pressedButton');
}


const buttonNodeArray = document.querySelectorAll("button.genericButton");
buttonNodeArray.forEach(button => {
    button.addEventListener('click', buttonClickedAnimation);
});

buttonNodeArray.forEach(button => {
    button.addEventListener('transitionend', removeClass);
});