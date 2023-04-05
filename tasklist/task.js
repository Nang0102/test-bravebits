const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");

let todos = [];

function addTodo() {
  const title = input.value.trim();
  if (title !== "" && title !== null) {
    todos.push({ title: title, completed: false });
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

function editTodo(index) {
  const newTitle = prompt(" Enter new title");

  if (newTitle === "" || newTitle === null) {
  } else {
    todos[index].title = newTitle;
    renderTodos();
    saveTodos();
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
  saveTodos();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

list.addEventListener("change", function (e) {
  if (e.target.classList.contains("toggle")) {
    const index = parseInt(e.target.parentElement.getAttribute("data-index"));
    console.log("index", index);
    toggleTodoCompleted(index);
  }
});

list.addEventListener("click", (e) => {
  const index = parseInt(e.target.parentElement.dataset.index);
  if (e.target.classList.contains("edit")) {
    console.log("index", index);
    editTodo(index);
  }
  if (e.target.classList.contains("delete")) {
    deleteTodo(index);
  }
});
function renderTodos() {
  list.innerHTML = "";
  todos.forEach(function (todo, index) {
    const item = document.createElement("li");
    console.log("item");

    item.setAttribute("data-index", index);
    item.setAttribute("draggable", true);

    if (todo && todo.completed) {
      item.classList.add("done");
    }
    item.innerHTML = `
    <input type = 'checkbox' class='toggle' ${todo.completed ? "checked" : ""}/>
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
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function load() {
  const savedTodos = JSON.parse(localStorage.getItem("todos"));
  if (savedTodos) {
    todos = savedTodos;
    renderTodos();
  }
}
load();

let draggingItemIndex = null;
let draggedOverItemIndex = null;

function handleDragStart(e) {
  draggingItemIndex = parseInt(e.target.getAttribute("data-index"));
  e.target.classList.add("dragging");
}
function handleDragEnter(e) {
  e.preventDefault();
  draggedOverItemIndex = parseInt(
    e.target.parentElement.getAttribute("data-index")
  );

  if (isNaN(draggedOverItemIndex)) {
    console.log("error");
    return;
  }
  console.log("drag-over", parseInt(e.target.getAttribute("data-index")));
  e.target.classList.add("drag-over");
}

function handleDragOver(e) {
  console.log("handle drag over");
  e.preventDefault();
}

function handleDragLeave(e) {
  console.log("remove drag-over");
  e.target.classList.remove("drag-over");
}

function handleDrop(e) {
  e.preventDefault();
  console.log("start drop");
  const tempTodos = [...todos];
  const draggingItem = tempTodos[draggingItemIndex];
  console.log("draggedOverItemIndex1222", draggedOverItemIndex);
  let dragRemove = tempTodos.splice(draggingItemIndex, 1);
  console.log("dragRemove", dragRemove);

  let drag = tempTodos.splice(draggedOverItemIndex, 0, draggingItem);
  console.log("draggedOverItemIndex", draggedOverItemIndex);

  console.log("drag", drag);
  console.log("toso", tempTodos);

  todos = [...tempTodos];

  renderTodos();
  saveTodos();
}

function handleDragEnd(e) {
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
