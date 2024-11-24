import './loginModal.css'
import {useEffect, useState} from "react";
import InputField from "./InputField.jsx";
import SubmitButton from "../SubmitButton/SubmitButton.jsx";
import CloseButton from "../CloseButton/CloseButton.jsx";
import {loginUser} from "../../../../Api/apiService.js";
const LoginModal = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    useEffect(() => {

        if (email.trim().length > 0) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailValid(emailRegex.test(email));
        }
        if (password.trim().length > 0) {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            setPasswordValid(passwordRegex.test(password));
        }
    }, [name, email, password]);
    const handleLogin = () => {

        email.trim().length === 0 ? setEmailValid(false) : null;

        if (email.trim().length > 0 && password.trim().length > 0) {
            if (emailValid && passwordValid) {

            }
        }
        else ()
    }
    return (
        <div className="loginModal">
            <CloseButton></CloseButton>
            <div className="inputField">
                <InputField
                    isValid={email}
                    placeholder={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></InputField>
                <InputField
                    isValid={password}
                    placeholder={"Password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></InputField>
            </div>


                <SubmitButton text={"Login"} onClick={handleLogin} />
        </div>

    )
}

export default LoginModal;