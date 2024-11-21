// eslint-disable-next-line no-unused-vars
import React from 'react';
import './InputField.css';

const RoleSelector = ({ roles, selectedRole,setSelectedRole }) => (
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
);

export default RoleSelector;
