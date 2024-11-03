'use client'
import {createContext, useContext} from "react";
import {Section, Translation} from "@/types";

interface TranslationContextProps {
    translation: Translation[];
    menus: Section[];
    locales: {[key: string]: any};
    getLabelByCode: (code: string) => string
}

const TranslationContext = createContext<TranslationContextProps | null>(null);

const TranslationDataProvider = TranslationContext.Provider

const useTranslationContext = () => {
    const data = useContext(TranslationContext)

    if (!data) {
        throw new Error(`Невозможно использовать useTranslationContext вне ReportAllProvider`)
    }

    return data;
}

export {TranslationDataProvider, useTranslationContext}
