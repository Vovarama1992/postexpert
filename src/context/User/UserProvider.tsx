'use client'
import React, {ReactNode} from 'react';
import {UserDataProvider} from "@/context";
import {useAuthContext} from "@/context";
import {getAvatar, getProfile} from "@/lib";
import {useQuery} from "@tanstack/react-query";

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider = ({children}: UserProviderProps) => {

    const {session} = useAuthContext()

    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        enabled: !!session
    });

    const { data: avatar } = useQuery({
        queryKey: ['avatar'],
        queryFn: getAvatar,
        enabled: !!session
    });

    return (
        <UserDataProvider value={{profile, isLoading, avatar}}>
            {children}
        </UserDataProvider>
    );
};

export default UserProvider;
