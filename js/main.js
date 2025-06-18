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

import { translations } from "./lang.js";

let currentLang = "en";

const elements = {
  slogan: document.querySelector("#slogan h1"),
  doItInput: document.querySelector("#doItInput"),
  doItButton: document.querySelector("#doItButton"),
  filterAll: document.querySelector("#filterAll"),
  filterActive: document.querySelector("#filterActive"),
  filterCompleted: document.querySelector("#filterCompleted"),
  clearCompleted: document.querySelector("#clearCompleted"),
  startSection: document.querySelector("#startSection h2"),
  focusSection: document.querySelector("#focusSection h2"),
  finishSection: document.querySelector("#finishSection h2"),
};

const applyLanguage = () => {
  const t = translations[currentLang];

  elements.slogan.textContent = t.slogan;
  elements.doItInput.placeholder = t.doItPlaceholder;
  elements.doItButton.textContent = t.doItButton;
  elements.filterAll.textContent = t.filterAll;
  elements.filterActive.textContent = t.filterActive;
  elements.filterCompleted.textContent = t.filterCompleted;
  elements.clearCompleted.textContent = t.clearCompleted;
  elements.startSection.textContent = t.start;
  elements.focusSection.textContent = t.focus;
  elements.finishSection.textContent = t.finish;

  document.getElementById("langToggle").textContent =
    currentLang === "en" ? "Español" : "English";
};

// Toggle idioma
document.getElementById("langToggle").addEventListener("click", () => {
  currentLang = currentLang === "en" ? "es" : "en";
  applyLanguage();
});

applyLanguage(); // Inicializa
