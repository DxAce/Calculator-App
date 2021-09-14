document.addEventListener("DOMContentLoaded", function (event) {
  // calculator numbers
  let numbers = document.querySelectorAll("button.numbers");
  // calculator operations
  let operations = document.querySelectorAll("button.operations");
  // calculator functions
  let del = document.querySelector(".delete");
  let equal = document.querySelector(".equal");
  let reset = document.querySelector(".reset");
  let comma = document.querySelector(".comma");

  // added event listeners for numbers
  let currentOperand = "";
  let currentOperandLength = "";
  let savedOperand = "";
  let selectedOperation = "";
  let res = "";

  numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
      if (res) {
        return;
      }
      if (selectedOperation && savedOperand == currentOperand) {
        currentOperand = "";
      }
      if (currentOperand.length < 20) {
        if (currentOperand !== "0") {
          currentOperand += e.target.value;
        } else {
          currentOperand = e.target.value;
        }
      }
      refreshScreen(currentOperand);
    });
  });
  //added event listeners for operations
  operations.forEach((operation) => {
    operation.addEventListener("click", (e) => {
      res = "";
      if (selectedOperation && savedOperand && currentOperand) {
        currentOperand = result(
          savedOperand,
          currentOperand,
          selectedOperation
        );
        savedOperand = "";
        selectedOperation = "";
        res = "";
        refreshScreen(currentOperand);
      }
      savedOperand = currentOperand;
      currentOperand = "";
      selectedOperation = e.target.value;
      refreshScreen(savedOperand);
    });
  });

  del.addEventListener("click", (e) => {
    if (res) {
      return;
    }
    currentOperandLength == 1 ? (currentOperand = "0") : "";
    currentOperand = currentOperand.substring(1);
    refreshScreen(currentOperand);
  });

  equal.addEventListener("click", (e) => {
    result(savedOperand, currentOperand, selectedOperation);
  });

  reset.addEventListener("click", (e) => {
    savedOperand = "";
    currentOperand = "0";
    selectedOperation = "";
    res = "";
    refreshScreen(currentOperand);
  });

  comma.addEventListener("click", (e) => {
    if (typeof currentOperand == "number") {
      return;
    }
    if (!currentOperand.includes(".")) {
      currentOperand = currentOperand + e.target.value;
    }
    refreshScreen(currentOperand);
  });
  // update display
  function refreshScreen(op) {
    currentOperand.length < 1 ? (currentOperand = "0") : "";
    document.querySelector(".calc-screen h1").innerHTML = op;
    console.log("curr = ", currentOperand);
    console.log("saved = ", savedOperand);
    console.log("operation = ", selectedOperation);
    console.log("result ", res);
  }
  // calculations
  function result(operand1, operand2, selOperation) {
    let result = "";
    if (!selOperation) {
      return;
    }
    let opr1 = +operand1;
    let opr2 = +operand2;

    switch (selOperation) {
      case "+":
        result = result = opr1 + opr2;
        break;
      case "-":
        result = result = opr1 - opr2;
        break;
      case "*":
        result = result = opr1 * opr2;
        break;
      case "/":
        result = result = opr1 / opr2;
        break;
      default:
        result = 0;
    }
    currentOperand = result;
    selectedOperation = "";
    res = result;
    return (document.querySelector(".calc-screen h1").innerHTML = result);
  }

  // Switching Theme
  const root = document.documentElement;
  const themeSwitches = document.querySelectorAll(".slider input");
  themeSwitches.forEach((sw) => {
    sw.addEventListener("change", (e) => {
      switch (e.target.value) {
        case "1":
          root.style.setProperty("--main-bg-color", "hsl(222, 26%, 31%)");
          root.style.setProperty("--calc-screen-color", "hsl(223, 31%, 20%)");
          root.style.setProperty("--slider-bg-color", "hsl(223, 31%, 20%)");
          root.style.setProperty("--slider-color", "hsl(6, 63%, 50%)");
          root.style.setProperty("--calc-buttons", "hsl(227, 7%, 40%)");
          root.style.setProperty(
            "--calc-buttons-bg-color",
            "hsl(223, 31%, 20%)"
          );
          root.style.setProperty("--calc-btn-del-reset", "hsl(224, 21%, 50%)");
          root.style.setProperty("--h1-font-color", "white");
          root.style.setProperty("--calc-font-color", "white");
          root.style.setProperty("--calc-buttons-color", "white");
          break;
        case "2":
          root.style.setProperty("--main-bg-color", "hsl(0, 0%, 90%)");
          root.style.setProperty("--calc-screen-color", "hsl(0, 0%, 93%)");
          root.style.setProperty("--slider-bg-color", "hsl(15, 4%, 81%)");
          root.style.setProperty("--slider-color", "hsl(24, 100%, 39%)");
          root.style.setProperty("--calc-buttons", "hsl(48, 9%, 0%)");
          root.style.setProperty("--calc-buttons-bg-color", "hsl(0, 6%, 82%)");
          root.style.setProperty("--calc-btn-del-reset", "hsl(185, 41%, 37%)");
          root.style.setProperty("--h1-font-color", "black");
          root.style.setProperty("--calc-font-color", "black");
          root.style.setProperty("--calc-buttons-color", "white");
          break;
        case "3":
          root.style.setProperty("--main-bg-color", "hsl(268, 75%, 9%)");
          root.style.setProperty("--calc-screen-color", "hsl(269, 74%, 12%)");
          root.style.setProperty("--slider-bg-color", "hsl(269, 74%, 12%)");
          root.style.setProperty("--slider-color", "hsl(178, 94%, 45%)");
          root.style.setProperty("--calc-buttons", "hsl(48, 64%, 61%)");
          root.style.setProperty(
            "--calc-buttons-bg-color",
            "hsl(269, 74%, 12%)"
          );
          root.style.setProperty("--calc-btn-del-reset", "hsl(281, 89%, 26%)");
          root.style.setProperty("--h1-font-color", "hsl(53, 100%, 64%)");
          root.style.setProperty("--calc-font-color", "hsl(53, 100%, 64%)");
          root.style.setProperty("--calc-buttons-color", "hsl(269, 48%, 20%)");
          break;
      }
    });
  });
  // const themeSwitches = document.querySelectorAll(
  //   "input[name='select-theme]:checked"
  // ).value;
});
