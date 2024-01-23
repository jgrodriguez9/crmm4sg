import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { existsRole } from '../util/existsRole';
import { useProfile } from '../Components/Hooks/UserHooks';
import {
	ROLE_AGENT,
	ROLE_MANAGER,
	ROLE_SUPERVISOR,
} from '../Components/constants/roles';

const Navdata = () => {
	const history = useNavigate();
	const { roles } = useProfile();
	//state data
	const [isSecurity, setIsSecurity] = useState(false);
	const [isOperation, setIsOperation] = useState(false);
	const [isConfiguration, setIsConfiguration] = useState(false);
	const [isCatalogue, setIsCatalogue] = useState(false);

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
			label: 'menu.dashboard',
			icon: 'ri-dashboard-2-line',
			link: '/dashboard',
			show: existsRole(roles, [
				ROLE_AGENT,
				ROLE_MANAGER,
				ROLE_SUPERVISOR,
			]),
		},
		{
			id: 'configuration',
			label: 'menu.configuration.title',
			icon: 'ri-settings-5-line',
			link: '/#',
			click: function (e) {
				e.preventDefault();
				setIsConfiguration(!isOperation);
				setIscurrentState('Configuration');
				updateIconSidebar(e);
			},
			stateVariables: isConfiguration,
			show: existsRole(roles, [ROLE_MANAGER, ROLE_SUPERVISOR]),
			subItems: [
				{
					id: 'article',
					label: 'menu.configuration.articleOfHelp',
					link: '/article',
					parentId: 'configuration',
					show: existsRole(roles, [ROLE_MANAGER, ROLE_SUPERVISOR]),
				},
				{
					id: 'catalogue',
					label: 'menu.configuration.catalogue',
					link: '/#',
					isChildItem: true,
					click: function (e) {
						e.preventDefault();
						setIsCatalogue(!isCatalogue);
					},
					parentId: 'configuration',
					show: existsRole(roles, [ROLE_MANAGER, ROLE_SUPERVISOR]),
					stateVariables: isCatalogue,
					childItems: [
						{
							id: 1,
							label: 'menu.configuration.categoryOfArticle',
							link: '/articleCategory',
							show: existsRole(roles, [
								ROLE_MANAGER,
								ROLE_SUPERVISOR,
							]),
						},
					],
				},
				{
					id: 'templateSms',
					label: 'menu.configuration.templateSms',
					link: '/templateSms',
					parentId: 'configuration',
					show: existsRole(roles, [ROLE_MANAGER, ROLE_SUPERVISOR]),
				},
			],
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
			label: 'menu.operation.title',
			icon: 'ri-pages-line',
			link: '/#',
			click: function (e) {
				e.preventDefault();
				setIsOperation(!isOperation);
				setIscurrentState('Operation');
				updateIconSidebar(e);
			},
			stateVariables: isOperation,
			show: existsRole(roles, [
				ROLE_AGENT,
				ROLE_MANAGER,
				ROLE_SUPERVISOR,
			]),
			subItems: [
				{
					id: 'client',
					label: 'menu.operation.client',
					link: '/client',
					parentId: 'operation',
					show: existsRole(roles, [
						ROLE_AGENT,
						ROLE_MANAGER,
						ROLE_SUPERVISOR,
					]),
				},
				{
					id: 'reservation',
					label: 'menu.operation.reservation',
					link: '/reservation',
					parentId: 'operation',
					show: existsRole(roles, [
						ROLE_AGENT,
						ROLE_MANAGER,
						ROLE_SUPERVISOR,
					]),
				},
			],
		},
	];
	return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
