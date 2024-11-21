import React, { useEffect } from 'react';
import './RegisterModal.css';
import { registerUser } from '../../../../Api/apiService.js';
import RoleSelector from "../RoleSelector/RoleSelector.jsx";
import InputField from "../InputField/InputField.jsx";
const RegisterModal = () => {
    const [selectedRole, setSelectedRole] = React.useState('Guest');
    const roles = ['Guest', 'Host'];

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [nameValid, setNameValid] = React.useState(true);
    const [emailValid, setEmailValid] = React.useState(true);
    const [passwordValid, setPasswordValid] = React.useState(true);

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
                const result = await registerUser(userData);
                console.log('User registered successfully:', result);
            } catch (error) {
                console.error('Registration failed:', error);
            }
        } else {

            console.error('Validation errors exist');
        }
    };

    return (
        <div className="RegisterModal">
            <div>

            </div>
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

            <button className="RegisterButton" onClick={handleRegister}>
                Register
            </button>
        </div>
    );
};

export default RegisterModal;
