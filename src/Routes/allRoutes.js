import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
// import DashboardCrm from "../pages/DashboardCrm";

//login
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";

// User Profile
// import UserProfile from "../pages/Authentication/user-profile";


const authProtectedRoutes = [
  // { path: "/dashboard", component: <DashboardCrm /> },

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