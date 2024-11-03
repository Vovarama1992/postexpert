'use client'
import React, {ReactNode, useState} from 'react';
import {Session} from "next-auth";
import {signOut} from "next-auth/react";
import {usePathname, useRouter} from "@/navigation";
import {logout} from "@/lib";
import {AuthDataProvider} from "@/context";

interface AuthProviderProps {
    children: ReactNode;
    session?: Session | null
}

const AuthProvider = ({children, session}: AuthProviderProps) => {

    const pathname = usePathname()

    const {push} = useRouter()

    const [sessionState, setSessionState] = useState<Session | null | undefined>(session)

    const onSignOut = async () => {

        await logout()

        await signOut({redirect: false})

        if (pathname.includes('/dashboard')) {
            push('/')
        }

        setSessionState(null)
    }

    const onSignIn = async (session: Session) => {

        push('/dashboard')

        setSessionState(session)
    }

    return (
        <AuthDataProvider value={{session: sessionState, onSignOut, onSignIn}}>
            {children}
        </AuthDataProvider>
    );
};

export default AuthProvider;
