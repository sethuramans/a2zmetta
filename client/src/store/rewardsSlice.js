import { createSlice } from '@reduxjs/toolkit';

import { getTotalRewardsEarned } from '../services/api';

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState: {
    points: 0,
    timerStartedAt: null,
    totalRewards: 0,
  },
  reducers: {
    setPoints: (state, action) => {
      state.points = action.payload;
    },
    incrementPoints: (state) => {
      state.points += 5;
    },
    resetPoints: (state) => {
      state.points = 0;
    },
    setTimerStart: (state, action) => {
      state.timerStartedAt = action.payload;
    },
    resetRewards: (state) => {
      state.points = 0;
      state.timerStartedAt = null;
    },
    setTotalRewards: (state, action) => {
      state.totalRewards = action.payload;
    },
  },
});

export const fetchTotalRewards = () => async (dispatch) => {
  try {
    const response = await getTotalRewardsEarned();
    dispatch(setTotalRewards(response.data.totalRewards));
  } catch (error) {
    console.error("Failed to fetch total rewards:", error);
  }
};

export const {
  setPoints,
  incrementPoints,
  resetPoints,
  setTimerStart,
  resetRewards,
  setTotalRewards,
} = rewardsSlice.actions;

export default rewardsSlice.reducer;
