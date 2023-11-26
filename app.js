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
            <select class="category" onchange="changeCategory(this)">
                <option value="default">Select Category</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="study">Study</option>
            </select>
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

function changeCategory(select) {
    const li = select.parentNode;
    const category = select.value;
    li.setAttribute("data-category", category);
    saveTasks(); // Save tasks to local storage after changing category
}

function saveTasks() {
    const tasks = Array.from(document.querySelectorAll("#taskList li")).map((task) => {
        return {
            html: task.innerHTML,
            category: task.getAttribute("data-category") || "default",
        };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    tasks.forEach((taskData) => {
        const li = document.createElement("li");
        li.innerHTML = taskData.html;
        li.setAttribute("data-category", taskData.category);
        taskList.appendChild(li);
    });
}
