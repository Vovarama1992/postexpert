'use client';
import React from 'react';
import {useTranslationContext} from "@/context";

const AuthAnd = () => {

    const {
        getLabelByCode
    } = useTranslationContext()

    return (
        <div className="relative flex justify-center">
            <span className="bg-white px-2 text-small-3 text-gray-3">{getLabelByCode('ANY_USE')}</span>
        </div>
    );
};

export default AuthAnd;