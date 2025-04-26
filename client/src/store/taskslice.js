// src/features/tasks/taskSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getTasks} from '../services/api';
// Async thunk to fetch tasks from DB
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  try {
  const res = await getTasks();
  console.log("taskslice fetchtasks", res);
  return res;
} catch (error) {
    throw Error('Error fetching tasks:', error);
  }
});


const initialState = {
  tasks: [],
  tasks_links: [],
  loading: false,
    error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        console.log('redu', state, action);
        state.tasks = action.payload.tasks;
        state.tasks_links = action.payload.tasks_links;
        state.error = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

//export const { fetchTasks } = taskSlice.actions;

export default taskSlice.reducer;
