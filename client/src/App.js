import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/NavBar"; 
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import AboutUs from './pages/AboutUs';
import PageNotFound from './pages/PageNotFound';
const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  const location = useLocation();

  const hideNavbarOn = ['/login'];
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);
 return (
   <>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/about-us" element={<AboutUs />} />
       <Route path="/login" element={<Login />} />
       <Route
         path="/profile"
         element={
           <PrivateRoute>
             <Profile />
           </PrivateRoute>
         }
       />
       <Route
         path="/dashboard"
         element={
           <PrivateRoute>
             <Dashboard />
           </PrivateRoute>
         }
       />
       <Route
         path="/tasks"
         element={
           <PrivateRoute>
             <Tasks />
           </PrivateRoute>
         }
       />
       <Route path="/*" element={<PageNotFound />} />
     </Routes>

     {!shouldHideNavbar && <Navbar />}
   </>
 );
}
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
