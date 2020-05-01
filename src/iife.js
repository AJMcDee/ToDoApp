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


    let todo1 = todo.add("Do a Little Dance", "Preferably salsa or merengue.", 
        "2021-03-24T18:30", 3, false);
    let todo2 = todo.add("Make a Little Love", "Yeahhhhhhh buddy.", 
        "2020-05-06T18:30", 1, false);
    let todo3 = todo.add("Get Down Tonight", "Boogie like it's 1969", 
        "2020-09-22T18:30", 2, false);
    let todo4 = todo.add("BACK TO WORK", "There is so much left to do. This app will be edited for eternity.", 
        "2020-04-30T18:30", 4, false);
    let todo5 = todo.add("Refactor this code", "Damn girl, that's a lot of code for a small app.", 
        "2020-04-29T18:30", 5, false);

    
    m.addToProject(todo1, partyProject)
    m.addToProject(todo2, partyProject)
    m.addToProject(todo3, partyProject)
    m.addToProject(todo4, workProject)
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

