import { combineReducers } from "redux";


// Authentication
import LoginReducer from "./auth/login/reducer";
import ProfileReducer from "./auth/profile/reducer";

// Front
import LayoutReducer from "./layouts/reducer";

//Crm
import CrmReducer from "./crm/reducer";

// Dashboard CRM
import DashboardCRMReducer from "./dashboardCRM/reducer";

//Messages 
import MessageReducer from "./messages/reducer";
import { configureStore } from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Login: LoginReducer,
    Profile: ProfileReducer,
    Crm: CrmReducer,
    DashboardCRM: DashboardCRMReducer,
    Messages: MessageReducer
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
})