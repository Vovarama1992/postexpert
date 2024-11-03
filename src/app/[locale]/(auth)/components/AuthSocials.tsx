'use client'
import React from 'react';
import {Facebook2Icon, VkIcon} from "@/assets";
import {signIn} from "next-auth/react";
import {useTranslationContext} from "@/context";

const AuthSocials = () => {

    const {
        getLabelByCode
    } = useTranslationContext()

    const onLoginVk = () => {
        signIn("vk", {
            redirect: false
        }).then(res => {
            console.log(res)
        })
    }

    return (
        <>
            <div className="relative mt-4 w-full">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-[#D4D4D8]"/>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-small-3 text-gray-3">{getLabelByCode('SOCIALS')}</span>
                </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
                <button type="button" className="bg-gray-700 size-10 rounded-full flex items-center justify-center">
                    <Facebook2Icon className="text-white"/>
                </button>
                <button type="button" onClick={onLoginVk} className="bg-gray-700 size-10 rounded-full flex items-center justify-center">
                    <VkIcon className="text-white"/>
                </button>
            </div>
        </>
    );
};

export default AuthSocials;