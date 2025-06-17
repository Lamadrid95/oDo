// utils.js REMASTER V0.5 🔥🔥🔥 por Omar Lamadrid y ChatGPT Fullstack Mode

// 🕒 Formatea fecha y hora legible para humanos
export const formatDateTime = (timestamp) => {
  return new Date(timestamp).toLocaleString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// 🧠 Generador de ID único para tareas
export const generateId = () => crypto.randomUUID();

// 🔁 Migración: garantiza estructura uniforme
export const normalizeTask = (task) => {
  return {
    id: task.id || generateId(),
    text: task.text || "",
    completed: !!task.completed,
    createdAt: task.createdAt || Date.now(),
  };
};

// 📦 Guarda array de tareas en localStorage
export const saveTasksToStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// 🔍 Carga tareas y aplica migración
export const loadTasksFromStorage = () => {
  const raw = JSON.parse(localStorage.getItem("tasks")) || [];
  return raw.map(normalizeTask);
};
