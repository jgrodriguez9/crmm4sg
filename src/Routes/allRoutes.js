import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../pages/Dashboard";

//login
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Lead from "../pages/Operation/Lead";

// User Profile
// import UserProfile from "../pages/Authentication/user-profile";


const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  //Agente
  { path: "/lead", component: <Lead /> },

  //User Profile
  // { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },

];

export { authProtectedRoutes, publicRoutes };