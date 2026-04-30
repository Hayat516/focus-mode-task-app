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

        tasks.push(input);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        const newElement = document.createElement("li");
        newElement.textContent = input;
        taskList.appendChild(newElement);

        taskInput.value = ""
    }
}

export function loadTask() {
    let tasks = localStorage.getItem("tasks");

    if (!tasks) {
        return;
    }
    else{
        tasks = JSON.parse(tasks);

        tasks.forEach(task => {
            const refreshTask = document.createElement("li");
            refreshTask.textContent = task;
            taskList.appendChild(refreshTask);
        });
    }
}