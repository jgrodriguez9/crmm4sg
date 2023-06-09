import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import { decrypData } from '../../util/crypto';
import { getDataAgent } from '../../util/getDataAgent';

const ProfileDropdown = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (localStorage.getItem("authenticatication-crm")) {
            const decryptedData = decrypData(localStorage.getItem("authenticatication-crm"))
            console.log(decryptedData)
            const obj = JSON.parse(decryptedData);
            setUser(obj.user)
        }
    }, []);

    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };
    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={avatar1}
                            alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{user?.username}</span>
                        </span>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <h6 className="dropdown-header">Bienvenido {user?.firstName}!</h6>
                    <DropdownItem className='p-0'>
                        <div className="dropdown-item">
                            <i className="mdi mdi-email text-muted fs-16 align-middle me-1"></i>
                            <span className="align-middle">{user?.email}</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem className='p-0'>
                        <div className="dropdown-item">
                            <i className="mdi mdi-google-translate text-muted fs-16 align-middle me-1"></i>
                            <span className="align-middle">{getDataAgent(user, 'lang')}</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem className='p-0'>
                        <div className="dropdown-item">
                            <i className="mdi mdi-security text-muted fs-16 align-middle me-1"></i>
                            <span className="align-middle">{getDataAgent(user, 'role')}</span>
                        </div>
                    </DropdownItem>
                    <div className="dropdown-divider"></div>
                    <DropdownItem className='p-0'>
                        <Link to="/logout" className="dropdown-item">
                            <i
                                className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                                    className="align-middle" data-key="t-logout">Cerrar sesión</span>
                        </Link>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;