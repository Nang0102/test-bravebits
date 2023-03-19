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
      if (operator === "divide") {
        if (secondNum === 0) {
          return 0;
        } else {
          return firstNum / secondNum;
        }
      }
    };
    if (!action) {
      if (
        displayNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayNum + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
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

      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue; //  update firstValue
      } else {
        calculator.dataset.firstValue = displayNum;
      }

      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }

    if (action === "decimal") {
      if (!displayNum.includes(".")) {
        display.textContent = displayNum + ".";
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = "0.";
      }

      calculator.dataset.previousKeyType = "decimal";
    }

    if (action === "clear") {
      if ((key.textContent = "AC")) {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }
      display.textContent = 0;
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
        if (previousKeyType === "calculate") {
          firstValue = displayNum;
          calculator.dataset.modValue = secondValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }
      // calculator.dataset.previousKeyType = "calculate";
    }
  }
});
