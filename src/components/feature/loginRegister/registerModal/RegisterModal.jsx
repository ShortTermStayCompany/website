import React from 'react';
import './RegisterModal.css'
import {registerUser} from "../../../../Api/apiService.js";
import error from "eslint-plugin-react/lib/util/error.js";

const RegisterModal = () => {

    // when selectedRole changes all of the RegisterModal will be updated
    const [selectedRole, setSelectedRole] = React.useState('Guest');
    // const roles = ['Guest', 'Host', 'Admin'];
    const roles = ['Guest', 'Host'];

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [nameValid, setNameValid] = React.useState('true');
    const [emailValid, setEmailValid] = React.useState(true); // Track email validity
    const [passwordValid, setPasswordValid] = React.useState(true);

    // updates all buttons style
    // if its selectedRole then it will make it green
    // rest will be default color


    const handleRegister = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, includes letters and integers
        setEmailValid(emailRegex.test(email)); // Update email validity state
        setPasswordValid(passwordRegex.test(password)); // Update password validity state
        setNameValid(name.length > 0);
        if (nameValid && emailValid && passwordValid) {
            try {
                const userData = {name: name, email: email, password: password, role: selectedRole.toLowerCase()};
                const result = await registerUser(userData); // Call API
                console.log('User registered successfully:', result);
            }catch (error) {
                console.error('Registration failed:', error);
            }
        }
        else {
            console.log(nameValid);
            console.log(passwordValid);

            console.error('Error during register user:', error);
        }
    };



    return (
        <div className="RegisterModal">
            <input
                className={`${nameValid ? '' : 'fail'}`} // Add 'fail' class dynamically
                type="text"
                placeholder="Name Surname"
                value={name}
                onChange={(e) => {
                    const newName = e.target.value;

                    setName(newName); // Update the state with the current input value

                    // Validate the name here (e.g., with a regex or custom logic)
                    if (newName.trim().length < 3) {
                        setNameValid(false); // Set valid state to false if invalid
                    } else {
                        setNameValid(true); // Set valid state to true if valid
                    }
                }}
            />
            {!nameValid && (
                <span className="error"> Enter Your Name !</span>

            )

            }
            <input className={`${emailValid ? '' : 'fail'}`} // Add 'fail' class dynamically
                   type={'email'}
                   placeholder={`${emailValid ? '' : 'Email'}`}
                   onChange={(e) => {
                       const newName = e.target.value;

                       setName(newName); // Update the state with the current input value

                       // Validate the name here (e.g., with a regex or custom logic)
                       if (newName.trim().length < 3) {
                           setNameValid(false); // Set valid state to false if invalid
                       } else {
                           setNameValid(true); // Set valid state to true if valid
                       }
                   }}
            />
            {!emailValid && (
                <span className="error"> Enter a valid Email Address</span>

            )

            }
            <input className={`${passwordValid ? '' : 'fail'}`} // Add 'fail' class dynamically
                   type={'password'}
                   placeholder={`${passwordValid ? '' : 'Password'}`}
                   onChange={(e) => setPassword(e.target.value)} // Update the password state
            ></input>
            {!passwordValid && (
                <span className="error"> Enter a valid Password !</span>

            )

            }
            <div className='RoleSelector'>
                {roles.map((role) => (
                    // eslint-disable-next-line react/jsx-key
                    <button
                        className={`RoleSelectorButton ${selectedRole === role ? 'selected' : ''}`}
                        onClick={() => setSelectedRole(role)}>{role}</button>
                ))}

            </div>
            <button
                className={'RegisterButton'}
                onClick={handleRegister}>Register
            </button>
        </div>
    )
}

export default RegisterModal;