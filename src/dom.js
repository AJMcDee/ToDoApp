import { formatDistanceToNow, format, toDate, parseISO } from 'date-fns'
import _ from 'lodash'
import * as todo from './todo.js'
import * as project from './project.js'
import * as m from './mediator.js'
import * as onload from './iife.js'
import * as DOM from './domselectors.js'


///ADD CLEAR FORM ON NEW TODO



/// Project functions 

function clearProjectContainer() {
    DOM.projectContainer.innerHTML = "";
}

function populateProjectContainer(){
    m.projectList.forEach(project => {
        if (project != null) {
        createProjectElement(project)
        }
    });
    createNewProjButton()
    createProjectAddForm()
    DOMupdate()
}

function toggleProjectAddView() {

    if (DOM.projectAddForm.style.display === "none") {
        DOM.projectAddForm.style.display = "inline"
        DOM.addNewProjectButton.style.display = "none"
    } else {
        DOM.addNewProjectButton.style.display = "inline"
        DOM.projectAddForm.style.display = "none"
    }
}

function updateProjectTitle(projectName) {
    DOM.projectTitle.textContent = projectName.title
}




/// Todo functions


function clearTodos(){
    DOM.todoContainer.textContent="";
}

function updateTodosCompleted(projectName) {
    DOM.todosCompleted.textContent = m.numCompleted(projectName)
}

function updateTodosRemaining(projectName) {
    DOM.todosRemaining.textContent = m.numStillToDo(projectName)
}

function populateTodoContainer(project){

    project.todos.forEach(todo => {
        createTodoElement(todo)
    });
    createNewTodoButton(project)
    createTodoAddForm(project)
}

function toggleTodoAddView() {

    if (DOM.todoAddForm.style.display === "none") {
        DOM.todoAddForm.style.display = "inline"
        DOM.addNewTodoButton.style.display = "none"
    } else {
        DOM.addNewTodoButton.style.display = "inherit"
        DOM.todoAddForm.style.display = "none"
    }
}

function getCheckbox(todo, checkbox) {
    (checkbox.checked === true) ? todo.complete = true: todo.complete = false;
}


function setCheckbox(todo, checkbox) {
    (todo.complete === true) ? checkbox.checked = true: checkbox.checked = false; 
}

function toggleTitleStrike(todo, checkbox) {
    const todoElementTitle = document.getElementById(`todo${todo.projectIndex}title`)
    (checkbox.checked === true) ? todoElementTitle.classList.add("strike") : todoElementTitle.classList.remove("strike");
}

// function addTodoOnclicks(todo) {
//     const markComplete = document.getElementById(`${todo}checkbox`)
//     const editButton = document.getElementById(`${todo}edit`)
//     const deleteButton = document.getElementById(`${todo}delete`)
//     const saveButton = document.getElementById(`${todo}save`)
// }

/// Eventlisteners

function addOnclickTodoAdd(button, project){
    button.addEventListener("click", function() {
        DOMupdate()
        toggleTodoAddView()
    })
}

function createNewTodo(button, project) {
    button.addEventListener("click", function() {
        toggleTodoAddView()
        const title = document.getElementById("todotitleinputnew").value
        const description = document.getElementById("tododescriptioninputnew").value
        let dueDate = document.getElementById("duedateinputnew").value
        const priorityLevel = parseInt(document.getElementById("priorityinputnew").value)
        const complete = document.getElementById("checkboxinputnew").checked
        // dueDate = m.formatDueDate(dueDate)

        const newTodo = todo.add(title,description,dueDate,priorityLevel,complete)
        m.addToProject(newTodo, project)
        createTodoElement(newTodo)
        DOMupdate()
    })
}

function addCheckboxEffect(todo, checkbox) {
    checkbox.addEventListener("click", function() {
        getCheckbox(todo, checkbox)
        toggleTitleStrike(todo, checkbox)
    })

}

/// Fetch and update 

function DOMupdate(){
    DOM.addNewProjectButton = document.getElementById("addnewproject")
    DOM.projectAddForm = document.getElementById("projectaddform")
    DOM.addNewTodoButton = document.getElementById("todoaddcontainer")
    DOM.todoAddForm = document.getElementById("todoaddform")
}

function clearAddTodoForm() {

}

