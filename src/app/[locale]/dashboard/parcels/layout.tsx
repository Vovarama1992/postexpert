"use client"
import React from 'react';
import DashboardParcelLayout from "../components/DashboardParcelLayout";

const Layout = ({children}: { children: React.ReactNode }) => {


    return (
        <DashboardParcelLayout>
            {children}
        </DashboardParcelLayout>
    );
};

export default Layout;
