'use client'
import {createContext, useContext} from "react";
import {ParcelStep} from "@/types";

interface ParcelTourContextProps {
    run: boolean
    onStart: () => void;
    tourSteps: ParcelStep[]
}

const ParcelTourContext = createContext<ParcelTourContextProps | null>(null);

const ParcelTourDataProvider = ParcelTourContext.Provider

const useParcelTourContext = () => {
    const data = useContext(ParcelTourContext)

    if (!data) {
        throw new Error(`Невозможно использовать useParcelTourContext вне ReportAllProvider`)
    }

    return data;
}

export {ParcelTourDataProvider, useParcelTourContext}
