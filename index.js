let results = "";
let operator = null;
let currentValue = 0;

document.addEventListener('DOMContentLoaded', function(){
    const powerButton = document.getElementById("power");
    const display = document.getElementById('display');
    let powerOnOff = 0;

    powerButton.addEventListener("click", function(){
        display.classList.toggle('turn-off');
        if(powerOnOff === 0){
            display.value = "";
            powerOnOff = 1;
        } else {
            display.value = "0";
            powerOnOff = 0;
        } 
        clearDisplay();
    });

    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener("click", function(){
            const value = button.textContent;
            if(value === "="){
                calculateResult();
            } else if (value === "CE" || value === "CLR"){
                clearDisplay();
            } else if (!isNaN(value) || value === ".") {
                if(display.value === "0" || powerOnOff === 1) {
                    display.value = value;
                } else {
                    display.value += value;
                }
            }
        });
    });

    const clearButton = document.getElementById("clr-btn");

    function clearDisplay(){
        display.value = "0";
        currentValue = 0;
        operator = null;
    }

    clearButton.addEventListener("click", clearDisplay);

    function setOperator(op){
        currentValue = parseFloat(display.value);
        operator = op;
        display.value = "";
    }

    const operators = {
        add: "+",
        subtract: "-",
        multiply: "*",
        divide: "/",
        sqrd: "^",
        sqrt: "sqrt"
    };

    for (const [key, value] of Object.entries(operators)) {
        document.getElementById(key).addEventListener("click", function(){
            setOperator(value);
        });
    }

    const toggleSignButton = document.getElementById('neg-pos');
    toggleSignButton.addEventListener("click", function(){
        let currentValue = parseFloat(display.value);
        currentValue = -currentValue;
        display.value = currentValue;
    });

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
                result = newValue === 0 ? "error" : currentValue / newValue;
                break;
            case "^":
                result = Math.pow(currentValue, newValue);
                break;
            case "sqrt":
                result = Math.sqrt(newValue);
                break;
            default:
                result = newValue; 
        }
        display.value = result;
        currentValue = result;
        operator = null; 
    }
});
1