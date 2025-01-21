//I want this app to be able to use the functions accordingly. 
const inputDisplay = document.getElementById("display");
inputDisplay.style.backgroundColor = "black";
inputDisplay.value = "";
inputDisplay.placeholder = "OFF"; 

let isPoweredOn = false;    // Track power status
let firstNumber = null;     // Stores the first number
let secondNumber = null;    // Stores the second number
let currentOperator = null; // Stores current operator
let currentInput = "";    // Stores the current number input
let result = "";

const powerButton = document.getElementsByClassName("power-btn")[0];

powerButton.addEventListener("click", function(){
    if(!isPoweredOn){
        inputDisplay.style.backgroundColor = "white";
        inputDisplay.value = "0";
        isPoweredOn = true;
        inputDisplay.disabled = false; //Enable input when powered on.
    } else {
        inputDisplay.style.backgroundColor = "black";
        inputDisplay.value = "";
        inputDisplay.placeholder = "OFF";
        isPoweredOn = false;
        inputDisplay.disabled = true; //Disable input when powered off. 
    }
});

//For the DEL Button
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


//Clear everything (C) button
const clearEverything = document.getElementById("clear-btn");

clearEverything.addEventListener("click", function(){
    if(isPoweredOn){
        inputDisplay.value = "0";
        firstNumber = null;
        secondNumber = null;
        currentOperator = null;
        currentInput = "";
    }
});

//Now I'm on to setting the functions for the operations.

// Percent Button
const percentButton = document.getElementsByClassName("percentage")[0];
percentButton.addEventListener("click", function(){
    if (isPoweredOn && inputDisplay.value) {
        let currentValue = parseFloat(inputDisplay.value);
        inputDisplay.value = currentValue / 100;
    }
    console.log("Percent button clicked.")
});

const divideButton = document.getElementById("divide-btn");
divideButton.addEventListener("click", function(){
    if(isPoweredOn){
        if(firstNumber === null){
        firstNumber = parseFloat(inputDisplay.value);
        currentOperator = '/'; // Stores the operator
        inputDisplay.value = "";
    } else {
        secondNumber = parseFloat(inputDisplay.value);  // Stores the second number
        if (secondNumber === 0){
            inputDisplay.value = "Error: Division by zero";
        } else {
            result = firstNumber / secondNumber;
            inputDisplay.value = result;
            firstNumber = result;
            secondNumber = null;
            currentOperator = null;
        }
    }
    } 
});

// Function to handle operations
function handleOperator (operator){
    if(isPoweredOn){
        if(firstNumber === null){
            firstNumber = parseFloat(inputDisplay.value);
            currentOperator = operator;
            inputDisplay.value = "";
        } else {
            secondNumber = parseFloat(inputDisplay.value);
            switch (currentOperator) {
                case '/':
                    if (secondNumber === 0){
                        inputDisplay.value = "Error: Division by zero.";
                    } else {
                        result = firstNumber / secondNumber;
                        inputDisplay.value = result;
                        firstNumber = result;
                        secondNumber = null;
                    }
                    break;
                case '+':
                    result = firstNumber + secondNumber;
                    inputDisplay.value = result;
                    firstNumber = result;
                    secondNumber = null;
                    break;
                case '-':
                    result = firstNumber - secondNumber;
                    inputDisplay.value = result;
                    firstNumber = result;
                    secondNumber = null;
                    break;
                case '*':
                    result = firstNumber * secondNumber;
                    inputDisplay.value = result;
                    firstNumber = result;
                    secondNumber = null;
                    break;
            }
            currentOperator = null;
        }
    }
}

// Multiply button
const multiplyButton = document.getElementById("multiply-btn");
multiplyButton.addEventListener("click", function(){
    handleOperator('*');
    console.log("Multiplication is being used");
})

const addButton = document.getElementById("add-btn");
addButton.addEventListener("click", function(){
    handleOperator('+');
    console.log("Additon button clicked");
})

const subtractButton = document.getElementById("subtraction-btn");
subtractButton.addEventListener("click", function(){
    handleOperator('-');
    console.log("Subtraction button clicked");
})

// Equal button
const equalButton =  document.getElementById("equal-btn");
equalButton.addEventListener("click", function(){
    if(isPoweredOn && firstNumber !== "" && currentOperator !== ""){
        secondNumber = parseFloat(inputDisplay.value);
        handleOperator(currentOperator);

        // Clearing value after calculations
        inputDisplay.value = "";

        // Updating firsst number
        firstNumber = "";
        currentOperator = "";

        console.log("equal button clicked");
    } else {
        console.log("Calculations can not be performed. Ensure the numbers are entered correctly.");
    }
})

const numberButtons = document.querySelectorAll(".num-btn");

numberButtons.forEach(button => {
        button.addEventListener("click", function(){
        inputDisplay.value = button.value;
        console.log("button clicked:", button.value);
    })
});