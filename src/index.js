import _ from 'lodash'
import * as m from './mediator.js'
import * as todo from './todo.js'
import * as project from './project.js'





///Test parameters
let partyProject = project.addProject("Party Time")
let workProject = project.addProject("Work")

let todo1 = todo.add("Todo title", "Todo description", 
    "13/02/2021", 3, false)
let todo2 = todo.add("Todo 2 title", "Todo description", 
    "13/06/2020", 3, false)
let todo3 = todo.add("Todo 3 title", "Todo description", 
    "13/12/2020", 2, false)
let todo4 = todo.add("Todo 4 title", "Todo description", 
    "12/02/2023", 1, false)
let todo5 = todo.add("Todo 5 title", "Todo description", 
    "13/15/2020", 2, false)

m.addToProject(todo1, partyProject)
m.addToProject(todo2, workProject)
m.addToProject(todo3, workProject)
m.addToProject(todo4, partyProject)
m.addToProject(todo5, workProject)

console.log(m.numStillToDo(workProject))
m.toggleCompleted(todo3)
console.log(m.numStillToDo(workProject))
console.log(workProject)