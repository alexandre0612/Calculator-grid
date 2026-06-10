let current = ""
let previous = ""
let operator = null

let lastOperator = null
let lastOperand = null
let lastResult = ""
//
function toCalc(type, value){
  if(type === "num") {
    current += value
    
    if(operator) {
      updateDisplay(previous + operator + current)
    } else {
      updateDisplay(current)
    }

  }

  if (type === "action"){
    if(value === 'c') {
      current = ""
      previous = ""
      operator = null
      updateDisplay("")
    }
    if(["+", "-", "*", "/"].includes(value)) {

      if (current === "" && previous !== "") {
        operator = value;
        updateDisplay(previous + operator);
        return;
      }
    
      if(current === "") return

      if(previous !== "") calculate()

      operator = value
      previous = current
      current = ""
      
      updateDisplay(previous + operator)
    }
    if(value === "=") {
      calculate()
      updateDisplay(current) 
    }

    if(value === ".") {
      if(current === "") {
        current = "0."
      } else if (current.includes(".")) {
        return
      } else {
        current += "."
      }
      updateDisplay(current)
    }

    if(value === "%") {
      if(current === "") return
      current = (parseFloat(current) / 100).toString()
      
      if(operator) {
        updateDisplay(previous + operator + current)
      } else {
        updateDisplay(current)
      }

    }

    if(value === "ce") {
      if(previous !== ""){
        current = ""
        updateDisplay(previous+operator+current)
      }
    }

    if(value === "+-") {
      if(current === "") return
      current = (parseFloat(current) * -1).toString()
      
      if(!operator){
        updateDisplay(current)
      } else {
        updateDisplay(previous + operator + current)
      }

    }
  }
}

function calculate() {

  
  if (operator === null) {
    if (lastOperator === null || lastOperand === null) return

    let num1 = parseFloat(current)
    let num2 = parseFloat(lastOperand)

    let result

    if (lastOperator === "+") result = num1 + num2
    if (lastOperator === "-") result = num1 - num2
    if (lastOperator === "*") result = num1 * num2
    if (lastOperator === "/") {
      if (num2 === 0) {
        updateDisplay("Erro")
        return
      }
      result = num1 / num2
    }

    current = result.toString()
    lastResult = current
    return
  }

  let num1 = parseFloat(previous)
  let num2 = parseFloat(current)

  if (isNaN(num1) || isNaN(num2)) return

  let result

  if (operator === "+") result = num1 + num2
  if (operator === "-") result = num1 - num2
  if (operator === "*") result = num1 * num2
  if (operator === "/") {
    if (num2 === 0) {
      updateDisplay("Erro")
      return
    }
    result = num1 / num2
  }

  lastOperator = operator
  lastOperand = current

  current = result.toString()
  lastResult = current

  previous = ""
  operator = null
}

function updateDisplay(value) {
  document.getElementById("display_result").value = value
}