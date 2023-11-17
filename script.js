document.addEventListener("DOMContentLoaded", () => {
    // Load tasks from local storage
    loadTasks();

    // Add event listener for the input field to add tasks on 'Enter' key
    document.getElementById("taskInput").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById("taskList");

        // Create new task
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button onclick="toggleTask(this)">Done</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;

        // Append the task to the list
        taskList.appendChild(li);

        // Save tasks to local storage
        saveTasks();

        // Clear the input field
        taskInput.value = "";
    }
}

function toggleTask(button) {
    const task = button.parentNode;
    task.classList.toggle("completed");

    // Save tasks to local storage
    saveTasks();
}

function deleteTask(button) {
    const task = button.parentNode;
    task.remove();

    // Save tasks to local storage
    saveTasks();
}

function filterTasks(filter) {
    const taskList = document.getElementById("taskList");
    const tasks = taskList.getElementsByTagName("li");

    for (const task of tasks) {
        switch (filter) {
            case "all":
                task.style.display = "flex";
                break;
            case "active":
                task.style.display = task.classList.contains("completed") ? "none" : "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("completed") ? "flex" : "none";
                break;
        }
    }
}

function clearCompleted() {
    const taskList = document.getElementById("taskList");
    const completedTasks = taskList.getElementsByClassName("completed");

    while (completedTasks.length > 0) {
        completedTasks[0].remove();
    }

    // Save tasks to local storage
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById("taskList").innerHTML;
    localStorage.setItem("tasks", taskList);
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = localStorage.getItem("tasks") || "";
}
