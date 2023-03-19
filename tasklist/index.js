const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");

let todos = [];

function loadTodos() {
  console.log("load");
  todos = JSON.parse(localStorage.getItem("todos"));
  renderTodos();
}
loadTodos();

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";

  todos.forEach(function (todo, index) {
    const item = document.createElement("li");
    item.setAttribute("draggable", true);
    item.setAttribute("data-index", index);
    if (todo.completed) {
      item.classList.add("done");
    }
    item.innerHTML = `
      <input type="checkbox" class="toggle" ${todo.completed ? "checked" : ""}>
      <span>${todo.title}</span>
      <button class="edit">
      <i class="fas fa-edit"></i>
      </button>
      <button class="delete">
      <i class="fas fa-trash-alt"></i>
      </button>
    `;
    list.appendChild(item);
  });
}

function addTodo() {
  const title = input.value.trim();
  if (title !== "") {
    todos.push({ title, completed: false });
    renderTodos();
    saveTodos();
    input.value = "";
  }
}

function toggleTodoCompleted(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
  saveTodos();
}

function deleteTodoByIndex(index) {
  todos.splice(index, 1);
  renderTodos();
  saveTodos();
}

function editTodoByIndex(index) {
  const newTitle = prompt("Enter new title");
  if (newTitle === null || newTitle === "") {
    return;
  } else {
    todos[index].title = newTitle.trim();
    renderTodos();
    saveTodos();
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo();
});

list.addEventListener("change", function (event) {
  if (event.target.classList.contains("toggle")) {
    const index = parseInt(
      event.target.parentElement.getAttribute("data-index")
    );
    toggleTodoCompleted(index);
  }
});

list.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    console.log("parse", event.target.parentElement.getAttribute("data-index"));
    const index = parseInt(
      event.target.parentElement.getAttribute("data-index")
    );
    console.log("index", index);
    deleteTodoByIndex(index);
  } else if (event.target.classList.contains("edit")) {
    const index = parseInt(
      event.target.parentElement.getAttribute("data-index")
    );
    editTodoByIndex(index);
  }
});

let draggingItemIndex = null;
let draggedOverItemIndex = null;

function handleDragStart(event) {
  draggingItemIndex = parseInt(event.target.getAttribute("data-index"));
  event.target.classList.add("dragging");
}

function handleDragEnter(event) {
  event.preventDefault();
  draggedOverItemIndex = parseInt(event.target.getAttribute("data-index"));
  event.target.classList.add("drag-over");
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDragLeave(event) {
  event.target.classList.remove("drag-over");
}

function handleDrop(event) {
  event.preventDefault();
  const tempTodos = [...todos];
  console.log("t emp");
  const draggingItem = tempTodos[draggingItemIndex];
  tempTodos[draggingItemIndex] = tempTodos[draggedOverItemIndex];
  tempTodos[draggedOverItemIndex] = draggingItem;
  todos = [...tempTodos];
  renderTodos();
}

function handleDragEnd(event) {
  draggingItemIndex = null;
  draggedOverItemIndex = null;
  console.log("g=drag");
  const draggingItem = document.querySelector(".dragging");
  if (draggingItem) {
    draggingItem.classList.remove("dragging");
    console.log("re,ove");
  }
  const dragOverItem = document.querySelector(".drag-over");
  if (dragOverItem) {
    dragOverItem.classList.remove("drag-over");
  }
}

list.addEventListener("dragstart", handleDragStart);
list.addEventListener("dragenter", handleDragEnter);
list.addEventListener("dragover", handleDragOver);
list.addEventListener("dragleave", handleDragLeave);
list.addEventListener("drop", handleDrop);
list.addEventListener("dragend", handleDragEnd);
