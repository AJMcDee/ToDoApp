import * as DOM from './domselectors.js'

export let active = false

export function implement() {
    DOM.todoContainer.style.flexDirection = "column"

    const todoItems = document.getElementsByClassName("todo")
    for (let i = 0; i < todoItems.length; i++) {
        todoItems[i].style.flexDirection = "row"
        todoItems[i].style.flexBasis = "70px"
        todoItems[i].style.alignItems = "center"

    }


    const todoTitles = document.getElementsByClassName("todotitle")
    for (let i = 0; i < todoItems.length; i++) {
        todoTitles[i].style.fontSize = "inherit"
        todoTitles[i].style.fontWeight = "bold"
        todoTitles[i].style.width = "180px"
    }
    
    const editTitles = document.getElementsByClassName("edittitle")
    for (let i = 0; i < todoItems.length; i++) {
        editTitles[i].style.fontSize = ""
    }

    const todoDescs = document.getElementsByClassName("tododescription")
    for (let i = 0; i < todoItems.length; i++) {
        todoDescs[i].style.padding = "5px"
        todoDescs[i].style.flex = "3 1"
    }

}



