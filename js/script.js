document.addEventListener('DOMContentLoaded', () => {
    const emptyString = '';
    const zeroDigit = '0';
    const divideByZero = 'no';
    let calculatorGrid = document.querySelector('.cal-grid');
    let display = document.querySelector('.display');
    let curValues = [];
    let curValue = zeroDigit;
    let operator = emptyString;
    let equals = false;
    let startOver = false;

    function renderCal() {
        renderDisplay()
        renderGrid();
    }

    function renderDisplay() {
        display.textContent = curValue;
    }

    function renderGrid() {
        /*
        for (let curDigit = 9; curDigit >= 0; curDigit--) {
            let digitButton = document.createElement('button');
            digitButton.classList.add('cal-btn');
            digitButton.textContent = curDigit;
            calculatorGrid.appendChild(digitButton);
        }
        */
        let btnGrid = ['AC', 'C', '%', '/',
                          '9', '8', '7', '*',
                          '6', '5', '4', '-',
                          '3', '2', '1', '+',
                          '0', '.', '+/-', '='];
        let btnFunctions = [];
        let btnFuncIndex = 0;
        for (let i = 0; i < btnGrid.length; i++) {
            let calBtn = document.createElement('button');
            calBtn.classList.add('cal-btn');
            calBtn.textContent = btnGrid[i];

            if (btnGrid[i].charAt(0) >= '0' && btnGrid[i].charAt(0) <= '9') {
                calBtn.addEventListener('click', () => {
                    if (operator.length > 0 && curValues.length === 0) {
                        curValues.push(curValue);
                        curValue = btnGrid[i];
                    }
                    else if (startOver === true || (curValue.length === 1 && 
                             curValue.charAt(0) === '0')) {
                                 startOver = false;
                                 curValue = btnGrid[i];
                             }
                    else 
                        curValue = curValue.concat(btnGrid[i]);
                    renderDisplay();
                });
            } else if (btnGrid[i].charAt(0) === '+') {
                calBtn.addEventListener('click', add);
                calBtn.addEventListener('click', () => {
                    operator = btnGrid[i];
                });
            } else if (btnGrid[i].charAt(0) === '-') {
                calBtn.addEventListener('click', subtract);
                calBtn.addEventListener('click', () => {
                    operator = btnGrid[i];
                });
            } else if (btnGrid[i].charAt(0) === '*') {
                calBtn.addEventListener('click', multiply);
                calBtn.addEventListener('click', () => {
                    operator = btnGrid[i];
                });
            } else if (btnGrid[i].charAt(0) === '/') {
                calBtn.addEventListener('click', divide);
                calBtn.addEventListener('click', () => {
                    operator = btnGrid[i];
                });
            } else if (btnGrid[i] === 'AC') calBtn.addEventListener('click', clear);
              else if (btnGrid[i].charAt(0)) calBtn.addEventListener('click', operate)

            calculatorGrid.appendChild(calBtn);
        }
    }

    function add () {
        if (operator.length === 0 || curValues.length === 0) return;
        if (equals === true) operator = emptyString; 

        let num1 = parseInt(curValues.pop());
        let num2 = parseInt(curValue);


        curValue = (num1 + num2).toString();
        renderDisplay();
    }

    function subtract(){
        if (operator.length === 0 || curValues.length === 0) return;
        if (equals === true) operator = emptyString; 

        let num1 = parseInt(curValues.pop());
        let num2 = parseInt(curValue);

        curValue = (num1 - num2).toString();
        renderDisplay();
    }

    function multiply() {
        if (operator.length === 0 || curValues.length === 0) return;
        if (equals === true) operator = emptyString; 

        let num1 = parseInt(curValues.pop());
        let num2 = parseInt(curValue);


        curValue = (num1 * num2).toString();
        renderDisplay();
    }

    function divide() {
        if (operator.length === 0 || curValues.length === 0) return;
        if (equals === true) operator = emptyString; 

        let num1 = parseInt(curValues.pop());
        let num2 = parseInt(curValue);

        console.log(num1);
        console.log(num2);

        if (num2 === 0) curValue = divideByZero;
        else curValue = (num1 / num2).toString();
        renderDisplay();
    }

    function operate() {
        if (operator.length === 0) return;
        equals = true;
        switch (operator) {
            case '+':
                add();
                break;
            case '-':
                subtract();
                break;
            case '*':
                multiply();
                break;
            case '/':
                divide();
                break;
        }
        startOver = true;
        equals = false;
    }

    function clear() {
        if (curValues.length > 0) curValues.splice(0, curValues.length);
        curValue = zeroDigit;
        renderDisplay();
    }

    // Initializing Calculator
    renderCal();
});