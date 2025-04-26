import { createSlice } from "@reduxjs/toolkit";
import {storage} from '../utils/constants';
const { USER, TOKEN, REWARD_START_TIME } = storage;

// ✅ Use an empty object `{}` if `user` is missing

const getUserData = () => localStorage.getItem(USER) ?? null;
const getToken = () => localStorage.getItem(TOKEN) ?? null;
const user = JSON.parse(getUserData());

// ✅ Ensure token is properly retrieved
const token = getToken();

const initialState = {
  user: user && Object.keys(user).length > 0 ? user : null, // ✅ Set to null if empty
  token: token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem(USER, JSON.stringify(action.payload.user)); // ✅ Store user safely
      localStorage.setItem(TOKEN, action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(USER);
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(REWARD_START_TIME);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
