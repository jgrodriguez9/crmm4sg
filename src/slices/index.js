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


const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Login: LoginReducer,
    Profile: ProfileReducer,
    Crm: CrmReducer,
    DashboardCRM: DashboardCRMReducer,
});

export default rootReducer;