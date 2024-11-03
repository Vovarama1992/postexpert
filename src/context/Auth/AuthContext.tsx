'use client'
import {createContext, useContext} from "react";
import {Session} from "next-auth";

interface AuthContextProps {
    session?: Session | null;
    onSignOut(): Promise<void>;
    onSignIn(session: Session): Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthDataProvider = AuthContext.Provider

const useAuthContext = () => {
    const data = useContext(AuthContext)

    if (!data) {
        throw new Error(`Невозможно использовать useAuthContext вне ReportAllProvider`)
    }

    return data;
}

export {AuthDataProvider, useAuthContext}
