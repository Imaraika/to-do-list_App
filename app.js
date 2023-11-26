document.addEventListener("DOMContentLoaded", function () {
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
    }
}

function editTask(button) {
    const li = button.parentNode.parentNode;
    const taskText = li.querySelector(".taskText");
    const newTask = prompt("Edit task:", taskText.innerText);

    if (newTask !== null) {
        taskText.innerText = newTask;
    }
}

function deleteTask(button) {
    const li = button.parentNode.parentNode;
    li.parentNode.removeChild(li);
}

function togglePriority(button) {
    const li = button.parentNode.parentNode;
    li.classList.toggle("priority");
}

function toggleCompletion(button) {
    const li = button.parentNode.parentNode;
    li.classList.toggle("completed");
}
