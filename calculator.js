var display = document.querySelector('.calculator-screen');
var screenText = "";
var digitButtons = document.querySelectorAll('.btn-light');
var operators = document.querySelectorAll('.operator');
var firstDigit = null;
var operator = '';
let equals = document.querySelector('.equal-sign');
let dot = document.querySelector('.decimal').addEventListener('click', event =>{
    if(screenText.indexOf('.') == -1){
    screenText += event.target.value;
    display.setAttribute('value', display.getAttribute('value') + event.target.value);
    }
});


let ac = document.querySelector('.all-clear').addEventListener('click', event => {
    screenText = "";
    firstDigit = null;
    operator = '';
    display.setAttribute('value', "0");
});

equals.addEventListener('click', event => {
    if(operator != '' && firstDigit != null && screenText.length > 0){
        let sum = calculate(operator,firstDigit,Number(screenText));
        display.setAttribute('value', sum);
    }
    else{
        console.log("something went wrong");
    }
    screenText = "";
    firstDigit = null;
    operator = '';
});

for(let i = 0;i<operators.length;i++){
    operators[i].addEventListener('click', event => {
        firstDigit = Number(screenText);
        screenText = "";
        operator = event.target.value;
    });
}

if(screenText.length <= 8){
    for(let i = 0; i < digitButtons.length; i++){
        digitButtons[i].addEventListener('click', event => {
            if(screenText != '0'){
                let element = event.target;
                screenText += element.value;
                display.setAttribute('value', screenText);
                console.log(display);
            }
        });
    }
}

function calculate(operator,firstDigit,secondDigit){
    let sum = 0;
    if(operator == '+'){
        sum = firstDigit + secondDigit;
    }
    else if(operator == '-'){
        sum = firstDigit - secondDigit;
    }
    else if(operator == '*'){
        sum = firstDigit * secondDigit;
        if(sum > 1000000000){
            return "too huge a number"
        }
        else if(!Number.isInteger(sum)){
            sum = sum.toFixed(3);
        }
    }
    else if(operator == '/' && secondDigit != 0){
        sum = firstDigit / secondDigit;
        sum = sum.toFixed(3);
    }
    return sum;
}