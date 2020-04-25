import { formatDistanceToNow } from 'date-fns'
import _ from 'lodash'
import * as todo from './todo.js'
import * as project from './project.js'


function addToProject(newTodo, projectName){

        const index = projectName.todos.indexOf(null);
        if (index === -1) {
            projectName.todos.push(newTodo)
            newTodo.projectIndex = projectName.todos.length - 1;
        } else {
            projectName.todos[index] = newTodo;
            newTodo.projectIndex = index;
        }  
}

function removeFromProject(todo, project){
    project.todos[todo.projectIndex] = null;
}

let partyProject = project.addProject("Party Time")
let workProject = project.addProject("Work")

let todo1 = todo.add("Todo title", "Todo description", 
    "13/02/2021", 3, false, 
    "partyProject")
let todo2 = todo.add("Todo 2 title", "Todo description", 
    "13/06/2020", 3, false, 
    "workProject")
let todo3 = todo.add("Todo 3 title", "Todo description", 
    "13/12/2020", 2, false, 
    "workProject")
let todo4 = todo.add("Todo 4 title", "Todo description", 
    "12/02/2023", 1, false, 
    "partyProject")
let todo5 = todo.add("Todo 5 title", "Todo description", 
    "13/15/2020", 2, false, 
    "workProject")




addToProject(todo1, partyProject)
addToProject(todo2, workProject)
addToProject(todo3, workProject)
addToProject(todo4, partyProject)
console.log(todo3);

removeFromProject(todo2, workProject)
addToProject(todo5, workProject)


console.log(partyProject)
console.log(workProject)