/// Element creation
function createProjectElement(projectName){
    const projDiv = document.createElement("div")
    projDiv.classList = `project projectselector`
    projDiv.id = `${projectName.id}`

    const projTitle = document.createElement("h5")
    projTitle.textContent = `${projectName.title}`
    projTitle.style.cursor = "pointer";
    projTitle.addEventListener("click", function() {
        updateProjectTitle(projectName)
        updateTodosCompleted(projectName)
        updateTodosRemaining(projectName)
        clearTodos()
        populateTodoContainer(projectName)
    })
    projDiv.appendChild(projTitle)


    const projTimeRemaining = document.createElement("span")

    if (projectName.todos.length === 0) {
        projTimeRemaining.innerHTML = `<b>No Items Due</b><br>` 
    } else {
        const nearestDate = m.getNearestDueDate(projectName)
        const nearestTodo = formatDistanceToNow(nearestDate)
        projTimeRemaining.innerHTML = `<b>Next item due:</b><br> 
        ${nearestTodo}`
    }

    projDiv.appendChild(projTimeRemaining)

    addDeleteIconDiv(projDiv, projectName.id)


    DOM.projectContainer.appendChild(projDiv)

}

function createNewProjButton(){
    const newDiv = document.createElement("div")
    newDiv.innerHTML = `<span id="newprojectplus">+</span><br>`
    newDiv.classList = "project"
    newDiv.id = "addnewproject"
    newDiv.style.cursor = "pointer"
    newDiv.addEventListener("click", function() {
        toggleProjectAddView()
    })


    DOM.projectContainer.appendChild(newDiv)
}

function createTodoElement(todo){

    const todoIndex = `todo${todo.projectIndex}`
    const todoDiv = document.createElement("div")
    todoDiv.classList = `todo ${todoIndex}`
    todoDiv.id = `${todoIndex}container`

    const todoTitleDiv = document.createElement("div")
    todoDiv.appendChild(todoTitleDiv)
    const todoTitle = document.createElement("span")
    todoTitle.classList = `todotitle ${todoIndex}`
    todoTitle.id = `${todoIndex}title`
    todoTitle.textContent = todo.title
    todoTitleDiv.appendChild(todoTitle)

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
    todoPriority.style.color = `${DOM.priority.getColor(todo.priorityLevel)}`
    const priorityPhrase = DOM.priority.getWording(todo.priorityLevel)
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
    addCheckboxEffect(todo, markComplete)
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

    DOM.todoContainer.insertBefore(todoDiv, DOM.addNewTodoButton)
}

function createNewTodoButton(project){
        const todoDiv = document.createElement("div")
        todoDiv.classList = `todo`
        todoDiv.id = `todoaddcontainer`
        todoDiv.height = todoDiv.width
        todoDiv.style.cursor = "pointer"
    
        const todoPlus = document.createElement("div")
        todoPlus.id = `todoplus`
        todoPlus.textContent = "+"
        todoDiv.appendChild(todoPlus)
    
        DOM.todoContainer.insertAdjacentElement("beforeend", todoDiv)
        addOnclickTodoAdd(todoDiv, project)
}



function createProjectAddForm() {
    const newDiv = document.createElement("div")
    newDiv.classList = "project"
    newDiv.id = "projectaddform"
    newDiv.style.display = "none"

    const newProjectTitleEntry = document.createElement("input")
    newProjectTitleEntry.type = "text"
    newProjectTitleEntry.id = "newprojecttitle"
    newProjectTitleEntry.placeholder = "Project Title"
    newDiv.appendChild(newProjectTitleEntry)

    const newBr = document.createElement("p")
    newDiv.appendChild(newBr)

    const newProjectAdd = document.createElement("button")
    newProjectAdd.id = "newprojectadd"
    newProjectAdd.textContent = "Add"
    newProjectAdd.addEventListener("click", function() {
        const newProj = project.addProject(`title`, `${newProjectTitleEntry.value}`);
        newProj.id = "project" + (m.projectList.length);
        m.projectList.push(newProj)
        clearProjectContainer()
        populateProjectContainer()
        console.log(m.projectList)
    })
    newBr.appendChild(newProjectAdd)


    DOM.projectContainer.appendChild(newDiv)

}

