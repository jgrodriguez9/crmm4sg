import React from 'react';
import { Navigate } from 'react-router-dom';

//Dashboard
import Dashboard from '../pages/Dashboard';

//login
import Login from '../pages/Authentication/Login';
import Logout from '../pages/Authentication/Logout';
import Lead from '../pages/Operation/Lead';
import LeadProfile from '../pages/Operation/Lead/Detail';
import Reservation from '../pages/Operation/Reservation';
import ReservationDetail from '../pages/Operation/Reservation/Detail';

const protectedRoutes = [
	{ path: '/dashboard', component: <Dashboard /> },
	{ path: '/logout', component: <Logout /> },
	{
		path: '/',
		exact: true,
		component: <Navigate to="/dashboard" />,
	},
	{ path: '*', component: <Navigate to="/dashboard" /> },
];

const clientRoute = [
	//Client
	{ path: '/client', component: <Lead /> },
	{ path: '/client/:id', component: <LeadProfile /> },
];

const reservationRoute = [
	//Reservation
	{ path: '/reservation', component: <Reservation /> },
	{ path: '/reservation/:idReservation', component: <ReservationDetail /> },
];

// roles
const agentRoutes = [...protectedRoutes, ...clientRoute, ...reservationRoute];

const publicRoutes = [{ path: '/login', component: <Login /> }];

export { publicRoutes, protectedRoutes, agentRoutes };
