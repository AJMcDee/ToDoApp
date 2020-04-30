import * as m from './mediator.js'

const projectTitle = document.getElementById("projecttitle")
    const todoContainer = document.getElementById("todocontainer")
    const todosCompleted = document.getElementById("todoscompleted")
    const todosRemaining = document.getElementById("todosremaining")
    const projectContainer = document.getElementById("projectcontainer")
    const testButton = document.getElementById("testbutton")
    const sortDueFirst = document.getElementById("sortduefirst")
    const sortDueLast = document.getElementById("sortduelast")
    const sortPriorityHighLow = document.getElementById("sortpriorityhighlow")
    const sortPriorityLowHigh = document.getElementById("sortprioritylowhigh")
    const sortSelect = document.getElementById("sort")
    const switchView = document.getElementById("switchview")


    let addNewProjectButton
    let projectAddForm
    let todoAddForm
    let addNewTodoButton

    // function projectObject(projectName) {
    //     const projObj = m.projectList.find(proj => proj.id === projectName)
    //     return projObj
    // }





    export {
        projectTitle,
        todosCompleted,
        todosRemaining,
        todoContainer,
        projectContainer,
        testButton,
        // projectObject,
        addNewProjectButton,
        projectAddForm,
        todoAddForm,
        addNewTodoButton,
        sortDueFirst,
        sortDueLast,
        sortPriorityHighLow,
        sortPriorityLowHigh,
        sortSelect,
        switchView
    }


export const priority = (() => {
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

    function getWording(priorityLevel) {
        switch (priorityLevel) {
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

    function updateBorder(todoElement, priorityLevel) {
        console.log(todoElement)
        todoElement.style.borderColor = getColor(priorityLevel)
    }

    return {
        getColor,
        getWording,
        updateBorder
    }
})();