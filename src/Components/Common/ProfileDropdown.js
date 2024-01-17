import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Input,
} from 'reactstrap';
import { getDataAgent } from '../../util/getDataAgent';
import useUser from '../../hooks/useUser';
import { useTranslation } from 'react-i18next';
import { encryptData } from '../../util/crypto';

const ProfileDropdown = () => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.profileDropdown',
	});
	const user = useUser();
	const [extension, setExtension] = useState('');
	const [extensionInput, setExtensionInput] = useState('');
	const [toggleExt, setToggleExt] = useState(false);
	useEffect(() => {
		if (user) {
			setExtension(getDataAgent(user, 'ext'));
			setExtensionInput(getDataAgent(user, 'ext'));
		}
	}, [user]);
	//Dropdown Toggle
	const [isProfileDropdown, setIsProfileDropdown] = useState(false);
	const toggleProfileDropdown = () => {
		setIsProfileDropdown(!isProfileDropdown);
	};
	const updateExtension = () => {
		if (!extensionInput) return;
		//copy del object
		const copyUser = { ...user };
		copyUser.extension = extensionInput;
		setExtension(extensionInput);
		//encrypt data again
		const encryptedData = encryptData(JSON.stringify(copyUser));
		localStorage.setItem('authenticatication-crm', encryptedData);
		setToggleExt(false);
	};
	return (
		<React.Fragment>
			<Dropdown
				isOpen={isProfileDropdown}
				toggle={toggleProfileDropdown}
				className="ms-sm-3 header-item topbar-user"
			>
				<DropdownToggle tag="button" type="button" className="btn">
					<span className="d-flex align-items-center">
						<div className="position-relative d-inline-block">
							<div className="avatar-xs rounded-circle img-thumbnail">
								<div className="avatar-title bg-soft-secondary text-secondary rounded-circle fs-6">
									{user?.nombre.charAt(0)}
								</div>
							</div>
						</div>
						<span className="text-start ms-xl-2">
							<span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
								{user?.usuario}
							</span>
						</span>
					</span>
				</DropdownToggle>
				<DropdownMenu className="dropdown-menu-end">
					<h6 className="dropdown-header">
						{t('welcome')} {user?.nombre}!
					</h6>
					<DropdownItem className="p-0">
						<div className="dropdown-item">
							<i className="mdi mdi-email text-muted fs-16 align-middle me-1"></i>
							<span className="align-middle">{user?.email}</span>
						</div>
					</DropdownItem>
					<DropdownItem className="p-0">
						<div className="dropdown-item">
							<i className="mdi mdi-security text-muted fs-16 align-middle me-1"></i>
							<span className="align-middle">
								{getDataAgent(user, 'department')}
							</span>
						</div>
					</DropdownItem>
					<DropdownItem className="p-0" text>
						{!toggleExt && (
							<div className="dropdown-item">
								<i className="mdi mdi-card-account-phone-outline text-muted fs-16 align-middle me-1"></i>
								<span
									className="align-middle"
									onClick={() => setToggleExt(true)}
								>
									{extension}
								</span>
							</div>
						)}
						{toggleExt && (
							<div className="dropdown-item d-flex align-items-center">
								<i className="mdi mdi-card-account-phone-outline text-muted fs-16 align-middle me-1"></i>
								<div className="input-group">
									<Input
										size={'sm'}
										value={extensionInput}
										onChange={(e) =>
											setExtensionInput(e.target.value)
										}
									/>
									<button
										className="btn btn-success btn-sm"
										type="button"
										onClick={updateExtension}
									>
										<i className="ri-check-line" />
									</button>
									<button
										className="btn btn-danger btn-sm"
										type="button"
										onClick={() => {
											setToggleExt(false);
											setExtensionInput(
												getDataAgent(user, 'ext')
											);
										}}
									>
										<i className="ri-close-line" />
									</button>
								</div>
							</div>
						)}
					</DropdownItem>
					<div className="dropdown-divider"></div>
					<DropdownItem className="p-0">
						<Link to="/logout" className="dropdown-item">
							<i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{' '}
							<span className="align-middle" data-key="t-logout">
								{t('signOut')}
							</span>
						</Link>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</React.Fragment>
	);
};

export default ProfileDropdown;
