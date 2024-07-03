'use client'

import React, { ReactNode, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, User, signOut } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import firebase_app from '../firebase/firebaseAppConfig';

interface AuthContextProviderProps {
    children: ReactNode;
}

const auth = getAuth(firebase_app);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [userAuth, setUserAuth] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUserCredentials: User | null) => {
            setUserAuth(authUserCredentials);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    async function logout() {
        let result = null,
            error = null;
        try {
            result = await signOut(auth);
        } catch (e) {
            error = e;
        }

        return { result, error };
    }

    return (
        <AuthContext.Provider value={{ userAuth, logout }}>
            {loading
                ?
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="text-center">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                        <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
                    </div>
                </div>
                :
                children
            }
        </AuthContext.Provider>
    );
};