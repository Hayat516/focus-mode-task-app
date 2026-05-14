import { addBtn, errorMessage, focusBtn, focusMessage, taskInput, taskList } from "./dom.js";

let isFocusmode = false;

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
        checkbox.addEventListener("change", toggleTask);

        newElement.appendChild(checkbox);
        newElement.appendChild(taskText);
        newElement.appendChild(newIcon);


        taskList.appendChild(newElement);

        taskInput.value = ""

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


    if (isFocusmode) {

        const unfinishedTasks = updatedTasks.filter(task => !task.completed);

        if (unfinishedTasks.length === 0) {

            updateFocusMessage(updatedTasks);
            taskList.innerHTML = "";
        }
    }

}

export function loadTask() {
    let tasks = localStorage.getItem("tasks");

    if (!tasks) {
        return;
    }
    else {
        tasks = JSON.parse(tasks);

        let savedFocus = localStorage.getItem("isFocusmode");
        isFocusmode = savedFocus ? JSON.parse(savedFocus) : false;

        focusBtn.textContent = isFocusmode ? "Exit Focus mode" : "Focus mode";

        let taskToShow;

        if (isFocusmode) {
            taskToShow = tasks.filter(task => !task.completed);
            taskInput.style.display = "none";
            addBtn.style.display = "none";
            focusMessage.textContent = "Focus Mode is active. Complete your current tasks before adding new ones"
            focusMessage.style.display = "block";
        } else {
            taskToShow = tasks;
            taskInput.style.display = "block";
            addBtn.style.display = "block";
            focusMessage.style.display = "none";
        }

        taskList.innerHTML = "";

        updateFocusMessage(tasks);

        taskToShow.forEach(task => {
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

            refreshTask.appendChild(checkbox);
            refreshTask.appendChild(taskText);
            refreshTask.appendChild(refreshIcon);

            taskList.appendChild(refreshTask);

            refreshIcon.addEventListener("click", deleteTask);
            checkbox.addEventListener("change", toggleTask);
        });
    }

}
export function toggleTask(event) {

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

    if (isFocusmode) {

        const unfinishedTasks = tasks.filter(task => task.completed === false);

        taskList.innerHTML = "";

        updateFocusMessage(tasks);

        if (unfinishedTasks.length === 0) {
            return;

        } else {

            unfinishedTasks.forEach(task => {

                const refreshTask = document.createElement("li");

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = task.completed;

                const taskText = document.createElement("span");
                taskText.textContent = task.text;
                taskText.classList.add("task-text");

                if (task.completed) {
                    taskText.classList.add("completed");
                }

                const refreshIcon = document.createElement("span");
                refreshIcon.classList.add("fa-solid", "fa-xmark", "delete-icon");

                checkbox.addEventListener("change", toggleTask);
                refreshIcon.addEventListener("click", deleteTask);

                refreshTask.appendChild(checkbox);
                refreshTask.appendChild(taskText);
                refreshTask.appendChild(refreshIcon);

                taskList.appendChild(refreshTask);

            });

        }
    }
}

export function focusMode() {
    if (isFocusmode) {
        isFocusmode = false;
        focusBtn.textContent = "Focus mode";
    }
    else {
        isFocusmode = true;
        focusBtn.textContent = "Exit Focus mode"
    }

    if (isFocusmode) {
        taskInput.style.display = "none";
        addBtn.style.display = "none";
        focusMessage.textContent = "Focus Mode is active. Complete your current tasks before adding new ones"
        focusMessage.style.display = "block";

    } else {
        taskInput.style.display = "block";
        addBtn.style.display = "block";
        focusMessage.style.display = "none";
    }

    localStorage.setItem("isFocusmode", JSON.stringify(isFocusmode));

    let tasks = localStorage.getItem("tasks");

    if (tasks) {
        tasks = JSON.parse(tasks);
    } else {
        tasks = [];
    }

    let taskToShow;

    if (isFocusmode) {
        taskToShow = tasks.filter(task => !task.completed);
    } else {
        taskToShow = tasks;
    }

    taskList.innerHTML = "";
    updateFocusMessage(tasks);

    taskToShow.forEach(task => {
        const focusTask = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.classList.add("task-text");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        if (task.completed) {
            taskText.classList.add("completed");
        }

        const focusIcon = document.createElement("span");
        focusIcon.classList.add("fa-solid", "fa-xmark", "delete-icon");

        focusTask.appendChild(checkbox)
        focusTask.appendChild(taskText);
        focusTask.appendChild(focusIcon)
        taskList.appendChild(focusTask);

        focusIcon.addEventListener("click", deleteTask);
        checkbox.addEventListener("change", toggleTask);

    });
}

focusBtn.addEventListener("click", focusMode)

function updateFocusMessage(tasks) {
    const unfinishedTasks = tasks.filter(task => !task.completed);

    if (!isFocusmode) {
        focusMessage.style.display = "none";
        return;
    }

    if (unfinishedTasks.length === 0) {
        focusMessage.textContent = "All tasks completed!";
        focusMessage.style.display = "block";
    } else {
        focusMessage.textContent = "Focus Mode is active. Complete your current tasks before adding new ones";
        focusMessage.style.display = "block";
    }
}