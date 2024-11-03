'use client'
import React, {ReactNode} from 'react';
import {TranslationDataProvider} from "@/context";
import {Section, Translation} from "@/types";
import {defaultLocales} from "@/defaultLocales";

interface TranslationProviderProps {
    children: ReactNode;
    menus: Section[];
    translation: Translation[]
}

type Element = {
    id: number;
    code: string;
    label: string;
};

type Locales = {
    [key: string]: any;
};

function updateLocales(locales: Locales, elements: Element[]): Locales {
    const updatedLocales = {...locales};

    const elementsMap = new Map(elements.map(element => [element.code, element.label]));

    const updateValues = (obj: any): any => {
        if (Array.isArray(obj)) {
            return obj.map(item => updateValues(item));
        } else if (typeof obj === 'object' && obj !== null) {
            return Object.fromEntries(
                Object.entries(obj).map(([key, value]) => {
                    if (elementsMap.has(key)) {
                        return [key, elementsMap.get(key)];
                    } else {
                        return [key, updateValues(value)];
                    }
                })
            );
        } else {
            return obj;
        }
    };

    return updateValues(updatedLocales);
}


const TranslationProvider = ({children, translation, menus}: TranslationProviderProps) => {

    const getLabelByCode = (code: string): string => {
        const element = translation.find(el => el.code === code);
        return element ? element.label : '';
    }

    return (
        <TranslationDataProvider value={{
            menus, translation, getLabelByCode, locales: updateLocales(defaultLocales(getLabelByCode), translation)
        }}>
            {children}
        </TranslationDataProvider>
    );
};

export default TranslationProvider;
