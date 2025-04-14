// Функции для основных операций
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "Эйнштейн был прав, делить на ноль нельзя!";  
    return a / b;
}

// Основная функция для выполнения операции
function operate(operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    let result;


    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
        default:
            return null;
    }

    // Округляем результат до 4 знаков после запятой, если это число
    if (typeof result === 'number') {
        return +result.toFixed(4);
    }

    return result;
}

let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetScreen = false;


const screen = document.getElementById('result');
const buttons = document.querySelectorAll('.key');
const decimalButton = document.querySelector('#dot'); 

// Добавляем обработчики событий для всех кнопок
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        handleButtonClick(button.value);
    });
});

// Обрабатываем нажатие кнопки
function handleButtonClick(value) {
    if (!isNaN(value) || value === '.') {
        appendNumber(value);  
    } else if (value === 'AC') {
        clearAll(); 
    } else if (value === 'DEL') {
        deleteLast(); 
    } else if (value === '=') {
        calculateResult(); 
    } else {
        setOperator(value); 
    }
}


function appendNumber(num) {
    if (screen.value === '0' || shouldResetScreen) {
        screen.value = '';
        shouldResetScreen = false;
    }

    if (num === '.') {
        if (screen.value.includes('.')) return;  
        decimalButton.disabled = true;  
    }

    screen.value += num;  
}

// Устанавливаем операцию
function setOperator(operator) {
    if (currentOperator !== null) calculateResult(); 
    firstNumber = screen.value;
    currentOperator = operator;  
    shouldResetScreen = true; 
    decimalButton.disabled = false;
}

// Вычисляем результат операции
function calculateResult() {
    if (currentOperator === null || shouldResetScreen) return; 
    secondNumber = screen.value;  
    const result = operate(currentOperator, firstNumber, secondNumber);  
    screen.value = result;
    firstNumber = result; 
    currentOperator = null; 
    shouldResetScreen = true;  
    decimalButton.disabled = false; 
}


function clearAll() {
    screen.value = '';  
    firstNumber = '';  
    secondNumber = ''; 
    currentOperator = null; 
    shouldResetScreen = false;  
    decimalButton.disabled = false; 
}

// Удаляем последний символ на экране
function deleteLast() {
    screen.value = screen.value.slice(0, -1);  
    if (!screen.value.includes('.')) {
        decimalButton.disabled = false; 
    }
}
