let ops = {}
ops["+"] = function(a, b) {return a + b};
ops["-"] = function(a, b) {return a - b};
ops["*"] = function(a, b) {return a * b};
ops["/"] = function(a, b) {return a / b};

function resetDisplayVal() {
    displayVal.first = 0;
    displayVal.second = null;
    displayVal.operator = null;
}

let displayVal = {};
resetDisplayVal();

function operate(first, second, operator) {
    return ops[operator](first, second);
}

function createNums() {
    const nums = document.querySelector(".nums");
    for (let i = 0; i < 9; i++) {
        const btn = document.createElement("div");
        const num = document.createElement("p");
        btn.classList.add("btn");
        btn.classList.add("center");
        btn.classList.add("num");
        nums.appendChild(btn);
        btn.appendChild(num);
        if (i < 3) num.textContent = i + 7;
        if (i < 6 && i >= 3) num.textContent = i + 1;
        if (i < 9 && i >= 6) num.textContent = i - 5;
    }
}

function displayNewNum(btnClick) {
    num = Number(btnClick);
    display.textContent = btnClick;
    return num;
}

function updateDisplay(btnClick, num, eval) {
    if (eval.type === "num") {
        if (!eval.status) {
            if (!num) {
                num = displayNewNum(btnClick);
            } else {
                num = Number(num.toString() + btnClick);
                display.textContent = num;
            }
            return num;
        } else {
            num = displayNewNum(btnClick);
            eval.status = false;
            return num;
        }
    } else {
        display.textContent = num;
    }

}

createNums();

const btns = document.querySelectorAll(".btn");
const display = document.querySelector(".display");
let eval = {};
btns.forEach((btn) => btn.addEventListener("click", function (e) {
    let btnClick = e.target.textContent;
    if (btn.matches(".num")) {
        eval.type = "num";
        if (displayVal.operator === null) {
            displayVal.first = updateDisplay(btnClick, displayVal.first, eval);
        } else {
            displayVal.second = updateDisplay(btnClick, displayVal.second, eval);
        }
    } else if (btn.matches(".op")) {
        displayVal.operator = btnClick;
        eval.status = false;
    } else if (btn.matches(".equals")) {
        eval.status = true;
        eval.type = "equals"
        if (displayVal.operator) {
            if (displayVal.second === null) {
                displayVal.second = displayVal.first;
            }
            displayVal.first = operate(displayVal.first, displayVal.second, displayVal.operator);
                console.log("Result: " + displayVal.first);
                console.log('debug' + btnClick);
                console.log('debug' + displayVal.first);
                console.log('debug' + eval.type);
                updateDisplay(btnClick, displayVal.first, eval.type);
                displayVal.second = null;
                displayVal.operator = null;
        }
    } else if (btn.matches(".clear")) {
        eval.status = false;
        eval.type = null;
        resetDisplayVal();
        updateDisplay(0, displayVal.first, eval);
    }
    console.log("Button: " + btnClick);
    console.log('First: ' + displayVal.first);
    console.log('Second: ' + displayVal.second);
    console.log('Op: ' + displayVal.operator);
  }));
