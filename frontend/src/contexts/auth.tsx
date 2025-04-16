import React, { createContext, useState, useContext } from 'react';

type User = {
    id: string;
    name: string;
    role: 'owner' | 'tenant';
};

type AuthContextType = {
    user: User;  // Always defined, no null
};

// Default user with owner role
const defaultUser: User = { 
    id: '1', 
    name: 'Default User', 
    role: 'owner' 
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    // Always use the default user
    const [user] = useState<User>(defaultUser);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}