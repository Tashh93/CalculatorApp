//place to store input, currentValue, and results 
let results = "";
let operator = null;
let currentValue = 0;

//when power is clicked there should be a black display
document.addEventListener('DOMContentLoaded', function(){
    const powerButton = document.getElementById("power");
    const display = document.getElementById('display');
    let powerOnOff = 0;

    powerButton.addEventListener("click", function(){
        display.classList.toggle('turn-off');
        if(powerOnOff === 0){
            display.disabled = true;
            console.log("clicked Once");
            powerOnOff = 1;
        }else{
            display.disabled = false;
            display.textContent = "Powering On";
            powerOnOff = 0;
            console.log("Clicked Twice");
        } 
        clearDisplay();
    })

//when a button is clicked the value shows
const buttons = document.querySelectorAll('button');

function buttonsClicked(){
    buttons.forEach(button => {
        button.addEventListener("click", function(){
            const value = button.textContent;
            if(value === "="){
                calculateResult();
            } else if (value === "CE"){
                clearDisplay();
                display.value = 0;
            } else if(value === "CLR"){
                clearDisplay();
                display.value = 0;
            } else {
                display.value += value;
                display.style.display = "block";
            }
        
        })
    })
}
buttonsClicked();

//when the clear button is clicked the calculator is clear
const clearButton = document.getElementById("clr-btn");

function clearDisplay(){
    display.value = "";
    currentValue = 0;
    operator = null;
}
clearDisplay();

//Operator buttons
const add = document.getElementById('add');
const subtract = document.getElementById('subtract');
const multiply = document.getElementById('multiply');
const divide = document.getElementById('divide');
const toggleSignButton = document.getElementById('neg-pos');
const numSquared = document.getElementById('sqrd');
const sqRoot = document.getElementById('sqrt');

add.addEventListener("click", function(){
    setOperator("+");
});

subtract.addEventListener("click",function(){
    setOperator("-");
});

multiply.addEventListener("click",function(){
    setOperator("*");
});

divide.addEventListener("click",function(){
    setOperator("/");
});

numSquared.addEventListener("click", function(){
    setOperator("^");
})

sqRoot.addEventListener("click", function(){
    setOperator("sqrt");
})

let clickCount = 0;


// Negative-positive button
toggleSignButton.addEventListener("click",function(){
    clickCount++;

    let currentValue = parseFloat(display.value);

    if(clickCount === 1){
        currentValue *= -1;
        console.log("Clicked Once");
        display.value = currentValue;
        
    } else if(clickCount == 2){
        currentValue *=1;
        console.log("Clicked Twice");
        clickCount = 0;
    }

    display.value = currentValue;
});

//function to set the operator 
function setOperator(op){
    currentValue = parseFloat(display.value);
    operator = op;
    display.value = "";
}

//be able to perform functions
function calculateResult(){
    const newValue = parseFloat(display.value);
    let result = 0;
    switch(operator){
        case "+":
            result = currentValue + newValue;
            break;
        case "-":
            result = currentValue - newValue;
            break;
        case "*":
            result = currentValue * newValue;
            break;
        case "/":
            if(newValue === 0){
                result = "error";
            } else {
                result = currentValue / newValue;
            }
            break;
        case "^":
            result = Math.pow(currentValue, newValue);
            break;
        case "sqrt":
            result = Math.sqrt(newValue);
            break;
        case "-/+":
            result = -currentValue;
            break;
        default:
            result = newValue; 
    }
    display.value = result;
    currentValue = result;
    operator =  null; 
} 
})
