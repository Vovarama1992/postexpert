'use client'
import {createContext, useContext} from "react";

interface ParcelLoadingContextProps {
    isPending: boolean
}

const ParcelLoadingContext = createContext<ParcelLoadingContextProps | null>(null);

const ParcelLoadingDataProvider = ParcelLoadingContext.Provider

const useParcelLoadingContext = () => {
    const data = useContext(ParcelLoadingContext)

    if (!data) {
        throw new Error(`Невозможно использовать useParcelLoadingContext вне ReportAllProvider`)
    }

    return data;
}

export {ParcelLoadingDataProvider, useParcelLoadingContext}
