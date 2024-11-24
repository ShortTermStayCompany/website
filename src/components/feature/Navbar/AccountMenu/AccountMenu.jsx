import { useState, useEffect, useRef } from 'react';
import RegisterButton from "../../loginRegister/RegisterButton.jsx";
import './AccountMenu.css';
import RegisterModal from "../../loginRegister/registerModal/RegisterModal.jsx";
import LoginModal from "../../loginRegister/loginModal/loginModal.jsx";

const AccountMenu = () => {
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [closeButtonClicked, setCloseButtonClicked] = useState(false);
    const dropdownRef = useRef();

    const handleLoginModalOpen = () => {
        setIsLoginModalOpen(!isLoginModalOpen); // Open the login modal
        isRegisterModalOpen ? setIsRegisterModalOpen(false) : null;
    };

    const handleRegisterModalOpen = () => {
        setIsRegisterModalOpen(!isRegisterModalOpen); // Open the register modal
        isLoginModalOpen? setIsLoginModalOpen(false) : null;
    };

    const toggleSelector = () => {
        setIsSelectorOpen(!isSelectorOpen);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsSelectorOpen(false); // Close the dropdown when clicking outside
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(false);

        }
    };

    useEffect(() => {
        if (closeButtonClicked) {
            setIsSelectorOpen(false); // Close the dropdown when clicking outside
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(false);
            console.log('asdasdasd')
            setCloseButtonClicked(false)
        }
        console.log('bbbbb')

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeButtonClicked]); // ok so this is the part where you input the variables that execute this useEffect when they change

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
                        <div onClick={handleLoginModalOpen}>
                            <RegisterButton modalType={'LoginModal'} />

                        </div>

                        <div onClick={handleRegisterModalOpen}>
                            <RegisterButton modalType={'RegisterModal'} />

                        </div>
                        {isLoginModalOpen && (
                            <LoginModal
                                // onClose={setCloseButtonClicked(true)} When this line executes, setCloseButtonClicked(true) is called immediately, not when the modal closes
                                onClose={() => setCloseButtonClicked(true)}

                            ></LoginModal>
                        )}
                        {isRegisterModalOpen && (
                            <RegisterModal
                                // onClose={setCloseButtonClicked(true)}
                                onClose={() => setCloseButtonClicked(true)}

                            > </RegisterModal>

                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountMenu;
