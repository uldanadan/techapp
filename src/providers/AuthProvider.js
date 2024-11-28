import {createContext} from 'react';

export const AuthContext = createContext({
    isAuth: false,
    user: undefined,
    isManager: false
});

export const AuthProvider = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return (
        <AuthContext.Provider
            value={{
                isAuth: !!currentUser,
                user: currentUser,
                isManager: currentUser?.email === 'manager_123@gmail.com'
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};
