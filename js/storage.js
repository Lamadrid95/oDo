import { normalizeTask } from "./utils.js";

export const loadTasksFromStorage = () => {
  try {
    const raw = JSON.parse(localStorage.getItem("tasks")) || [];
    return raw.map(normalizeTask);
  } catch {
    return [];
  }
};

export const saveTasksToStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
