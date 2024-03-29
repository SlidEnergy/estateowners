import React, {useState} from 'react';
import {Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom';
import './NavMenu.css';
import AuthService from "../../core/auth/AuthService";
import {useAuth} from "../../hooks/useAuth";

const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(true);
    const {isAuth, setAuth} = useAuth();
    const navigate = useNavigate();

    function toggleNavbar() {
        setCollapsed(!collapsed);
    }

    function logOut() {
        AuthService.logout();
        setAuth(undefined);
        navigate('/admin/login');
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container
                    light>
                <NavbarBrand tag={Link} to="/">Estate Owners</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2"/>
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="text-dark" href="#" onClick={logOut}>Выйти</NavLink>
                        </NavItem>
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
}

export default NavMenu;