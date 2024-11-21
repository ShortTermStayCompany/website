// eslint-disable-next-line no-unused-vars
import React from 'react';
import './InputField.css';

// eslint-disable-next-line react/prop-types
const InputField = ({ type, placeholder, value, onChange, isValid, errorMessage }) => (
    <div className="InputField">
        <input
            className={`${isValid ? '' : 'fail'}`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
        {!isValid && <span className="error">{errorMessage}</span>}
    </div>
);

export default InputField;
