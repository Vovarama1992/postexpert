'use client'
import {createContext, useContext} from "react";
import {Profile} from "@/types";

interface UserContextProps {
    profile?: Profile;
    avatar?: string;
    isLoading: boolean;
}

const UserContext = createContext<UserContextProps | null>(null);

const UserDataProvider = UserContext.Provider

const useUserContext = () => {
    const data = useContext(UserContext)

    if (!data) {
        throw new Error(`Невозможно использовать useUserContext вне ReportAllProvider`)
    }

    return data;
}

export {UserDataProvider, useUserContext}
