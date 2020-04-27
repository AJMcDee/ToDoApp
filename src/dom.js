import { formatDistanceToNow, format, toDate, parseISO } from 'date-fns'
import _ from 'lodash'
import * as todo from './todo.js'
import * as project from './project.js'
import * as m from './mediator.js'

///Test parameters
(function loadExampleTodos(){
    const partyProject = project.addProject("partyProject", "Party Time");
    m.projectList.push(partyProject)

    const workProject = project.addProject("workProject", "Work");
    m.projectList.push(workProject)

    let todo1 = todo.add("Todo title", "Todo description", 
        "20210324T18:30", 3, false);
    let todo2 = todo.add("Todo 2 title", "Todo description", 
        "20200624T18:30", 3, true);
    let todo3 = todo.add("Todo 3 title", "Todo description", 
        "20200922T18:30", 2, false);
    let todo4 = todo.add("Todo 4 title", "Todo description", 
        "20200430T18:30", 1, false);
    let todo5 = todo.add("Todo 5 title", "Todo description", 
        "20200429T18:30", 2, false);

    
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

})();


const DOM = (() => {
    const projectTitle = document.getElementById("projecttitle")
    const todoContainer = document.getElementById("todocontainer")
    const todosCompleted = document.getElementById("todoscompleted")
    const todosRemaining = document.getElementById("todosremaining")

    return {
        projectTitle,
        todosCompleted,
        todosRemaining,
        todoContainer
    }

})();

const priority = (() => {
    const getColor = function(priorityNumber) {
        switch (priorityNumber) {
            case 1:
                return '#D95D39'
                break;
            case 2:
                return '#DC965A'
                break;
            case 3:
                return '#FFE98C'
                break;
            case 4:
                return '#95AFBA'
                break;
            case 5:
                return '#BDC893'
                break;
                                            
            default:
                break;
        }
    }

    function getWording(priorityNumber) {
        switch (priorityNumber) {
            case 1:
                return 'Urgent'
                break;
            case 2:
                return 'Very Important'
                break;
            case 3:
                return 'Important'
                break;
            case 4:
                return 'Average'
                break;
            case 5:
                return 'Not Important'
                break;
                                            
            default:
                break;
        }
    }

    return {
        getColor,
        getWording
    }
})();

function clearTodos(){
    DOM.todoContainer.textContent="";
}

function clearProjectTitle(){
    DOM.projectTitle.textContent="";
}

function clearStatistics(){
    DOM.todosCompleted.textContent="";
    DOM.todosRemaining.textContent="";
}

(function addProjectSelectListeners(){
    const projectSelectors = document.getElementsByClassName("projectselector")
    for (let i = 0; i < projectSelectors.length; i++){
        const projectID = projectSelectors[i].id;
        const projectName = m.projectList.find(project => project.id === projectID)


        projectSelectors[i].style.cursor = "pointer";
        projectSelectors[i].addEventListener("click", e => {
            clearTodos()
            populateTodoContainer(projectName)
        })
    }


})()



function createTodoElement(todo){
    const todoDiv = document.createElement("div")
    todoDiv.classList = `todo ${todo}`
    todoDiv.id = `${todo}container`

    const todoTitle = document.createElement("div")
    todoTitle.classList = `todotitle ${todo}`
    todoTitle.id = `${todo}title`
    todoTitle.textContent = todo.title
    todoDiv.appendChild(todoTitle)

    const todoDescription = document.createElement("div")
    todoDescription.classList = `tododescription ${todo}`
    todoDescription.id = `${todo}description`
    todoDescription.textContent = todo.description
    todoDiv.appendChild(todoDescription)

    const todoDueDate = document.createElement("div")
    todoDueDate.classList = `tododuedate ${todo} todosection`
    todoDueDate.id = `${todo}duedate`
    const dueDateForDOM = format(parseISO(todo.dueDate), 'dd MMM yyyy')
    todoDueDate.innerHTML = `<b>Due:</b> ${dueDateForDOM}`
    todoDiv.appendChild(todoDueDate)

    const todoPriority = document.createElement("div")
    todoPriority.classList = `priority ${todo} todosection`
    todoPriority.id = `${todo}priority`
    todoPriority.style.color = `${priority.getColor(todo.priorityLevel)}`
    const priorityPhrase = priority.getWording(todo.priorityLevel)
    todoPriority.innerHTML = `<b>Priority:</b> ${priorityPhrase}`
    todoDiv.appendChild(todoPriority)

    const configBox = document.createElement("div")
    configBox.classList = `configbox ${todo} todosection`
    configBox.id = `${todo}configbox`
    todoDiv.appendChild(configBox)
    
    const markComplete = document.createElement("input")
    markComplete.type = "checkbox"
    markComplete.id = `${todo}checkbox`
    setCheckbox(todo, markComplete)
    configBox.appendChild(markComplete)

    const doneText = document.createElement("div")
    doneText.classList = "donetext"
    doneText.innerHTML = `<b>Done?</b>`
    configBox.appendChild(doneText)

    const editButtonDiv = document.createElement("div")
    configBox.appendChild(editButtonDiv)
    const editButton = document.createElement("button")
    editButton.classList = `editbutton ${todo}`
    editButton.id = `${todo}edit`
    editButton.textContent = "Edit";
    editButtonDiv.appendChild(editButton)

    const deleteButtonDiv = document.createElement("div")
    configBox.appendChild(deleteButtonDiv)
    const deleteButton = document.createElement("button")
    deleteButton.classList = `deletebutton ${todo}`
    deleteButton.id = `${todo}delete`
    deleteButton.textContent = "Delete";
    deleteButtonDiv.appendChild(deleteButton)

    const saveButtonDiv = document.createElement("div")
    configBox.appendChild(saveButtonDiv)
    const saveButton = document.createElement("button")
    saveButton.classList = `savebutton ${todo}`
    saveButton.id = `${todo}save`
    saveButton.textContent = "Save";
    saveButton.style.display = "none";
    saveButtonDiv.appendChild(saveButton)

    DOM.todoContainer.appendChild(todoDiv)
}

function setCheckbox(todo, checkbox) {
    (todo.complete === true) ? checkbox.checked = true: checkbox.checked = false; 
}

function addTodoOnclicks(todo) {
    const markComplete = document.getElementById(`${todo}checkbox`)
    const editButton = document.getElementById(`${todo}edit`)
    const deleteButton = document.getElementById(`${todo}delete`)
    const saveButton = document.getElementById(`${todo}save`)


}


function populateTodoContainer(projectName){
    projectName.todos.forEach(todo => {
        createTodoElement(todo)
    });
}




/// TEST FUNCTIONS

populateTodoContainer(m.projectList[0])

console.log(m.projectList)
