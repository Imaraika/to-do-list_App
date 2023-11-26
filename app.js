document.addEventListener("DOMContentLoaded", function () {
    loadTasks(); // Load tasks from local storage on page load
    document.getElementById("taskInput").focus();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="taskText">${taskInput.value}</span>
            <div class="actions">
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
                <button onclick="togglePriority(this)">Priority</button>
                <button onclick="toggleCompletion(this)">Complete</button>
            </div>
        `;
        taskList.appendChild(li);
        taskInput.value = "";
        taskInput.focus();

        saveTasks(); // Save tasks to local storage
    }
}

function editTask(button) {
    const li = button.parentNode.parentNode;
    const taskText = li.querySelector(".taskText");
    const newTask = prompt("Edit task:", taskText.innerText);

    if (newTask !== null) {
        taskText.innerText = newTask;
        saveTasks(); // Save tasks to local storage after editing
    }
}

function deleteTask(button) {
    const li = button.parentNode.parentNode;
    li.parentNode.removeChild(li);
    saveTasks(); // Save tasks to local storage after deletion
}

function togglePriority(button) {
    const li = button.parentNode.parentNode;
    li.classList.toggle("priority");
    saveTasks(); // Save tasks to local storage after toggling priority
}

function toggleCompletion(button) {
    const li = button.parentNode.parentNode;
    li.classList.toggle("completed");
    saveTasks(); // Save tasks to local storage after toggling completion
}

function saveTasks() {
    const tasks = Array.from(document.querySelectorAll("#taskList li")).map((task) => task.innerHTML);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    tasks.forEach((taskHTML) => {
        const li = document.createElement("li");
        li.innerHTML = taskHTML;
        taskList.appendChild(li);
    });
}
