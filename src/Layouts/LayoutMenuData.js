import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { existsRole } from '../util/existsRole';
import { useProfile } from '../Components/Hooks/UserHooks';
import { ROLE_AGENT } from '../Components/constants/roles';

const Navdata = () => {
	const history = useNavigate();
	const { roles } = useProfile();
	//state data
	const [isSecurity, setIsSecurity] = useState(false);
	const [isOperation, setIsOperation] = useState(false);

	const [iscurrentState, setIscurrentState] = useState('Dashboard');

	function updateIconSidebar(e) {
		if (e && e.target && e.target.getAttribute('subitems')) {
			const ul = document.getElementById('two-column-menu');
			const iconItems = ul.querySelectorAll('.nav-icon.active');
			let activeIconItems = [...iconItems];
			activeIconItems.forEach((item) => {
				item.classList.remove('active');
				var id = item.getAttribute('subitems');
				if (document.getElementById(id))
					document.getElementById(id).classList.remove('show');
			});
		}
	}

	useEffect(() => {
		document.body.classList.remove('twocolumn-panel');
		if (iscurrentState !== 'Security') {
			setIsSecurity(false);
		}
		if (iscurrentState !== 'Operation') {
			setIsOperation(false);
		}
	}, [history, iscurrentState, isSecurity, isOperation]);

	const menuItems = [
		{
			id: 'home',
			label: 'Dashboard',
			icon: 'ri-dashboard-2-line',
			link: '/dashboard',
			show: existsRole(roles, [ROLE_AGENT]),
		},
		// {
		//     id: "security",
		//     label: "Seguridad",
		//     icon: "ri-shield-line",
		//     link: "/#",
		//     click: function (e) {
		//         e.preventDefault();
		//         setIsSecurity(!isSecurity);
		//         setIscurrentState('Security');
		//         updateIconSidebar(e);
		//     },
		//     stateVariables: isSecurity,
		//     subItems: [
		//         {
		//             id: "bitacora",
		//             label: "Bitácora",
		//             link: "/bitacora",
		//             parentId: "security",
		//         }
		//     ],
		// },
		{
			id: 'operation',
			label: 'Operación',
			icon: 'ri-pages-line',
			link: '/#',
			click: function (e) {
				e.preventDefault();
				setIsOperation(!isOperation);
				setIscurrentState('Operation');
				updateIconSidebar(e);
			},
			stateVariables: isOperation,
			show: existsRole(roles, [ROLE_AGENT]),
			subItems: [
				{
					id: 'client',
					label: 'Cliente',
					link: '/client',
					parentId: 'operation',
					show: existsRole(roles, [ROLE_AGENT]),
				},
				{
					id: 'reservation',
					label: 'Reservación',
					link: '/reservation',
					parentId: 'operation',
					show: existsRole(roles, [ROLE_AGENT]),
				},
			],
		},
	];
	return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
