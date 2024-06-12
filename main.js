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
    displayVal.second = 0;
    displayVal.operator = null;
}

let displayVal = {};
resetDisplayVal();

function operate(first, second, operator) {
    return Number(ops[operator](Number(first), Number(second)).toFixed(14));
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
    if (eval.decimal.status === true) {
        if (!Number(btnClick)) {
            if(Number(btnClick) === 0 && btnClick !== "0.") {
                btnClick = '0.' + btnClick;
            }
        } else {
            btnClick = '0.' + btnClick;
        }
    }
    displayVal.numString = btnClick;
    display.textContent = displayVal.numString;
    num = btnClick;
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
                console.log("ITS HERE");
                if (eval.decimal.status === true) {
                    console.log("NUM0?: " + num);
                    console.log("LOG" + btnClick);
                    console.log("LOG" + num);
                    if (num === 0 && eval.decimal.initial) displayVal.numString = 0;
                    eval.decimal.initial = false;
                    displayVal.numString = displayVal.numString + btnClick;
                    console.log("HEY: " + displayVal.numString);
                    num = displayVal.numString;
                    display.textContent = num;
                } else {
                    num = displayNewNum(btnClick)
                }
            } else {
                if (btnClick === "." && eval.decimal.initial) {
                    num = num + btnClick;
                } else if (btnClick === ".") {
                    return;
                } else {
                    if (eval.decimal.status && eval.decimal.initial) {
                        console.log("CHECKING: " + num);
                        decNum = btnClick / 10;
                        if (decNum !== 0) {
                            num = num + "." + decNum.toString().substring(2,decNum.length);
                        } else {
                            num = num + "." + decNum.toString();
                        }
                        eval.decimal.status = false;
                        eval.decimal.initial = false;
                        console.log("GOT IT");
                    } else {
                        num = num.toString() + btnClick;
                    }
                }
                display.textContent = num;
                console.log("NEW NUM IS: " + num);
                console.log(eval.decimal.status);
            }
            return num;
        } else {
            console.log("WHA TIS NUM: " + btnClick);
            console.log("EVAL: " + eval.decimal.status);
            if (btnClick === ".") {
                num = displayNewNum("0.");
            } else {
                num = displayNewNum(btnClick);
            }
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
eval.decimal = {}
eval.decimal.status = false;
eval.decimal.initial = true;
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
            eval.decimal.status = false;
            eval.decimal.initial = true;
            displayVal.second = 0;
        }
    } else if (btn.matches(".equals")) {
        eval.status = true;
        eval.type = "equals"
        eval.decimal.status = false;
        eval.decimal.initial = true;
        if (displayVal.operator) {
            if (displayVal.second === null) {
                displayVal.second = displayVal.first;
            }
            displayVal.first = operate(displayVal.first, displayVal.second, displayVal.operator);
            if (displayVal.first === null) errMessage = "NOPE";
            updateDisplay(btnClick, displayVal.first, eval);
            displayVal.second = 0;
            displayVal.operator = null;
        }
        if (displayVal.first.toString().includes(".")) eval.decimal.present = true;
    } else if (btn.matches(".clear")) {
        eval.status = false;
        eval.type = null;
        eval.decimal.status = false;
        eval.decimal.initial = true;
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
        if (eval.decimal.status === true) return 0;
        if (eval.status === true) displayVal.first = "0";
        console.log(displayVal[valToUpdate] + "HI");
        console.log(valToUpdate);
        eval.type = "num";
        eval.decimal.status = true;
        updateDisplay(btnClick, displayVal[valToUpdate], eval);
        eval.status = false;
        eval.decimal.present = true;
    }
  }));
