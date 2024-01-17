import React, { useEffect, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

//Layouts
import NonAuthLayout from '../Layouts/NonAuthLayout';
import VerticalLayout from '../Layouts/index';

//routes
import {
	agentRoutes,
	managerRoutes,
	protectedRoutes,
	publicRoutes,
	supervisorRoutes,
} from './allRoutes';
import { AuthProtected } from './AuthProtected';
import ErrorBoundary from '../Components/Common/ErrorBoundary';
import ErrorPage from '../pages/Utils/ErrorPage';
import { useProfile } from '../Components/Hooks/UserHooks';
import {
	ROLE_AGENT,
	ROLE_MANAGER,
	ROLE_SUPERVISOR,
} from '../Components/constants/roles';

const Index = () => {
	const [authRoutes, setAuthRoutes] = useState(protectedRoutes);
	const { userProfile } = useProfile();

	useMemo(() => {
		const roles = userProfile?.puesto ? [userProfile?.puesto] : [];
		if (roles.includes(ROLE_AGENT)) {
			setAuthRoutes([...agentRoutes]);
		} else if (roles.includes(ROLE_SUPERVISOR)) {
			setAuthRoutes([...supervisorRoutes]);
		} else if (roles.includes(ROLE_MANAGER)) {
			setAuthRoutes([...managerRoutes]);
		}
	}, [userProfile]);

	return (
		<React.Fragment>
			<Routes>
				<Route>
					{publicRoutes.map((route, idx) => (
						<Route
							path={route.path}
							element={
								<NonAuthLayout>{route.component}</NonAuthLayout>
							}
							key={idx}
							exact={true}
						/>
					))}
				</Route>

				<Route>
					{authRoutes.map((route, idx) => (
						<Route
							path={route.path}
							element={
								<AuthProtected>
									<VerticalLayout>
										<ErrorBoundary fallback={<ErrorPage />}>
											{route.component}
										</ErrorBoundary>
									</VerticalLayout>
								</AuthProtected>
							}
							key={idx}
							exact={true}
						/>
					))}
				</Route>
			</Routes>
		</React.Fragment>
	);
};

export default Index;
