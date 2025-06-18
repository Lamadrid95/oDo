import { generateId, normalizeTask } from "./utils.js";
import { loadTasksFromStorage, saveTasksToStorage } from "./storage.js";
import { createTaskElement } from "./dom.js";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (s) => document.querySelector(s);
  const input = $("#doItInput");
  const button = $("#doItButton");
  const taskList = $("#taskListSection");
  const clearBtn = $("#clearCompleted");

  const filterButtons = {
    all: $("#filterAll"),
    active: $("#filterActive"),
    completed: $("#filterCompleted"),
  };

  let currentFilter = "all";
  let tasks = [];

  // Renderiza las tareas según el filtro actual
  const renderTasks = () => {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const shouldShow =
        currentFilter === "all" ||
        (currentFilter === "active" && !task.completed) ||
        (currentFilter === "completed" && task.completed);

      if (!shouldShow) return;

      const taskElement = createTaskElement(
        task,
        (checked) => {
          task.completed = checked;
          saveAndRender();
        },
        () => {
          tasks = tasks.filter((t) => t.id !== task.id);
          saveAndRender();
        }
      );

      taskList.appendChild(taskElement);
    });

    // Mostrar/ocultar botón de "Eliminar completadas"
    const hasCompleted = tasks.some((t) => t.completed);
    if (hasCompleted && currentFilter !== "active") {
      clearBtn.classList.add("show");
    } else {
      clearBtn.classList.remove("show");
    }
  };

  // Guarda y re-renderiza
  const saveAndRender = () => {
    saveTasksToStorage(tasks);
    renderTasks();
  };

  // Crea una nueva tarea
  const createTask = () => {
    const text = input.value.trim();
    if (!text) return;
    tasks.push(normalizeTask({ text }));
    input.value = "";
    saveAndRender();
  };

  // Cambia el filtro activo
  const setActiveFilter = (key) => {
    currentFilter = key;
    Object.entries(filterButtons).forEach(([type, btn]) => {
      btn.classList.toggle("active", type === key);
    });
    renderTasks();
  };

  // EVENTOS
  button.addEventListener("click", createTask);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      createTask();
    }
  });

  Object.entries(filterButtons).forEach(([key, btn]) => {
    btn.addEventListener("click", () => setActiveFilter(key));
  });

  clearBtn.addEventListener("click", () => {
    tasks = tasks.filter((task) => !task.completed);
    saveAndRender();
  });

  // INIT
  tasks = loadTasksFromStorage();
  renderTasks();
});
