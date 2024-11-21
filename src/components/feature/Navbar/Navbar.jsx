import React from 'react';
import './Navbar.css';
import SubmitButton from "../loginRegister/SubmitButton/SubmitButton.jsx";
import RegisterButton from "../loginRegister/RegisterButton.jsx";


const Navbar = () => {

    const [isSelectorOpen, setIsSelectorOpen] = React.useState(false);

    function openSelector() {
        setIsSelectorOpen(!isSelectorOpen);
    }

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
            <RegisterButton></RegisterButton>
            {/* Right Side */}
            <div className="navbar-right">
                <div className="navbar-icon-group">
                    <button className="navbar-menu-button" onClick={openSelector}>
                        <span className="menu-icon">≡</span>
                        <span className="profile-icon">👤</span>
                    </button>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
