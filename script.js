let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let todoUserInput = document.getElementById("todoUserInput");
let saveTodoButton = document.getElementById("saveTodoButton");

let todosList = [];

function getTodoFromLocalStorage() {
  let storedTodos = localStorage.getItem("todoList");
  if (storedTodos) {
    todosList = JSON.parse(storedTodos);
    for (let todo of todosList) {
      createAndAppendTodo(todo);
    }
  }
}

getTodoFromLocalStorage();

function onTodoStatusChange(checkboxId, labelId, todoId) {
  let checkboxEl = document.getElementById(checkboxId);
  let labelEl = document.getElementById(labelId);

  labelEl.classList.toggle("checked");

  let updatedTodo = todosList.find((todo) => todo.uniqueNo === todoId);
  updatedTodo.isChecked = checkboxEl.checked;
}

function onDeleteTodo(todoId) {
  let todoEl = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoEl);
  todosList = todosList.filter((todo) => todo.uniqueNo !== todoId);
}

function createAndAppendTodo(todo) {
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;

  let todoEl = document.createElement("li");
  todoEl.classList.add("todo-item-container", "d-flex", "flex-row");
  todoEl.id = todo.uniqueNo;
  todoItemsContainer.appendChild(todoEl);

  let inputEl = document.createElement("input");
  inputEl.type = "checkbox";
  inputEl.id = checkboxId;
  inputEl.checked = todo.isChecked;

  inputEl.onclick = function () {
    onTodoStatusChange(checkboxId, labelId, todo.uniqueNo);
  };
  todoEl.appendChild(inputEl);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoEl.appendChild(labelContainer);

  let labelEl = document.createElement("label");
  labelEl.setAttribute("for", checkboxId);
  labelEl.id = labelId;
  labelEl.classList.add("checkbox-label");
  if (todo.isChecked) {
    labelEl.classList.add("checked");
  }
  labelEl.textContent = todo.text;
  labelContainer.appendChild(labelEl);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = function () {
    onDeleteTodo(todo.uniqueNo);
  };
  labelContainer.appendChild(deleteIcon);
}

function onAddTodo() {
  let userInputValue = todoUserInput.value.trim();
  if (userInputValue === "") {
    alert("Please enter a task.");
    return;
  }

  let newTodo = {
    text: userInputValue,
    uniqueNo: "todo" + Date.now(),
    isChecked: false
  };

  todosList.push(newTodo);
  createAndAppendTodo(newTodo);
  todoUserInput.value = "";
}

function onSaveTodo() {
  localStorage.setItem("todoList", JSON.stringify(todosList));
}

addTodoButton.addEventListener("click", onAddTodo);
saveTodoButton.addEventListener("click", onSaveTodo);
