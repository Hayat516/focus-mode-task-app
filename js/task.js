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
        taskText.classList.add("task-text");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = newTask.completed;

        const newIcon = document.createElement("span");
        newIcon.classList.add("fa-solid", "fa-xmark", "delete-icon");

        newIcon.addEventListener("click", deleteTask);

        newElement.appendChild(checkbox);
        newElement.appendChild(taskText);
        newElement.appendChild(newIcon);


        taskList.appendChild(newElement);

        taskInput.value = ""

        checkbox.addEventListener("change", toggleTask);
    }
}

export function deleteTask(event) {
    const icon = event.target
    const taskItem = icon.parentElement;

    const taskText = taskItem.children[1].textContent.trim();
    taskItem.remove();

    let tasks = localStorage.getItem("tasks");

    if (tasks) {
        tasks = JSON.parse(tasks);
    } else {
        tasks = [];
    }

    const updatedTasks = tasks.filter(task => task.text !== taskText);

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

            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            taskText.classList.add("task-text");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;

            if (task.completed) {
                taskText.classList.add("completed");
            }

            const refreshIcon = document.createElement("span");
            refreshIcon.classList.add("fa-solid", "fa-xmark", "delete-icon");

            refreshTask.appendChild(checkbox)
            refreshTask.appendChild(taskText);
            refreshTask.appendChild(refreshIcon)
            taskList.appendChild(refreshTask);

            refreshIcon.addEventListener("click", deleteTask);
            checkbox.addEventListener("change", toggleTask);
        });
    }
}


function toggleTask(event) {

    const check = event.target;
    const checkItem = check.parentElement;

    const taskTextElement = checkItem.querySelector(".task-text");


    if (check.checked) {
        taskTextElement.classList.add("completed")
    } else {
        taskTextElement.classList.remove("completed");
    }

    const taskText = taskTextElement.textContent.trim();
    let tasks = localStorage.getItem("tasks");

    if (tasks) {
        tasks = JSON.parse(tasks);
    } else {
        tasks = [];
    }

    tasks.forEach(task => {
        if (task.text === taskText) {
            task.completed = check.checked;
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}