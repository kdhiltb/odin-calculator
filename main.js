let ops = {}
ops["+"] = function(a, b) {return a + b};
ops["-"] = function(a, b) {return a - b};
ops["*"] = function(a, b) {return a * b};
ops["/"] = function(a, b) {
    if (b === 0) {
        return null;
    } else {
        return a / b;
    }
};

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

    if (eval.decimal === true) {
        if (!Number(btnClick)) {
            btnClick = 0 + btnClick;
        } else {
            btnClick = '0.' + btnClick;
        }
    }
    display.textContent = btnClick;
    num = Number(btnClick);
    return num;
}

function updateDisplay(btnClick, num, eval) {
    if (errMessage) {
        display.textContent = errMessage;
        resetDisplayVal();
        errMessage = "";
    } else if (eval.type === "num") {
        if (!eval.status) {
            if (!num) {
                num = displayNewNum(btnClick);
            } else {
                if (btnClick === ".") {
                    console.log(num);
                    num = num + btnClick;
                } else {
                    if (eval.decimal) {
                        num = Number(num + (btnClick / 10))
                    } else {
                        num = Number(num.toString() + btnClick);
                    }
                }
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
        return num;
    }

}

createNums();

const btns = document.querySelectorAll(".btn");
const display = document.querySelector(".display");
let eval = {};
let errMessage;
btns.forEach((btn) => btn.addEventListener("click", function (e) {
    let btnClick = e.target.textContent;
    let valToUpdate;
    if(displayVal.operator === null) {
        valToUpdate = "first";
    } else {
        valToUpdate = "second";
    }
    if (btn.matches(".num")) {
        eval.type = "num";
        if (displayVal.operator === null) {
            displayVal[valToUpdate] = updateDisplay(btnClick, displayVal.first, eval);
        } else {
            displayVal[valToUpdate] = updateDisplay(btnClick, displayVal.second, eval);
        }
    } else if (btn.matches(".op")) {
        if (!displayVal.second) {
            displayVal.operator = btnClick;
            eval.status = false;
            eval.decimal = false;
        }
    } else if (btn.matches(".equals")) {
        eval.status = true;
        eval.type = "equals"
        eval.decimal = false;
        if (displayVal.operator) {
            if (displayVal.second === null) {
                displayVal.second = displayVal.first;
            }
            displayVal.first = operate(displayVal.first, displayVal.second, displayVal.operator);
            if (displayVal.first === null) errMessage = "NOPE";
            updateDisplay(btnClick, displayVal.first, eval);
            displayVal.second = null;
            displayVal.operator = null;
        }
    } else if (btn.matches(".clear")) {
        eval.status = false;
        eval.type = null;
        eval.decimale = false;
        resetDisplayVal();
        updateDisplay(0, displayVal.first, eval);
    } else if (btn.matches(".negate") || btn.matches(".percent")) {
        if (displayVal[valToUpdate] === null && displayVal.operator) return 0;
        if (btn.matches(".negate")) mod = -1;
        if (btn.matches(".percent")) mod = (1/100);
        initEval = eval.type;
        eval.type = "equals";
        if (displayVal[valToUpdate] === null) displayVal[valToUpdate] = displayVal.first;
        displayVal[valToUpdate] = updateDisplay(btnClick, displayVal[valToUpdate] * mod, eval);
        eval.type = initEval;
    } else if (btn.matches(".decimal")) {
        eval.type = "num";
        eval.decimal = true;
        updateDisplay(btnClick, displayVal[valToUpdate], eval);
    }
    console.log("Button: " + btnClick);
    console.log('First: ' + displayVal.first);
    console.log('Second: ' + displayVal.second);
    console.log('Op: ' + displayVal.operator);
  }));
