import { useEffect, useMemo, useState } from 'react';
import { decrypData } from '../util/crypto';

const useUser = () => {
	//const [user, setUser] = useState(null);

	const encode = localStorage.getItem('authenticatication-crm');
	const user = useMemo(() => {
		if (encode) {
			const decryptedData = decrypData(
				localStorage.getItem('authenticatication-crm')
			);
			const obj = JSON.parse(decryptedData);
			return obj;
			//setUser(obj);
		}
	}, [encode]);

	// useEffect(() => {
	// 	if (localStorage.getItem('authenticatication-crm')) {
	// 		const decryptedData = decrypData(
	// 			localStorage.getItem('authenticatication-crm')
	// 		);
	// 		const obj = JSON.parse(decryptedData);
	// 		setUser(obj);
	// 	}
	// }, []);

	return user;
};

export default useUser;
