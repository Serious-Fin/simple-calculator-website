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

            if (OPERATOR === '/' && SECOND_NUMBER === "0") {
                clearData("Error");
                return;
            }

            let result = operate(+FIRST_NUMBER, OPERATOR, +SECOND_NUMBER);

            FIRST_NUMBER = result;
            OPERATOR = symbol;
            SECOND_NUMBER = null;

            result = parseFloat(result.toFixed(5));
            output.textContent = result;
        }
    }
    else if (symbol === '=') {
        if (FIRST_NUMBER !== null && OPERATOR !== null && SECOND_NUMBER !== null) {
            if (OPERATOR === '/' && SECOND_NUMBER === "0") {
                clearData("Error");
                return;
            }

            let result = operate(+FIRST_NUMBER, OPERATOR, +SECOND_NUMBER);

            result = parseFloat(result.toFixed(5));

            output.textContent = result;

            FIRST_NUMBER = result;
            OPERATOR = null;
            SECOND_NUMBER = null;
        }
        else {
            const equalsButton = document.querySelector("#equalsButton");
            equalsButton.classList.add('errorButtonPress');
        }
    }

    console.log(`first: ${FIRST_NUMBER}; second: ${SECOND_NUMBER}; operator: ${OPERATOR}`);

}

function buttonClickedAnimation(event) {
    this.classList.add('pressedButton');
}

function removeClass(event) {
    
    if (event.propertyName === 'transform') {
        this.classList.remove('pressedButton');
    }

    if (event.propertyName === 'background-color') {
        this.classList.remove('errorButtonPress');
    }
}

function clearData(text) {
    FIRST_NUMBER = null;
    SECOND_NUMBER = null;
    OPERATOR = null;

    const output = document.querySelector('p#outputText');
    output.textContent = text;
}


const buttonNodeArray = document.querySelectorAll("button.genericButton");
buttonNodeArray.forEach(button => {
    button.addEventListener('click', buttonClickedAnimation);
});

buttonNodeArray.forEach(button => {
    button.addEventListener('transitionend', removeClass);
});