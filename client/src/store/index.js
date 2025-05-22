import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import rewardReducer from './rewardsSlice';
import taskReducer from './taskSlice';
import themeReducer from './themeSlice';
import friendsReducer from './friendsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    rewards: rewardReducer,
    tasks: taskReducer,
    theme: themeReducer,
    friends: friendsReducer,
  },
});

export default store;