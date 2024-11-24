import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    // User state
    const [user, setUser] = useState(null);

    // Load user from localStorage when the app starts
    useEffect(() => {
        const savedToken = localStorage.getItem("accessToken");
        const savedUser = localStorage.getItem("user");
        if (savedToken && savedUser) {
            setUser({ ...JSON.parse(savedUser), accessToken: savedToken });
        }
    }, []);

    // Login function
    const login = (userData) => {
        setUser(userData); // Update the user state
        localStorage.setItem("accessToken", userData.accessToken); // Persist token
        localStorage.setItem("user", JSON.stringify(userData)); // Persist user details
    };

    // Logout function
    const logout = () => {
        setUser(null); // Clear the user state
        localStorage.removeItem("accessToken"); // Remove token
        localStorage.removeItem("user"); // Remove user details
    };

    // Provide user state and actions
    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook to use the UserContext
export const useUser = () => useContext(UserContext);
