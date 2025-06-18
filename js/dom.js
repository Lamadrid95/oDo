import { formatDateTime } from "./utils.js";

export const createTaskElement = (task, onToggle, onDelete) => {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task-item");
  if (task.completed) taskElement.classList.add("completed");

  taskElement.innerHTML = `
    <div class="task-main-content">
      <input type="checkbox" class="task-checkbox" ${
        task.completed ? "checked" : ""
      }>
      <span class="task-text">${task.text}</span>
    </div>
    <div class="task-actions">
      <small class="task-due-date">${formatDateTime(task.createdAt)}</small>
      <button class="delete-task-btn" aria-label="Eliminar tarea">✕</button>
    </div>
  `;

  taskElement
    .querySelector(".task-checkbox")
    .addEventListener("change", (e) => {
      onToggle(e.target.checked);
    });

  taskElement
    .querySelector(".delete-task-btn")
    .addEventListener("click", onDelete);

  return taskElement;
};
