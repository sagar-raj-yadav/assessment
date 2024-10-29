// src/features/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    { id: 1, title: 'Task 1', description: 'Description 1', dueDate: '2024-10-05', status: 'ToDo', assignedUser: 'User A', priority: 'High' },
    { id: 2, title: 'Task 2', description: 'Description 2', dueDate: '2024-10-06', status: 'InProgress', assignedUser: 'User B', priority: 'Medium' },
    { id: 3, title: 'Task 3', description: 'Description 3', dueDate: '2024-10-07', status: 'Completed', assignedUser: 'User C', priority: 'Low' },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTaskStatus: (state, action) => {
      const { id, newStatus } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.status = newStatus;
      }
    },
  },
});

export const { updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
