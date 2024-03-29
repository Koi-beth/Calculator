const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingnextValue = false;

function sendNumberValue(number) {
// Replace current display value if first value is entered
if (awaitingnextValue) {
    calculatorDisplay.textContent = number;
    awaitingnextValue = false;
}else {
 // If current Display value is 0, replace it if not add number
const displayValue = calculatorDisplay.textContent;
calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
}
}

function addDecimal() {
    // If operator pressed, don't add decimal
    if (awaitingnextValue) return;
    // If no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}


// Calculate fist and second value depending on operator
const calculate = {
 '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

 '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

 '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

 '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

 '=': (firstNumber, secondNumber) => secondNumber,
}


function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if (operatorValue && awaitingnextValue)  {
        operatorValue = operator;
        return;
    }
    // Assign firstValue if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next value, store operator
    awaitingnextValue = true;
    operatorValue = operator;
} 

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

// Reset all values, display
function resetAll() {
     firstValue = 0;
     operatorValue = '';
     awaitingnextValue = false;
    calculatorDisplay.textContent = '0';
}
// Event Listener
clearBtn.addEventListener('click', resetAll);