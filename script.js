const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = `task ${task.completed ? "completed" : ""}`;
    div.innerHTML = `
      <span><strong>${task.time}</strong> - ${task.text}</span>
      <div>
        <button onclick="toggleTask(${index})">${task.completed ? "Undo" : "Done"}</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(div);
  });
}

function addTask(e) {
  e.preventDefault();
  const time = document.getElementById("taskTime").value;
  const text = document.getElementById("taskText").value;
  tasks.push({ time, text, completed: false });
  saveTasks();
  renderTasks();
  taskForm.reset();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener("submit", addTask);
renderTasks();
