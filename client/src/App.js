import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/NavBar"; 
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import AboutUs from './pages/AboutUs';
import ProfileUpdate from './pages/ProfileEditPage';
import PageNotFound from './pages/PageNotFound';
import Wallet from "./pages/Wallet";
import ThemeToggle from './components/ThemeToggle';
const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  const location = useLocation();
  const theme = useSelector((state) => {console.log(state);return state.theme.mode});
  const hideNavbarOn = ['/logins'];
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);
  const formPage = ['/login', '/register', '/profile/update'];
  const isFormPage = formPage.includes(location.pathname);
 return (
   <div
     className={`min-vh-100 ${isFormPage ? 'form-page': ''} ${
       theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"
     }`}
   >
     
       {/*<ThemeToggle />*/}
       {!shouldHideNavbar && <Navbar />}
     
     <main className="main">
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/about-us" element={<AboutUs />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route
           path="/profile"
           element={
             <PrivateRoute>
               <Profile />
             </PrivateRoute>
           }
         />
         <Route path="/profile/update"  element={
             <PrivateRoute>
               <ProfileUpdate />
             </PrivateRoute>
           } />
         <Route
           path="/dashboard"
           element={
             <PrivateRoute>
               <Dashboard />
             </PrivateRoute>
           }
         />
         <Route
           path="/wallet"
           element={
             <PrivateRoute>
               <Wallet />
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
     </main>
   </div>
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
