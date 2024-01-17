import { useEffect, useState } from 'react';
import { getLoggedinUser } from '../../helpers/api_helper';

const useProfile = () => {
	const userProfileSession = getLoggedinUser();

	//var token = userProfileSession && userProfileSession['token'];
	var token = userProfileSession;
	const [loading, setLoading] = useState(userProfileSession ? false : true);
	const [roles, setRoles] = useState([]);
	const [userProfile, setUserProfile] = useState(
		userProfileSession ? userProfileSession : null
	);
	//console.log(roles);
	useEffect(() => {
		const userProfileSession = getLoggedinUser();
		var token = userProfileSession;
		setUserProfile(userProfileSession ? userProfileSession : null);
		setLoading(token ? false : true);
		if (userProfileSession) {
			//console.log(userProfile);
			setRoles([userProfileSession.puesto]);
		}
	}, []);

	return { userProfile, loading, token, roles };
};

export { useProfile };
