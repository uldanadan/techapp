import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import './NavBar.scss';
import Button from '../UI/Button/Button';
import {AuthContext} from '../../providers/AuthProvider';

function NavBar() {
    const { isManager } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        window.location.reload();
    };

    return (
        <div className="navbar">
            <div className="container navbar__container">
                <h2 className="navbar__logo">Tech Project</h2>
                <div className="navbar__links">
                    <NavLink
                        to={`/${isManager ? 'dashboard' : 'application'}`}
                        className="navbar__link"
                    >
                        {isManager ? 'Dashboard' : 'Applications'}
                    </NavLink>
                    <NavLink to="/crud" className="navbar__link">
                        Crud
                    </NavLink>
                </div>
                <div className="navbar__links">
                    <Button className="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
