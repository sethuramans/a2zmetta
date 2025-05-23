import axios from "axios";
import { API_BASE_URL, STORAGE } from "../utils/constants";
const { TOKEN } = STORAGE;

// ✅ Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  params: {},
});

// ✅ Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("Request config:", config); // Log the config before sending
    return config;
  },
  (error) => {
    console.error("Request error:", error); // Log request errors
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response received:", response); // Log the response
    return response;
  },
  (error) => {
    console.error("Response error:", error); // Log response errors
    return Promise.reject(error);
  }
);

/*
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN) || null;
    //const user = localStorage.getItem("user");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    
    console.log('Api.js interceptors', config.headers);
    /*if (user) {
      console.log('api.interceptors.request', user, config);
      const {id: userId} = JSON.parse(user);
      if (config.method === 'get') {
        config.params = {
          ...config.params, // Preserve any existing params
          userId: userId, // Attach userId as a query param
        };
      }
  
      // For POST, PUT, DELETE, or other methods, you can add userId to the request body if needed
      else if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
        config.data = {
          ...config.data, // Preserve the existing body data
          userId: userId, // Attach userId to the body of the request
        };
      }
      
      console.log('api.interceptors.request after',config);
    }*/
/*return config;
  },
  (error) => Promise.reject(error)
);*/

// ✅ Store token in localStorage
/*export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }
};*/

// ✅ User Registration (Signup)
export const registerUser = (userData) => api.post("/auth/register", userData);

// ✅ User Login (Receive JWT Token)
export const loginUser = (userData) =>
  api.post("/auth/login", userData).then((res) => {
    //setAuthToken(res.data.token); // ✅ Store token after login
    return res.data;
  });

// ✅ Forgot password
export const forgotPassword = (data) => api.post("/auth/forgot-password", data);

// ✅ Reset password
export const resetPassword = (data) => api.post("/auth/reset-password", data);

// ✅ Get Profile
export const getProfile = () => api.get("/profile");

// ✅ Save Profile
export const updateUserProfile = (data) =>
  api.post("/user/save", data).then((res) => {
    return res.data;
  });

// ✅ Get Friends List
export const getFriends = (page, limit) =>
  api.get("/user/friends", {
    params: {
      page,
      limit,
    },
  });

// ✅ Get Total rewards earned
export const getTotalRewardsEarned = () => api.get("/rewards/total");

// ✅ Save rewards
export const saveRewards = (data) =>
  api.post("/rewards/save", data).then((res) => {
    return res.data;
  });

// ✅ get task
export const getTasks = (data) =>
  api.get("/tasks/list", data).then((res) => {
    return res.data;
  });

// ✅ Save task
export const saveTasks = (data) =>
  api.post("/tasks/save", data).then((res) => {
    return res.data;
  });

// ✅ get task actions
export const getTaskActions = (data) =>
  api.get("/tasks-action/list", data).then((res) => {
    return res.data;
  });

// ✅ save task actions
export const saveTaskActions = (data) =>
  api.post("/tasks-action/save", data).then((res) => {
    return res.data;
  });

export default api;
