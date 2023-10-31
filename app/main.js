const switcher = document.querySelector('#switcher')
const body = document.querySelector('.body')


switcher.addEventListener('click', (e) => {
    e.preventDefault()
    if(body.classList.contains('blue')) {
        body.classList.remove('blue')
        return body.classList.add('light')
        
    }
    if(body.classList.contains('light')) {
        body.classList.remove('light')
        return body.classList.add('purple')
    }
    if(body.classList.contains('purple')) {
        body.classList.remove('purple')
        return body.classList.add('blue')
    }
})

class Calculator {
    constructor(previousElementOperand, currentElementOperand){
        this.previousElementOperand = previousElementOperand
        this.currentElementOperand = currentElementOperand
        
        this.reset() 
    }
    reset() {
       this.previousElement = ""
       this.currentElement = '0'; 
       this.operation = undefined
    }
    delete() {
        if(this.currentElement.length == 1){
            this.currentElement = '0'
        }

        // delete last number
        else {
            this.currentElement = this.currentElement.toString().slice(0, -1)
        }
          
    }
    appendNumber(number) {
        // prevent from click dot more than once
        if(number === "." && this.currentElement.includes(".")) return

        this.currentElement = this.currentElement.toString() + number.toString()
    }
    chooseOperation(operation) {
        if(this.currentElement == "") return 
        if(this.previousElement != "") {
            this.compute()
        }
        this.operation = operation
        this.previousElement = this.currentElement
        this.currentElement = ""
    }
    compute() {
        let result
        const previous = parseFloat(this.previousElement)
        const current = parseFloat(this.currentElement)
        if(isNaN(previous) || isNaN(current)) return 

        switch (this.operation) {
            case '+':
                result = previous + current
                break;
            case '-':
                result = previous - current
                break;
            case '/':
                result = previous / current
                break;
            case '×':
                result = previous * current
                break;
            default:
                return;
            
        }
        this.currentElement = result
        this.operation = undefined  
        this.previousOperand = ""
    }
    getDislpay(number) {
        const stringNum = number.toString()
        const integerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]
        
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            })
        }

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits.slice(0, 6)}`
        }
        else {
            return integerDisplay
        }

    }
    updateDisplay() {
        this.currentElementOperand.innerText = this.getDislpay(this.currentElement)
        if(this.operation != null) {
            this.previousElementOperand.innerText = `${this.getDislpay(this.previousElement)} ${this.operation}`
        }
        else {
            this.previousElementOperand.innerText = ''
        }
    }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operator]')

const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const resetButton = document.querySelector('[data-reset]')

const previousElementOperand = document.querySelector('#previos-output')
const currentElementOperand = document.querySelector('#current-output')

const calculator = new Calculator(previousElementOperand, currentElementOperand)

numberButtons.forEach(number => {
    number.addEventListener('click', () => {
        calculator.appendNumber(number.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(operation => {
    operation.addEventListener('click', () => {
        calculator.chooseOperation(operation.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

resetButton.addEventListener('click', () => {
    calculator.reset()
    calculator.updateDisplay()
})
