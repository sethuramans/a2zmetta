import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserProfile, getProfile } from '../services/api';
import {setUser} from './authSlice';

// Fetch user profile (to populate the form)
export const fetchUserProfile = createAsyncThunk('profile/fetchUserProfile', async () => {
  const res = await getProfile();
  return res.data;
});

// Update user profile
export const updateProfile = createAsyncThunk('profile/updateProfile', async (profileData, thunkAPI) => {
  try {
    const res = await updateUserProfile(profileData);
    thunkAPI.dispatch(setUser(profileData));
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
