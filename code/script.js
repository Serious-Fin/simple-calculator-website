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

    if (!isNaN(symbol)){
        if (FIRST_NUMBER === null) {
            FIRST_NUMBER = symbol;
            output.textContent = FIRST_NUMBER;
        }
        else if (FIRST_NUMBER !== null && OPERATOR === null) {
            FIRST_NUMBER += symbol;
            output.textContent = FIRST_NUMBER;
        }
        else if (SECOND_NUMBER === null && OPERATOR !== null && FIRST_NUMBER !== null) {
            SECOND_NUMBER = symbol;
            output.textContent = SECOND_NUMBER;
        }
        else if (SECOND_NUMBER !== null) {
            SECOND_NUMBER += symbol;
            output.textContent = SECOND_NUMBER;
        }
    }
    else if (symbol === '+' || symbol === '-' || symbol === '*' || symbol === '/') {
        if (FIRST_NUMBER !== null && SECOND_NUMBER === null) {
            OPERATOR = symbol;
            output.textContent = OPERATOR;
        }
        else if (FIRST_NUMBER !== null && SECOND_NUMBER !== null) {
            if (OPERATOR === '/' && SECOND_NUMBER === "0") {
                clearData("Error");
                return;
            }

            let result = operate(+FIRST_NUMBER, OPERATOR, +SECOND_NUMBER);

            FIRST_NUMBER = String(result);
            OPERATOR = symbol;
            SECOND_NUMBER = null;

            result = parseFloat(result.toFixed(5));
            output.textContent = result;
        }

        document.getElementById('dotButton').disabled = false;
    }
    else if (symbol === '=' || symbol === 'Enter') {
        if (FIRST_NUMBER !== null && OPERATOR !== null && SECOND_NUMBER !== null) {
            if (OPERATOR === '/' && SECOND_NUMBER === "0") {
                clearData("Error");
                return;
            }

            let result = operate(+FIRST_NUMBER, OPERATOR, +SECOND_NUMBER);

            result = parseFloat(result.toFixed(5));

            output.textContent = result;

            FIRST_NUMBER = String(result);
            OPERATOR = null;
            SECOND_NUMBER = null;

            document.getElementById('dotButton').disabled = false;
        }
        else {
            const equalsButton = document.querySelector("#equalsButton");
            equalsButton.classList.add('errorButtonPress');
        }
    }
    else if (symbol === '.') {
        if (OPERATOR === null) {
            if (FIRST_NUMBER === null) {
                FIRST_NUMBER = '0.';
            }
            else {
                FIRST_NUMBER += '.';
            }
            output.textContent = FIRST_NUMBER;
        }
        else {
            if (SECOND_NUMBER === null) {
                SECOND_NUMBER = '0.';
            }
            else {
                SECOND_NUMBER += '.';
            }
            output.textContent = SECOND_NUMBER;
        }

        document.getElementById('dotButton').disabled = true;
    }
    else if (symbol === 'Backspace') {
        backspace();
    }
    else if (symbol === 'Escape') {
        clearData('Calculator');
    }

    const miniOutput = document.querySelector('#currentExpression');
    let first = FIRST_NUMBER !== null ? parseFloat((+FIRST_NUMBER).toFixed(4)) : '';
    let oper = OPERATOR !== null ? OPERATOR : '';
    let second = SECOND_NUMBER !== null ? parseFloat((+SECOND_NUMBER).toFixed(4)) : '';
    miniOutput.textContent = `${first} ${oper} ${second}`;

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

    const miniOutput = document.querySelector('#currentExpression');
    miniOutput.textContent = '';
}

function backspace() {
    if (SECOND_NUMBER !== null) {
        SECOND_NUMBER = SECOND_NUMBER.substring(0, SECOND_NUMBER.length - 1);

        if (SECOND_NUMBER.length === 0) {
            SECOND_NUMBER = null;
        }
    }
    else if (SECOND_NUMBER === null && OPERATOR !== null) {
        OPERATOR = OPERATOR.substring(0, OPERATOR.length - 1);

        if (OPERATOR.length === 0) {
            OPERATOR = null;
        }
    }
    else if (SECOND_NUMBER === null && OPERATOR === null && FIRST_NUMBER !== null) {
        FIRST_NUMBER = FIRST_NUMBER.substring(0, FIRST_NUMBER.length - 1);

        if (FIRST_NUMBER.length === 0) {
            FIRST_NUMBER = null;
        }
    }
}

function keyboardPressed(event) {
    console.log(event);0
    const availableKeyEvents = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '/', '*', '-', '+', 'Enter', 'Backspace', 'Escape']
    if (availableKeyEvents.includes(event.key)) {
        buttonClicked(event.key);
    }
}


const buttonNodeArray = document.querySelectorAll("button.genericButton");
buttonNodeArray.forEach(button => {
    button.addEventListener('click', buttonClickedAnimation);
});

buttonNodeArray.forEach(button => {
    button.addEventListener('transitionend', removeClass);
});

window.addEventListener('keydown', keyboardPressed);