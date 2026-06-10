//Variables for calculator state
let current = ""
let previous = ""
let operator = null
//Variables for last calculation
let lastOperator = null
let lastOperand = null
let lastResult = ""
/**
 * Handles calculator actions based on button clicks
 * @param {string} type - Type of action ('num' for numbers, 'action' for operations)
 * @param {string} value - Value of the action
 */
function toCalc(type, value){
 // Handle number input
  if(type === "num") {
    current += value
    /*Update display with current input
    the input add value in current and if operator is present 
    active the function updateDisplay with the updated value
    previous +  operator + current, case no operator only current*/
    if(operator) {
      updateDisplay(previous + operator + current)
    } else {
      updateDisplay(current)
    }

  }

  if (type === "action"){// clean the calculator state and display
    if(value === 'c') {
      current = ""
      previous = ""
      operator = null
      updateDisplay("")
    }

    if(["+", "-", "*", "/"].includes(value)) {//operation handling

      //prevent adding operator if current is empty and previous is not
      if (current === "" && previous !== "") {
        operator = value;
        updateDisplay(previous + operator);
        return;
      }
      
      if(current === "") return

      if(previous !== "") calculate()
      /*having passed in tests, 
        we can now set the operator and update the display*/
      operator = value
      previous = current
      current = ""
      
      updateDisplay(previous + operator)
    }
    //calculate the result when "=" is pressed
    if(value === "=") {
      calculate()
      updateDisplay(current) 
    }
    /*  add decimal point 
     *  check if current is empty, if so add "0." to start a decimal number
     *  check if current already includes a decimal point,
     *  if so return to prevent multiple decimals
     *  if current is valid, add the decimal point and update the display 
     *  accordingly.
    */
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
    //handle percentage conversion
    if(value === "%") {
      if(current === "") return
      current = (parseFloat(current) / 100).toString()
      
      if(operator) {
        updateDisplay(previous + operator + current)
      } else {
        updateDisplay(current)
      }

    }
    //clear entry (CE) handling - clears current input but keeps previous and operator
    if(value === "ce") {
      if(previous !== ""){
        current = ""
        updateDisplay(previous+operator+current)
      }
    }
    //alternate sign handling - toggles the sign of the current input
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

  // If no operator is set, we can try to repeat the last operation
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
  // If operator is set, perform the calculation with previous and current
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