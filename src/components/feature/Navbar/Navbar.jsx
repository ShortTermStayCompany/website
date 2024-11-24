import React from 'react';
import './Navbar.css';
import SubmitButton from "../loginRegister/SubmitButton/SubmitButton.jsx";
import AccountMenu from "./AccountMenu/AccountMenu.jsx";

const Navbar = () => {

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <span className="navbar-brand">bnb</span>
            </div>

            {/* Navigation Links */}
            <div className="navbar-links">
                <a href="#" className="navbar-link">Stays</a>
                <a href="#" className="navbar-link">Experiences</a>
            </div>
            {/* Right Side */}
            <div className="navbar-right">
                <AccountMenu />
            </div>
        </nav>
    );
};

export default Navbar;
