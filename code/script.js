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

function updateDisplay(symbol) {
    if (typeof +symbol === 'number') {
        const output = document.querySelector('p#outputText');
        output.textContent = symbol;
    }
}

function buttonClicked(event) {
    this.classList.add('pressedButton');
}

function removeClass(event) {
    if (event.propertyName !== 'transform') return;

    this.classList.remove('pressedButton');
}


const buttonNodeArray = document.querySelectorAll("button.genericButton");
buttonNodeArray.forEach(button => {
    button.addEventListener('click', buttonClicked);
});

buttonNodeArray.forEach(button => {
    button.addEventListener('transitionend', removeClass);
});