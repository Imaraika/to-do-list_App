document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("taskInput").focus();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskInput.value}</span>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
        taskInput.value = "";
        taskInput.focus();
    }
}

function deleteTask(button) {
    const li = button.parentNode;
    li.parentNode.removeChild(li);
}
