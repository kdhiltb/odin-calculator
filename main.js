ops = {
    add: function(a, b) {
        return a + b;
    },
    subtract: function(a, b) {
        return a - b;
    },
    multiply: function(a, b) {
        return a * b;
    },
    divide: function(a, b) {
        return a / b;
    }
}

console.log(ops.add(1,2));
console.log(ops.subtract(1,2));
console.log(ops.multiply(1,2));
console.log(ops.divide(1,2));

let first = 0; // first number
let second = 0; // second number
let operator = ""; // operator

function operate(first, second, operator) {
    return ops[operator](first, second);
}

console.log(operate(1, 2, "divide"));


const buttons = document.querySelector(".buttons");
for (let i = 0; i < 19; i++) {
    const btn = document.createElement("div");
    btn.classList.add("btn");
    buttons.appendChild(btn);
    if (i === 16) btn.classList.add("zero");
}
