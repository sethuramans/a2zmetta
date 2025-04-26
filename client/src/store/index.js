import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import rewardReducer from './rewardsSlice';
import taskReducer from './taskslice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    rewards: rewardReducer,
    tasks: taskReducer,
  },
});

export default store;