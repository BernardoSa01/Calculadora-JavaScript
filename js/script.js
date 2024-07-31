// Variáveis
const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button')

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText
    this.currentOperationText = currentOperationText
    this.currentOperation = ''
  }

  // Adicionar dígito à tela da calculadora
  addDigit(digit) {
    /* Validação para checar se a operação atual já possui '.',
       impedindo que a mesma possua mais de um ponto.
    */
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return
    }

    this.currentOperation = digit
    this.updateScreen()
  }

  // Processar todas as operações da calculadora 
  processOperation(operation) {
    // Checar se o valor atual está vazio 
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // Mude a operação
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation)
      }
      return
    }
    // Pegar os valores atuais e anteriores
    let operationValue
    const previous = +this.previousOperationText.innerText.split(" ")[0]
    const current = +this.currentOperationText.innerText

    switch (operation) {
      case "+":
        operationValue = previous + current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case "-":
        operationValue = previous - current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case "/":
        operationValue = previous / current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case "*":
        operationValue = previous * current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case "DEL":
        this.processDelOperator()
        break
      case "CE":
        this.processClearCurrentOperation()
        break    
      case "C":
        this.processClearOperation()
        break    
      case "=":
      this.processEqualOperator()
      break    
      default:
        return
    }
  }

  // Alterar valores da tela da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation
    } else {
      // Validação para que, se o valor prévio for zero, adicione somente o valor atual
      if (previous === 0) {
        operationValue = current
      }

      this.previousOperationText.innerText = `${operationValue} ${operation}`
      this.currentOperationText.innerText = ""
    }
  }

  // Alterar operação matemática
  changeOperation(operation) {

    const mathOperations = ["*", "/", "+", "-"]
    if (!mathOperations.includes(operation)) {
      return
    }

    this.previousOperationText.innerText = 
      this.previousOperationText.innerText.slice(0, -1) + operation
  }

  // Deletar o último dígito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1)
  }

  // Limpar a última operação digitada
  processClearCurrentOperation() {
    this.currentOperationText.innerText = ""
  }

  // Limpar toda a calculadora
  processClearOperation() {
    this.currentOperationText.innerText = ""
    this.previousOperationText.innerText = ""
  }

  // Criando a função de processamento das operações
  processEqualOperator() {
    const operation = previousOperationText.innerText.split(" ")[1]

    this.processOperation(operation)
  }
}

const calc = new Calculator(previousOperationText, currentOperationText)

// Criando um evento de click para cada botão da calculadora 
buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const value = e.target.innerText

    /* Se o valor for numérico ou ponto, processe dessa forma,
       se não, processe de outra forma. Trata-se de uma validação
       para identificar o que é número ou '.', e o que é operador 
       da calculadora (ex. +, -, *, DEL e etc) 
    */
    if (+value >= 0 || value === ".") {
      calc.addDigit(value)
    } else {
      calc.processOperation(value)
    }
  })
})