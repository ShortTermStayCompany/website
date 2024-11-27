import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    // User state
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('guest'); // Default role is 'guest'

    // Load user from localStorage when the app starts
    useEffect(() => {
        const savedToken = localStorage.getItem("accessToken");
        const savedUser = localStorage.getItem("user");
        if (savedToken && savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser({ ...parsedUser, accessToken: savedToken });
            setRole(parsedUser.role || 'guest'); // Set role from saved user or default to 'guest'
        }
    }, []);

    // Login function
    const login = (userData) => {
        setUser(userData); // Update the user state
        setRole(userData.role || 'guest'); // Update role, defaulting to 'guest' if undefined
        localStorage.setItem("accessToken", userData.accessToken); // Persist token
        localStorage.setItem("user", JSON.stringify(userData)); // Persist user details
    };

    // Logout function
    const logout = () => {
        setUser(null); // Clear the user state
        setRole('guest'); // Reset role to 'guest'
        localStorage.removeItem("accessToken"); // Remove token
        localStorage.removeItem("user"); // Remove user details
    };

    // Provide user state, role, and actions
    return (
        <UserContext.Provider value={{ user, role, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook to use the UserContext
export const useUser = () => useContext(UserContext);
