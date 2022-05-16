const input = document.querySelector(".first-number");
const output = document.querySelector(".output-result");
const clearButton = document.querySelector(".clear");

const executeOperation = (operator, number, result) => {
  let subSum = result;
  switch (operator) {
    case "+":
      subSum += number;
      break;
    case "-":
      subSum -= number;
      break;
    case "/":
      subSum /= number;
      break;
    case "*":
      subSum *= number;
      break;
  }
  return subSum;
};

const parseStringForResult = (val) => {
  let sum;
  let number;
  let number2;
  const regExp = /\+|\-|\/|\*/g;
  const indexAll = [...val.matchAll(regExp)];
  if (indexAll.length === 0) {
    sum = +val;
  } else if (indexAll.length === 1) {
    number = +val.slice(0, indexAll[0].index);
    number2 = +val.slice(indexAll[0].index+1);
    sum = executeOperation(indexAll[0][0], number2, number);
  } else {
    for(let i = 0; i < indexAll.length; i++) {
      if (i === 0) {
        number = +val.slice(0, indexAll[i].index);
        number2 = +val.slice(indexAll[i].index+1, indexAll[i+1].index);
        sum = executeOperation(indexAll[i][0], number2, number);
      } else if (i === indexAll.length-1) {
        number2 = +val.slice(indexAll[i].index+1);
        sum = executeOperation(indexAll[i][0], number2, sum);
      } else {
        number2 = +val.slice(indexAll[i].index+1, indexAll[i+1].index);
        sum = executeOperation(indexAll[i][0], number2, sum);
      }    
    }  
  }
  return sum;
};

const addSymbol = (val) => {
  if (!isNaN(+val[val.length - 1])) {
    const temporarySum = parseStringForResult(val);
    setResult(temporarySum);
  }
};

const deleteSymbol = (val) => {
  if (!isNaN(+val[val.length - 1])) {
    const temporarySum = parseStringForResult(val);
    setResult(temporarySum);
  } else {
    const temporarySum = parseStringForResult(val.slice(0, val.length-1));
    setResult(temporarySum);
  }
};

const setResult = (temporarySum) => (output.textContent = temporarySum);
const inputFromButtons = value => (input.value += value);
const updateAfterDelete = value => (input.value = value);

const clear = () => {
  input.value = "";
  output.textContent = "";
  result = 0;
  temporarySum = 0;
  signOfOperation = "";
};


input.addEventListener("input", (event) => {
  let val = input.value;
  if (/\d|\+|\-|\/|\*/.test(event.data) || event.inputType === "deleteContentBackward") {
    if (event.inputType === "deleteContentBackward") {
      deleteSymbol(val);
    } else {
      addSymbol(val);
    }
  } else {
    input.value = val.slice(0, val.length-1);
  }
});
clearButton.addEventListener("click", () => {
  clear();
});
document.addEventListener("click", (event) => {
  if (event.target.classList.value.includes("current")) {
    let elData = event.target.dataset.value;
    inputFromButtons(elData);
    const val = input.value;
    addSymbol(val);
  } else if (event.target.classList.value.includes("delete-symbol")) {
    const val = input.value.slice(0, input.value.length-1);
    updateAfterDelete(val);
    deleteSymbol(val);
  }
});
