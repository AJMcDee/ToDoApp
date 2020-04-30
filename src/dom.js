import { formatDistanceToNow, format, parseISO, isPast } from 'date-fns'
import _ from 'lodash'
import * as todo from './todo.js'
import * as project from './project.js'
import * as m from './mediator.js'
import * as onload from './iife.js'
import * as DOM from './domselectors.js'
import * as listview from './listview.js'


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

function populateTodoContainer(project, arrayOfTodos){
    createNewTodoButton(project)
    createTodoAddForm(project)
    DOMupdate()

    const todosCountWithoutNulls = _.compact(arrayOfTodos)
    console.log(todosCountWithoutNulls)
    if (todosCountWithoutNulls.length > 0) {
        arrayOfTodos.forEach(todo => {
            createTodoElement(todo, project)
        });
    }

    listview.setDisplayStyle(listview.active)

    
}

function toggleTodoAddView() {
    DOMupdate()
    if (DOM.todoAddForm.style.display === "none") {
        DOM.todoAddForm.style.display = ""
        DOM.addNewTodoButton.style.display = "none"
    } else {
        DOM.addNewTodoButton.style.display = ""
        DOM.todoAddForm.style.display = "none"
    }
}

function toggleTodoEditView(todo) {
    const todoDisplayDiv = document.getElementById(`todo${todo.projectIndex}container`)
    const todoEditDiv = document.getElementById(`todo${todo.projectIndex}editcontainer`)
    if (todoDisplayDiv.style.display === "none") {
        todoDisplayDiv.style.display = ""
        todoEditDiv.style.display = "none"
    } else {
        todoEditDiv.style.display = ""
        todoDisplayDiv.style.display = "none"
    }
}


function getCheckbox(todo, checkbox) {
    (checkbox.checked === true) ? todo.complete = true: todo.complete = false;
}


function setCheckbox(todo, checkbox) {
    (todo.complete === true) ? checkbox.checked = true: checkbox.checked = false; 
}

function toggleTitleStrike(todo, checkbox) {
    const todoElementTitle = document.getElementById(`todo${todo.projectIndex}title`);
    if (checkbox.checked === true) {
        todoElementTitle.classList.add("strike")}
    else {
        todoElementTitle.classList.remove("strike")
        todoElementTitle.classList.remove("done")}
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
        DOMupdate()
        toggleTodoAddView()
        const title = document.getElementById("todotitleinputnew").value
        const description = document.getElementById("tododescriptioninputnew").value
        const dueDate = document.getElementById("duedateinputnew").value
        const priorityLevel = parseInt(document.getElementById("priorityinputnew").value)
        const complete = false //Default value


        const newTodo = todo.add(title,description,dueDate,priorityLevel,complete)
        m.addToProject(newTodo, project)
        clearProjectContainer()
        populateProjectContainer()
        createTodoElement(newTodo, project)
        listview.setDisplayStyle(listview.active)
    })
}

function updateTodoValues(todo) {
    todo.title = document.getElementById(`todo${todo.projectIndex}edittitle`).value
    todo.description = document.getElementById(`todo${todo.projectIndex}editdescription`).value
    todo.dueDate = document.getElementById(`todo${todo.projectIndex}editduedate`).value
    todo.priorityLevel = parseInt(document.getElementById(`todo${todo.projectIndex}editpriority`).value)

}

function updateTodoElement(todo, project) {
    DOMupdate()
    const formerDiv = document.getElementById(`todo${todo.projectIndex}container`)
    const formerTodoEditForm = document.getElementById(`todo${todo.projectIndex}editcontainer`)
    const divAfter = formerDiv.nextElementSibling
    DOM.todoContainer.removeChild(formerDiv)
    DOM.todoContainer.removeChild(formerTodoEditForm)
    createTodoElement(todo, project)
    const newDiv = document.getElementById(`todo${todo.projectIndex}container`)
    const newTodoEditForm = document.getElementById(`todo${todo.projectIndex}editcontainer`)
    DOM.todoContainer.insertBefore(newDiv, divAfter)
    newDiv.before(newTodoEditForm)
    listview.setDisplayStyle(listview.active)


}


function addCheckboxEffect(todo, checkbox) {
    checkbox.addEventListener("click", function() {
        getCheckbox(todo, checkbox)
        toggleTitleStrike(todo, checkbox)
        clearProjectContainer()
        populateProjectContainer()
    })

}

function populateProjectTodosOnClick(target, project) {
    target.addEventListener("click", function() {
        updateProjectTitle(project)
        updateTodosCompleted(project)
        updateTodosRemaining(project)
        addSortFunctionality(project)
        clearTodos()
        populateTodoContainer(project, project.todos)
        DOMupdate()
        listview.setDisplayStyle(listview.active)
    })
}

