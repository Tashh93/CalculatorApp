const inputDisplay = document.getElementById("display");
inputDisplay.style.backgroundColor = "black";
inputDisplay.value = "";
inputDisplay.placeholder = "OFF"; 

let isPoweredOn = false;    // Track power status
let firstNumber = null;     // Stores the first number
let secondNumber = null;    // Stores the second number
let currentOperator = null; // Stores current operator
let currentInput = ""    // Stores the current number input
let result = 0;

const powerButton = document.getElementsByClassName("power-btn")[0];

powerButton.addEventListener("click", function() {
    if (!isPoweredOn) {
        inputDisplay.style.backgroundColor = "white";
        inputDisplay.value = "0";
        isPoweredOn = true;
        inputDisplay.disabled = false; // Enable input when powered on.
    } else {
        inputDisplay.style.backgroundColor = "black";
        inputDisplay.value = "";
        inputDisplay.placeholder = "OFF";
        isPoweredOn = false;
        inputDisplay.disabled = true; // Disable input when powered off.
    }
});

// For the DEL Button
const deleteButton = document.getElementsByClassName("delete-btn")[0];

deleteButton.addEventListener("click", function() {
    if (isPoweredOn) {
        if (inputDisplay.value.length > 1) {
            inputDisplay.value = inputDisplay.value.slice(0, -1);
        } else {
            inputDisplay.value = "0";
        }
    }
});

// Clear everything (C) button
function clearButton(){
    currentInput = "";
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    result = 0;
    inputDisplay.value = "0";
}

// Percent Button
const percentButton = document.getElementsByClassName("percentage")[0];
percentButton.addEventListener("click", function() {
    if (isPoweredOn && inputDisplay.value) {
        let currentValue = parseFloat(inputDisplay.value);
        inputDisplay.value = (currentValue / 100).toString();
        result = currentValue / 100;
    }
    console.log("Percent button clicked.");
});

// Function to handle operations
function handleOperator(operator) {
    if (isPoweredOn) {
        if (firstNumber === null) {
            firstNumber = parseFloat(inputDisplay.value);
        } else if (currentOperator && secondNumber !== null) {
            secondNumber = parseFloat(inputDisplay.value);
            performCalculation();
            currentOperator = operator; // Update operator for next calculation
            firstNumber = result;
        } else {
            currentOperator = operator;
            inputDisplay.value = "";
        }
    }
}

// Function to perform calculation
function performCalculation() {
    result = 0;
    if (firstNumber !== null && secondNumber !== null && currentOperator) {
        switch (currentOperator) {
            case '/':
                if (secondNumber === 0) {
                    inputDisplay.value = "Error";
                    firstNumber = null;
                    secondNumber = null;
                    currentOperator = null;
                    return;
                } else {
                    result = firstNumber / secondNumber;
                    break;
                }
                break;
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case '*':
                result = firstNumber * secondNumber;
                break;
            default:
                inputDisplay.value = "Error!";
                return;
        }
        inputDisplay.value = result;
        firstNumber = result;
        secondNumber = null;
        currentOperator = null;
    }
}

// Operator buttons
const divideButton = document.getElementById("divide-btn");
divideButton.addEventListener("click", function() {
    handleOperator('/');
    console.log("Divide button clicked");
});

const multiplyButton = document.getElementById("multiply-btn");
multiplyButton.addEventListener("click", function() {
    handleOperator('*');
    console.log("Multiplication is being used");
});

const addButton = document.getElementById("add-btn");
addButton.addEventListener("click", function() {
    handleOperator('+');
    console.log("Addition button clicked");
});

const subtractButton = document.getElementById("subtraction-btn");
subtractButton.addEventListener("click", function() {
    handleOperator('-');
    console.log("Subtraction button clicked");
});

// Equal button
const equalButton = document.getElementById("equal-btn");
equalButton.addEventListener("click", function() {
    if (isPoweredOn && firstNumber !== null && currentOperator !== null) {
        secondNumber = parseFloat(inputDisplay.value);
        performCalculation();

        // Clear values after calculations
        firstNumber = result;
        secondNumber = null;
        currentOperator = null;

        console.log("Equal button clicked");
    } else {
        console.log("Calculations cannot be performed. Ensure the numbers are entered correctly.");
    }
});

// Number buttons
const numberButtons = document.querySelectorAll(".num-btn");

numberButtons.forEach(button => {
    button.addEventListener("click", function() {
        if (isPoweredOn) {
            if (inputDisplay.value === "0" || inputDisplay.value === "") {
                inputDisplay.value = button.value;
            } else {
                inputDisplay.value += button.value;
            }
            console.log("Button clicked:", button.value);
        }
    });
});
