import { addTask } from "./task.js";
import { addBtn, taskInput, taskList, errorMessage } from "./dom.js";

addBtn.addEventListener("click", addTask)