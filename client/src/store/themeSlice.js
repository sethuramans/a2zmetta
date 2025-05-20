// src/features/theme/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {STORAGE} from '../utils/constants'

// Load from localStorage if available
const storedTheme = localStorage.getItem(STORAGE.THEME);

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: storedTheme || 'light',
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem(STORAGE.THEME, state.mode); // persist to localStorage
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem(STORAGE.THEME, action.payload); // persist to localStorage
    }
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
