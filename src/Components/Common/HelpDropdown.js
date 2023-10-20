import React, { useState } from 'react';
import {
	Col,
	Dropdown,
	DropdownMenu,
	DropdownToggle,
	Input,
	Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';

//import images
import avatar2 from '../../assets/images/users/avatar-2.jpg';
import avatar8 from '../../assets/images/users/avatar-8.jpg';

//SimpleBar
import SimpleBar from 'simplebar-react';
import { EMPTY_LIST } from '../../common/messages';

const listHelp = [
	{ name: 'Tarifas' },
	{ name: 'Fechas Cerradas' },
	{ name: 'Ocupación Máxima' },
	{ name: 'Directorio' },
	{ name: 'Calidicaciones USA' },
	{ name: 'Calidicaciones LATAM' },
	{ name: 'Tours' },
	{ name: 'SPA' },
	{ name: 'SCRIPtS' },
];

const HelpDropdown = () => {
	//Dropdown Toggle
	const [isNotificationDropdown, setIsNotificationDropdown] = useState(false);
	const toggleNotificationDropdown = () => {
		setIsNotificationDropdown(!isNotificationDropdown);
	};
	const [dataListHelp, setDataListHelp] = useState(listHelp);
	const [searchInput, setSearchInput] = useState('');

	const handleChange = (value) => {
		setSearchInput(value);
		if (value) {
			const newValues = listHelp.filter((item) =>
				item.name.toLocaleLowerCase().includes(value)
			);
			setDataListHelp(newValues);
		} else {
			setDataListHelp(listHelp);
		}
	};

	return (
		<React.Fragment>
			<Dropdown
				isOpen={isNotificationDropdown}
				toggle={toggleNotificationDropdown}
				className="topbar-head-dropdown ms-1 header-item"
			>
				<DropdownToggle
					type="button"
					tag="button"
					className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
				>
					<i className="bx bx-help-circle fs-22"></i>
				</DropdownToggle>
				<DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
					<div className="dropdown-head bg-primary bg-pattern rounded-top">
						<div className="p-3">
							<Row className="align-items-center">
								<Col>
									<h6 className="m-0 fs-16 fw-semibold text-white">
										{' '}
										Ayuda{' '}
									</h6>
								</Col>
							</Row>
						</div>

						<div className="pt-2">
							<Input
								className="form-control rounded-0"
								type="text"
								placeholder="Buscar..."
								value={searchInput}
								onChange={(e) => handleChange(e.target.value)}
							/>
						</div>
					</div>

					<div className="py-2 ps-2">
						<SimpleBar
							style={{ maxHeight: '300px' }}
							className="pe-2"
						>
							{dataListHelp.length === 0 && <p>{EMPTY_LIST}</p>}
							{dataListHelp.map((item, idx) => (
								<div
									className="text-reset notification-item d-block dropdown-item position-relative"
									key={`help-${idx}`}
								>
									<div className="d-flex">
										<h5 className="cursor-pointer">
											{item.name}
										</h5>
									</div>
								</div>
							))}
						</SimpleBar>
					</div>
				</DropdownMenu>
			</Dropdown>
		</React.Fragment>
	);
};

export default HelpDropdown;
