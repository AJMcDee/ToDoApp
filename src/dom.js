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
    const projectContainer = document.getElementById("projectcontainer")
    const testButton = document.getElementById("testbutton")

    function projectObject(projectName) {
        const projObj = m.projectList.find(proj => proj.id === projectName)
        return projObj
    }

    return {
        projectTitle,
        todosCompleted,
        todosRemaining,
        todoContainer,
        projectContainer,
        testButton,
        projectObject,
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

function addProjectSelectListeners(){
    const projectSelectors = document.getElementsByClassName("projectselector")
    for (let i = 0; i < projectSelectors.length; i++){
        const projectID = projectSelectors[i].id;
        const projectName = DOM.projectObject(projectID)

        projectSelectors[i].style.cursor = "pointer";
        projectSelectors[i].addEventListener("click", e => {
            updateProjectTitle(projectName)
            updateTodosCompleted(projectName)
            updateTodosRemaining(projectName)
            clearTodos()
            populateTodoContainer(projectName)
        })
    }


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

function updateProjectTitle(projectName) {
    DOM.projectTitle.textContent = projectName.title
}

function updateTodosCompleted(projectName) {
    DOM.todosCompleted.textContent = m.numCompleted(projectName)
}

function updateTodosRemaining(projectName) {
    DOM.todosRemaining.textContent = m.numStillToDo(projectName)
}

function populateTodoContainer(projectName){
    projectName.todos.forEach(todo => {
        createTodoElement(todo)
    });
}

function clearProjectContainer() {
    DOM.projectContainer.innerHTML = "";
}

function populateProjectContainer(){
    m.projectList.forEach(project => {
        createProjectElement(project)
    });
    createNewProjButton()

}

function createNewProjButton(){
    const newDiv = document.createElement("div")
    newDiv.innerHTML = `<span id="newprojectplus">+</span><br>
    <b>Add New Project</b><br>`
    newDiv.classList = "project"
    newDiv.id = "addnewproject"
    DOM.projectContainer.appendChild(newDiv)
}





function createTodoElement(todo){

    const todoIndex = `todo${todo.projectIndex}`
    const todoDiv = document.createElement("div")
    todoDiv.classList = `todo ${todoIndex}`
    todoDiv.id = `${todoIndex}container`

    const todoTitle = document.createElement("div")
    todoTitle.classList = `todotitle ${todoIndex}`
    todoTitle.id = `${todoIndex}title`
    todoTitle.textContent = todo.title
    todoDiv.appendChild(todoTitle)

    const todoDescription = document.createElement("div")
    todoDescription.classList = `tododescription ${todoIndex}`
    todoDescription.id = `${todoIndex}description`
    todoDescription.textContent = todo.description
    todoDiv.appendChild(todoDescription)

    const todoDueDate = document.createElement("div")
    todoDueDate.classList = `tododuedate ${todoIndex} todosection`
    todoDueDate.id = `${todoIndex}duedate`
    const dueDateForDOM = format(parseISO(todo.dueDate), 'dd MMM yyyy')
    todoDueDate.innerHTML = `<b>Due:</b> ${dueDateForDOM}`
    todoDiv.appendChild(todoDueDate)

    const todoPriority = document.createElement("div")
    todoPriority.classList = `priority ${todoIndex} todosection`
    todoPriority.id = `${todoIndex}priority`
    todoPriority.style.color = `${priority.getColor(todo.priorityLevel)}`
    const priorityPhrase = priority.getWording(todo.priorityLevel)
    todoPriority.innerHTML = `<b>Priority:</b> ${priorityPhrase}`
    todoDiv.appendChild(todoPriority)

    const configBox = document.createElement("div")
    configBox.classList = `configbox ${todoIndex} todosection`
    configBox.id = `${todoIndex}configbox`
    todoDiv.appendChild(configBox)
    
    const markComplete = document.createElement("input")
    markComplete.type = "checkbox"
    markComplete.id = `${todoIndex}checkbox`
    setCheckbox(todo, markComplete)
    configBox.appendChild(markComplete)

    const doneText = document.createElement("div")
    doneText.classList = "donetext"
    doneText.innerHTML = `<b>Done?</b>`
    configBox.appendChild(doneText)

    const editButtonDiv = document.createElement("div")
    configBox.appendChild(editButtonDiv)
    const editButton = document.createElement("button")
    editButton.classList = `editbutton ${todoIndex}`
    editButton.id = `${todoIndex}edit`
    editButton.textContent = "Edit";
    editButtonDiv.appendChild(editButton)

    const deleteButtonDiv = document.createElement("div")
    configBox.appendChild(deleteButtonDiv)
    const deleteButton = document.createElement("button")
    deleteButton.classList = `deletebutton ${todoIndex}`
    deleteButton.id = `${todoIndex}delete`
    deleteButton.textContent = "Delete";
    deleteButtonDiv.appendChild(deleteButton)

    const saveButtonDiv = document.createElement("div")
    configBox.appendChild(saveButtonDiv)
    const saveButton = document.createElement("button")
    saveButton.classList = `savebutton ${todoIndex}`
    saveButton.id = `${todoIndex}save`
    saveButton.textContent = "Save";
    saveButton.style.display = "none";
    saveButtonDiv.appendChild(saveButton)

    DOM.todoContainer.appendChild(todoDiv)
}



function createProjectElement(projectName){
    const projDiv = document.createElement("div")
    projDiv.classList = `project projectselector`
    projDiv.id = `${projectName.id}`

    const projTitle = document.createElement("h5")
    projTitle.textContent = `${projectName.title}`
    projDiv.appendChild(projTitle)

    

    const projTimeRemaining = document.createElement("span")
    const nearestDate = m.getNearestDueDate(projectName)
    const nearestTodo = formatDistanceToNow(nearestDate)
    projTimeRemaining.innerHTML = `<b>Next item due:</b><br> 
    ${nearestTodo}`
    projDiv.appendChild(projTimeRemaining)

    DOM.projectContainer.appendChild(projDiv)

}



/// TEST FUNCTIONS
clearProjectContainer()
populateProjectContainer()
addProjectSelectListeners()
updateProjectTitle(DOM.projectObject("workProject"))
updateTodosCompleted(DOM.projectObject("workProject"))
updateTodosRemaining(DOM.projectObject("workProject"))
populateTodoContainer(DOM.projectObject("workProject"))

DOM.testButton.addEventListener("click", e => {
    clearProjectContainer();
    populateProjectContainer();
    addProjectSelectListeners();
})

