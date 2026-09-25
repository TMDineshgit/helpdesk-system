import { createContext, useState, useContext, useMemo } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState({
        id: 'USR-001',
        name: 'Dinesh',
        email: 'admin@supporthub.com',
        role: 'ADMIN',
    });

    const login = (userDate) =>{
        setUser(userDate);
    }

     const logout = () => {
        setUser(null);
    };

    const value = useMemo(() => ({user, login, logout, isAuthenticated: Boolean(user),}), [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;