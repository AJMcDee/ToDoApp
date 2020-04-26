import _ from 'lodash'
import * as mediator from './mediator.js'



function component() {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());


  const button = document.getElementById("submit")
  button.addEventListener("click", function () {
    const dueDate = document.getElementById("duedate").value
    console.log(dueDate)
  })

