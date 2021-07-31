//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filerOption = document.querySelector(".filter-todo");

//Event listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filerOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);
//functions
function addTodo(event) {
  //prevent form submiting
  event.preventDefault();

  //todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //add todos to local storage
  saveLocalTodos(todoInput.value);
  //check button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"> <i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"> <i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //appand todo list
  todoList.appendChild(todoDiv);
  //clear todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    removeTodos(todo);
    checkCompleted(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    checkCompleted(todo);
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      default:
        break;
    }
  });
}
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //get todos
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //get completed todos
  let complete;
  if (localStorage.getItem("completed") === null) {
    complete = [];
  } else {
    complete = JSON.parse(localStorage.getItem("completed"));
  }

  todos.forEach(function (todo) {
    //todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //if it retutn !== -1 then conditon is true
    //this means we have data in completedList
    if (complete.indexOf(todo) !== -1) {
      todoDiv.classList.add("completed");
      console.log(todoDiv);
    }
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //check button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"> <i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"> <i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //appand todo list
    todoList.appendChild(todoDiv);
  });
}

function removeTodos(todo) {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkCompleted(todo) {
  const todoIndex = todo.children[0].innerText;
  var completed = localStorage.getItem("completed");
  const array = JSON.parse(completed) || [];

  if (array.indexOf(todoIndex) == -1) {
    array.push(todoIndex);
    const data = JSON.stringify(array);
    localStorage.setItem("completed", data);
  } else {
    //remove item from completed
    if (completed === null) {
      completed = [];
    } else {
      completed = JSON.parse(completed);
    }
    completed.splice(completed.indexOf(todoIndex), 1);
    localStorage.setItem("completed", JSON.stringify(completed));
  }
}
