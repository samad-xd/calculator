let a = '';
let b = '';
let op = '';
let mustResetScreen = true;

const screen = document.querySelector('.screen');
const prevSCreen = document.querySelector('.prev-screen');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const dotButton = document.getElementById('dot');
const equalsButton = document.getElementById('equals');
const numberButtons = document.querySelectorAll('#number');
const operatorButtons = document.querySelectorAll('#operator');

screen.textContent = '0';

numberButtons.forEach(button => button.addEventListener('click', () => appendNumber(button.textContent)));
operatorButtons.forEach(button => button.addEventListener('click', () => selectOperator(button.textContent)));
equalsButton.addEventListener('click', calculate);
dotButton.addEventListener('click', appendDot);
deleteButton.addEventListener('click', deleteChar);
clearButton.addEventListener('click', clearEverything);

window.addEventListener('keydown', takeKeyboardInput);

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('mousedown', () => button.classList.add('active')));
buttons.forEach(button => button.addEventListener('mouseup', () => button.classList.remove('active')));

function takeKeyboardInput(e) {
    if(e.key >= '0' && e.key <= '9') appendNumber(e.key);
    else if(e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') selectOperator(e.key);
    else if(e.key == '.') appendDot();
    else if(e.key == 'Enter') calculate();
    else if(e.key == 'Backspace') deleteChar();
    else if(e.key == 'Escape') clearEverything();
    else return;
}

function appendNumber(number) {
    if(mustResetScreen || screen.textContent == '0') {
        screen.textContent = '';
        mustResetScreen = false;
    }
    screen.textContent += number;
}

function selectOperator(operator) {
    if(op != '') {
        calculate();
    }
    a = screen.textContent;
    op = operator;
    mustResetScreen = true;
    prevSCreen.textContent = a + op;
}

function appendDot() {
    let str = screen.textContent;
    if(str.includes('.')) return;
    screen.textContent += '.';
}

function deleteChar() {
    if(mustResetScreen) return;
    let str = screen.textContent;
    screen.textContent = str.slice(0, -1);
    if(screen.textContent == '') {
        screen.textContent = '0';
    }
}

function clearEverything(e) {
    a = '';
    b = '';
    op = '';
    mustResetScreen = true;
    screen.textContent = '0';
    prevSCreen.textContent = '';
}

function rounded(num) {
    return Math.round(num * 1000) / 1000;
}

function calculate() {
    if(op == '') return;
    a = +a;
    b = +(screen.textContent);
    if(op == '/' && b == 0) {
        alert('Cannot divide by 0');
        return;
    }
    prevSCreen.textContent += b + '=';
    screen.textContent = operate();
    op = '';
}

function operate() {
    switch(op) {
        case '+' : return rounded(a + b);
        case '-' : return rounded(a - b);
        case '*' : return rounded(a * b);
        case '/' : return rounded(a / b);
    }
}