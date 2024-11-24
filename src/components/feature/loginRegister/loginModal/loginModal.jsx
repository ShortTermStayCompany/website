import './loginModal.css'
import {useEffect, useState} from "react";
import InputField from "../InputField/InputField.jsx";
import SubmitButton from "../SubmitButton/SubmitButton.jsx";
import CloseButton from "../CloseButton/CloseButton.jsx";
import {loginUser} from "../../../../Api/apiService.js";


const LoginModal = ({onClose}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    useEffect(() => {
        if (email.trim().length > 0) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailValid(emailRegex.test(email));
        }
        if (password.trim().length > 0) {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            setPasswordValid(passwordRegex.test(password));
        }
        if (userLoggedIn) {
            onClose()
        }
    }, [email, password, userLoggedIn]);

    const userLoginProtocol = (responseData) => {
        console.log(responseData.access_token);
    }
    const handleLogin = async () => {

        email.trim().length === 0 ? setEmailValid(false) : null;
        password.trim().length === 0 ? setPasswordValid(false) : null;

        if (emailValid && passwordValid) {
            try {
                const loginData = {
                    email: email,
                    password: password,
                }
                const response = await loginUser(loginData);
                const responseData = await response.json(); // Parse the JSON data

                if (response.ok) {
                    console.log("login success");
                    console.log(response);
                    console.log(response.status);
                    console.log(response.json());
                    const accessToken = responseData.access_token; // Extract the token
                    const user = responseData.user; // Extract user details if needed
                    console.log("Access Token:", accessToken);
                    console.log("User Info:", user);

                    // Store the token in localStorage or AsyncStorage (for React Native)
                    localStorage.setItem('accessToken', accessToken); // For web apps
                    // AsyncStorage.setItem('accessToken', accessToken); // For React Native
                    setUserLoggedIn(true);
                    userLoginProtocol(responseData)

                    // Use the token in your app as needed
                }
                else {
                    console.log("login failed");

                    setUserLoggedIn(false);
                }
            } catch (error) {
                console.log(error);
                setUserLoggedIn(false);

            }

        }

    }
    return (
        <div className="loginModal">
            <CloseButton onClick={onClose}></CloseButton>
            <div className="inputField">
                <InputField
                    isValid={emailValid}
                    placeholder={"Email"}
                    type={email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    errorMessage="Enter a valid Email Address"
                ></InputField>
                <InputField
                    isValid={passwordValid}
                    type={password}
                    placeholder={"Password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    errorMessage="Enter a valid Password (8+ chars, letters & numbers)!"

                ></InputField>
            </div>


                <SubmitButton text={"Login"} onClick={handleLogin} />
        </div>

    )
}

export default LoginModal;