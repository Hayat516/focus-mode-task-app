import { addTask, loadTask } from "./task.js";
import { addBtn, taskInput, taskList, errorMessage } from "./dom.js";

addBtn.addEventListener("click", addTask);
window.addEventListener("DOMContentLoaded", loadTask);