function populateProjectTodos(project, arrayOfTodos) {
    updateProjectTitle(project)
    updateTodosCompleted(project)
    updateTodosRemaining(project)
    addSortFunctionality(project)
    clearTodos()
    populateTodoContainer(project, arrayOfTodos)
    DOMupdate()
    listview.setDisplayStyle(listview.active)
}

/// Fetch and update 

function DOMupdate(){
    DOM.addNewProjectButton = document.getElementById("addnewproject")
    DOM.projectAddForm = document.getElementById("projectaddform")
    DOM.addNewTodoButton = document.getElementById("todoaddcontainer")
    DOM.todoAddForm = document.getElementById("todoaddformdiv")
}

function addSortFunctionality(project) {

    ///GET THIS WORKING

} 

function applySort(project) {
    let sortedTodoArray = []
    let sortChoice = DOM.sortSelect.value
    switch (sortChoice) {
        case "sortduelast":
            sortedTodoArray = project.todos.sort((a,b) => b.dueDate - a.dueDate);
    }
}




/// Element creation
function createProjectElement(project){
    const projDiv = document.createElement("div")
    projDiv.classList = `project projectselector`
    projDiv.id = `${project.id}`

    const projTitle = document.createElement("h5")
    projTitle.textContent = `${project.title}`
    projTitle.style.cursor = "pointer";
    populateProjectTodosOnClick(projTitle, project)

    projDiv.appendChild(projTitle)


    const projTimeRemaining = document.createElement("span")

    if (project.todos.length === 0) {
        projTimeRemaining.innerHTML = `<b>No Items Due</b><br>` 
    } else {
        const nearestDate = m.getNearestDueDate(project)
        if (isPast(nearestDate)) {
            projTimeRemaining.innerHTML = `<b>Item Overdue!</b><br>`
        } else if (!nearestDate) {
            projTimeRemaining.innerHTML = `<b>No Items Due</b><br>`
        } else {
            const nearestTodo = formatDistanceToNow(nearestDate)
            projTimeRemaining.innerHTML = `<b>Next item due:</b><br> 
            ${nearestTodo}`
        }

    }

    projDiv.appendChild(projTimeRemaining)

    addDeleteIconDiv(projDiv, project.id)


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

function createTodoElement(todo, project){

    const todoIndex = `todo${todo.projectIndex}`
    const todoDiv = document.createElement("div")
    todoDiv.classList = `todo ${todoIndex}`
    todoDiv.id = `${todoIndex}container`
    DOM.priority.updateBorder(todoDiv, todo.priorityLevel)

    const todoTitleDiv = document.createElement("div")
    todoDiv.appendChild(todoTitleDiv)
    const todoTitle = document.createElement("span")
    todoTitle.classList = `todotitle ${todoIndex}`
    todoTitle.id = `${todoIndex}title`
    todoTitle.textContent = todo.title
    todoTitleDiv.appendChild(todoTitle)
    if (todo.complete === true) {todoTitle.classList.add("done")} 

    const todoDescription = document.createElement("div")
    todoDescription.classList = `tododescription ${todoIndex}`
    todoDescription.id = `${todoIndex}description`
    todoDescription.textContent = todo.description
    todoDiv.appendChild(todoDescription)

    const todoDueDate = document.createElement("div")
    todoDueDate.classList = `tododuedate ${todoIndex} todosection`
    todoDueDate.id = `${todoIndex}duedate`
    const dueDateForDOM = format(parseISO(todo.dueDate), 'dd MMM yyyy, h:mm aaaa')
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
    deleteButton.addEventListener("click", function(){
        let confirmation = confirm("Are you sure you want to remove this item?")
        if (confirmation === true) {
            DOMupdate()
            DOM.todoContainer.removeChild(todoDiv)
            const todoEdit = document.getElementById(`todo${todo.projectIndex}editcontainer`)
            DOM.todoContainer.removeChild(todoEdit)
            project.todos[todo.projectIndex] = null;
            clearProjectContainer()
            populateProjectContainer()


        }


    })


    DOM.todoContainer.insertBefore(todoDiv, DOM.addNewTodoButton)
    createTodoEditForm(todo, todoDiv, project)
    editButton.addEventListener("click", function () {
        toggleTodoEditView(todo)
    })

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
        populateProjectTodos(newProj, newProj.todos) 
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

    // const newDoneText = document.createElement("div")
    // newDoneText.innerHTML = "Done?"
    // newDoneText.classList = "donetext"
    // newDoneText.id = "donetextnew"
    // newConfigBoxDiv.appendChild(newDoneText)

    const saveDiv = document.createElement("div")
    newConfigBoxDiv.appendChild(saveDiv)
    const newSaveButton = document.createElement("button")
    newSaveButton.textContent = "Save"
    newSaveButton.classList = "savebutton button"
    newSaveButton.id = "savebuttonnew"
    createNewTodo(newSaveButton, project)

    saveDiv.appendChild(newSaveButton)

    const deleteDiv = document.createElement("div")
    newConfigBoxDiv.appendChild(deleteDiv)
    const newDeleteButton = document.createElement("button")
    newDeleteButton.textContent = "Delete"
    newDeleteButton.classList = "deletebutton button"
    newDeleteButton.id = "deletebuttonnew"
    deleteDiv.appendChild(newDeleteButton)

    newDiv.appendChild(newConfigBoxDiv)
    DOM.todoContainer.insertAdjacentElement("beforeend", newDiv)


}

function createTodoEditForm(todo, todoDiv, project) {

    const newDiv = document.createElement("div")
    newDiv.id = `todo${todo.projectIndex}editcontainer`
    newDiv.classList = "todo"
    newDiv.style.display = "none"

    const titleDiv = document.createElement("div")
    titleDiv.classList = "edittitle"
    newDiv.appendChild(titleDiv)

    const newTodoTitleEntry = document.createElement("textarea")
    newTodoTitleEntry.classList = "todotitle"
    newTodoTitleEntry.id = `todo${todo.projectIndex}edittitle`
    newTodoTitleEntry.value = todo.title
    titleDiv.appendChild(newTodoTitleEntry)

    const descriptionDiv = document.createElement("div")
    descriptionDiv.classList = "tododescription editdescription"
    newDiv.appendChild(descriptionDiv)

    const newTodoDescriptionEntry = document.createElement("textarea")
    newTodoDescriptionEntry.maxLength = "90"
    newTodoDescriptionEntry.classList = "tododescription"
    newTodoDescriptionEntry.id = `todo${todo.projectIndex}editdescription`
    newTodoDescriptionEntry.value = todo.description
    descriptionDiv.appendChild(newTodoDescriptionEntry)

    const dueDateDiv = document.createElement("div")
    dueDateDiv.classList = "todosection editduedate"
    dueDateDiv.innerHTML = "<b>Due: </b>"
    newDiv.appendChild(dueDateDiv)

    const newDueDateEntry = document.createElement("input")
    newDueDateEntry.defaultValue = todo.dueDate //??? does this work??
    newDueDateEntry.type = "datetime-local"
    newDueDateEntry.className = "duedateinput"
    newDueDateEntry.id = `todo${todo.projectIndex}editduedate`
    dueDateDiv.insertAdjacentElement("beforeend", newDueDateEntry)

    const newPriorityDiv = document.createElement("div")
    newPriorityDiv.classList = "todosection editpriority"
    newPriorityDiv.innerHTML = "<b>Priority: </b>"
    newDiv.appendChild(newPriorityDiv)

    const newPriorityEntry = document.createElement("select")
    newPriorityEntry.id = `todo${todo.projectIndex}editpriority`
    newPriorityEntry.innerHTML = `
    <option value="1" id="urgentpriority">Urgent</option>
    <option value="2" id="vimppriority">Very Important</option>
    <option value="3" id="imppriority">Important</option>
    <option value="4" id="avpriority">Average</option>
    <option value="5" id="nimppriority">Not Important</option>
    `
    newPriorityEntry.value = todo.priorityLevel
    newPriorityDiv.insertAdjacentElement("beforeend", newPriorityEntry)

    const newConfigBoxDiv = document.createElement("div")
    newConfigBoxDiv.classList = "todosection configbox"

    // const checkboxDiv = document.createElement("div")
    // newConfigBoxDiv.appendChild(checkboxDiv)
    // const newCheckbox = document.createElement("input")
    // newCheckbox.type = "checkbox"
    // newCheckbox.id = "checkboxinputnew"
    // checkboxDiv.appendChild(newCheckbox)

    // const newDoneText = document.createElement("div")
    // newDoneText.innerHTML = "Done?"
    // newDoneText.classList = "donetext"
    // newDoneText.id = "donetextnew"
    // newConfigBoxDiv.appendChild(newDoneText)

    const saveDiv = document.createElement("div")
    newConfigBoxDiv.appendChild(saveDiv)
    const newSaveButton = document.createElement("button")
    newSaveButton.textContent = "Save"
    newSaveButton.classList = "savebutton button"
    newSaveButton.id = `todo${todo.projectIndex}savebutton`
    newSaveButton.addEventListener("click", function() {
        updateTodoValues(todo)
        updateTodoElement(todo, project)
    })
    

    saveDiv.appendChild(newSaveButton)

    const cancelDiv = document.createElement("div")
    newConfigBoxDiv.appendChild(cancelDiv)
    const newCancelButton = document.createElement("button")
    newCancelButton.textContent = "Cancel"
    newCancelButton.classList = "cancelbutton button"
    newCancelButton.id = "cancelbuttonnew"
    newCancelButton.addEventListener("click", function(){
        //reset form
        toggleTodoEditView(todo)
    })
    cancelDiv.appendChild(newCancelButton)

    newDiv.appendChild(newConfigBoxDiv)

    DOM.todoContainer.insertBefore(newDiv, todoDiv)
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
    listview.toggle()
})

