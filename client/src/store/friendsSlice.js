import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFriends } from '../services/api';

export const fetchFriends = createAsyncThunk(
  'friends/fetchFriends',
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const res = await getFriends(page, limit); // Pass page + limit to API
      return {
        friends: res.data.friends,
        total: res.data.total,
        page,
        limit
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  friends: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 2,
};
const friendsSlice = createSlice({
  name: 'friends',
  initialState: initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = action.payload.friends;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = friendsSlice.actions;
export default friendsSlice.reducer;
