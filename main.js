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


const nums = document.querySelector(".nums");
for (let i = 0; i < 9; i++) {
    const btn = document.createElement("div");
    const num = document.createElement("p");
    btn.classList.add("btn");
    btn.classList.add("center");
    nums.appendChild(btn);
    btn.appendChild(num);
    if (i < 3) num.textContent = i + 7;
    if (i < 6 && i >= 3) num.textContent = i + 1;
    if (i < 9 && i >= 6) num.textContent = i - 5;
}
