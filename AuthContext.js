import { createContext, useEffect, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState(''); // Add username state

    // Use useEffect to check if the user is logged in based on localStorage
    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const savedUsername = localStorage.getItem('username'); // Retrieve username
        setLoggedIn(isUserLoggedIn);
        setUsername(savedUsername || ''); // Set the username state
    }, []);

    const login = (username) => {
        localStorage.setItem('isLoggedIn', 'true'); // Set login state in localStorage
        localStorage.setItem('username', username); // Save username in localStorage
        setLoggedIn(true);
        setUsername(username); // Set the username state
    };

    const logout = () => {
        localStorage.removeItem('isLoggedIn'); // Remove login state from localStorage
        localStorage.removeItem('username'); // Remove username from localStorage
        setLoggedIn(false);
        setUsername(''); // Clear the username state
    };

    return (
        <AuthContext.Provider value={{ loggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
