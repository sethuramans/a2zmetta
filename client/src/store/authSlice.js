import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, forgotPassword, resetPassword  } from '../services/api';
import {STORAGE} from '../utils/constants';
const { USER, TOKEN, REWARD_START_TIME } = STORAGE;




// Async Thunks
export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const res = await loginUser(data);
    console.log('sethu log authslice login', res);
    localStorage.setItem(USER, JSON.stringify(res.user))
    localStorage.setItem(TOKEN, res.token);
    return res; // should be { token, user }
  } catch (err) {
    const message = err.response?.data?.message || err.message || 'Login failed';
    return thunkAPI.rejectWithValue(message);
  }
});

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    const res = await registerUser(data);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message || 'Registration failed';
    return thunkAPI.rejectWithValue(message);
  }
});



// Forgot Password
export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgotPassword',
  async (email, thunkAPI) => {
    try {
      const res = await forgotPassword(email);
      return res.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Reset Password
export const resetPasswordThunk = createAsyncThunk(
  'auth/resetPassword',
  async (data, thunkAPI) => {
    try {
      const res = await resetPassword(data);
      return res.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);



const getUserData = () => localStorage.getItem(USER) ?? null;
const getToken = () => localStorage.getItem(TOKEN) ?? null;
const user = JSON.parse(getUserData());


// Initial State
const initialState = {
  user: user && Object.keys(user).length > 0 ? user : null,
  token: getToken(),
  loading: false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USER);
      state.user = null;
      state.token = null;
      state.error = null;
    },setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem(USER, JSON.stringify(state.user)); // 🔄 Keep storage in sync
    },
    resetAuthState(state) {
      state.error = null;
      state.message = null;
      // optionally reset other fields if needed
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("authslice extra fullfilled", action);
        state.loading = false;
        state.user = action.payload?.user || null;
        state.token = action.payload?.token || null;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("authslice extra rejected", action);
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = action.payload || "Login failed";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload?.user || null;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload || "Registration failed";
      })
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser, resetAuthState } = authSlice.actions;
export default authSlice.reducer;

/*import { createSlice } from "@reduxjs/toolkit";
import {STORAGE} from '../utils/constants';
const { USER, TOKEN, REWARD_START_TIME } = STORAGE;

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
export default authSlice.reducer;*/
