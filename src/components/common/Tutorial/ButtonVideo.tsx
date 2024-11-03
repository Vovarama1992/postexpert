'use client';
import React from 'react';
import {PlayFillIcon} from "@/assets";
import {useToggleState} from "@/hooks";
import {classNames} from "@/utils";
import dynamic from 'next/dynamic';

const HowItWork = dynamic(() => import('./HowItWork'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

const ButtonVideo = ({source, variant = 'white'}: { source: string, variant?: 'black' | 'white' }) => {

    const { state: show, toggle: toggleShow, close: closeShow } = useToggleState(false);

    return (
        <>
            <button onClick={toggleShow}
                className={
                classNames(
                    "flex items-center gap-4 py-2  transform transition-transform duration-300 hover:scale-105 ",
                )
                }>
                <PlayFillIcon className={`${variant === 'black' ? 'text-black' : 'text-white'} max-lg:h-14 max-lg:w-14`}/>
                <p className={`text-chip ${variant === 'black' ? 'text-gray-900 font-medium' : 'text-white'} select-none`}>
                    Watch our video
                </p>
            </button>
            <HowItWork source={source} show={show} close={closeShow} />
        </>
    );
};

export default ButtonVideo;