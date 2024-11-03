'use client';

import React, { useState, useEffect } from 'react';
import {Spinner} from "@nextui-org/react";

const ClientLoadingWrapper = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner size="lg" color="default"/>
            </div>
        );
    }

    return <>{children}</>;
};

export default ClientLoadingWrapper;
