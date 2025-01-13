//I want this app to be able to use the functions accordingly. 
const inputDisplay = document.getElementById("display");

inputDisplay.style.backgroundColor = "black";
inputDisplay.value = "";
inputDisplay.placeholder = "OFF";

let isPoweredOn = false; //Track power status

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

deleteButton.addEventListener("click", function(){
    if (isPoweredOn && inputDisplay.value.length > 1) {
        inputDisplay.value = inputDisplay.value.slice(0, -1);
    } else if (isPoweredOn) {
        inputDisplay.value = "0";
    }
});

//Clear everything (C) button
const clearEverything = document.getElementById("clear-btn");

clearEverything.addEventListener("click", function(){
    if(isPoweredOn){
        inputDisplay.value = "0";
    }
});

//Operation Functioning.
const percentButton = document.getElementsByClassName("percentage")[0];

percentButton.addEventListener("click", function(){
    const percentValue = percentButton.value;
    if(isPoweredOn){

        // Handle percentage button
        if(value === "%"){
            inputDisplay.value = parseFloat(inputDisplay.value)/100;
        }
    }
});

// Handle divide button
const divideButton = document.getElementById("divide-btn");

divideButton.addEventListener("click", function(){
    if(isPoweredOn){
        inputDisplay.value += "/";
    }

});

// Handle add button
const addButton = document.getElementById("add-btn");

addButton.addEventListener("click", function(){
    if(isPoweredOn){
        inputDisplay.value += "+";
    }
});

// Handle multiply button
const multiplyButton = document.getElementById("multiply-btn");

multiplyButton.addEventListener("click", function(){
    if(isPoweredOn){
        inputDisplay.value += "*";
    }
});

// Handle subtraction button
const subtractionButton = document.getElementById("subtraction-btn");

subtractionButton.addEventListener("click", function(){
    if(isPoweredOn){
        inputDisplay.value += "-";
    }
})
// Handle all number buttons
const numberButtons = document.getElementsByClassName("num-btn");

Array.from(numberButtons).forEach(button => {
    button.addEventListener("click", function(){
        if(isPoweredOn){
            const buttonValue = button.value;

            if(inputDisplay.value === "0"){
                inputDisplay.value = buttonValue;
            } else {
                inputDisplay.value += buttonValue;
            }
        }
    })
})