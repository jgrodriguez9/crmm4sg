import {
	ROLE_AGENT,
	ROLE_MANAGER,
	ROLE_SUPERVISOR,
} from '../Components/constants/roles';
import useUser from './useUser';

const useRole = () => {
	const user = useUser();
	return {
		isAgent: user?.puesto === ROLE_AGENT,
		isSupervisor: user?.puesto === ROLE_SUPERVISOR,
		isManager: user?.puesto === ROLE_MANAGER,
	};
};

export default useRole;
