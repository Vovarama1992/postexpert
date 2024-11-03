'use client'
import React from 'react';
import {TransitionProps} from "@/components/ui/Transition/model/transition";
import {Transition} from "@headlessui/react";

const TransitionOpacity = ({children, ...other}: TransitionProps) => {
    return (
        <Transition
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            {...other}
        >
            {children}
        </Transition>
    );
};

export default TransitionOpacity;