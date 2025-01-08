//I want this app to be able to use the functions accordingly. 
const inputDisplay = document.getElementById("display");
inputDisplay.style.backgroundColor = "black";
inputDisplay.value = "";
inputDisplay.placeholder = "OFF";

let result = "";
let value = ""; //Initalize empty

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
const deleteButton = document.getElementsByClassName("delete-btn");
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

//Number and button functionality
const buttons = document.querySelectorAll(".operating-buttons button:not(.power-btn):not(#ce-btn):not(.delete-btn):not(.equal-btn)");
buttons.forEach(button => {
    button.addEventListener("click", function(){
        if(isPoweredOn) {
            if(inputDisplay.value === "0") {
                inputDisplay.value = button.value;
            } else {
                inputDisplay.value  += button.value;
            }
        }
    });
});

//