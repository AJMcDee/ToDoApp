import * as DOM from './domselectors.js'

export function implement() {
    DOM.todoContainer.style.flexDirection = "column"

    const todoItems = document.getElementsByClassName("todo")
    for (let i = 0; i < todoItems.length; i++) {
        todoItems[i].style.flexDirection = "row"
        todoItems[i].style.flexBasis = ""
        todoItems[i].style.alignItems = "center"
    }


    const todoTitles = document.getElementsByClassName("todotitle")
    for (let i = 0; i < todoItems.length; i++) {
        todoTitles[i].style.fontSize = "inherit"
        todoTitles[i].style.fontWeight = "bold"
        todoTitles[i].style.width = "180px"
    }
    
    document.getElementsByClassName("edittitle").style.fontSize = ""

}



