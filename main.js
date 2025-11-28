//Constraints
const TASK_CLASS = "task-box";
const FINISHED_CLASS = "finished";

//Setting up variables
let todoContainer = document.querySelector(".todo-container");
let input = document.querySelector(".add-task input");
let addButton = document.querySelector(".add-task .add");
let tasksContainer = document.querySelector(".task-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let toggleTheme = document.querySelector(".toggle-theme");

// Toggle Theme
toggleTheme.onclick = () => {
  document.body.classList.toggle("dark");

  // switch icon
  if (document.body.classList.contains("dark")) {
    toggleTheme.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    toggleTheme.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  }
};

//Handle onload logic
window.onload = () => {
  input.focus();

  // Load theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggleTheme.classList.replace("fa-moon", "fa-sun");
  }

  const data = JSON.parse(localStorage.getItem("tasks"));
  if (!data) return;

  // remove "no tasks" message IF there are saved tasks
  const msg = tasksContainer.querySelector(".no-tasks-msg");
  if (msg) msg.remove();

  data.map((task) => {
    renderTasks(task.task, task.finished);
  });

  calculateTasks();
};

//Render Task
function renderTasks(task, finished = false) {
  //create task container
  let newTask = document.createElement("span");
  newTask.className = TASK_CLASS;
  if (finished) newTask.classList.add(FINISHED_CLASS);
  newTask.textContent = task;

  //create delete btn
  let deleteBtn = document.createElement("span");
  deleteBtn.className = "delete";
  deleteBtn.textContent = "Delete";

  newTask.appendChild(deleteBtn);
  tasksContainer.appendChild(newTask);
}

//Add Task
addButton.onclick = () => {
  //Check if input is empty
  if (input.value === "") {
    return Swal.fire("You cannot add an empty task");
  }

  let currentTasks = document.querySelectorAll(`.${TASK_CLASS}`);

  //Check for duplicate tasks
  const exists = [...currentTasks].some((task) => task.firstChild.nodeValue.trim() === input.value.trim());
  if (exists) {
    return Swal.fire("You cannot add duplicate tasks");
  }

  //remove no task message
  if (tasksContainer.querySelector(".no-tasks-msg")) {
    tasksContainer.querySelector(".no-tasks-msg").remove();
  }

  renderTasks(input.value, false);
  calculateTasks();
  updateLocalStorage();

  //reset input
  input.value = "";
  input.focus();
};

//Delete Task & Finish Task
tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    calculateTasks();
    updateLocalStorage();
    if (tasksContainer.childElementCount === 0) {
      createNoTaskMessage();
    }
    return;
  }

  if (e.target.classList.contains(TASK_CLASS)) {
    e.target.classList.toggle(FINISHED_CLASS);
    calculateTasks();
    updateLocalStorage();
  }
});

//Create delete all tasks btn
let deleteAllBtn = document.createElement("span");
deleteAllBtn.className = "deleteAllBtn";
deleteAllBtn.textContent = "Delete All Tasks";
todoContainer.appendChild(deleteAllBtn);

//Delete all tasks
deleteAllBtn.onclick = () => {
  tasksContainer.innerHTML = "";
  calculateTasks();
  updateLocalStorage();
  createNoTaskMessage();
};

//Create finish all tasks
let finishAllBtn = document.createElement("span");
finishAllBtn.className = "finishAllBtn";
finishAllBtn.textContent = "Finish All Tasks";
todoContainer.appendChild(finishAllBtn);

// Finish all tasks
finishAllBtn.onclick = () => {
  document.querySelectorAll(`.${TASK_CLASS}`).forEach((task) => {
    if (!task.classList.contains(FINISHED_CLASS)) {
      task.classList.add(FINISHED_CLASS);
    }
  });
  calculateTasks();
  updateLocalStorage();
};

//Create no tasks message
function createNoTaskMessage() {
  let noTaskMessage = document.createElement("span");
  noTaskMessage.className = "no-tasks-msg";
  noTaskMessage.textContent = "No tasks to show";
  tasksContainer.appendChild(noTaskMessage);
}

//Calculate all tasks
function calculateTasks() {
  tasksCount.textContent = document.querySelectorAll(`.${TASK_CLASS}`).length;
  tasksCompleted.textContent = document.querySelectorAll(`.${FINISHED_CLASS}`).length;
}

//Update local storage
function updateLocalStorage() {
  const data = Array.from(document.querySelectorAll(".task-box")).map((el) => {
    return {
      task: el.firstChild.nodeValue.trim(),
      finished: el.classList.contains(FINISHED_CLASS),
    };
  });
  localStorage.setItem("tasks", JSON.stringify(data));
}
