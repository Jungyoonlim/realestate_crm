import React, { createContext, useState, useContext, useEffect } from 'react';

type User = {
    id: string;
    name: string;
    role: 'owner' | 'tenant';
};

type AuthContextType = {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void; 
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (username: string, password: string) => {
        // mock login for now
        if (username === 'owner' && password === 'password'){
            setUser({ id: '1', name: 'Owner'})
        }
    }
}