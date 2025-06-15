document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("doItInput");
  const button = document.getElementById("doItButton");
  const taskList = document.getElementById("taskListSection");

  // Función para crear tarea (evita repetir lógica)
  const createTask = () => {
    const taskText = input.value.trim();
    if (taskText === "") return;

    const task = document.createElement("div");
    task.classList.add("task-item");
    task.innerHTML = `
      <div class="task-main-content">
        <input type="checkbox" class="task-checkbox">
        <span class="task-text">${taskText}</span>
      </div>
      <div class="task-actions">
        <button class="delete-task-btn">✕</button>
      </div>
    `;

    taskList.appendChild(task);
    input.value = "";
  };

  // Click en botón
  button.addEventListener("click", createTask);

  // Enter en input
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita comportamiento por defecto (en formularios)
      createTask();
    }
  });
});
