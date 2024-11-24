import RegisterModal from "./registerModal/RegisterModal.jsx";
import {useState} from "react";
import './RegisterButton.css'

const RegisterButton = (onClick) => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };
    return (
        <div>
            <button className="register-button" onClick={openRegisterModal}>Register</button>
            {isRegisterModalOpen && (
                <>
                    <div className="Overlay" onClick={closeRegisterModal}></div>
                    <RegisterModal onClose={closeRegisterModal}/>

                </>
            )
            }
        </div>
    )
}

export default RegisterButton;