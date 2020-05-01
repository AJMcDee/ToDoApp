import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore"
import _ from 'lodash'
import * as onload from './iife.js'
import * as m from './mediator.js'
import * as todo from './todo.js'
import * as project from './project.js'
import * as listview from './listview.js'

firebase.initializeApp({
    apiKey: "AIzaSyA8l-V6lbB9kxm4ggzmqDlJ9NmW6Ihikkw",
    authDomain: "todolist-67e8c.firebaseapp.com",
    projectId: "todolist-67e8c",
  });
  
  
var db = firebase.firestore();



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


// ///Firebase test parameters

// db.collection("todo").doc("todo2").set(todo2)
// .then(function() {
//     console.log("Document successfully written!");
// })
// .catch(function(error) {
//     console.error("Error writing document: ", error);
// });


}

(function addListeners() {
    document.getElementById("switchview").addEventListener("click", function () {
        listview.toggle(listview.active)
    } )

})()

