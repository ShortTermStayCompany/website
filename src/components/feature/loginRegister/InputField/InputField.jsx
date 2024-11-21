// eslint-disable-next-line no-unused-vars
import React from 'react';
import './InputField.css';

// eslint-disable-next-line react/prop-types
const InputField = ({ type, placeholder, value, onChange, isValid, errorMessage }) => (
    <div className="inputField">
        <input
            className={`${isValid ? '' : 'fail'}`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
            {!isValid &&
                <div className="errorContainer">
                    <span className="error">{errorMessage}</span>
                </div>
            }
                </div>
);

export default InputField;
