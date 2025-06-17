document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);
  const input = $("#doItInput");
  const button = $("#doItButton");
  const taskList = $("#taskListSection");

  const filterButtons = {
    all: $("#filterAll"),
    active: $("#filterActive"),
    completed: $("#filterCompleted"),
  };

  let currentFilter = "all";

  const getTasksFromStorage = () => {
    try {
      return JSON.parse(localStorage.getItem("tasks")) || [];
    } catch (err) {
      console.error("Error al leer localStorage:", err);
      return [];
    }
  };

  const saveTasksToStorage = (tasks) => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (err) {
      console.error("Error al guardar en localStorage:", err);
    }
  };

  const renderTasks = () => {
    const tasks = getTasksFromStorage();
    taskList.innerHTML = "";

    tasks.forEach((taskData, index) => {
      const task = document.createElement("div");
      task.classList.add("task-item");
      if (taskData.completed) task.classList.add("completed");

      task.innerHTML = `
        <div class="task-main-content">
          <input type="checkbox" class="task-checkbox" ${
            taskData.completed ? "checked" : ""
          }>
          <span class="task-text">${taskData.text}</span>
        </div>
        <div class="task-actions">
          <button class="delete-task-btn" aria-label="Eliminar tarea">✕</button>
        </div>
      `;

      // Check
      const checkbox = task.querySelector(".task-checkbox");
      checkbox.addEventListener("change", () => {
        tasks[index].completed = checkbox.checked;
        saveTasksToStorage(tasks);
        renderTasks(); // Re-render para aplicar filtro y clase .completed
      });

      // Delete
      const deleteBtn = task.querySelector(".delete-task-btn");
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasksToStorage(tasks);
        renderTasks();
      });

      taskList.appendChild(task);
    });

    applyFilter(currentFilter);
  };

  const createTask = () => {
    const text = input.value.trim();
    if (!text) return;

    const tasks = getTasksFromStorage();
    tasks.push({ text, completed: false });
    saveTasksToStorage(tasks);
    input.value = "";
    renderTasks();
  };

  // Crear tarea
  button.addEventListener("click", createTask);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      createTask();
    }
  });

  // Filtros
  const applyFilter = (filter) => {
    const taskElements = taskList.querySelectorAll(".task-item");
    taskElements.forEach((task) => {
      const completed = task.classList.contains("completed");
      task.style.display =
        filter === "all" ||
        (filter === "active" && !completed) ||
        (filter === "completed" && completed)
          ? "flex"
          : "none";
    });
  };

  const setActiveFilter = (key) => {
    currentFilter = key;
    Object.entries(filterButtons).forEach(([type, btn]) =>
      btn.classList.toggle("active", type === key)
    );
    applyFilter(key);
  };

  Object.entries(filterButtons).forEach(([key, btn]) => {
    btn.addEventListener("click", () => setActiveFilter(key));
  });

  renderTasks(); // Inicializar al cargar
});
