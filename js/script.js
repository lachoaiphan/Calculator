document.addEventListener('DOMContentLoaded', () => {
    const divByZeroMsg = 'Infinity';
    const negSign = '-';
    const decimalPoint = '.';
    const emptyString = '';
    const zeroDigit = '0'; 
    const percent = 100;
    let calGrid = document.querySelector('.cal-grid');
    let display = document.querySelector('.display');
    let prevNum = emptyString;
    let curNum = zeroDigit;
    let op = emptyString;
    let equals = false;
    let startNewNum = false;

    // Render Functions

    function renderCal() {
        renderDisplay();
        renderGrid();
    }

    function renderDisplay() {
        display.textContent = curNum;
    }

    function renderGrid() {
        const btnGrid = ['AC', 'C', '%', '/',
                         '9', '8', '7', '*',
                         '6', '5', '4', '-',
                         '3', '2', '1', '+',
                         '0', '.', '+/-', '='];
        const miscBtnFunc = [clearAll, clearEntry, percentage, 
                             setPoint, setNeg];
        let miscBtnIndex = 0;
        for (let i = 0; i < btnGrid.length; i++) {
            let calBtn = document.createElement('button');
            calBtn.classList.add('cal-btn');
            calBtn.textContent = btnGrid[i];

            if (isDigit(btnGrid[i])) 
                calBtn.addEventListener('click', () => setCurNum(btnGrid[i]));
            else if (isOperator(btnGrid[i]))
                calBtn.addEventListener('click', () => {
                    if (op.length !== 0) operate()
                    op = btnGrid[i];
                });
            else if (isEquals(btnGrid[i]))
                calBtn.addEventListener('click', () => {
                    equals = true;
                    operate();
                });
            else
                calBtn.addEventListener('click', miscBtnFunc[miscBtnIndex++]);
            
            calGrid.appendChild(calBtn);
        }
    }

    // Set Functions
    function setPoint() {
        if (isDecimal(curNum) || getLastChar() === decimalPoint) 
            return;
        curNum = curNum.concat(decimalPoint);
        renderDisplay();
    }

    function setNeg() {
        if (curNum === zeroDigit || curNum.length === 0)
            return;
        else if (getFirstChar() !== negSign) 
            curNum = negSign.concat(curNum);
        else 
            curNum = curNum.substring(1);
        renderDisplay();
    }

    function setCurNum(curDigit) {
        if (op.length !== 0 && prevNum.length === 0) {
            prevNum = curNum;
            curNum = curDigit;
        }
        else if (startNewNum || (curNum.length === 1 && 
                 getFirstChar() === zeroDigit)) {
            if (startNewNum) startNewNum = false;
            curNum = curDigit;
        }
        else
            curNum = curNum.concat(curDigit);
        renderDisplay();
    }

    // Boolean Functions
    function isDigit(digit) {
        return digit >= '0' && digit <= '9';
    }

    function isOperator(op) {
        return op === '+' || op === '-' || op === '*' || op === '/';
    }

    function isEquals(eq){
        return eq === '=';
    }

    function isDecimal(num) {
        const decIndex = num.indexOf(decimalPoint);
        return decIndex >= 0 && decIndex !== num.length - 1 ? true : false;
    }

    // Get Functions
    function getFirstChar() {
        return curNum.charAt(0);
    }

    function getLastChar() {
        return curNum.charAt(curNum.length - 1);
    }

    // Parse functions
    function parseNumber(numStr) {
        return isDecimal(numStr) ? parseFloat(numStr) : parseInt(numStr);
    }

    // Calculator functions
    function add (num1, num2) {
        curNum = (num1 + num2).toString()
    }

    function subtract(num1, num2) {
        curNum = (num1 - num2).toString()
    }

    function multiply(num1, num2) {
        curNum = (num1 * num2).toString()
    }

    function divide(num1, num2) {
        if (num2 === 0)
            curNum = divByZeroMsg;
        else
            curNum = (num1 / num2).toString()
    }

    function percentage() {
        curNum = (parseNumber(curNum) / percent).toString();
        renderDisplay();
    }
    
    function operate() {
        const num1 = parseNumber(prevNum);
        const num2 = parseNumber(curNum);
        switch (op) {
            case '+':
                add(num1, num2);
                break;
            case '-':
                subtract(num1, num2);
                break;
            case '*':
                multiply(num1, num2);
                break;
            case '/':
                divide(num1, num2);
                break;
        }
        renderDisplay();
        startNewNum = true;
        prevNum = emptyString;
        if (equals === true) {
            op = emptyString;
            equals = false;
        }
    }

    // Delete functions 
    function clearAll() {
        prevNum = emptyString;
        curNum = zeroDigit;
        renderDisplay();
    }

    function clearEntry() {
        if (curNum.length === 1) 
            curNum = zeroDigit;
        else 
            curNum = curNum.substring(0, curNum.length - 1);
        renderDisplay();
    }

    // Initialize Calculator
    renderCal();
})