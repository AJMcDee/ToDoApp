import _ from 'lodash'
import * as onload from './iife.js'
import * as m from './mediator.js'
import * as todo from './todo.js'
import * as project from './project.js'

export function loadExampleTodos(){
    const partyProject = project.addProject("partyProject", "Party Time");
    m.projectList.push(partyProject)

    const workProject = project.addProject("workProject", "Work");
    m.projectList.push(workProject)


    let todo1 = todo.add("Todo title", "Todo description", 
        "2021-03-24T18:30", 3, false);
    let todo2 = todo.add("Todo 2 title", "Todo description", 
        "2020-06-24T18:30", 3, true);
    let todo3 = todo.add("Todo 3 title", "Todo description", 
        "2020-09-22T18:30", 2, false);
    let todo4 = todo.add("Todo 4 title", "Todo description", 
        "2020-04-30T18:30", 1, false);
    let todo5 = todo.add("Todo 5 title", "Todo description", 
        "2020-04-29T18:30", 2, false);

    
    m.addToProject(todo1, partyProject)
    m.addToProject(todo2, workProject)
    m.addToProject(todo3, workProject)
    m.addToProject(todo4, partyProject)
    m.addToProject(todo5, workProject)


    m.formatDueDate(todo1.dueDate)
    m.formatDueDate(todo2.dueDate)
    m.formatDueDate(todo3.dueDate)
    m.formatDueDate(todo4.dueDate)
    m.formatDueDate(todo5.dueDate)


}

