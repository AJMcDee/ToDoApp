import { formatDistanceToNow, toDate, closestTo, parseISO } from 'date-fns'
import _ from 'lodash'
import * as todo from './todo.js'
import * as project from './project.js'

// Create project and add it to global array
export const projectList = []

export function removeProject(projectID) {
    const projIndex = projectID.slice(7)
    projectList[projIndex] = null
}


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
    return dateInputFromDOM.slice(5,7)
}

function getDayDue(dateInputFromDOM) {
    return dateInputFromDOM.slice(8,10)

}

function getHourDue(dateInputFromDOM) {
    return dateInputFromDOM.slice(11,13)
}

function getMinuteDue(dateInputFromDOM) {
    return dateInputFromDOM.slice(14,16)
}

export function formatDueDate(dateInputFromDOM) {
    const year = getYearDue(dateInputFromDOM)
    const month = getMonthDue(dateInputFromDOM)
    const day = getDayDue(dateInputFromDOM)
    const hour = getHourDue(dateInputFromDOM)
    const min = getMinuteDue(dateInputFromDOM)
    console.log(year,month,day,hour,min)
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


// Get Statistics 

export function getNearestDueDate(project) {
    const purifiedList = _.compact(project.todos)
    let allDueDates = []
    for (let i = 0; i < purifiedList.length; i++) {
        allDueDates.push(parseISO(purifiedList[i].dueDate))
    }
    const dateToCompare = new Date()
    return closestTo(dateToCompare, allDueDates)
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

export function numCompleted(project) {
    const purifiedList = _.compact(project.todos)
    let todosCompleted = 0
    for (let i = 0; i < purifiedList.length; i++) {
        if (purifiedList[i].complete === true) {
            ++todosCompleted
        } 
    }
    return todosCompleted
}



