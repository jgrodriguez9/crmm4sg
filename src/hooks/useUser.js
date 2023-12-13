import { useEffect, useState } from 'react';
import { decrypData } from '../util/crypto';

const useUser = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (localStorage.getItem('authenticatication-crm')) {
			const decryptedData = decrypData(
				localStorage.getItem('authenticatication-crm')
			);
			const obj = JSON.parse(decryptedData);
			setUser(obj.user);
		}
	}, []);

	return user;
};

export default useUser;
