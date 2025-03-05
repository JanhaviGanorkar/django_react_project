import { create } from 'zustand';

const useStore = create((set) => ({
  student: [],
  loading: false,
  error: null,

  fetchStudent: async () => {
    set({ loading: true, error: null });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/students/");
      const data = await response.json();
      set({ student: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addStudent: async (newStudent) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/students/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        throw new Error('Failed to add student');
      }

      const addedStudent = await response.json();
      set((state) => ({
        student: [...state.student, addedStudent],
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  deleteStudent: async (roll_num) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/students/${roll_num}/delete/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete student');
      }

      set((state) => ({
        student: state.student.filter((s) => s.roll_num !== roll_num),
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  editStudent: async (updatedStudent) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/students/${updatedStudent.roll_num}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudent),
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      const editedStudent = await response.json();
      set((state) => ({
        student: state.student.map((s) =>
          s.roll_num === editedStudent.roll_num ? editedStudent : s
        ),
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },
}));

export default useStore;
