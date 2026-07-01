import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/todo/'; // Note the trailing slash '/'

const useTodoStore = create((set, get) => ({
  // --- States ---
  todos: [],
  isFormOpen: false,
  todoData: {
    title: '',
    description: '',
    priority: 'M',
    is_completed: false
  },

  // --- UI Actions ---
  openForm: () => set({ isFormOpen: true }),
  closeForm: () => set({ isFormOpen: false }),
  
  setTodoData: (data) =>
    set((state) => ({
      todoData: {
        ...state.todoData,
        ...data
      }
    })),

  resetTodoData: () =>
    set({
      todoData: {
        title: '',
        description: '',
        priority: 'M',
        is_completed: false
      }
    }),

  // --- API Actions (Async) ---
  
  // 1. GET ALL TODOS
  fetchTodos: async () => {
    try {
      const response = await axios.get(API_URL);
      set({ todos: response.data });
      console.log("Todos fetched successfully:", response.data);
    } catch (error) {
      console.error("Todo is not fetched:", error);
    }
  },

  // 2. CREATE TODO
  createTodo: async () => {
    const { todoData, fetchTodos, resetTodoData, closeForm } = get();
    try {
      const response = await axios.post(API_URL, todoData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Todo created successfully:", response.data);
      
      resetTodoData(); // Form clear karein
      closeForm();     // Form close karein
      await fetchTodos();    // List refresh karein
    } catch (error) {
      console.error("Todo is not created:", error);
    }
  },

  // 3. TOGGLE COMPLETE (Status Update)
  toggleTodoComplete: async (todo) => {
    const { fetchTodos } = get();
    try {
      await axios.put(`${API_URL}${todo.id}/`, {
        ...todo,
        is_completed: !todo.is_completed
      });
      await fetchTodos();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  },

  // 4. DELETE TODO
  deleteTodo: async (id) => {
    const { fetchTodos } = get();
    try {
      await axios.delete(`${API_URL}${id}/`);
      await fetchTodos();
    } catch (error) {
      console.error("Todo deleted successfully");
    }
  }
}));

export default useTodoStore;