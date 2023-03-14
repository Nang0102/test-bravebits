const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".calculator-keys");
const display = document.querySelector(".calculator-display");

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    const calculate = (n1, operator, n2) => {
      const firstNum = parseFloat(n1);
      const secondNum = parseFloat(n2);
      if (operator === "add") return firstNum + secondNum;
      if (operator === "subtract") return firstNum - secondNum;
      if (operator === "multiply") return firstNum * secondNum;
      if (operator === "divide") return firstNum / secondNum;
    };
    if (!action) {
      if (displayNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
        calculator.dataset.previousKeyType = "number";
      } else {
        display.textContent = displayNum + keyContent;
      }
    }
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayNum;
      if (firstValue && operator !== "operator") {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue; // cap nhat lai gtri dau tien
      } else {
        calculator.dataset.firstValue = displayNum;
      }
      calculator.dataset.previousKeyType = "operator"; //goi phim da nhap truoc do la 1 toan tu(operator)
      calculator.dataset.operator = action;
    }
    if (action === "decimal") {
      if (!displayNum.includes(".")) {
        display.textContent = displayNum + ".";
      } else if (previousKeyType === "operator") {
        display.textContent = "0.";
      }
      // cập nhật previousKeyType cho phím được nhập
      calculator.dataset.previousKeyType = "decimal";
    }
    if (action === "clear") {
      display.textContent = 0;
      key.textContent = "AC";
      calculator.dataset.previousKeyType = "clear";
    }
    if (action !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }
    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayNum;
      if (firstValue) {
        display.textContent = calculate(firstValue, operator, secondValue);
      }
      calculator.dataset.previousKeyType = "calculate";
    }
  }
});
