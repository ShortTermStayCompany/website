import React, { useState, useEffect, useRef } from 'react';
import RegisterButton from "../../loginRegister/RegisterButton.jsx";
import './AccountMenu.css';

const AccountMenu = () => {
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const dropdownRef = useRef();

    const toggleSelector = () => {
        setIsSelectorOpen(!isSelectorOpen);
    };


    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsSelectorOpen(false); // Close the dropdown when clicking outside
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    function handleHideLogic() {

    }

    return (
        <div className="account-menu" ref={dropdownRef}>
            <div className="AccountMenuIconGroup">
                <button
                    className="AccountMenuMenuButton"
                    onClick={toggleSelector}
                >
                    <span className="AccountMenuMenuIcon">≡</span>
                    <span className="AccountMenuProfileIcon">👤</span>
                </button>

                {isSelectorOpen && (
                    <div className="dropdown-modal">
                        <button className="dropdown-button">Login</button>
                        <div onClick={handleHideLogic}>
                            <RegisterButton onClick={() => setIsSelectorOpen(!isSelectorOpen)}
                                            // textValue={'Register'}
                            />
                        </div>

                    </div>
                )}
            </div>


        </div>
    );
};

export default AccountMenu;
