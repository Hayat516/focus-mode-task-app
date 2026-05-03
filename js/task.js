import { errorMessage, taskInput, taskList } from "./dom.js";

export function addTask() {
    const input = taskInput.value.trim()

    if (input === "") {
        errorMessage.textContent = "Please enter a task before adding";
        return;
    }
    else {
        errorMessage.textContent = "";
        let tasks = localStorage.getItem("tasks");

        if (tasks) {
            tasks = JSON.parse(tasks);
        } else {
            tasks = [];
        }

        const newTask = {
            text: input,
            completed: false
        };

        tasks.push(newTask);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        const newElement = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = newTask.text;

        const newIcon = document.createElement("span");
        newIcon.classList.add("fa-solid", "fa-xmark", "delete-icon");

        newIcon.addEventListener("click", deleteTask)

        newElement.appendChild(taskText);
        newElement.appendChild(newIcon);

        taskList.appendChild(newElement);

        taskInput.value = ""
    }
}

export function deleteTask(event) {
    const icon = event.target
    const taskItem = icon.parentElement;

    const taskText = taskItem.firstChild.textContent.trim();

    taskItem.remove();

    let tasks = localStorage.getItem("tasks");

    if (tasks) {
        tasks = JSON.parse(tasks);
    } else {
        tasks = [];
    }

    const updatedTasks = tasks.filter(task => task !== taskText);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

}

export function loadTask() {
    let tasks = localStorage.getItem("tasks");

    if (!tasks) {
        return;
    }
    else {
        tasks = JSON.parse(tasks);

        tasks.forEach(task => {
            const refreshTask = document.createElement("li");
            refreshTask.textContent = task;

            const refreshIcon = document.createElement("span");
            refreshIcon.classList.add("fa-solid", "fa-xmark", "delete-icon")

            refreshTask.appendChild(refreshIcon)
            taskList.appendChild(refreshTask);
        });
    }
}
