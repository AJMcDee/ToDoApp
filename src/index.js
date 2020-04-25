import _ from 'lodash'
import * as todo from './todo.js'

function component() {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());

  let todo1 = todo.add()
  todo1.title = "Test title"
  todo1.description = "Test description"
  todo1.dueDate = "08.09.2020"
  todo1.priorityLevel = 3;
  todo1.complete = false;

  let projectArray = []

  projectArray.push(todo1);

  console.log(projectArray)