'use client';

import { useEffect, useState } from "react";
import { CheckIcon } from "@nextui-org/shared-icons";
import { CookieIcon } from "@/assets";

const CookieConsentModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent-postexpert");
        if (!consent) {
            setIsOpen(true);
            setTimeout(() => setIsVisible(true), 10); // Небольшая задержка для активации анимации
        }
    }, []);

    const acceptCookies = () => {
        setIsVisible(false);
        setTimeout(() => {
            localStorage.setItem("cookie-consent-postexpert", "true");
            setIsOpen(false);
        }, 300); // Время, соответствующее продолжительности анимации
    };

    return (
        isOpen && (
            <div
                className={`
                    fixed bottom-4 right-4 z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-gray-200 flex items-start space-x-4
                    transition-opacity duration-300 ease-in-out transform
                    ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                    sm:bottom-6 sm:right-6 sm:max-w-lg
                    md:bottom-8 md:right-8
                    max-sm:left-1
                    lg:bottom-10 lg:right-10 lg:max-w-md
                `}
            >
                <div className="flex-shrink-0">
                    <CookieIcon className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                    <div className="text-lg font-semibold text-gray-800">Privacy Policy</div>
                    <div className="mt-2 text-site-text-2 text-gray-700">
                        By continuing to use this site, I agree that my data will be processed in accordance with the General Data Protection Regulation.
                    </div>
                    <button
                        type="button"
                        className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                        onClick={acceptCookies}
                    >
                        I agree <CheckIcon className="ml-1 w-4 h-4" />
                    </button>
                </div>
            </div>
        )
    );
};

export default CookieConsentModal;
