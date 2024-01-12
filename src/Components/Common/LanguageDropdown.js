import React, { useEffect, useState } from 'react';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from 'reactstrap';
import { get } from 'lodash';

//i18n
import i18n from '../../i18n';
import languages from '../../common/languages';

const LanguageDropdown = () => {
	// Declare a new state variable, which we'll call "menu"
	console.log(i18n);

	const changeLanguageAction = (lang) => {
		//set language as i18n
		i18n.changeLanguage(lang);
		localStorage.setItem('I18N_LANGUAGE', lang);
	};

	const [isLanguageDropdown, setIsLanguageDropdown] = useState(false);
	const toggleLanguageDropdown = () => {
		setIsLanguageDropdown(!isLanguageDropdown);
	};
	return (
		<React.Fragment>
			<Dropdown
				isOpen={isLanguageDropdown}
				toggle={toggleLanguageDropdown}
				className="ms-1 topbar-head-dropdown header-item"
			>
				<DropdownToggle
					className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
					tag="button"
				>
					<img
						src={get(languages, `${i18n.language}.flag`)}
						alt="Header Language"
						height="20"
						className="rounded"
					/>
				</DropdownToggle>
				<DropdownMenu className="notify-item language py-2">
					{Object.keys(languages).map((key) => (
						<DropdownItem
							key={key}
							onClick={() => changeLanguageAction(key)}
							className={`notify-item ${
								i18n.language === key ? 'active' : 'none'
							}`}
						>
							<img
								src={get(languages, `${key}.flag`)}
								alt="CRM"
								className="me-2 rounded"
								height="18"
							/>
							<span className="align-middle">
								{get(languages, `${key}.label`)}
							</span>
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
		</React.Fragment>
	);
};

export default LanguageDropdown;
