import React, { useEffect } from 'react';
import './RegisterModal.css';
import { registerUser } from '../../../../Api/apiService.js';
import RoleSelector from "../RoleSelector/RoleSelector.jsx";
import InputField from "../InputField/InputField.jsx";
import SubmitButton from "../SubmitButton/SubmitButton.jsx";
import CloseButton from "../CloseButton/CloseButton.jsx";

const RegisterModal = ({onClose}) => {

    const [selectedRole, setSelectedRole] = React.useState('Guest');
    const roles = ['Guest', 'Host'];

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [nameValid, setNameValid] = React.useState(true);
    const [emailValid, setEmailValid] = React.useState(true);
    const [passwordValid, setPasswordValid] = React.useState(true);
    const [userRegistered, setUserRegistered] = React.useState(false);
    const [showRegisterInfo, setShowRegisterInfo] = React.useState(false);
    // Validate input fields whenever their values change
    useEffect(() => {
        if (name.trim().length > 0) {
            setNameValid(name.trim().length >= 3);
        }
        if (email.trim().length > 0) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailValid(emailRegex.test(email));
        }
        if (password.trim().length > 0) {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            setPasswordValid(passwordRegex.test(password));
        }
        setShowRegisterInfo(false);
    }, [name, email, password]);

    const handleRegister = async () => {
        if (name.trim().length === 0) {
            setNameValid(false);
        }
        if (email.trim().length === 0) {
            setEmailValid(false);
        }
        if (password.trim().length === 0) {
            setPasswordValid(false);
        }

        if (nameValid && emailValid && passwordValid) {
            try {
                const userData = {
                    name: name,
                    email: email,
                    password: password,
                    role: selectedRole.toLowerCase(),
                };
                const response = await registerUser(userData);

                if ("User registered successfully" === response.message) { // SINCE I CANT CHECK THE .OK or .status == 201
                    setUserRegistered(true);
                    setShowRegisterInfo(true);
                } else {
                    console.log('user already exists!');

                    setUserRegistered(false);
                    setShowRegisterInfo(true);

                    console.error('Registration failed with status:', response.status);
                }            } catch (error) {
                setUserRegistered(false);
                setShowRegisterInfo(true);
                console.log(error);
                console.error('Registration failed:', error);
            }
        } else {
            setUserRegistered(false);
            setShowRegisterInfo(true);

            console.error('Validation errors exist');
        }
    };

    return (

        <div className="RegisterModal">
            <CloseButton onClick={onClose}></CloseButton>
            <InputField
                type="text"
                placeholder="Name Surname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isValid={nameValid}
                errorMessage="Enter Your Name!"
            />

            <InputField
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isValid={emailValid}
                errorMessage="Enter a valid Email Address"
            />
            <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isValid={passwordValid}
                errorMessage="Enter a valid Password (8+ chars, letters & numbers)!"
            />

            <RoleSelector
                rolesArray={roles}
                selectedRoleFromArray={selectedRole}
                setselectedRoleFromArray={setSelectedRole}
            />

            {showRegisterInfo &&
                <span className={userRegistered ? "registerFeedback" : "registerFeedbackFail"}>
                {userRegistered ? 'User Registered' : 'Registeration Failed'}
            </span>
            }
            <SubmitButton
                onClick={handleRegister}
                text="Register">
            </SubmitButton>

        </div>
    );
};

export default RegisterModal;
