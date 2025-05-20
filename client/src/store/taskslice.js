// src/features/tasks/taskSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getTasks} from '../services/api';
// Async thunk to fetch tasks from DB
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, thunkAPI) => {
    try {
      const res = await getTasks();
      console.log("✅ taskSlice fetchTasks response:", res);
      return res; // Should contain { tasks, tasks_links }
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Error fetching tasks'
      );
    }
  }
);



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
