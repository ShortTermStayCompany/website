// eslint-disable-next-line no-unused-vars
import React from 'react';
import './RoleSelector.css';

const RoleSelector = ({ rolesArray, selectedRoleFromArray,setselectedRoleFromArray }) => (
    <div className="RoleSelector">
        {rolesArray.map((role) => (
            <button
                key={role}
                className={`RoleSelectorButton ${selectedRoleFromArray === role ? 'selected' : ''}`}
                onClick={() => setselectedRoleFromArray(role)}
            >
                {role}
            </button>
        ))}
    </div>
);

export default RoleSelector;
