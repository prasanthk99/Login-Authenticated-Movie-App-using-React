import './App.css'
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

const NavBar = () => {
    const history = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        history('Login')
    }

    return (
        <React.Fragment>
            <ul className="Navbar">
                <Link to="/">Home</Link>
                <Link to="/Login" onClick={logout}>Logout</Link>
            </ul>
        </React.Fragment>
    )
}

export default NavBar;