function createTodoAddForm(project) {
    const newDiv = document.createElement("div")
    newDiv.classList = "todo"
    newDiv.id = "todoaddformdiv"
    newDiv.style.display = "none"



    const titleDiv = document.createElement("div")
    titleDiv.classList = "edittitle"
    newDiv.appendChild(titleDiv)

    const newTodoTitleEntry = document.createElement("textarea")
    newTodoTitleEntry.classList = "todotitle"
    newTodoTitleEntry.id = "todotitleinputnew"
    newTodoTitleEntry.placeholder = "Todo Title"
    titleDiv.appendChild(newTodoTitleEntry)

    const descriptionDiv = document.createElement("div")
    descriptionDiv.classList = "tododescription editdescription"
    newDiv.appendChild(descriptionDiv)

    const newTodoDescriptionEntry = document.createElement("textarea")
    newTodoDescriptionEntry.maxLength = "90"
    newTodoDescriptionEntry.classList = "tododescription"
    newTodoDescriptionEntry.id = "tododescriptioninputnew"
    newTodoDescriptionEntry.placeholder = "Enter details here."
    descriptionDiv.appendChild(newTodoDescriptionEntry)

    const dueDateDiv = document.createElement("div")
    dueDateDiv.classList = "todosection editduedate"
    dueDateDiv.innerHTML = "<b>Due: </b>"
    newDiv.appendChild(dueDateDiv)

    const newDueDateEntry = document.createElement("input")
    newDueDateEntry.type = "datetime-local"
    newDueDateEntry.className = "duedateinput"
    newDueDateEntry.id = "duedateinputnew"
    dueDateDiv.insertAdjacentElement("beforeend", newDueDateEntry)

    const newPriorityDiv = document.createElement("div")
    newPriorityDiv.classList = "todosection editpriority"
    newPriorityDiv.innerHTML = "<b>Priority: </b>"
    newDiv.appendChild(newPriorityDiv)

    const newPriorityEntry = document.createElement("select")
    newPriorityEntry.id = "priorityinputnew"
    newPriorityEntry.innerHTML = `
    <option value="1" id="urgentpriority">Urgent</option>
    <option value="2" id="vimppriority">Very Important</option>
    <option value="3" id="imppriority">Important</option>
    <option value="4" id="avpriority">Average</option>
    <option value="5" id="nimppriority">Not Important</option>
    `
    newPriorityDiv.insertAdjacentElement("beforeend", newPriorityEntry)

    const newConfigBoxDiv = document.createElement("div")
    newConfigBoxDiv.classList = "todosection configbox"

    // const checkboxDiv = document.createElement("div")
    // newConfigBoxDiv.appendChild(checkboxDiv)
    // const newCheckbox = document.createElement("input")
    // newCheckbox.type = "checkbox"
    // newCheckbox.id = "checkboxinputnew"
    // checkboxDiv.appendChild(newCheckbox)

    const newDoneText = document.createElement("div")
    newDoneText.innerHTML = "Done?"
    newDoneText.classList = "donetext"
    newDoneText.id = "donetextnew"
    newConfigBoxDiv.appendChild(newDoneText)

    const saveDiv = document.createElement("div")
    newConfigBoxDiv.appendChild(saveDiv)
    const newSaveButton = document.createElement("button")
    newSaveButton.textContent = "Save"
    newSaveButton.classList = "savebutton button"
    newSaveButton.id = "savebuttonnew"
    createNewTodo(newSaveButton, project)
    newConfigBoxDiv.appendChild(newSaveButton)

    const deleteDiv = document.createElement("div")
    newConfigBoxDiv.appendChild(deleteDiv)
    const newDeleteButton = document.createElement("button")
    newDeleteButton.textContent = "Delete"
    newDeleteButton.classList = "deletebutton button"
    newDeleteButton.id = "deletebuttonnew"
    newConfigBoxDiv.appendChild(newDeleteButton)

    newDiv.appendChild(newConfigBoxDiv)
    DOM.todoContainer.appendChild(newDiv)


}


function addDeleteIconDiv(parentElement, projectID) {
    const iconDiv = document.createElement("div")
    iconDiv.id = `delete${projectID}`
    iconDiv.addEventListener("click", function() {
        let proceed = confirm("Are you sure you want to delete this project? This operation cannot be reversed.")
        if (proceed === true) {
            DOM.projectTitle.innerHTML = "Please Select a Project"
            clearTodos()
            m.removeProject(projectID)
            clearProjectContainer()
            populateProjectContainer()
        }


    })

    const icon = document.createElement("img")
    icon.src = "images/delete.png"
    iconDiv.appendChild(icon)
    icon.width = "20"
    icon.height = "20"

    parentElement.appendChild(iconDiv)

}





/// TEST FUNCTIONS
onload.loadExampleTodos()
clearProjectContainer()
populateProjectContainer()

DOM.testButton.addEventListener("click", e => {
    DOMupdate()
    toggleTodoAddView()
})

