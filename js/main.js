// main.js - V0.5 Remaster 🔥 Modular y funcional

import {
  formatDateTime,
  generateId,
  normalizeTask,
  saveTasksToStorage,
  loadTasksFromStorage,
} from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (s) => document.querySelector(s);
  const input = $("#doItInput");
  const button = $("#doItButton");
  const taskList = $("#taskListSection");

  const filterButtons = {
    all: $("#filterAll"),
    active: $("#filterActive"),
    completed: $("#filterCompleted"),
  };

  let currentFilter = "all";
  let tasks = [];

  // Cargar tareas desde localStorage
  const loadTasks = () => {
    tasks = loadTasksFromStorage();
  };

  // Guardar + volver a renderizar
  const saveAndRender = () => {
    saveTasksToStorage(tasks);
    renderTasks();
  };

  // Renderizar tareas
  const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      if (
        (currentFilter === "active" && task.completed) ||
        (currentFilter === "completed" && !task.completed)
      )
        return;

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

      // Checkbox toggle
      taskElement
        .querySelector(".task-checkbox")
        .addEventListener("change", (e) => {
          task.completed = e.target.checked;
          saveAndRender();
        });

      // Eliminar tarea
      taskElement
        .querySelector(".delete-task-btn")
        .addEventListener("click", () => {
          tasks = tasks.filter((t) => t.id !== task.id);
          saveAndRender();
        });

      taskList.appendChild(taskElement);
    });
  };

  // Crear nueva tarea
  const createTask = () => {
    const text = input.value.trim();
    if (!text) return;

    const newTask = normalizeTask({ text });
    tasks.push(newTask);
    input.value = "";
    saveAndRender();
  };

  // Eventos
  button.addEventListener("click", createTask);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      createTask();
    }
  });

  // Filtros
  const setActiveFilter = (key) => {
    currentFilter = key;
    Object.entries(filterButtons).forEach(([type, btn]) => {
      btn.classList.toggle("active", type === key);
    });
    renderTasks();
  };

  Object.entries(filterButtons).forEach(([key, btn]) => {
    btn.addEventListener("click", () => setActiveFilter(key));
  });

  // Inicializar
  loadTasks();
  renderTasks();
});
