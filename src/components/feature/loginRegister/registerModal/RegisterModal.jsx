import React, { useEffect } from 'react';
import './RegisterModal.css';
import { registerUser } from '../../../../Api/apiService.js';

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
            <input
                className={`${nameValid ? '' : 'fail'}`}
                type="text"
                placeholder="Name Surname"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {!nameValid && <span className="error">Enter Your Name!</span>}

            <input
                className={`${emailValid ? '' : 'fail'}`}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {!emailValid && <span className="error">Enter a valid Email Address</span>}

            <input
                className={`${passwordValid ? '' : 'fail'}`}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {!passwordValid && (
                <span className="error">Enter a valid Password (8+ chars, letters & numbers)!</span>
            )}

            <div className="RoleSelector">
                {roles.map((role) => (
                    <button
                        key={role}
                        className={`RoleSelectorButton ${selectedRole === role ? 'selected' : ''}`}
                        onClick={() => setSelectedRole(role)}
                    >
                        {role}
                    </button>
                ))}
            </div>
            <button className="RegisterButton" onClick={handleRegister}>
                Register
            </button>
        </div>
    );
};

export default RegisterModal;
