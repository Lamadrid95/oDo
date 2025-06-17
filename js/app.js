document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector); // Acceso rápido estilo jQuery
  const input = $("#doItInput");
  const button = $("#doItButton");
  const taskList = $("#taskListSection");

  const filterButtons = {
    all: $("#filterAll"),
    active: $("#filterActive"),
    completed: $("#filterCompleted"),
  };

  let currentFilter = "all";

  const createTaskElement = (text) => {
    const task = document.createElement("div");
    task.classList.add("task-item");
    task.innerHTML = `
      <div class="task-main-content">
        <input type="checkbox" class="task-checkbox" aria-label="Mark task as done">
        <span class="task-text">${text}</span>
      </div>
      <div class="task-actions">
        <button class="delete-task-btn" aria-label="Delete task">✕</button>
      </div>
    `;

    const checkbox = task.querySelector(".task-checkbox");
    const deleteBtn = task.querySelector(".delete-task-btn");

    checkbox.addEventListener("change", () => {
      task.classList.toggle("completed");
      applyFilter(currentFilter); // mantiene coherencia visual con el filtro activo
    });

    deleteBtn.addEventListener("click", () => {
      task.remove();
    });

    return task;
  };

  const createTask = () => {
    const text = input.value.trim();
    if (!text) return;

    const newTask = createTaskElement(text);
    taskList.appendChild(newTask);
    input.value = "";
    applyFilter(currentFilter);
  };

  const applyFilter = (filter) => {
    document.querySelectorAll(".task-item").forEach((task) => {
      const isCompleted = task.classList.contains("completed");
      task.style.display =
        filter === "all" ||
        (filter === "active" && !isCompleted) ||
        (filter === "completed" && isCompleted)
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

  // Eventos
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
});
