// lang.js
export const translations = {
  es: {
    slogan: "Piensa menos. Haz más.",
    start: "Comenzá a agregar tareas",
    focus: "Concentrate en tareas que necesitan terminarse",
    finish: "Mirá las tareas hechas",
    doItPlaceholder: "¿Qué quieres hacer?",
    doItButton: "Nueva Tarea",
    filterAll: "Todos",
    filterActive: "Pendientes",
    filterCompleted: "Completadas",
    clearCompleted: "Eliminar completadas",
    flag: "assets/img/englishButton.png",
    alt: "Switch to English",
  },
  en: {
    slogan: "Think less. Do more.",
    start: "Start adding tasks",
    focus: "Focus on tasks that need to be finished",
    finish: "Look the done tasks",
    doItPlaceholder: "What do you want to do?",
    doItButton: "Do It",
    filterAll: "All",
    filterActive: "Pending",
    filterCompleted: "Completed",
    clearCompleted: "Clear Completed",
    flag: "assets/img/spanishButton.png",
    alt: "Cambiar a Español",
  },
};

export const getSavedLang = () => localStorage.getItem("odoLang") || "en";

export const setSavedLang = (lang) => localStorage.setItem("odoLang", lang);
