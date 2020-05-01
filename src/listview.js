import * as firebase from "firebase/app";
import * as DOM from './domselectors.js'
import { toggleCompleted } from './mediator.js'

export let active = false

export function implement() {
    DOM.todoContainer.style.flexDirection = "column"
    DOM.todoContainer.style.justifyItems = "flex-end"

    const todoItems = document.getElementsByClassName("todo")
    for (let i = 0; i < todoItems.length; i++) {
        todoItems[i].style.flexDirection = "row"
        todoItems[i].style.flexBasis = "70px"
        todoItems[i].style.alignItems = "center"
        todoItems[i].style.borderRadius = "0px"
    

    }

    const todoTitles = document.getElementsByClassName("todotitle")
    for (let i = 0; i < todoTitles.length; i++) {
        todoTitles[i].style.fontSize = "20px"
        todoTitles[i].style.fontWeight = "bold"
        todoTitles[i].style.width = "180px"
        todoTitles[i].style.height = "40px"
    }
    
    const editTitles = document.getElementsByClassName("edittitle")
    for (let i = 0; i < editTitles.length; i++) {
        editTitles[i].style.fontSize = "20px"
    }

    const todoDescs = document.getElementsByClassName("tododescription")
    for (let i = 0; i < todoDescs.length; i++) {
        todoDescs[i].style.padding = "5px"
        todoDescs[i].style.flex = "3 1"
        todoDescs[i].style.height = "40px"
    }

}

export function remove() {
    DOM.todoContainer.style.flexDirection = ""

    const todoItems = document.getElementsByClassName("todo")
    for (let i = 0; i < todoItems.length; i++) {
        todoItems[i].style.flexDirection = ""
        todoItems[i].style.flexBasis = ""
        todoItems[i].style.alignItems = ""
        todoItems[i].style.borderRadius = ""

    }

    const todoTitles = document.getElementsByClassName("todotitle")
    for (let i = 0; i < todoTitles.length; i++) {
        todoTitles[i].style.fontSize = ""
        todoTitles[i].style.fontWeight = ""
        todoTitles[i].style.width = ""
        todoTitles[i].style.height = ""
    }
    
    const editTitles = document.getElementsByClassName("edittitle")
    for (let i = 0; i < editTitles.length; i++) {
        editTitles[i].style.fontSize = ""
    }

    const todoDescs = document.getElementsByClassName("tododescription")
    for (let i = 0; i < todoDescs.length; i++) {
        todoDescs[i].style.padding = ""
        todoDescs[i].style.flex = ""
        todoDescs[i].style.height = ""
    }
}

export function toggle() {
    if (active === false) {
        implement()
        DOM.switchView.textContent = "Switch to card view"
        active = true

    } else {
        remove()
        DOM.switchView.textContent = "Switch to list view"
        active = false

    }
}

export function setDisplayStyle(currentSetting) {
    if (currentSetting === false) {
        remove()
    } else {
        implement()
    }

}

