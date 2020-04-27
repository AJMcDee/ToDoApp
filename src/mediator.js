import { formatDistanceToNow, toDate } from 'date-fns'
import _ from 'lodash'
import * as todo from './todo.js'
import * as project from './project.js'

// Create project and add it to global array
export const projectList = []





// Add, remove, and change todos between projects

export function addToProject(newTodo, projectName){

        const index = projectName.todos.indexOf(null);
        if (index === -1) {
            projectName.todos.push(newTodo)
            newTodo.projectIndex = projectName.todos.length - 1;
        } else {
            projectName.todos[index] = newTodo;
            newTodo.projectIndex = index;
        }  
}

export function removeFromProject(todo, project){
    project.todos[todo.projectIndex] = null;
}

export function changeTodoProject(todo, oldProject, newProject) {
    removeFromProject(todo, oldProject)
    addToProject(todo, newProject)

}


// Convert date inputs from DOM to code useable by date-fns



function getYearDue(dateInputFromDOM) {
    return dateInputFromDOM.slice(0,4)
}

function getMonthDue(dateInputFromDOM) {
    return dateInputFromDOM.slice(4,6)
}

function getDayDue(dateInputFromDOM) {
    return dateInputFromDOM.slice(6,8)

}

function getHourDue(dateInputFromDOM) {
    return dateInputFromDOM.slice(9,11)
}

function getMinuteDue(dateInputFromDOM) {
    return dateInputFromDOM.slice(12,14)
}

export function formatDueDate(dateInputFromDOM) {
    const year = getYearDue(dateInputFromDOM)
    const month = getMonthDue(dateInputFromDOM)
    const day = getDayDue(dateInputFromDOM)
    const hour = getHourDue(dateInputFromDOM)
    const min = getMinuteDue(dateInputFromDOM)
    let newDueDate = toDate(new Date(year, month, day, hour, min))
    return newDueDate 
}


// Change properties of the todo

export function toggleCompleted(todo) {
    (todo.complete === false) ? todo.complete = true : todo.complete = false;
}

export function setTodoDueDate(todo, dateInputFromDOM) {
    const newDueDate = formatDueDate(dateInputFromDOM)
    todo.dueDate = newDueDate;
}

export function increasePriority(todo) {
    (todo.priorityLevel < 5) ? ++todo.priorityLevel : todo.priorityLevel = 5
}

export function decreasePriority(todo) {
    (todo.priorityLevel > 1) ? --todo.priorityLevel : todo.priorityLevel = 1
}

export function setPriority(todo, newValue) {
    todo.priorityLevel = parseInt(newValue)
}

export function numStillToDo(project) {
    const purifiedList = _.compact(project.todos)
    let todosLeftToDo = 0
    for (let i = 0; i < purifiedList.length; i++) {
        if (purifiedList[i].complete === false) {
            ++todosLeftToDo
        } 
    }
    return todosLeftToDo
}



